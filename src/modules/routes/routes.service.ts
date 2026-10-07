import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindRouteDto } from './core/dto/find-route-query.dto';
import { PrismaService } from '@common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  RouteGeoJsonFeature,
  RouteProfile,
  RouteResponseDto,
  RouteStepDto,
  RouteStepRow,
} from './core/interfaces/route-response.interface';

@Injectable()
export class RoutesService {
  constructor(private prisma: PrismaService) {}

  async findRoute(query: FindRouteDto): Promise<RouteResponseDto> {
    const { fromLon, fromLat, schoolId, profile } = query;
    const [schoolRows, originRows] = await Promise.all([
      this.prisma.$queryRaw<{ id: string; name: string; nodeId: string }[]>(
        Prisma.sql`
          SELECT s."id", s."name", sap."road_node_id" AS "nodeId"
          FROM "public"."school" s
          INNER JOIN "public"."school_access_point" sap
            ON sap."school_id" = s."id"
          INNER JOIN "public"."road_node" rn
            ON rn."id" = sap."road_node_id"
          WHERE s."id" = ${schoolId}
            AND s."deleted_at" IS NULL
            AND sap."deleted_at" IS NULL
            AND rn."deleted_at" IS NULL
          ORDER BY sap."snap_distance_m" ASC NULLS LAST, sap."id"
          LIMIT 1
        `,
      ),
      this.prisma.$queryRaw<{ nodeId: string; snapDistanceM: number }[]>(
        Prisma.sql`
          WITH origin AS (
            SELECT ST_SetSRID(ST_MakePoint(${fromLon}, ${fromLat}), 4326) AS geom
          )
          SELECT
            rn."id" AS "nodeId",
            ST_Distance(f."geom"::geography, origin."geom"::geography) AS "snapDistanceM"
          FROM origin
          INNER JOIN "public"."road_node" rn
            ON rn."deleted_at" IS NULL
          INNER JOIN "public"."feature" f
            ON f."id" = rn."feature_id"
            AND f."deleted_at" IS NULL
          ORDER BY f."geom" <-> origin."geom", rn."id"
          LIMIT 1
        `,
      ),
    ]);

    const school = schoolRows[0];
    if (!school) {
      throw new NotFoundException(
        'School not found or it has no active access point',
      );
    }

    const origin = originRows[0];
    if (!origin) {
      throw new NotFoundException('No road nodes are available for snapping');
    }

    const rows =
      origin.nodeId === school.nodeId
        ? []
        : await this.findRouteSteps(origin.nodeId, school.nodeId, profile);

    if (origin.nodeId !== school.nodeId && rows.length === 0) {
      throw new NotFoundException(
        'No route found between the origin and the selected school',
      );
    }

    const steps: RouteStepDto[] = rows.map((row) => ({
      seq: Number(row.seq),
      roadName: row.roadName,
      distanceM: Number(row.distanceM),
      durationS: Number(row.durationS),
      geometry: row.geometry,
    }));
    const geometry: RouteGeoJsonFeature[] = steps.map(
      ({ geometry: stepGeometry, ...properties }) => ({
        type: 'Feature',
        properties,
        geometry: stepGeometry,
      }),
    );

    return {
      profile,
      school: { id: school.id, name: school.name },
      distanceM: steps.reduce((total, step) => total + step.distanceM, 0),
      durationS: steps.reduce((total, step) => total + step.durationS, 0),
      snapDistanceM: Number(origin.snapDistanceM),
      steps,
      geometry: {
        type: 'FeatureCollection',
        features: geometry,
      },
    };
  }

  private findRouteSteps(
    originNodeId: string,
    destinationNodeId: string,
    profile: RouteProfile,
  ) {
    const costColumn = {
      fast: '"travel_time_s"',
      safe: '"cost_safe"',
      balanced: '"cost_balanced"',
    }[profile];

    if (!costColumn) {
      throw new BadRequestException('Unsupported route profile');
    }

    return this.prisma.$queryRaw<RouteStepRow[]>(Prisma.sql`
      WITH who AS (
        SELECT
          (
            SELECT vid
            FROM (
              SELECT source AS vid, source_node_id AS nid FROM v_routing
              UNION
              SELECT target AS vid, target_node_id AS nid FROM v_routing
            ) u
            WHERE nid = ${originNodeId}
            LIMIT 1
          ) AS src,
          (
            SELECT vid
            FROM (
              SELECT source AS vid, source_node_id AS nid FROM v_routing
              UNION
              SELECT target AS vid, target_node_id AS nid FROM v_routing
            ) u
            WHERE nid = ${destinationNodeId}
            LIMIT 1
          ) AS tgt
      ),
      route AS (
        SELECT path."seq", path."node", path."edge", path."cost"
        FROM who
        CROSS JOIN LATERAL pgr_dijkstra(
          'SELECT eid AS id, source, target, ${Prisma.raw(costColumn)} AS cost FROM v_routing WHERE ${Prisma.raw(costColumn)} IS NOT NULL AND ${Prisma.raw(costColumn)} >= 0',
          who."src",
          who."tgt",
          directed := false
        ) path
        WHERE path."edge" <> -1
      )
      SELECT
        route."seq" AS "seq",
        v."road_name" AS "roadName",
        v."distance_m" AS "distanceM",
        v."travel_time_s" AS "durationS",
        route."cost" AS "cost",
        ST_AsGeoJSON(
          CASE
            WHEN route."node" = v."source" THEN v."geom"
            ELSE ST_Reverse(v."geom")
          END
        )::json AS "geometry"
      FROM route
      INNER JOIN v_routing v ON v."eid" = route."edge"
      ORDER BY route."seq"
    `);
  }
}


