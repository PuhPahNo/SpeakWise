import {
  assertCurriculumIntegrity,
  italianCurriculumSeed,
  italianCurriculumUnits,
  italianCurriculumVocabulary,
  italianLessonTemplates,
} from './index';

assertCurriculumIntegrity();
console.log('✓ integrity OK');
console.log('units    :', italianCurriculumUnits.length);
console.log('skills   :', italianCurriculumSeed.length);
console.log('templates:', italianLessonTemplates.length);
console.log('vocab    :', italianCurriculumVocabulary.length);
for (const u of italianCurriculumUnits) {
  console.log(
    `  ${u.code}  ${u.title} — ${u.skills.length} skills, ${u.lessonTemplates.length} lessons, ${u.vocabulary.length} vocab`,
  );
}
