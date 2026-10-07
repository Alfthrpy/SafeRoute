import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './core/dto/create-school.dto';
import { UpdateSchoolDto } from './core/dto/update-school.dto';
import { SchoolQueryDto } from './core/dto/school-query.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@common/prisma/prisma.service';
import {
  SchoolTransformHelper,
  SchoolWithFeatureRow,
} from './core/helpers/school-transform.helper';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}
  create(createSchoolDto: CreateSchoolDto) {
    return 'This action adds a new school';
  }

  async findAll(query: SchoolQueryDto) {
    const { search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const searchFilter = search
      ? Prisma.sql`AND s."name" ILIKE ${`%${search}%`}`
      : Prisma.empty;
    const activeSchoolFilter = Prisma.sql`
      s."deleted_at" IS NULL
      AND f."deleted_at" IS NULL
      ${searchFilter}
    `;

    const [schools, countRows] = await Promise.all([
      this.prisma.$queryRaw<SchoolWithFeatureRow[]>(Prisma.sql`
        SELECT
          s."id",
          s."npsn",
          s."name",
          s."level",
          s."status",
          s."address",
          s."kelurahan",
          s."kecamatan",
          s."feature_id" AS "featureId",
          s."created_at",
          s."updated_at",
          s."deleted_at",
          f."id" AS "feature_id",
          f."layer_id" AS "layerId",
          ST_AsGeoJSON(f."geom")::json AS "geom",
          f."source_id" AS "sourceId",
          f."created_at" AS "feature_created_at",
          f."updated_at" AS "feature_updated_at",
          f."deleted_at" AS "feature_deleted_at"
        FROM "public"."school" s
        INNER JOIN "public"."feature" f
          ON f."id" = s."feature_id"
        WHERE ${activeSchoolFilter}
        ORDER BY s."created_at" DESC
        LIMIT ${limit}
        OFFSET ${skip}
      `),
      this.prisma.$queryRaw<{ total: bigint }[]>(Prisma.sql`
        SELECT COUNT(*) AS "total"
        FROM "public"."school" s
        INNER JOIN "public"."feature" f
          ON f."id" = s."feature_id"
        WHERE ${activeSchoolFilter}
      `),
    ]);
    const total = Number(countRows[0].total);

    if (total === 0) {
      throw new NotFoundException('No schools found');
    }

    return {
      data: SchoolTransformHelper.toEntities(schools),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} school`;
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }
}
