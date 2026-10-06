-- AlterTable
ALTER TABLE "position_permissions"
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "position_permissions"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "position_permissions"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "layer"
ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "layer"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "layer"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "feature"
ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "feature"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "feature"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "road"
ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "road"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "road"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "road_node"
ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "road_node"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "road_node"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "road_edge"
ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "road_edge"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "road_edge"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "school"
ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "school"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "school"
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "school_access_point"
ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" TIMESTAMP(3),
ADD COLUMN "deleted_at" TIMESTAMP(3);

UPDATE "school_access_point"
SET "updated_at" = "created_at"
WHERE "updated_at" IS NULL;

ALTER TABLE "school_access_point"
ALTER COLUMN "updated_at" SET NOT NULL;
