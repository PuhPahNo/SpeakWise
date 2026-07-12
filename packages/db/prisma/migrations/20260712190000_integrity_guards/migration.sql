-- Normalize existing rows before installing idempotency constraints.
DELETE FROM "corrections"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT "id", ROW_NUMBER() OVER (
      PARTITION BY "user_response_id" ORDER BY "created_at", "id"
    ) AS rn
    FROM "corrections"
  ) ranked
  WHERE ranked.rn > 1
);

DELETE FROM "user_responses"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT "id", ROW_NUMBER() OVER (
      PARTITION BY "session_id", "lesson_task_id"
      ORDER BY ("is_correct" IS NOT NULL) DESC, "created_at", "id"
    ) AS rn
    FROM "user_responses"
    WHERE "lesson_task_id" IS NOT NULL
  ) ranked
  WHERE ranked.rn > 1
);

DELETE FROM "xp_entries"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT "id", ROW_NUMBER() OVER (
      PARTITION BY "user_id", "reason", "source_id" ORDER BY "created_at", "id"
    ) AS rn
    FROM "xp_entries"
    WHERE "source_id" IS NOT NULL
  ) ranked
  WHERE ranked.rn > 1
);

WITH ranked AS (
  SELECT "id", "user_id", lower(trim("target_text")) AS normalized_text,
    ROW_NUMBER() OVER (
      PARTITION BY "user_id", lower(trim("target_text"))
      ORDER BY "mastery_score" DESC, "updated_at" DESC, "id"
    ) AS rn
  FROM "vocabulary_items"
), aggregated AS (
  SELECT "user_id", lower(trim("target_text")) AS normalized_text,
    SUM("exposure_count")::integer AS exposure_count,
    SUM("correct_count")::integer AS correct_count,
    SUM("incorrect_count")::integer AS incorrect_count,
    MAX("mastery_score") AS mastery_score,
    MAX("last_reviewed_at") AS last_reviewed_at,
    MIN("next_review_at") AS next_review_at
  FROM "vocabulary_items"
  GROUP BY "user_id", lower(trim("target_text"))
)
UPDATE "vocabulary_items" AS item
SET "exposure_count" = aggregated.exposure_count,
    "correct_count" = aggregated.correct_count,
    "incorrect_count" = aggregated.incorrect_count,
    "mastery_score" = aggregated.mastery_score,
    "last_reviewed_at" = aggregated.last_reviewed_at,
    "next_review_at" = aggregated.next_review_at
FROM ranked
JOIN aggregated USING ("user_id", normalized_text)
WHERE ranked.rn = 1 AND item."id" = ranked."id";

DELETE FROM "vocabulary_items"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT "id", ROW_NUMBER() OVER (
      PARTITION BY "user_id", lower(trim("target_text"))
      ORDER BY "mastery_score" DESC, "updated_at" DESC, "id"
    ) AS rn
    FROM "vocabulary_items"
  ) ranked
  WHERE ranked.rn > 1
);

WITH ranked AS (
  SELECT "id", ROW_NUMBER() OVER (
    PARTITION BY "user_id", "lesson_id" ORDER BY "started_at" DESC, "id" DESC
  ) AS rn
  FROM "sessions"
  WHERE "status" = 'active' AND "lesson_id" IS NOT NULL
)
UPDATE "sessions"
SET "status" = 'abandoned'
FROM ranked
WHERE "sessions"."id" = ranked."id" AND ranked.rn > 1;

WITH ranked AS (
  SELECT "id", ROW_NUMBER() OVER (
    PARTITION BY "user_id" ORDER BY "started_at" DESC, "id" DESC
  ) AS rn
  FROM "sessions"
  WHERE "status" = 'active' AND "session_type" = 'onboarding'
)
UPDATE "sessions"
SET "status" = 'abandoned'
FROM ranked
WHERE "sessions"."id" = ranked."id" AND ranked.rn > 1;

WITH ranked AS (
  SELECT "id", ROW_NUMBER() OVER (
    PARTITION BY "student_id" ORDER BY "connected_at" DESC, "id" DESC
  ) AS rn
  FROM "tutor_students"
  WHERE "status" = 'active'
)
UPDATE "tutor_students"
SET "status" = 'ended', "ended_at" = now()
FROM ranked
WHERE "tutor_students"."id" = ranked."id" AND ranked.rn > 1;

ALTER TABLE "memory_notes" ADD COLUMN "dedupe_key" TEXT;
ALTER TABLE "vocabulary_items" ADD COLUMN "last_review_token" UUID;
UPDATE "memory_notes"
SET "dedupe_key" = md5("type"::text || ':' || lower(trim("content")));

DELETE FROM "memory_notes"
WHERE "id" IN (
  SELECT "id" FROM (
    SELECT "id", ROW_NUMBER() OVER (
      PARTITION BY "user_id", "dedupe_key" ORDER BY "confidence" DESC, "updated_at" DESC, "id"
    ) AS rn
    FROM "memory_notes"
  ) ranked
  WHERE ranked.rn > 1
);

ALTER TABLE "memory_notes" ALTER COLUMN "dedupe_key" SET NOT NULL;

CREATE UNIQUE INDEX "user_responses_session_id_lesson_task_id_key"
  ON "user_responses"("session_id", "lesson_task_id");
CREATE UNIQUE INDEX "corrections_user_response_id_key"
  ON "corrections"("user_response_id");
CREATE UNIQUE INDEX "xp_entries_user_id_reason_source_id_key"
  ON "xp_entries"("user_id", "reason", "source_id");
CREATE UNIQUE INDEX "memory_notes_user_id_dedupe_key_key"
  ON "memory_notes"("user_id", "dedupe_key");
CREATE UNIQUE INDEX "users_username_lower_key" ON "users"(lower("username"));
CREATE UNIQUE INDEX "users_email_lower_key" ON "users"(lower("email")) WHERE "email" IS NOT NULL;
CREATE UNIQUE INDEX "vocabulary_items_user_target_lower_key"
  ON "vocabulary_items"("user_id", lower(trim("target_text")));
CREATE UNIQUE INDEX "sessions_one_active_lesson_key"
  ON "sessions"("user_id", "lesson_id")
  WHERE "status" = 'active' AND "lesson_id" IS NOT NULL;
CREATE UNIQUE INDEX "sessions_one_active_onboarding_key"
  ON "sessions"("user_id", "session_type")
  WHERE "status" = 'active' AND "session_type" = 'onboarding';
CREATE UNIQUE INDEX "tutor_students_one_active_student_key"
  ON "tutor_students"("student_id")
  WHERE "status" = 'active';
CREATE UNIQUE INDEX "lessons_user_idempotency_key"
  ON "lessons"("user_id", ("generation_context"->>'idempotencyKey'))
  WHERE "generation_context"->>'idempotencyKey' IS NOT NULL;
