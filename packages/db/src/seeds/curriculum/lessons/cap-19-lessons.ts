// Additional lesson templates for the Advanced Appendix — Strutture avanzate.
//
// These EXTEND the five templates authored inline in units/cap-19-appendice.ts.
// Together they give learners a rich menu of drills, clinics, roleplays, and
// challenges across all six appendix skills.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and do NOT collide with the five
// inline slugs (cap19-dreams-and-regrets, cap19-passive-and-si,
// cap19-causative-fare, cap19-future-perfect-drill, cap19-fluency-roleplay).

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'appendix';

const lessons: SeedLessonTemplate[] = [
  // ── 1. PER-SKILL DRILL: all three if-clause types back-to-back ────────────
  {
    slug: 'cap19-if-clause-spectrum',
    title: 'Real, possible, impossible — the full if-clause spectrum',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A focused drill that walks through all three types of the periodo ipotetico in one sitting, ' +
      'building from a real open condition to a hypothetical wish to an impossible regret — using ' +
      'parallel content so you feel the structural shift rather than just memorise it.',
    objectiveSkillSlugs: ['it-hypotheticals'],
    defaultDurationMinutes: 13,
    compatibleThemes: ['culture', 'travel', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The spectrum in one table',
        prompt:
          'Three types, one image: think of a traffic light. Green = real (se + presente → presente ' +
          'o futuro). Amber = possible (se + congiuntivo imperfetto → condizionale presente). ' +
          'Red = impossible (se + congiuntivo trapassato → condizionale passato). The one absolute ' +
          'rule at every light: condizionale never directly after se.',
        notes:
          'Show the same scenario — travelling to Sicily — reformulated in all three types so the ' +
          'learner sees the structural contrast in a single glance.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Type identification',
        prompt:
          'Label each sentence as real, possible, or impossible: ' +
          '(a) "Se studi ogni giorno, migliorerai rapidamente." ' +
          '(b) "Se parlassi italiano meglio, troverei un lavoro a Milano." ' +
          '(c) "Se fossimo partiti prima, avremmo preso il traghetto."',
        exampleAnswer:
          '(a) Real — presente in both clauses. ' +
          '(b) Possible — congiuntivo imperfetto parlassi + condizionale presente troverei. ' +
          '(c) Impossible — congiuntivo trapassato fossimo partiti + condizionale passato avremmo preso.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Complete the real conditional',
        prompt: 'Fill in: "Se ___ (fare) bello domani, ___ (noi / andare) in spiaggia."',
        exampleAnswer: 'Se fa bello domani, andiamo in spiaggia.',
        notes:
          'Real type: present in the se-clause, present or future in the result. Both are fine here.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Complete the possible conditional',
        prompt: 'Fill in: "Se ___ (io / essere) più coraggioso, ___ (io / parlare) con lei."',
        exampleAnswer: 'Se fossi più coraggioso, parlerei con lei.',
        notes:
          'Congiuntivo imperfetto of essere — fossi — is a high-frequency form. Drill it explicitly.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Complete the impossible conditional',
        prompt:
          'Fill in: "Se Maria ___ (studiare) di più all’università, ___ (ottenere) il massimo dei voti."',
        exampleAnswer:
          'Se Maria avesse studiato di più all’università, avrebbe ottenuto il massimo dei voti.',
        notes:
          'Both auxiliary choices (avere) are regular here — ideal for a first impossible-type drill.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The three keys',
        prompt:
          'Without looking back, complete: The REAL type uses ___ in the se-clause. ' +
          'The POSSIBLE type uses ___. The IMPOSSIBLE type uses ___. After se, you never use ___.',
        exampleAnswer:
          'Real: presente indicativo. Possible: congiuntivo imperfetto. Impossible: congiuntivo trapassato. ' +
          'After se, you never use the condizionale.',
      },
    ],
  },

  // ── 2. PER-SKILL DRILL: passive voice deep-dive — si passivante focus ─────
  {
    slug: 'cap19-si-passivante-drill',
    title: 'Si vendono, si parla — the si passivante in real Italian',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'The si passivante is the most naturally Italian of the four passive tools — heard on the street, ' +
      'seen on every shop sign, and used constantly in journalism. This drill builds automatic control ' +
      'over verb agreement, pronoun placement, and the choice between si and essere.',
    objectiveSkillSlugs: ['it-passive-voice'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['culture', 'news', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why si sounds more Italian',
        prompt:
          'The essere passive is not wrong, but Italians reach for si in impersonal announcements, ' +
          'signs, and journalism. Compare: Qui vengono accettate le prenotazioni (essere passive) vs ' +
          'Qui si accettano le prenotazioni (si passivante). Both are correct; si is more natural in ' +
          'public-register Italian. The key rule: the verb agrees with the notional subject after si.',
        notes:
          'Use authentic signage examples (Si prega di non fumare, Si accettano carte) — learners ' +
          'often recognise the construction before they know its name.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Number agreement with si',
        prompt:
          'Complete with the correct form of the verb in brackets: ' +
          '"In questo mercato si ___ (vendere) frutta e verdura biologica." ' +
          '"Si ___ (parlare) solo italiano in classe."',
        exampleAnswer:
          'Si vendono frutta e verdura biologica (plural subject — frutta e verdura). ' +
          'Si parla solo italiano in classe (singular — italiano).',
        notes:
          'Juxtapose singular and plural in one task so the agreement rule is felt as a contrast, ' +
          'not an abstract rule.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Active to si passivante',
        prompt:
          'Rewrite using si: ' +
          '"In quest’ufficio accettano solo pagamenti in contanti." → "In quest’ufficio ___."',
        exampleAnswer: 'In quest’ufficio si accettano solo pagamenti in contanti.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Choose the right passive',
        prompt:
          'Which is more natural for a shop sign? ' +
          '(a) Qui vengono riparate le biciclette. ' +
          '(b) Qui si riparano le biciclette.',
        exampleAnswer:
          '(b) Qui si riparano le biciclette — the si passivante is the standard register for signs and ' +
          'public-facing announcements. (a) is grammatically correct but feels bureaucratic.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Si passivante in one rule',
        prompt:
          'Complete: In the si passivante, the verb agrees with ___, not with si. ' +
          'In compound tenses with si, the auxiliary is always ___.',
        exampleAnswer:
          'The verb agrees with the notional subject (what follows si). ' +
          'In compound tenses with si, the auxiliary is always essere (ci si è alzati, si è partiti).',
      },
    ],
  },

  // ── 3. PER-SKILL DRILL: causative fare + farsi scenarios ─────────────────
  {
    slug: 'cap19-fare-farsi-scenarios',
    title: 'Dal barbiere al notaio — causative fare in real life',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'Work through five real-life Italian service scenarios — the barber, the mechanic, the tailor, ' +
      'the notary, and the delivery — using causative fare and farsi with correct pronoun placement ' +
      'and double-object handling.',
    objectiveSkillSlugs: ['it-causative-fare'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['culture', 'business', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Causative in daily life',
        prompt:
          'Causative fare is the grammar of delegation: you arrange for someone else to act. ' +
          'The five key service contexts in Italian daily life are: the barbiere (haircut), ' +
          'the meccanico (car repair), the sarto/a (clothing alterations), the notaio (document ' +
          'signing), and the corriere (home delivery). All five use fare + infinitive; the reflexive ' +
          'farsi adds the idea that the action is done to or for yourself.',
        notes:
          'Ground each new sub-rule in one of the five scenarios so the grammar always carries ' +
          'a concrete, memorable image.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Scenario: the barber',
        prompt:
          'Translate: "I need to get my hair cut. I’m going to have it cut at the barber downtown." ' +
          '(Use farsi.)',
        exampleAnswer:
          'Ho bisogno di tagliarmi i capelli. Mi faccio tagliare i capelli dal barbiere in centro.',
        notes:
          'Point out that farsi uses essere in compound tenses — mi sono fatto/a tagliare — and that ' +
          'the article replaces the possessive with body parts (i capelli, not i miei capelli).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Scenario: two objects',
        prompt:
          'The notary is having the clients sign the contract. Complete: "Il notaio ___ firmare il contratto ___ clienti." (fa / ai)',
        exampleAnswer:
          'Il notaio fa firmare il contratto ai clienti. ' +
          '(Il contratto = direct object of firmare; ai clienti = caused agent, indirect because a direct object is already present.)',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Double pronoun with fare',
        prompt:
          'Replace both objects with pronouns: "Faccio consegnare il pacco al corriere." → ___',
        exampleAnswer:
          'Glielo faccio consegnare. (gli = al corriere; lo = il pacco; gli + lo → glielo before fare.)',
        notes:
          'This is the single hardest step — emphasise that the clitics cluster before fare, ' +
          'never between fare and the infinitive.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your delegation story',
        prompt:
          'Name two things you have had done by someone else recently — one with fare + agent, ' +
          'one with farsi. Use the passato prossimo where appropriate.',
        notes:
          'Personalise to plausible domestic or professional contexts for the learner. ' +
          'Accept structurally sound answers; coach essere as the farsi auxiliary.',
      },
    ],
  },

  // ── 4. PER-SKILL DRILL: lasciare & perception verbs ──────────────────────
  {
    slug: 'cap19-lasciare-perception-drill',
    title: 'Ho sentito suonare — lasciare and the senses',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'Drill lasciare + infinitive for permission and vedere / sentire / guardare / ascoltare + ' +
      'infinitive for perception. Master clitic placement and past-participle agreement so these ' +
      'structures flow without hesitation.',
    objectiveSkillSlugs: ['it-lasciare-perception-verbs'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['culture', 'film', 'music', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Allow vs perceive',
        prompt:
          'Lasciare + infinitive means "to let / allow someone to do something": Lascialo parlare. ' +
          'Perception verbs (vedere, sentire, guardare, ascoltare) + infinitive mean "see / hear / ' +
          'watch / listen to someone doing something": Ho visto entrare qualcuno. ' +
          'In both patterns the clitic precedes the conjugated verb. In compound tenses with avere, ' +
          'the participle agrees with a preceding direct-object clitic: L’ho vista uscire.',
        notes:
          'Keep the contrast between fare (causative — you make it happen) and lasciare (permissive — ' +
          'you allow it to happen) explicit from the start.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Lasciare + clitic',
        prompt:
          'Insert the correct clitic and form of lasciare: "___ (loro / not let) ___ (me) parlare in riunione."',
        exampleAnswer: 'Non mi lasciano parlare in riunione.',
        notes: 'Mi precedes lasciano; the infinitive follows immediately after.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Perception verb + agreement',
        prompt:
          'Translate: "I saw them (two women) come out of the gallery." ' +
          '(Use vedere in the passato prossimo.)',
        exampleAnswer:
          'Le ho viste uscire dalla galleria. (Le = direct object clitic, f pl; viste agrees with le.)',
        notes:
          'Agreement of the participle with the preceding clitic is subtle but important — this is ' +
          'the mark of careful native speech.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Gerund mistake',
        prompt: 'Correct: "Ho sentito qualcuno cantando fuori dalla finestra."',
        exampleAnswer:
          'Ho sentito qualcuno cantare fuori dalla finestra. ' +
          '(After sentire the complement is an infinitive, not a gerund.)',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'What did you see / hear today?',
        prompt:
          'Describe something you saw or heard someone doing today or recently, using a perception ' +
          'verb + infinitive in the passato prossimo. Then say one thing you let someone else do. ' +
          'Use at least one clitic correctly.',
        notes:
          'Music, sport, and family contexts work well here — personalise to the learner’s interests.',
      },
    ],
  },

  // ── 5. PER-SKILL DRILL: article-use precision ────────────────────────────
  {
    slug: 'cap19-article-precision-drill',
    title: 'L’italiano, il lunedì, le mani — article-use precision',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'Target the six idiomatic article rules that trip up even advanced learners: abstract nouns, ' +
      'languages, body parts and clothing, habitual days, countries, and titles. Each sub-rule gets ' +
      'its own contrast exercise.',
    objectiveSkillSlugs: ['it-article-uses'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['culture', 'family', 'travel', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Six rules, one lesson',
        prompt:
          'The definite article in Italian does not work the way English "the" works. Six rules to fix: ' +
          '(1) Abstract/generic nouns always take the article. ' +
          '(2) Languages: article after studiare/imparare, none after parlare. ' +
          '(3) Body parts + clothing: article replaces the possessive. ' +
          '(4) Habitual days: il lunedì, la domenica. ' +
          '(5) Countries + regions + large islands: l’Italia, la Toscana, la Sicilia. ' +
          '(6) Titles in 3rd person: il dottor Ricci; no article in direct address.',
        notes:
          'Each sub-rule should get a single vivid mnemonic example. Body parts (mi lavo le mani) ' +
          'and languages (parlo italiano vs studio l’italiano) are the highest-frequency errors.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Abstract nouns',
        prompt:
          'Insert the article where required: "___ coraggio è necessario per ammettere i propri errori. ' +
          '___ vita è bella." ',
        exampleAnswer:
          'Il coraggio è necessario per ammettere i propri errori. La vita è bella. ' +
          '(Both are generic abstract nouns used as general concepts — article required.)',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Language article rule',
        prompt:
          'Which is correct? (a) "Parlo l’italiano fluentemente." (b) "Parlo italiano fluentemente."',
        exampleAnswer:
          '(b) Parlo italiano fluentemente. After parlare in a neutral context the article is dropped. ' +
          '(a) is not wrong but sounds stilted; (b) is the natural everyday form.',
        notes:
          'The subtle register difference (studio l’italiano = deliberate study relationship; ' +
          'parlo italiano = neutral ability) is worth flagging for C1-level learners.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Body parts and clothing',
        prompt:
          'Complete without using a possessive: "Si è messa ___ (sciarpa). Mi fa male ___ (testa)."',
        exampleAnswer:
          'Si è messa la sciarpa. Mi fa male la testa. ' +
          '(Article replaces the possessive; reflexive verb signals whose scarf / head.)',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Three article errors in one paragraph',
        prompt:
          'Correct all errors: "Mio fratello studia medicina. Lunedì ha lezione di biologia e ' +
          'martedì va in Italia del Sud. Parla il francese e l’inglese con i colleghi."',
        exampleAnswer:
          'Mio fratello studia medicina. Il lunedì ha lezione di biologia e il martedì va nell’Italia del Sud (or: nel Sud Italia). ' +
          'Parla francese e inglese con i colleghi. ' +
          '(Habitual days need the article; languages after parlare drop it.)',
        notes:
          'This task bundles three sub-rules. Accept corrections that fix all three; give partial credit ' +
          'and explain any missed.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Article rules at a glance',
        prompt:
          'Complete: After parlare + language you ___ the article. ' +
          'With body parts you use ___ instead of a possessive. ' +
          'To say "on Mondays" in Italian you say ___.',
        exampleAnswer:
          'Drop the article. You use the definite article (la testa, le mani). You say il lunedì.',
      },
    ],
  },

  // ── 6. ERROR-CORRECTION CLINIC ───────────────────────────────────────────
  {
    slug: 'cap19-error-clinic',
    title: 'Error clinic: condizionale dopo se, passive auxiliary, article omission',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'The three most persistent advanced-level errors in Italian writing and speech: using the ' +
      'condizionale directly after se, choosing the wrong passive auxiliary, and dropping the article ' +
      'where Italian requires it. Fix a set of realistic bad sentences and internalise why each is wrong.',
    objectiveSkillSlugs: ['it-hypotheticals', 'it-passive-voice', 'it-article-uses'],
    defaultDurationMinutes: 13,
    compatibleThemes: ['culture', 'news', 'business', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The three recurring errors',
        prompt:
          'Error 1 — Condizionale after se. "Se vorrei venire" is always wrong; the se-clause ' +
          'requires the indicativo (real) or the congiuntivo (possible/impossible). ' +
          'Error 2 — Wrong passive auxiliary. Venire cannot appear in compound tenses; ' +
          'andare means obligation, not simple past fact. ' +
          'Error 3 — Article omission. Italian requires the article with abstract/generic nouns, ' +
          'habitual days, and titles in the third person.',
        notes:
          'Frame this as a clinic, not a test. The learner is the diagnostician — emphasise ' +
          'understanding why each sentence is wrong, not just what the fix is.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Condizionale dopo se',
        prompt:
          'Correct: "Se vorrei avere più esperienza, chiederei quel lavoro." ' +
          'Why is it wrong? What is the corrected sentence?',
        exampleAnswer:
          'Se volessi avere più esperienza, chiederei quel lavoro. ' +
          '(Vorrei is the condizionale — it cannot follow se. Volessi is the congiuntivo imperfetto, required for the possible conditional.)',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong passive auxiliary — venire in compound tense',
        prompt: 'Correct: "Il documento è venuto approvato dal consiglio ieri."',
        exampleAnswer:
          'Il documento è stato approvato dal consiglio ieri. ' +
          '(Venire can only replace essere in simple tenses — passato prossimo requires essere.)',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong passive auxiliary — andare vs essere',
        prompt:
          'Are these sentences equivalent? (a) "Il modulo è compilato ogni anno da tutti." ' +
          '(b) "Il modulo va compilato ogni anno da tutti."',
        exampleAnswer:
          'No. (a) is a plain essere passive: the form is filled (by everyone each year — a description). ' +
          '(b) uses andare, which expresses obligation: the form must be filled by everyone each year. ' +
          'The meaning shifts from description to requirement.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Article omission — three errors',
        prompt:
          'Correct all article errors: "Professore Gentile arriva mercoledì e giovedì. ' +
          'Studia filosofia e sostiene che libertà è il valore più importante."',
        exampleAnswer:
          'Il professore Gentile arriva il mercoledì e il giovedì. ' +
          'Studia la filosofia (or: studia filosofia — both possible with the academic discipline) e sostiene che la libertà è il valore più importante. ' +
          '(Title in 3rd person: il professore. Habitual days: il mercoledì, il giovedì. Abstract noun as a general concept: la libertà.)',
        notes:
          'La filosofia after studiare follows the abstract-noun rule; note that without the article ' +
          'it reads more like "he studies philosophy as a field" — both are used by native speakers.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Your error profile',
        prompt:
          'Of the three error types covered today — condizionale after se, passive auxiliary, ' +
          'article omission — which one is most likely to catch you off guard? ' +
          'What one strategy will you use to remember the rule?',
        notes:
          'Metacognitive close. Use the learner’s answer to personalise the next review session.',
      },
    ],
  },

  // ── 7. SCENARIO ROLEPLAY: haircut and car service with causative fare ─────
  {
    slug: 'cap19-roleplay-errands',
    title: 'Commissioni in città — getting things done with fare',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'Two real-life service scenarios back to back: booking a haircut and dropping the car off for ' +
      'service. Use causative fare and farsi naturally in conversation, handle the double-object ' +
      'pronoun, and describe the results with the passive.',
    objectiveSkillSlugs: ['it-causative-fare', 'it-passive-voice'],
    defaultDurationMinutes: 14,
    compatibleThemes: ['culture', 'business', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Scene-setting',
        prompt:
          'Two errands, one afternoon. First: you call the barbiere to book an appointment and ' +
          'explain what you want done. Then: you drop your car off at the meccanico and ask for ' +
          'a specific repair. Both scenarios require causative fare and the vocabulary of Italian ' +
          'service culture.',
        notes:
          'Personalise the car and hair details to what the learner has mentioned before. ' +
          'Wise plays both the barber and the mechanic.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Booking the haircut',
        prompt:
          'Chiami il barbiere. Digli che vuoi farti tagliare i capelli e che vuoi anche farti fare ' +
          'la barba. Usa farsi due volte.',
        exampleAnswer:
          'Buongiorno, vorrei prendere un appuntamento. Vorrei farmi tagliare i capelli e, ' +
          'se possibile, farmi anche fare la barba.',
        notes:
          'Coach the use of farsi with both haircut and shave — two different infinitives in ' +
          'sequence. This is natural spoken Italian.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'At the mechanic',
        prompt:
          'Porta la macchina dal meccanico. Digli di controllarle i freni e di cambiare l’olio. ' +
          'Usa fare + infinitive + agent (dal meccanico).',
        exampleAnswer:
          'Buongiorno, vorrei far controllare i freni e far cambiare l’olio. ' +
          'Quando pensa che sarà pronta?',
        notes:
          'The two consecutive fare + infinitive phrases are the target structure. ' +
          'Note that the agent dal meccanico is often omitted in context — it is understood.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Report with the passive',
        prompt:
          'Later you tell a friend: "The brakes were checked and the oil was changed. ' +
          'Now everything has been fixed." Use the essere passive and si passivante.',
        exampleAnswer:
          'I freni sono stati controllati e l’olio è stato cambiato. Ora si è sistemato tutto.',
        notes:
          'Push learners to switch naturally from essere passive (specific past event) to ' +
          'si passivante (general result state) in the same paragraph.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Double pronoun wrap-up',
        prompt:
          'Il meccanico ti dice che non ha ancora riparato i fari. Rispondi dicendogli di farlo ' +
          'adesso — usa un pronome doppio.',
        exampleAnswer: 'Glielo faccia fare adesso, per favore.',
        notes:
          'This surfaces the double pronoun with fare in a polite imperative context — ' +
          'Le lo → Glielo (formal address). Accept gli + lo → glielo in informal register too.',
      },
    ],
  },

  // ── 8. LISTENING CHALLENGE ────────────────────────────────────────────────
  {
    slug: 'cap19-listening-native-exchange',
    title: 'Orecchio avanzato — a fluent native exchange',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.advanced,
    summary:
      'A realistic, unscripted-feeling dialogue between two Italian friends discussing a life decision — ' +
      'packed with natural conditionals, si passivante, and futuro anteriore. Train your ear to catch ' +
      'these advanced structures in fast, connected speech.',
    objectiveSkillSlugs: ['it-hypotheticals', 'it-future-perfect', 'it-passive-voice'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['culture', 'news', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'You will hear a conversation between two friends. Chiara is deciding whether to accept ' +
          'a job offer in another city. Marco asks questions and offers opinions. ' +
          'Focus on three structures: any conditional clauses, any use of si passivante, ' +
          'and any futuro anteriore. Note them as you listen.',
        notes:
          'Engine generates a 6–8 line authentic-register dialogue. Suggested content: ' +
          '"Se accettassi, cosa faresti con l’appartamento?" — "Lo affitterei, credo." — ' +
          '"Si dice che la città sia bellissima. Quando avrai deciso, fammi sapere." ' +
          'Deliver at natural spoken pace without pausing.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Gist: what is Chiara deciding?',
        prompt: 'What life decision is Chiara facing? What is her main hesitation?',
        notes:
          'Open-answer; accept any accurate summary. The gist question confirms basic comprehension ' +
          'before the structural focus tasks.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Catch the conditional type',
        prompt:
          'Marco says: "Se fossi in te, accetterei subito." Which type of conditional is this? ' +
          '(a) Real  (b) Possible  (c) Impossible',
        exampleAnswer:
          '(b) Possible — Se fossi (congiuntivo imperfetto) + accetterei (condizionale presente). ' +
          'Marco is imagining himself in Chiara’s position — hypothetical, not impossible.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Spot the si passivante',
        prompt:
          'Repeat the sentence containing si passivante that you heard. What is the notional ' +
          'subject? Does the verb agree correctly?',
        exampleAnswer:
          'Si dice che la città sia bellissima — si dice is impersonal (the "notional subject" is ' +
          'an implied general people), so the verb stays singular. Correct.',
        notes:
          'If the engine generates a different si passivante, the answer should reference that line. ' +
          'The task teaches learners to listen for agreement rather than just recognise si.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Listening strategy',
        prompt:
          'Which structure was hardest to catch at natural speed — the conditional, the si passivante, ' +
          'or the futuro anteriore? What would help you catch it more reliably next time?',
        notes:
          'Metacognitive close. The answer informs whether the engine should slow delivery speed ' +
          'in future listening tasks or increase the ratio of that structure.',
      },
    ],
  },

  // ── 9. SPEAKING CHALLENGE: dream + regret using all three conditionals ────
  {
    slug: 'cap19-speaking-dream-regret',
    title: 'Il sogno e il rimpianto — all three conditionals in one speech',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.advanced,
    summary:
      'The most expressive of the appendix challenges: articulate a real-life aspiration using the ' +
      'possible conditional, a fact about your present using the real conditional, and a genuine regret ' +
      'using the impossible conditional — all in connected, fluent Italian.',
    objectiveSkillSlugs: ['it-hypotheticals'],
    defaultDurationMinutes: 14,
    compatibleThemes: ['culture', 'travel', 'history', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The speaking goal',
        prompt:
          'Today you will speak for two to three minutes about your Italian life journey — the real ' +
          'conditions that shape your day, the hypothetical dreams you carry, and at least one regret ' +
          'about the past. You will move naturally between all three conditional types. Wise will coach ' +
          'you on tense accuracy and fluency, not on content — there are no wrong answers about your life.',
        notes:
          'This is a high-autonomy task. Prompt the learner to think for thirty seconds before ' +
          'speaking. Resist the urge to fill silence — the value is in the learner’s own words.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'The real condition',
        prompt:
          'Begin with something currently true about your Italian-learning life: "Se continuo così…" ' +
          'or "Se studio ogni giorno…" Use the real conditional (presente → futuro).',
        exampleAnswer:
          'Se continuo a studiare ogni giorno, tra un anno parlerò l’italiano senza esitare.',
        notes:
          'Accept any real-type conditional. Coach the futuro semplice in the result clause — ' +
          'many learners use the presente, which is also acceptable but less precise.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'The possible dream',
        prompt:
          'Now share a genuine hypothetical aspiration — something you would do if your circumstances ' +
          'were different. Use "Se potessi…" or "Se avessi…" with the congiuntivo imperfetto.',
        exampleAnswer:
          'Se potessi smettere di lavorare per un anno, andrei a vivere a Napoli e imparerei ' +
          'il dialetto napoletano.',
        notes:
          'The congiuntivo imperfetto is the key coaching point. Help the learner with the form of ' +
          'potessi / avessi / fossi before speaking if needed.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'The impossible regret',
        prompt:
          'Finally, share one genuine regret — something you wish had gone differently. ' +
          'Use "Se avessi…" or "Se fossi…" with the congiuntivo trapassato + condizionale passato.',
        exampleAnswer:
          'Se avessi iniziato a studiare l’italiano vent’anni fa, oggi lo parlerei come una madrelingua.',
        notes:
          'This is the hardest tense combination. If the learner struggles, offer the frame: ' +
          '"Se avessi [participio passato]…, [condizionale passato]…" and let them fill in the meaning.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Connecting the three',
        prompt:
          'Look back at the three sentences you produced. Which tense pair — real, possible, or ' +
          'impossible — felt most natural? Which felt most forced? What does that tell you about ' +
          'where to focus your next practice session?',
        notes:
          'This reflection closes the lesson and gives the engine a signal about which conditional ' +
          'type needs more reinforcement.',
      },
    ],
  },

  // ── 10. REVIEW LESSON ────────────────────────────────────────────────────
  {
    slug: 'cap19-appendix-review',
    title: 'Strutture avanzate — revision tour',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.advanced,
    summary:
      'A complete revisit of all six appendix structures in a single mixed lesson: conditionals, ' +
      'passive voice, causative fare, future perfect, lasciare and perception verbs, and article ' +
      'precision. One well-chosen task per skill, then a self-assessment close.',
    objectiveSkillSlugs: [
      'it-hypotheticals',
      'it-passive-voice',
      'it-causative-fare',
      'it-future-perfect',
      'it-lasciare-perception-verbs',
      'it-article-uses',
    ],
    defaultDurationMinutes: 16,
    compatibleThemes: ['culture', 'travel', 'business', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Six in six',
        prompt:
          'One task for each of the six structures you have studied. This is a confidence check, ' +
          'not new teaching — the goal is to surface which structures feel solid and which still ' +
          'need attention.',
        notes:
          'Keep the pace brisk. The engine should not re-explain structures unless the learner ' +
          'explicitly asks; this is a recall session.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Review: conditional',
        prompt:
          'Complete: "Se ___ (io / sapere) che arrivavi, ___ (io / preparare) la cena." ' +
          'Which type is it?',
        exampleAnswer:
          'Se avessi saputo che arrivavi, avrei preparato la cena. Impossible (past regret).',
      },
      {
        taskType: TaskType.translation,
        focus: 'Review: passive',
        prompt:
          'Translate using si passivante: "Only cash is accepted here." ' +
          'Then rewrite using the essere passive with da.',
        exampleAnswer:
          'Si accettano solo contanti qui. / Solo contanti vengono accettati qui (or: Solo contanti sono accettati qui).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Review: causative fare',
        prompt: 'Complete: "Mi ___ (fare / passato prossimo) consegnare i documenti a domicilio."',
        exampleAnswer:
          'Mi sono fatto/a consegnare i documenti a domicilio. ' +
          '(Farsi in the passato prossimo uses essere as auxiliary.)',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Review: futuro anteriore',
        prompt:
          'Choose the correct tense: "Quando ___ (tu / leggere) questa lettera, io sarò già a Londra." ' +
          '(a) hai letto  (b) leggerai  (c) avrai letto',
        exampleAnswer:
          '(c) avrai letto — futuro anteriore in the quando-clause signals that the reading ' +
          'will be completed before the speaker arrives in London.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Review: lasciare + perception verb',
        prompt:
          'Correct: "Ho sentito Marco cantando la sua canzone preferita." ' +
          'Also correct: "Lascia parlando tuo fratello — non interromperlo."',
        exampleAnswer:
          'Ho sentito Marco cantare la sua canzone preferita. (Infinitive, not gerund, after sentire.) ' +
          'Lascia parlare tuo fratello — non interromperlo. (Infinitive, not gerund, after lasciare.)',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Traffic-light self-assessment',
        prompt:
          'Rate each structure green (confident), amber (mostly there), or red (needs work): ' +
          'conditionals / passive / causative fare / future perfect / lasciare + perception / articles.',
        notes:
          'The self-assessment drives the engine’s adaptive scheduling — red structures get a ' +
          'higher probability of appearing in the next daily mission.',
      },
    ],
  },

  // ── 11. PROGRESS CHECK ───────────────────────────────────────────────────
  {
    slug: 'cap19-progress-check',
    title: 'Advanced appendix — chapter checkpoint',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.advanced,
    summary:
      'A comprehensive but concise checkpoint covering all six appendix skills with a mix of task types. ' +
      'Shows you and the engine exactly where you stand on the full range of advanced Italian structures.',
    objectiveSkillSlugs: [
      'it-hypotheticals',
      'it-passive-voice',
      'it-causative-fare',
      'it-future-perfect',
      'it-lasciare-perception-verbs',
      'it-article-uses',
    ],
    defaultDurationMinutes: 15,
    compatibleThemes: ['culture', 'business', 'news', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What this measures',
        prompt:
          'This checkpoint covers every skill in the Advanced Appendix. No new teaching — just a clear ' +
          'look at where you are. Approach it calmly; any gaps will become tomorrow’s practice.',
        notes:
          'Results feed directly into the engine’s spaced-repetition queue. ' +
          'All six skills should be assessed at roughly equal weight.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Conditional type',
        prompt:
          'Which sentence expresses an IMPOSSIBLE past condition? ' +
          '(a) Se piove, resto a casa. ' +
          '(b) Se potessi, vivrei in Sicilia. ' +
          '(c) Se avessi accettato quell’offerta, sarei ora a Londra.',
        exampleAnswer:
          '(c) — congiuntivo trapassato (avessi accettato) + condizionale passato (sarei) = impossible past.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Passive auxiliary',
        prompt:
          'Complete with the most natural passive form: ' +
          '"Le finestre ___ (lavare) ogni primavera dal custode." (Use venire.) ' +
          '"Il contratto ___ (firmare) ieri." (Use essere.)',
        exampleAnswer:
          'Le finestre vengono lavate ogni primavera dal custode. ' +
          'Il contratto è stato firmato ieri.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Causative fare',
        prompt: 'Translate: "We had the kitchen renovated by a local craftsman."',
        exampleAnswer: 'Abbiamo fatto ristrutturare la cucina da un artigiano locale.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Futuro anteriore vs futuro semplice',
        prompt:
          'Choose: "Non ha ancora risposto — (perdere) il telefono." ' +
          '(a) perderà  (b) avrà perso',
        exampleAnswer:
          '(b) Avrà perso il telefono — futuro anteriore for probability about a completed past action ' +
          '(the losing happened before now).',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Perception verb + article',
        prompt:
          'Correct: "Ho visto entrando il mio vicino nel palazzo. Parla l’italiano ogni giorno con i colleghi."',
        exampleAnswer:
          'Ho visto entrare il mio vicino nel palazzo. (Infinitive, not gerund, after vedere.) ' +
          'Parla italiano ogni giorno con i colleghi. (No article after parlare in a neutral context.)',
      },
      {
        taskType: TaskType.reflection,
        focus: 'After the checkpoint',
        prompt:
          'Which skill do you feel best about after completing the appendix? ' +
          'Which one will you return to first in your next session?',
        notes:
          'Learner’s reflection is stored and used to open the next daily mission with a ' +
          'targeted warm-up on the self-identified weak skill.',
      },
    ],
  },
];

export default { unitCode, lessons };
