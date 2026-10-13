-- Safety flags untuk response {score, sidewalkM, crossings, busyRoadM, reasons}.
-- Kolom di-backfill oleh D:\CODING\PYTHON\OSM\migrate_safety.sql (FDW dari DB staging);
-- migrasi ini hanya memastikan kolomnya ada (IF NOT EXISTS = aman di DB yang sudah dimigrasi).

ALTER TABLE "public"."road_edge" ADD COLUMN IF NOT EXISTS "has_sidewalk" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "public"."road_edge" ADD COLUMN IF NOT EXISTS "is_busy" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "public"."road_node" ADD COLUMN IF NOT EXISTS "is_crossing" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS "idx_road_edge_has_sidewalk" ON "public"."road_edge" ("has_sidewalk") WHERE "has_sidewalk";
CREATE INDEX IF NOT EXISTS "idx_road_edge_is_busy" ON "public"."road_edge" ("is_busy") WHERE "is_busy";
CREATE INDEX IF NOT EXISTS "idx_road_node_is_crossing" ON "public"."road_node" ("is_crossing") WHERE "is_crossing";
