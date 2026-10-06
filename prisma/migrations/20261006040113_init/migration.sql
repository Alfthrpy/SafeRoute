/*
  Warnings:

  - The primary key for the `permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `position_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `positions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgrouting;
ALTER TABLE "position_permissions" DROP CONSTRAINT "position_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "position_permissions" DROP CONSTRAINT "position_permissions_position_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_position_id_fkey";

-- AlterTable
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "permissions_id_seq";

-- AlterTable
ALTER TABLE "position_permissions" DROP CONSTRAINT "position_permissions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "position_id" SET DATA TYPE TEXT,
ALTER COLUMN "permission_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "position_permissions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "position_permissions_id_seq";

-- AlterTable
ALTER TABLE "positions" DROP CONSTRAINT "positions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "positions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "positions_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "position_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "layer" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "geometry_type" TEXT NOT NULL,

    CONSTRAINT "layer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature" (
    "id" TEXT NOT NULL,
    "layer_id" TEXT NOT NULL,
    "geom" geometry NOT NULL,
    "source_id" TEXT,

    CONSTRAINT "feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "road" (
    "id" TEXT NOT NULL,
    "osm_way_id" TEXT NOT NULL,
    "name" TEXT,
    "highway" TEXT,
    "maxspeed_kmh" INTEGER,
    "maxspeed_status" TEXT NOT NULL DEFAULT 'missing',
    "surface" TEXT,
    "surface_status" TEXT NOT NULL DEFAULT 'missing',
    "sidewalk" TEXT,
    "sidewalk_status" TEXT NOT NULL DEFAULT 'missing',
    "access" TEXT,
    "tags" JSONB,

    CONSTRAINT "road_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "road_node" (
    "id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "osm_node_id" TEXT,

    CONSTRAINT "road_node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "road_edge" (
    "id" TEXT NOT NULL,
    "road_id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "source_node_id" TEXT NOT NULL,
    "target_node_id" TEXT NOT NULL,
    "seq_in_road" INTEGER,
    "distance_m" DOUBLE PRECISION NOT NULL,
    "travel_time_s" DOUBLE PRECISION NOT NULL,
    "is_routable" BOOLEAN NOT NULL DEFAULT true,
    "cost_safe" DOUBLE PRECISION,
    "cost_balanced" DOUBLE PRECISION,

    CONSTRAINT "road_edge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school" (
    "id" TEXT NOT NULL,
    "npsn" TEXT,
    "name" TEXT NOT NULL,
    "level" TEXT,
    "status" TEXT,
    "address" TEXT,
    "kelurahan" TEXT,
    "kecamatan" TEXT,
    "feature_id" TEXT NOT NULL,

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_access_point" (
    "id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "road_node_id" TEXT NOT NULL,
    "snap_distance_m" DOUBLE PRECISION,

    CONSTRAINT "school_access_point_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "layer_code_key" ON "layer"("code");

-- CreateIndex
CREATE INDEX "feature_layer_id_idx" ON "feature"("layer_id");

-- CreateIndex
CREATE INDEX "feature_source_id_idx" ON "feature"("source_id");

-- CreateIndex
CREATE UNIQUE INDEX "road_osm_way_id_key" ON "road"("osm_way_id");

-- CreateIndex
CREATE UNIQUE INDEX "road_node_feature_id_key" ON "road_node"("feature_id");

-- CreateIndex
CREATE INDEX "road_node_osm_node_id_idx" ON "road_node"("osm_node_id");

-- CreateIndex
CREATE UNIQUE INDEX "road_edge_feature_id_key" ON "road_edge"("feature_id");

-- CreateIndex
CREATE INDEX "road_edge_road_id_idx" ON "road_edge"("road_id");

-- CreateIndex
CREATE INDEX "road_edge_source_node_id_idx" ON "road_edge"("source_node_id");

-- CreateIndex
CREATE INDEX "road_edge_target_node_id_idx" ON "road_edge"("target_node_id");

-- CreateIndex
CREATE UNIQUE INDEX "school_npsn_key" ON "school"("npsn");

-- CreateIndex
CREATE UNIQUE INDEX "school_feature_id_key" ON "school"("feature_id");

-- CreateIndex
CREATE UNIQUE INDEX "school_access_point_school_id_road_node_id_key" ON "school_access_point"("school_id", "road_node_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_permissions" ADD CONSTRAINT "position_permissions_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_permissions" ADD CONSTRAINT "position_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature" ADD CONSTRAINT "feature_layer_id_fkey" FOREIGN KEY ("layer_id") REFERENCES "layer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "road_node" ADD CONSTRAINT "road_node_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "road_edge" ADD CONSTRAINT "road_edge_road_id_fkey" FOREIGN KEY ("road_id") REFERENCES "road"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "road_edge" ADD CONSTRAINT "road_edge_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "road_edge" ADD CONSTRAINT "road_edge_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "road_node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "road_edge" ADD CONSTRAINT "road_edge_target_node_id_fkey" FOREIGN KEY ("target_node_id") REFERENCES "road_node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school" ADD CONSTRAINT "school_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_access_point" ADD CONSTRAINT "school_access_point_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_access_point" ADD CONSTRAINT "school_access_point_road_node_id_fkey" FOREIGN KEY ("road_node_id") REFERENCES "road_node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
