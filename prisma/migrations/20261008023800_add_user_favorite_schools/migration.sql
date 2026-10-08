CREATE TABLE "user_favorite_schools" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorite_schools_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_favorite_schools_user_id_school_id_key"
ON "user_favorite_schools"("user_id", "school_id");

CREATE INDEX "user_favorite_schools_school_id_idx"
ON "user_favorite_schools"("school_id");

ALTER TABLE "user_favorite_schools"
ADD CONSTRAINT "user_favorite_schools_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_favorite_schools"
ADD CONSTRAINT "user_favorite_schools_school_id_fkey"
FOREIGN KEY ("school_id") REFERENCES "school"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
