import { SchoolEntity } from '../entities/school.entity';

export interface SchoolWithFeatureRow {
  id: string;
  npsn: string | null;
  name: string;
  level: string | null;
  status: string | null;
  address: string | null;
  kelurahan: string | null;
  kecamatan: string | null;
  featureId: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  feature_id: string;
  layerId: string;
  geom: Record<string, unknown>;
  sourceId: string | null;
  feature_created_at: Date;
  feature_updated_at: Date;
  feature_deleted_at: Date | null;
}

export class SchoolTransformHelper {
  static toEntity(school: SchoolWithFeatureRow): SchoolEntity {
    return new SchoolEntity({
      id: school.id,
      npsn: school.npsn,
      name: school.name,
      level: school.level,
      status: school.status,
      address: school.address,
      kelurahan: school.kelurahan,
      kecamatan: school.kecamatan,
      featureId: school.featureId,
      created_at: school.created_at,
      updated_at: school.updated_at,
      deleted_at: school.deleted_at,
      feature: {
        id: school.feature_id,
        layerId: school.layerId,
        geom: school.geom,
        sourceId: school.sourceId,
        created_at: school.feature_created_at,
        updated_at: school.feature_updated_at,
        deleted_at: school.feature_deleted_at,
      },
    });
  }

  static toEntities(schools: SchoolWithFeatureRow[]): SchoolEntity[] {
    return schools.map((school) => this.toEntity(school));
  }
}
