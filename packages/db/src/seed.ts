import { prisma } from './index';
import {
  assertCurriculumIntegrity,
  italianCurriculumSeed,
  italianCurriculumUnits,
  italianCurriculumVocabulary,
  italianLessonTemplates,
} from './seeds/curriculum';
import { promptTemplateSeed } from './seeds/prompt-templates';

// Prisma's Json input type is structurally narrower than the plain objects we
// author in the seed. Serialize through JSON to coerce to a Prisma-accepted value.
// biome-ignore lint/suspicious/noExplicitAny: JSON bridge for Prisma's Json input
const asJson = (v: unknown): any => JSON.parse(JSON.stringify(v ?? null));

async function main() {
  // Fail fast on authoring mistakes (dup slugs, dangling prereqs) before any write.
  assertCurriculumIntegrity();

  // ─── Units (chapters) ──────────────────────────────────────────────────
  console.log('▶ Seeding curriculum units…');
  const unitIdByCode = new Map<string, string>();
  for (const u of italianCurriculumUnits) {
    const rec = await prisma.curriculumUnit.upsert({
      where: { code: u.code },
      update: {
        order: u.order,
        title: u.title,
        subtitle: u.subtitle ?? null,
        theme: u.theme,
        level: u.level,
        summary: u.summary,
        canDo: u.canDo,
        culturalNotes: asJson(u.culturalNotes),
        isActive: true,
      },
      create: {
        language: 'it',
        code: u.code,
        order: u.order,
        title: u.title,
        subtitle: u.subtitle ?? null,
        theme: u.theme,
        level: u.level,
        summary: u.summary,
        canDo: u.canDo,
        culturalNotes: asJson(u.culturalNotes),
        isActive: true,
      },
    });
    unitIdByCode.set(u.code, rec.id);
  }
  console.log(`✓ Seeded ${italianCurriculumUnits.length} units`);

  // ─── Skills ────────────────────────────────────────────────────────────
  // Pass 1: upsert content + unit link (prerequisites resolved in pass 2 once
  // every skill row exists and has an id).
  console.log('▶ Seeding curriculum skills…');
  for (const skill of italianCurriculumSeed) {
    const unitId = unitIdByCode.get(skill.unitCode) ?? null;
    const common = {
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: skill.description,
      examples: asJson(skill.examples),
      unitId,
      orderInUnit: skill.orderInUnit,
      commonMistakes: skill.commonMistakes ?? [],
      recommendedPracticeTypes: skill.recommendedPracticeTypes ?? [],
      compatibleThemes: skill.compatibleThemes ?? [],
      teachingNotes: skill.teachingNotes ?? null,
      isActive: true,
    };
    await prisma.curriculumSkill.upsert({
      where: { slug: skill.slug },
      update: common,
      create: { language: 'it', slug: skill.slug, prerequisites: [], ...common },
    });
  }

  // Pass 2: resolve prerequisite slugs → ids.
  for (const skill of italianCurriculumSeed) {
    if (skill.prerequisiteSlugs.length === 0) continue;
    const prereqs = await prisma.curriculumSkill.findMany({
      where: { slug: { in: skill.prerequisiteSlugs } },
      select: { id: true },
    });
    await prisma.curriculumSkill.update({
      where: { slug: skill.slug },
      data: { prerequisites: prereqs.map((p) => p.id) },
    });
  }
  console.log(`✓ Seeded ${italianCurriculumSeed.length} skills`);

  // ─── Lesson templates ──────────────────────────────────────────────────
  console.log('▶ Seeding lesson templates…');
  for (const tpl of italianLessonTemplates) {
    const unitId = unitIdByCode.get(tpl.unitCode);
    if (!unitId) continue; // unreachable: integrity check guarantees the unit exists
    const common = {
      title: tpl.title,
      lessonType: tpl.lessonType,
      order: tpl.order,
      level: tpl.level,
      summary: tpl.summary,
      objectiveSkillSlugs: tpl.objectiveSkillSlugs,
      taskBlueprint: asJson(tpl.taskBlueprint),
      defaultDurationMinutes: tpl.defaultDurationMinutes ?? 10,
      compatibleThemes: tpl.compatibleThemes ?? [],
      isActive: true,
    };
    await prisma.curriculumLessonTemplate.upsert({
      where: { slug: tpl.slug },
      update: { unitId, ...common },
      create: { unitId, slug: tpl.slug, ...common },
    });
  }
  console.log(`✓ Seeded ${italianLessonTemplates.length} lesson templates`);

  // ─── Canonical vocabulary ──────────────────────────────────────────────
  console.log('▶ Seeding canonical vocabulary…');
  for (const v of italianCurriculumVocabulary) {
    const unitId = unitIdByCode.get(v.unitCode);
    if (!unitId) continue;
    const common = {
      targetText: v.targetText,
      nativeText: v.nativeText,
      partOfSpeech: v.partOfSpeech ?? null,
      gender: v.gender ?? null,
      exampleSentence: v.exampleSentence ?? null,
      exampleTranslation: v.exampleTranslation ?? null,
      theme: v.theme ?? null,
      register: v.register ?? null,
      order: v.order,
    };
    await prisma.curriculumVocabulary.upsert({
      where: { slug: v.slug },
      update: { unitId, ...common },
      create: { unitId, slug: v.slug, ...common },
    });
  }
  console.log(`✓ Seeded ${italianCurriculumVocabulary.length} canonical vocabulary items`);

  // ─── Prompt templates ──────────────────────────────────────────────────
  console.log('▶ Seeding prompt templates…');
  for (const tpl of promptTemplateSeed) {
    const outputSchema = tpl.outputSchema ? asJson(tpl.outputSchema) : undefined;
    await prisma.promptTemplate.upsert({
      where: { key_version: { key: tpl.key, version: tpl.version } },
      update: { body: tpl.body, purpose: tpl.purpose, isEnabled: true },
      create: {
        key: tpl.key,
        version: tpl.version,
        purpose: tpl.purpose,
        body: tpl.body,
        inputs: tpl.inputs,
        outputSchema,
        isEnabled: true,
      },
    });
  }
  console.log(`✓ Seeded ${promptTemplateSeed.length} prompt templates`);

  console.log('✅ Seed complete.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
