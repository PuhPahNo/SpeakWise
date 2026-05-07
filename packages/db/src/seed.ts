import { prisma } from './index.js';
import { italianCurriculumSeed } from './seeds/italian-curriculum.js';
import { promptTemplateSeed } from './seeds/prompt-templates.js';

async function main() {
  console.log('▶ Seeding curriculum…');
  for (const skill of italianCurriculumSeed) {
    await prisma.curriculumSkill.upsert({
      where: { slug: skill.slug },
      update: {
        name: skill.name,
        category: skill.category,
        level: skill.level,
        description: skill.description,
        examples: skill.examples,
        prerequisites: skill.prerequisiteSlugs.length
          ? (
              await prisma.curriculumSkill.findMany({
                where: { slug: { in: skill.prerequisiteSlugs } },
                select: { id: true },
              })
            ).map((s) => s.id)
          : [],
        isActive: true,
      },
      create: {
        language: 'it',
        slug: skill.slug,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        description: skill.description,
        examples: skill.examples,
        prerequisites: [],
        isActive: true,
      },
    });
  }

  // Resolve prerequisites in second pass (by slug)
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

  console.log(`✓ Seeded ${italianCurriculumSeed.length} curriculum skills`);

  console.log('▶ Seeding prompt templates…');
  for (const tpl of promptTemplateSeed) {
    await prisma.promptTemplate.upsert({
      where: { key_version: { key: tpl.key, version: tpl.version } },
      update: { body: tpl.body, purpose: tpl.purpose, isEnabled: true },
      create: { ...tpl, isEnabled: true },
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
