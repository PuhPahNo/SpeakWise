-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('learner', 'admin', 'tutor', 'student', 'organization_admin');

-- CreateEnum
CREATE TYPE "CEFRLevel" AS ENUM ('complete_beginner', 'beginner', 'lower_intermediate', 'intermediate', 'upper_intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "LearningStyle" AS ENUM ('mission', 'tutor', 'conversation', 'drill', 'balanced');

-- CreateEnum
CREATE TYPE "CorrectionStyle" AS ENUM ('gentle', 'direct', 'strict', 'end_of_task', 'major_mistakes_only', 'adaptive');

-- CreateEnum
CREATE TYPE "WisePersonality" AS ENUM ('default', 'friendly_tutor', 'direct_coach', 'game_master', 'premium_assistant', 'strict_grammar_coach', 'casual_companion');

-- CreateEnum
CREATE TYPE "InteractionMode" AS ENUM ('voice', 'text');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('pronunciation', 'vocabulary', 'grammar', 'speaking', 'listening', 'reading', 'writing', 'culture', 'fluency');

-- CreateEnum
CREATE TYPE "SkillStatus" AS ENUM ('not_started', 'introduced', 'practicing', 'needs_review', 'proficient', 'mastered');

-- CreateEnum
CREATE TYPE "VocabStatus" AS ENUM ('new', 'learning', 'review', 'mastered', 'archived');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('daily_mission', 'recovery', 'freestyle', 'grammar', 'vocabulary_review', 'speaking_challenge', 'listening_challenge', 'media', 'scenario_roleplay', 'progress_check', 'placement');

-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('draft', 'recommended', 'active', 'completed', 'skipped', 'archived');

-- CreateEnum
CREATE TYPE "LessonAuthor" AS ENUM ('wise', 'user', 'admin', 'tutor');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('briefing', 'explanation', 'multiple_choice', 'fill_blank', 'translation', 'conjugation', 'pronoun_replacement', 'tense_selection', 'error_correction', 'speaking_prompt', 'listening_comprehension', 'roleplay', 'recap', 'media_clip', 'reflection');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('onboarding', 'placement', 'lesson', 'freestyle', 'review', 'conversation', 'media', 'progress_report');

-- CreateEnum
CREATE TYPE "SessionMode" AS ENUM ('voice', 'text', 'mixed');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('active', 'completed', 'abandoned', 'errored');

-- CreateEnum
CREATE TYPE "InputType" AS ENUM ('voice', 'text', 'multiple_choice', 'selection');

-- CreateEnum
CREATE TYPE "CorrectionType" AS ENUM ('grammar', 'vocabulary', 'pronunciation', 'spelling', 'word_order', 'tone', 'comprehension', 'fluency', 'other');

-- CreateEnum
CREATE TYPE "CorrectionSeverity" AS ENUM ('minor', 'moderate', 'major');

-- CreateEnum
CREATE TYPE "MemoryType" AS ENUM ('preference', 'goal', 'interest', 'strength', 'weakness', 'recurring_mistake', 'tutor_observation', 'motivation', 'content_preference', 'correction_preference', 'pronunciation_note', 'session_summary');

-- CreateEnum
CREATE TYPE "MemoryVisibility" AS ENUM ('user_visible', 'internal');

-- CreateEnum
CREATE TYPE "MediaSourceType" AS ENUM ('youtube', 'uploaded', 'licensed', 'ai_generated', 'article', 'transcript', 'other');

-- CreateEnum
CREATE TYPE "RightsStatus" AS ENUM ('unknown', 'user_provided', 'public', 'licensed', 'ai_generated', 'restricted');

-- CreateEnum
CREATE TYPE "TutorStudentStatus" AS ENUM ('active', 'paused', 'ended');

-- CreateEnum
CREATE TYPE "DirectiveStatus" AS ENUM ('active', 'archived');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'learner',
    "native_language" TEXT NOT NULL DEFAULT 'en',
    "target_language" TEXT NOT NULL DEFAULT 'it',
    "timezone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_active_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learner_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "current_level" "CEFRLevel" NOT NULL DEFAULT 'beginner',
    "level_confidence" DECIMAL(3,2),
    "goals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferred_learning_style" "LearningStyle" NOT NULL DEFAULT 'balanced',
    "preferred_correction_style" "CorrectionStyle" NOT NULL DEFAULT 'adaptive',
    "preferred_wise_personality" "WisePersonality" NOT NULL DEFAULT 'default',
    "preferred_session_length_minutes" INTEGER,
    "preferred_frequency" TEXT,
    "motivation_notes" TEXT,
    "wise_voice_id" TEXT,
    "language_ratio" DECIMAL(3,2) NOT NULL DEFAULT 0.1,
    "immersion_mode" BOOLEAN NOT NULL DEFAULT false,
    "language_ratio_overridden" BOOLEAN NOT NULL DEFAULT false,
    "preferred_interaction_mode" "InteractionMode" NOT NULL DEFAULT 'voice',
    "onboarding_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learner_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_units" (
    "id" UUID NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'it',
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "theme" TEXT NOT NULL,
    "level" "CEFRLevel" NOT NULL,
    "summary" TEXT NOT NULL,
    "can_do" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cultural_notes" JSONB NOT NULL DEFAULT '[]',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curriculum_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_skills" (
    "id" UUID NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'it',
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "level" "CEFRLevel" NOT NULL,
    "description" TEXT NOT NULL,
    "prerequisites" UUID[] DEFAULT ARRAY[]::UUID[],
    "examples" JSONB NOT NULL DEFAULT '[]',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "unit_id" UUID,
    "order_in_unit" INTEGER,
    "common_mistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "recommended_practice_types" "TaskType"[] DEFAULT ARRAY[]::"TaskType"[],
    "compatible_themes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "teaching_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curriculum_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_skill_progress" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,
    "status" "SkillStatus" NOT NULL DEFAULT 'not_started',
    "mastery_score" DECIMAL(4,3) NOT NULL DEFAULT 0,
    "comprehension_score" DECIMAL(4,3) NOT NULL DEFAULT 0,
    "production_score" DECIMAL(4,3) NOT NULL DEFAULT 0,
    "exposure_count" INTEGER NOT NULL DEFAULT 0,
    "correct_count" INTEGER NOT NULL DEFAULT 0,
    "incorrect_count" INTEGER NOT NULL DEFAULT 0,
    "last_practiced_at" TIMESTAMP(3),
    "next_review_at" TIMESTAMP(3),
    "mistake_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_skill_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_lesson_templates" (
    "id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lesson_type" "LessonType" NOT NULL,
    "order" INTEGER NOT NULL,
    "level" "CEFRLevel" NOT NULL,
    "summary" TEXT NOT NULL,
    "objective_skill_slugs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "task_blueprint" JSONB NOT NULL DEFAULT '[]',
    "default_duration_minutes" INTEGER NOT NULL DEFAULT 10,
    "compatible_themes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curriculum_lesson_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculum_vocabulary" (
    "id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "target_text" TEXT NOT NULL,
    "native_text" TEXT NOT NULL,
    "part_of_speech" TEXT,
    "gender" TEXT,
    "example_sentence" TEXT,
    "example_translation" TEXT,
    "theme" TEXT,
    "register" TEXT,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curriculum_vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabulary_items" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "target_text" TEXT NOT NULL,
    "native_text" TEXT NOT NULL,
    "part_of_speech" TEXT,
    "example_sentence" TEXT,
    "example_translation" TEXT,
    "status" "VocabStatus" NOT NULL DEFAULT 'new',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "source_lesson_id" UUID,
    "source_session_id" UUID,
    "mastery_score" DECIMAL(4,3) NOT NULL DEFAULT 0,
    "exposure_count" INTEGER NOT NULL DEFAULT 0,
    "correct_count" INTEGER NOT NULL DEFAULT 0,
    "incorrect_count" INTEGER NOT NULL DEFAULT 0,
    "last_reviewed_at" TIMESTAMP(3),
    "next_review_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vocabulary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "lesson_type" "LessonType" NOT NULL,
    "status" "LessonStatus" NOT NULL DEFAULT 'draft',
    "target_skill_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "interest_theme" TEXT,
    "estimated_duration_minutes" INTEGER,
    "difficulty_level" "CEFRLevel" NOT NULL DEFAULT 'beginner',
    "generation_context" JSONB NOT NULL DEFAULT '{}',
    "content" JSONB NOT NULL DEFAULT '{}',
    "created_by" "LessonAuthor" NOT NULL DEFAULT 'wise',
    "tutor_directive_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_tasks" (
    "id" UUID NOT NULL,
    "lesson_id" UUID NOT NULL,
    "task_type" "TaskType" NOT NULL,
    "order_index" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "target_skill_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "vocabulary_item_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "expected_answer" JSONB,
    "options" JSONB,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "lesson_id" UUID,
    "session_type" "SessionType" NOT NULL,
    "mode" "SessionMode" NOT NULL DEFAULT 'text',
    "status" "SessionStatus" NOT NULL DEFAULT 'active',
    "transcript" JSONB,
    "summary" TEXT,
    "strengths_observed" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "weaknesses_observed" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "memory_updates_applied" BOOLEAN NOT NULL DEFAULT false,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_responses" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "lesson_task_id" UUID,
    "input_type" "InputType" NOT NULL,
    "user_answer" TEXT NOT NULL,
    "transcription" TEXT,
    "corrected_answer" TEXT,
    "is_correct" BOOLEAN,
    "score" DECIMAL(4,3),
    "feedback" TEXT,
    "grammar_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "vocabulary_item_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "skill_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corrections" (
    "id" UUID NOT NULL,
    "user_response_id" UUID NOT NULL,
    "correction_type" "CorrectionType" NOT NULL,
    "severity" "CorrectionSeverity" NOT NULL DEFAULT 'moderate',
    "original_text" TEXT NOT NULL,
    "corrected_text" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "encouragement" TEXT,
    "retry_prompt" TEXT,
    "skill_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corrections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memory_notes" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "MemoryType" NOT NULL,
    "content" TEXT NOT NULL,
    "structured_data" JSONB,
    "confidence" DECIMAL(3,2) NOT NULL DEFAULT 0.5,
    "visibility" "MemoryVisibility" NOT NULL DEFAULT 'internal',
    "source_session_id" UUID,
    "source_response_id" UUID,
    "embedding" vector(1536),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memory_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_items" (
    "id" UUID NOT NULL,
    "source_type" "MediaSourceType" NOT NULL,
    "source_url" TEXT,
    "title" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'it',
    "transcript" TEXT,
    "duration_seconds" INTEGER,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rights_status" "RightsStatus" NOT NULL DEFAULT 'unknown',
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_events" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "event_type" TEXT NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_streaks" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "current_days" INTEGER NOT NULL DEFAULT 0,
    "longest_days" INTEGER NOT NULL DEFAULT 0,
    "last_active_date" DATE,
    "freeze_tokens" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xp_entries" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "source_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_templates" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "inputs" JSONB NOT NULL DEFAULT '[]',
    "output_schema" JSONB,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_flags" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "rollout_pct" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "display_name" TEXT,
    "bio" TEXT,
    "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "invite_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_students" (
    "id" UUID NOT NULL,
    "tutor_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "status" "TutorStudentStatus" NOT NULL DEFAULT 'active',
    "connected_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "tutor_students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor_directives" (
    "id" UUID NOT NULL,
    "tutor_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "pinned_skill_ids" UUID[] DEFAULT ARRAY[]::UUID[],
    "status" "DirectiveStatus" NOT NULL DEFAULT 'active',
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutor_directives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cron_runs" (
    "id" UUID NOT NULL,
    "job" TEXT NOT NULL,
    "window_key" TEXT NOT NULL,
    "ran_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" JSONB,

    CONSTRAINT "cron_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "learner_profiles_user_id_key" ON "learner_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_units_code_key" ON "curriculum_units"("code");

-- CreateIndex
CREATE INDEX "curriculum_units_order_idx" ON "curriculum_units"("order");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_skills_slug_key" ON "curriculum_skills"("slug");

-- CreateIndex
CREATE INDEX "curriculum_skills_level_idx" ON "curriculum_skills"("level");

-- CreateIndex
CREATE INDEX "curriculum_skills_category_idx" ON "curriculum_skills"("category");

-- CreateIndex
CREATE INDEX "curriculum_skills_unit_id_idx" ON "curriculum_skills"("unit_id");

-- CreateIndex
CREATE INDEX "user_skill_progress_user_id_status_idx" ON "user_skill_progress"("user_id", "status");

-- CreateIndex
CREATE INDEX "user_skill_progress_next_review_at_idx" ON "user_skill_progress"("next_review_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_skill_progress_user_id_skill_id_key" ON "user_skill_progress"("user_id", "skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_lesson_templates_slug_key" ON "curriculum_lesson_templates"("slug");

-- CreateIndex
CREATE INDEX "curriculum_lesson_templates_unit_id_order_idx" ON "curriculum_lesson_templates"("unit_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "curriculum_vocabulary_slug_key" ON "curriculum_vocabulary"("slug");

-- CreateIndex
CREATE INDEX "curriculum_vocabulary_unit_id_order_idx" ON "curriculum_vocabulary"("unit_id", "order");

-- CreateIndex
CREATE INDEX "vocabulary_items_user_id_status_idx" ON "vocabulary_items"("user_id", "status");

-- CreateIndex
CREATE INDEX "vocabulary_items_user_id_next_review_at_idx" ON "vocabulary_items"("user_id", "next_review_at");

-- CreateIndex
CREATE INDEX "lessons_user_id_status_idx" ON "lessons"("user_id", "status");

-- CreateIndex
CREATE INDEX "lessons_user_id_lesson_type_idx" ON "lessons"("user_id", "lesson_type");

-- CreateIndex
CREATE INDEX "lessons_tutor_directive_id_idx" ON "lessons"("tutor_directive_id");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_tasks_lesson_id_order_index_key" ON "lesson_tasks"("lesson_id", "order_index");

-- CreateIndex
CREATE INDEX "sessions_user_id_status_idx" ON "sessions"("user_id", "status");

-- CreateIndex
CREATE INDEX "user_responses_session_id_idx" ON "user_responses"("session_id");

-- CreateIndex
CREATE INDEX "corrections_user_response_id_idx" ON "corrections"("user_response_id");

-- CreateIndex
CREATE INDEX "memory_notes_user_id_type_idx" ON "memory_notes"("user_id", "type");

-- CreateIndex
CREATE INDEX "memory_notes_user_id_is_active_idx" ON "memory_notes"("user_id", "is_active");

-- CreateIndex
CREATE INDEX "media_items_source_type_idx" ON "media_items"("source_type");

-- CreateIndex
CREATE INDEX "user_events_user_id_event_type_idx" ON "user_events"("user_id", "event_type");

-- CreateIndex
CREATE INDEX "user_events_event_type_created_at_idx" ON "user_events"("event_type", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_streaks_user_id_key" ON "user_streaks"("user_id");

-- CreateIndex
CREATE INDEX "xp_entries_user_id_created_at_idx" ON "xp_entries"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_templates_key_version_key" ON "prompt_templates"("key", "version");

-- CreateIndex
CREATE UNIQUE INDEX "feature_flags_key_key" ON "feature_flags"("key");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_profiles_user_id_key" ON "tutor_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_profiles_invite_code_key" ON "tutor_profiles"("invite_code");

-- CreateIndex
CREATE INDEX "tutor_students_student_id_status_idx" ON "tutor_students"("student_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_students_tutor_id_student_id_key" ON "tutor_students"("tutor_id", "student_id");

-- CreateIndex
CREATE INDEX "tutor_directives_student_id_status_idx" ON "tutor_directives"("student_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "cron_runs_job_window_key_key" ON "cron_runs"("job", "window_key");

-- AddForeignKey
ALTER TABLE "learner_profiles" ADD CONSTRAINT "learner_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculum_skills" ADD CONSTRAINT "curriculum_skills_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "curriculum_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skill_progress" ADD CONSTRAINT "user_skill_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skill_progress" ADD CONSTRAINT "user_skill_progress_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "curriculum_skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculum_lesson_templates" ADD CONSTRAINT "curriculum_lesson_templates_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "curriculum_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculum_vocabulary" ADD CONSTRAINT "curriculum_vocabulary_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "curriculum_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabulary_items" ADD CONSTRAINT "vocabulary_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_tutor_directive_id_fkey" FOREIGN KEY ("tutor_directive_id") REFERENCES "tutor_directives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_tasks" ADD CONSTRAINT "lesson_tasks_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_responses" ADD CONSTRAINT "user_responses_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_responses" ADD CONSTRAINT "user_responses_lesson_task_id_fkey" FOREIGN KEY ("lesson_task_id") REFERENCES "lesson_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corrections" ADD CONSTRAINT "corrections_user_response_id_fkey" FOREIGN KEY ("user_response_id") REFERENCES "user_responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memory_notes" ADD CONSTRAINT "memory_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_events" ADD CONSTRAINT "user_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_streaks" ADD CONSTRAINT "user_streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "xp_entries" ADD CONSTRAINT "xp_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_profiles" ADD CONSTRAINT "tutor_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_students" ADD CONSTRAINT "tutor_students_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_students" ADD CONSTRAINT "tutor_students_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_directives" ADD CONSTRAINT "tutor_directives_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor_directives" ADD CONSTRAINT "tutor_directives_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
