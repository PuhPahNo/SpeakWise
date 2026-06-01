// Additional lesson templates for Capitolo 17 — Il mondo del lavoro.
//
// These EXTEND the five templates authored inline in units/cap-17-mondo-del-lavoro.ts
// (the index merges both). Slugs are prefixed cap17- and must not collide with the
// inline set: cap17-subjunctive-conjunctions, cap17-subjunctive-other-uses,
// cap17-subjunctive-vs-infinitive, cap17-job-interview, cap17-tech-email.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); enums are valid; skill slugs come from cap-17 or earlier.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-17';

const lessons: SeedLessonTemplate[] = [
  // ─── 1. Per-skill drill — subjunctive conjunctions ───────────────────────
  {
    slug: 'cap17-drill-congiuntivo-conjunctions',
    title: 'Conjunction boot camp: benché, purché, a meno che',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A tight, fast-paced drill on the most common subjunctive-triggering conjunctions in ' +
      'professional Italian — with a focus on the three that trip up advanced learners most: ' +
      'benché (concessive), purché (conditional), and a meno che (non) (negative-conditional).',
    objectiveSkillSlugs: ['it-congiuntivo-conjunctions'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['business', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three conjunctions, three jobs',
        prompt:
          'Benché = "although / even though" (concessive). Purché = "provided that / as long as" (conditional). A meno che (non) = "unless" (negative-conditional). All three always take the congiuntivo — no exceptions, no matter how obvious the meaning.',
        notes:
          'Keep the framing compact. Learners at this level benefit from a crisp rule statement before the drills begin.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'benché — concessive',
        prompt:
          'Complete with the correct congiuntivo form: "Hanno offerto il posto a Giulia, benché lei non ___ (avere) esperienza diretta nel settore."',
        exampleAnswer: 'benché lei non abbia esperienza diretta nel settore.',
        notes:
          'Contrast with anche se: "anche se lei non ha esperienza" is colloquially equivalent but takes the indicative.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'purché — conditional',
        prompt:
          'Complete: "Ti autorizzo a usare il budget extra, purché tu ___ (presentare) un rendiconto dettagliato entro venerdì."',
        exampleAnswer: 'purché tu presenti un rendiconto dettagliato entro venerdì.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'a meno che (non) — negative-conditional',
        prompt:
          'Complete: "Non prolunghiamo la riunione, a meno che non ___ (emergere) nuove questioni urgenti."',
        exampleAnswer: 'a meno che non emergano nuove questioni urgenti.',
        notes:
          'Remind learners that the pleonastic non after a meno che is standard in written Italian.',
      },
      {
        taskType: TaskType.translation,
        focus: 'All three in one passage',
        prompt:
          'Translate: "Although the budget is tight, we can hire a developer, provided that the project timeline does not change, unless the client requests extra features."',
        exampleAnswer:
          'Benché il budget sia ridotto, possiamo assumere uno sviluppatore, purché la scadenza del progetto non cambi, a meno che il cliente non richieda funzionalità aggiuntive.',
        notes:
          'Encourage a natural rendering rather than a word-for-word match — the Italian structure differs from English.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Anchor the rule',
        prompt:
          'Without looking back: what is the key difference between benché + congiuntivo and anche se + indicativo?',
      },
    ],
  },

  // ─── 2. Per-skill drill — subjunctive after superlative / indefinite ─────
  {
    slug: 'cap17-drill-superlative-indefinite',
    title: 'Il migliore che io conosca — subjunctive after superlatives and indefinite antecedents',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'Targeted practice on two structural triggers that are easily missed: the relative clause ' +
      'after a superlative adjective and the relative clause after an indefinite or negative ' +
      'antecedent — both obligatorily take the subjunctive in standard Italian.',
    objectiveSkillSlugs: ['it-congiuntivo-other-uses', 'it-superlatives'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['business', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Why these two contexts demand the subjunctive',
        prompt:
          'After a relative superlative, the following clause expresses a subjective judgement — hence the subjunctive: "il candidato più valido che abbia incontrato." After an indefinite or negative antecedent, the noun being described either does not yet exist or is hypothetical — so the subjunctive signals that uncertainty: "cerco qualcuno che sappia programmare."',
        notes:
          'Draw the contrast sharply: "Ho trovato un programmatore che sa Python" (exists → indicative) vs "Cerco un programmatore che sappia Python" (hypothetical → subjunctive).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Real person vs hypothetical person',
        prompt:
          'Which form is correct? (A) "Abbiamo assunto un ingegnere che conosce il sistema." (B) "Stiamo cercando un ingegnere che conosca il sistema."',
        exampleAnswer:
          'Both are correct in their own context: (A) uses the indicative because the engineer has been hired and exists; (B) uses the subjunctive because the engineer is still hypothetical.',
        notes:
          'This is the conceptual core — existence vs hypotheticality. Return to it when correcting errors.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Relative superlative — congiuntivo passato',
        prompt:
          'Complete: "È la presentazione più efficace che il team ___ (preparare, congiuntivo passato) in tutto l’anno."',
        exampleAnswer: 'che il team abbia preparato in tutto l’anno.',
        notes:
          'After a superlative, the congiuntivo passato is typical when the comparison reaches back into completed events.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Negative antecedent — nessuno/nessuna',
        prompt:
          'Complete: "Non c’è nessun software che ___ (risolvere) tutti i problemi di comunicazione aziendale."',
        exampleAnswer: 'che risolva tutti i problemi di comunicazione aziendale.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe your ideal colleague or tool',
        prompt:
          'Use the indefinite-antecedent pattern to describe something or someone you’re looking for professionally: a tool, a colleague, or a course. Use at least two subjunctive relative clauses.',
        exampleAnswer:
          'Cerco un corso di formazione che non duri più di tre mesi e che offra un certificato riconosciuto. Vorrei anche uno strumento che mi permetta di gestire le riunioni da remoto senza problemi di connessione.',
        notes:
          'Personalise to the learner’s field and goals. This prompt produces highly memorable output.',
      },
    ],
  },

  // ─── 3. Per-skill drill — chiunque / qualunque / dovunque / comunque ──────
  {
    slug: 'cap17-drill-chiunque-qualunque',
    title: 'Chiunque, qualunque, dovunque — the wild-card subjunctive pronouns',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'Four Italian "generalisers" — chiunque, qualunque / qualsiasi, dovunque, and comunque — ' +
      'always govern the subjunctive. This drill builds fluency with the full set through a ' +
      'series of workplace and professional-life prompts.',
    objectiveSkillSlugs: ['it-congiuntivo-other-uses'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['business', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The four wild-cards',
        prompt:
          'Chiunque (whoever / anyone who), qualunque / qualsiasi (whatever / any — + noun), dovunque (wherever), comunque (however / no matter how). All four always take the congiuntivo. Think of them as built-in subjunctive triggers: once you see one, the congiuntivo follows automatically.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'chiunque',
        prompt:
          'Complete: "Chiunque ___ (volere) candidarsi a questa posizione deve allegare tre referenze scritte."',
        exampleAnswer: 'Chiunque voglia candidarsi a questa posizione.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'qualunque',
        prompt:
          'Complete: "Qualunque decisione il consiglio di amministrazione ___ (prendere), la informeremo entro 24 ore."',
        exampleAnswer: 'Qualunque decisione il consiglio di amministrazione prenda.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'dovunque e comunque',
        prompt:
          'Complete both: "Dovunque tu ___ (lavorare), le competenze digitali sono ormai indispensabili. Comunque ___ (andare) le trattative, manteniamo un tono professionale."',
        exampleAnswer: 'Dovunque tu lavori; Comunque vadano le trattative.',
        notes:
          'Note that comunque requires the congiuntivo even when no explicit subject is stated.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce in a business context',
        prompt:
          'Translate: "Whoever gets hired will need to complete an onboarding week, wherever the position is based."',
        exampleAnswer:
          'Chiunque venga assunto dovrà completare una settimana di orientamento, dovunque si trovi la sede del ruolo.',
      },
    ],
  },

  // ─── 4. Per-skill drill — same-subject vs different-subject test ─────────
  {
    slug: 'cap17-drill-same-different-subject',
    title: 'Di + infinito o che + congiuntivo? The subject test, drilled',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'The same-subject test in rapid-fire mode: twenty sentence pairs that force the learner ' +
      'to judge whether subjects match — and produce the correct structure automatically. ' +
      'Professional contexts throughout.',
    objectiveSkillSlugs: ['it-congiuntivo-vs-infinito'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['business', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'One question decides everything',
        prompt:
          'Before choosing di + infinito or che + congiuntivo, ask: "Are both verbs performed by the same person?" If yes → di + infinito. If no → che + congiuntivo. This rule is invariable.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'sperare — same vs different',
        prompt:
          'Choose the correct structure: (1) "Spero ___ ottenere un aumento entro fine anno." (2) "Il direttore spera ___ il team finisca il progetto in anticipo."',
        exampleAnswer:
          '(1) Spero di ottenere (same subject — I hope, I get). (2) Il direttore spera che il team finisca (different subjects — the director hopes, the team finishes).',
        notes:
          'Sperare is the most drilled verb for this rule because many learners default to "spero che io…" (wrong for same subject).',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'credere, temere, pensare',
        prompt:
          'Decide for each: (1) "Credo ___ capire il contratto." (2) "Teme ___ il cliente non rinnovi l’abbonamento." (3) "Penso ___ candidarmi per quel ruolo."',
        exampleAnswer:
          '(1) di capire (same: I believe, I understand). (2) che il cliente non rinnovi (different: she fears, the client renews). (3) di candidarmi (same: I think, I apply).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'prima di vs prima che',
        prompt:
          'Complete: (1) "Vuole rivedere il budget ___ presentarlo al consiglio." (2) "La HR vuole approvare il profilo ___ il responsabile convochi il colloquio."',
        exampleAnswer:
          '(1) prima di presentarlo (same subject). (2) prima che il responsabile convochi il colloquio (different subjects).',
        notes:
          'prima di / prima che is the most frequent real-world application of the subject test.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Apply it freely',
        prompt:
          'Produce three sentences about professional goals or workplace situations. Each must use a different verb (sperare, pensare, credere, temere, volere) and alternate between di + infinito and che + congiuntivo.',
        notes:
          'Personalise to the learner’s work context. Reward any sentence where the subject-test is correctly applied, regardless of vocabulary choices.',
      },
    ],
  },

  // ─── 5. Error-correction clinic ──────────────────────────────────────────
  {
    slug: 'cap17-clinic-subjunctive-errors',
    title: 'Subjunctive error clinic: three classic slip-ups',
    lessonType: LessonType.grammar,
    level: CEFRLevel.advanced,
    summary:
      'A targeted correction clinic on the three most common advanced errors with the ' +
      'congiuntivo: using the indicative after benché, making the wrong same-subject choice, ' +
      'and forgetting the subjunctive after cerco qualcuno che. Seeing and fixing real errors ' +
      'is the fastest path to internalising the rule.',
    objectiveSkillSlugs: [
      'it-congiuntivo-conjunctions',
      'it-congiuntivo-other-uses',
      'it-congiuntivo-vs-infinito',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['business', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Frame the clinic',
        prompt:
          'Each of the next three items contains a real error that advanced learners make. Your job is to find it, name the rule being broken, and produce the corrected sentence.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Indicative after benché',
        prompt:
          'Find and fix the error: "Benché l’azienda ha aumentato il budget, il progetto è ancora in ritardo."',
        exampleAnswer:
          'Benché l’azienda abbia aumentato il budget, il progetto è ancora in ritardo.',
        notes:
          'The rule: benché is a concessive conjunction and ALWAYS introduces a congiuntivo clause. The indicative ha aumentato is the classic slip. Note also that the congiuntivo passato (abbia aumentato) is correct here because the action is completed.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong same-subject choice (che + congiuntivo with identical subject)',
        prompt: 'Find and fix: "Penso che io debba aggiornare il curriculum prima del colloquio."',
        exampleAnswer: 'Penso di dover aggiornare il curriculum prima del colloquio.',
        notes:
          'The rule: when the subjects of pensare and the dependent verb are the same (both "I"), use pensare di + infinito. "Penso che io…" with an explicit identical subject is ungrammatical in standard Italian.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Indicative after cerco qualcuno che (indefinite antecedent)',
        prompt:
          'Find and fix: "Cerco un collaboratore che può gestire i clienti internazionali in autonomia."',
        exampleAnswer:
          'Cerco un collaboratore che possa gestire i clienti internazionali in autonomia.',
        notes:
          'The rule: cerco un X che… — because the X does not yet exist (indefinite antecedent), the relative clause uses the congiuntivo. The indicative può is used only when a specific, identified person is being described.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Produce all three structures cleanly',
        prompt:
          'Make one original sentence for each pattern: (1) benché + congiuntivo, (2) sperare di + infinito (same subject), (3) cercare qualcuno che + congiuntivo. Set them in a professional context.',
        notes: 'This is a consolidation prompt — reward clean grammar above all else.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Diagnose the errors yourself',
        prompt:
          'Looking back at the three errors in this lesson: what single question helps you catch each one before speaking?',
      },
    ],
  },

  // ─── 6. Scenario roleplay — job interview with conjunctions ──────────────
  {
    slug: 'cap17-roleplay-remote-negotiation',
    title: 'Trattativa smart working — negotiating your remote-work arrangement',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'You have received a job offer but want to negotiate a partly-remote arrangement. ' +
      'In this three-way conversation with HR and your future manager, you make your case ' +
      'using subjunctive conjunctions to state conditions, concede concerns, and draw boundaries.',
    objectiveSkillSlugs: [
      'it-congiuntivo-conjunctions',
      'it-congiuntivo-vs-infinito',
      'it-vocab-work',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['business', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’ve just received a written offer from a Milan-based consultancy. Salary is fair, but the contract says five days in the office. You want two days remote. HR has called you. Ready?',
        notes: 'Personalise the job title and sector if the learner has shared their profession.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Open the negotiation',
        prompt:
          'HR opens: "Abbiamo ricevuto la sua risposta positiva all’offerta. Ha delle domande prima di firmare?" Make your request for remote working, using purché or a condizione che to show you’re flexible.',
        exampleAnswer:
          'Grazie per l’offerta — sono molto interessato alla posizione. Sarei felice di firmare, purché si possa discutere la possibilità di lavorare due giorni alla settimana da remoto.',
        notes:
          'Coach the learner to use a conditional conjunction rather than a blunt request — it sounds far more professional.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Acknowledge a concern with benché',
        prompt:
          'The manager says: "Capisco la sua richiesta, ma il nostro team lavora molto in presenza." Acknowledge their concern while maintaining your position — use benché or sebbene.',
        exampleAnswer:
          'Capisco perfettamente, sebbene io abbia dimostrato di essere molto produttivo anche in smart working negli ultimi anni. Potrei essere presente quattro giorni la settimana durante il primo mese, affinché il team si fidi della mia autonomia.',
        notes:
          'Accept any sentence that correctly uses a concessive conjunction and maintains a professional tone.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Draw a line',
        prompt:
          'Translate your bottom line: "I can accept the role, unless the contract explicitly forbids any remote working, without exception."',
        exampleAnswer:
          'Posso accettare il ruolo, a meno che il contratto non vieti esplicitamente qualsiasi forma di smart working, senza eccezioni.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Post-call debrief',
        prompt:
          'The call ends positively. Write three sentences describing the outcome and what you hope happens next — use the congiuntivo or the condizionale as fits the context.',
        notes:
          'This free-production prompt often surfaces the learner’s most fluent Italian — let the writing run.',
      },
    ],
  },

  // ─── 7. Scenario roleplay — work email ───────────────────────────────────
  {
    slug: 'cap17-roleplay-work-email',
    title: 'Scrivi un’email professionale — the full business email',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.advanced,
    summary:
      'Write and respond to a full Italian business email thread: a project delay, a request ' +
      'for an extension, and a polite pushback from the client. Subjunctive conjunctions and ' +
      'professional register throughout.',
    objectiveSkillSlugs: [
      'it-congiuntivo-conjunctions',
      'it-vocab-work',
      'it-vocab-computer-internet',
    ],
    defaultDurationMinutes: 14,
    compatibleThemes: ['business', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Italian email conventions',
        prompt:
          'A formal Italian business email opens with "Gentile [titolo + cognome]," and closes with "Cordiali saluti" or "Distinti saluti." The tone is more formal than English. Subjunctive conjunctions give your writing a polished, native feel — use them freely.',
        notes:
          'Remind learners that the Lei form (formal you) is standard in business correspondence.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Draft the delay message',
        prompt:
          'You are the project manager. Write a 4–5 sentence email to the client informing them of a one-week delay, using affinché or prima che to explain what you’ll do to minimise the impact.',
        exampleAnswer:
          'Gentile Dott.ssa Ferrari, la contatto per informarla che la consegna del progetto slitterà di una settimana, affinché il nostro team possa completare i test di qualità nel modo appropriato. Abbiamo già adottato misure correttive prima che il ritardo si ripercuotesse sulle fasi successive. La terremo aggiornata quotidianamente.',
        notes:
          'Accept a wide range of formulations. Focus error correction on the subjunctive forms and the formal register.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Client pushback',
        prompt:
          'The client replies: "Capisco le difficoltà, benché una settimana di ritardo rappresenti un problema per noi. Cosa propone concretamente?" Respond professionally using purché and senza che.',
        exampleAnswer:
          'Gentile Dott.ssa Ferrari, la ringrazio per la comprensione. Ci impegniamo a consegnare entro sette giorni, purché non emergano ulteriori criticità tecniche. Le assicuro che lavoreremo intensamente senza che questo incida sulla qualità del prodotto finale.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Email sign-off with subjunctive',
        prompt:
          'Complete the closing line using a meno che: "Rimango a disposizione per una videochiamata ___ lei non preferisca gestire tutto per iscritto."',
        exampleAnswer: 'a meno che lei non preferisca gestire tutto per iscritto.',
        notes: 'The pleonastic non is obligatory in standard written Italian after a meno che.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Audit your email',
        prompt:
          'Looking back at what you wrote: did you use at least two different subjunctive conjunctions? Which one feels most natural to you now?',
      },
    ],
  },

  // ─── 8. Listening challenge ──────────────────────────────────────────────
  {
    slug: 'cap17-listening-interview-exchange',
    title: 'Listening challenge: il colloquio in diretta',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.advanced,
    summary:
      'Listen to a realistic Italian job-interview exchange between a candidate and an HR ' +
      'manager. Train your ear to catch subjunctive conjunctions in natural speech, key ' +
      'work-vocabulary items, and the candidate’s main argument.',
    objectiveSkillSlugs: ['it-congiuntivo-conjunctions', 'it-vocab-work'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['business', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'In the clip, an HR manager (la responsabile HR) interviews a candidate for a senior developer role. Listen for: (1) which subjunctive conjunctions the candidate uses and why, (2) the specific conditions she proposes for accepting the role.',
        notes:
          'Script guideline for the engine: two speakers, 90–120 seconds, natural pace, include at least purché, benché, and a meno che in the candidate’s speech.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Main points of the candidate’s pitch',
        prompt:
          'What are the two main conditions the candidate sets for accepting the offer? Quote or paraphrase in Italian.',
        exampleAnswer:
          'La candidata accetta purché possa lavorare almeno due giorni da remoto e a meno che non venga modificato il piano di carriera concordato.',
        notes: 'Accept paraphrases. The goal is comprehension, not exact recall.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Conjunction identification',
        prompt:
          'Which conjunction did the candidate use to acknowledge a weakness? (A) affinché (B) benché (C) prima che',
        exampleAnswer:
          'B — benché: the candidate acknowledged a gap in experience using a concessive construction.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your own response',
        prompt:
          'Imagine you are the HR manager. In 3–4 sentences, summarise the candidate’s position for your notes — using reported speech or indirect structures with the congiuntivo.',
        notes:
          'This post-listening production task is intentionally open — reward fluency over perfection.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listening debrief',
        prompt:
          'Which word or phrase in the clip was hardest to catch? Why do you think it was difficult?',
      },
    ],
  },

  // ─── 9. Speaking challenge ───────────────────────────────────────────────
  {
    slug: 'cap17-speaking-ideal-job',
    title: 'Il lavoro ideale — describe your professional dream',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.advanced,
    summary:
      'A sustained speaking challenge: describe your ideal job and a current or imagined project ' +
      'in Italian, weaving in subjunctive conjunctions, the indefinite-antecedent pattern, and ' +
      'the same/different-subject test — all in one fluent monologue.',
    objectiveSkillSlugs: [
      'it-congiuntivo-conjunctions',
      'it-congiuntivo-other-uses',
      'it-congiuntivo-vs-infinito',
      'it-vocab-work',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['business', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your speaking mission',
        prompt:
          'You’ll build a 5–7 sentence spoken description of your ideal job and one project you’d love to work on. The goal: use the congiuntivo naturally — not as a grammar exercise, but because it’s the right form for what you want to say.',
        notes: 'Personalise the prompt heavily to the learner’s stated profession or aspirations.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe your ideal role',
        prompt:
          'In 3–4 sentences, describe your ideal job — the type of company, the team, the conditions. Use at least one indefinite-antecedent construction ("cerco un ambiente che…") and one purché or a condizione che.',
        exampleAnswer:
          'Vorrei lavorare in un’azienda che valorizzi l’autonomia e la creatività, purché offra anche possibilità di crescita professionale reale. Cerco un team che sappia collaborare in modo efficace anche a distanza.',
        notes:
          'Reward natural use of the subjunctive. If the learner avoids it, gently prompt: "Can you add a condition or describe a quality you’re looking for?"',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe a project',
        prompt:
          'In 3–4 sentences, describe a project you’d love to work on — what it involves, what you hope to achieve, what concerns you. Use sperare di / temere di (same subject) and at least one che + congiuntivo (different subject).',
        exampleAnswer:
          'Spero di poter lanciare una piattaforma digitale per la formazione aziendale entro l’anno. Temo che i tempi di sviluppo siano più lunghi del previsto, benché il team sia molto motivato.',
        notes:
          'This is the core production task. Let the learner speak freely; note errors for the feedback at the end.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Spontaneous chiunque / comunque',
        prompt:
          'Add one sentence to your description using either chiunque or comunque — make it feel natural, not bolted on.',
        exampleAnswer:
          'Comunque vadano le prime settimane, sono convinto di poter portare valore al team fin da subito.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Which subjunctive structure felt most fluent? Which one required the most effort? What would you practise next?',
      },
    ],
  },

  // ─── 10. Vocabulary review ───────────────────────────────────────────────
  {
    slug: 'cap17-vocab-review-work-tech',
    title: 'Vocabolario in azione: lavoro e tecnologia',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.advanced,
    summary:
      'A deep review of the workplace and tech vocabulary clusters: collocations, false friends, ' +
      'gender traps, and the verbs that bring these nouns to life — all in contexts you’d actually ' +
      'encounter on the job or online.',
    objectiveSkillSlugs: ['it-vocab-work', 'it-vocab-computer-internet'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['business', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Collocations over lists',
        prompt:
          'Knowing a word is not enough — you need the verb it goes with. In Italian workplaces: you fare un colloquio (have an interview), firmare un contratto (sign a contract), ricevere uno stipendio (receive a salary), licenziare un dipendente (fire an employee), scaricare un file (download a file), cliccare su un link (click on a link). These are the collocations you’ll need.',
        notes:
          'Present a visual two-column collocation table (verb | noun phrase) before moving to drills.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Work collocations',
        prompt:
          'Fill each blank with the correct verb (assumere, fare, firmare, ricevere, cercare, gestire): ' +
          '"Devo ___ il contratto entro domani. L’HR ha deciso di ___ due nuovi sviluppatori. ' +
          'Lucia sta ___ lavoro da tre mesi. Il responsabile deve ___ un team di dieci persone."',
        exampleAnswer:
          'firmare il contratto; assumere due nuovi sviluppatori; cercando lavoro; gestire un team di dieci persone.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Tech collocations',
        prompt:
          'Fill each blank with the correct verb (navigare, scaricare, accedere, salvare, inviare, cliccare): ' +
          '"___ su "Conferma" per procedere. ___ il documento prima di chiudere il browser. ' +
          '"Non riesco ad ___ al portale — la password non funziona." ' +
          '"Ti ___ il report in allegato."',
        exampleAnswer:
          'Clicca su "Conferma"; Salva il documento; accedere al portale; invio il report.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'False friends and near-synonyms',
        prompt:
          'Choose the best word for each context: (1) "Lavora in una ___ (ditta / azienda) familiare con cinque dipendenti." (2) "Ho trovato un ___ (impiego / lavoro) come consulente." (3) "Manda l’email a ___ (la mail / l’email)."',
        exampleAnswer:
          '(1) ditta (small, often family-run company — preferred here). (2) impiego (a specific job/post — more precise than the general lavoro). (3) l’email — the standard written form; la mail is colloquial.',
        notes: 'These three distinctions are the most common precision errors at this level.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Put it all together',
        prompt:
          'Translate: "Although I downloaded the app last week, I still can’t access the company platform unless I use a VPN."',
        exampleAnswer:
          'Benché io abbia scaricato l’app la settimana scorsa, non riesco ancora ad accedere alla piattaforma aziendale a meno che non usi una VPN.',
        notes:
          'This translation doubles as a grammar consolidation — both subjunctive conjunctions must be correct.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Your top three',
        prompt:
          'Which three vocabulary items from this chapter do you find most useful for your daily life? Use each in a sentence.',
      },
    ],
  },

  // ─── 11. Progress check ──────────────────────────────────────────────────
  {
    slug: 'cap17-progress-check',
    title: 'Capitolo 17 checkpoint: il congiuntivo e il mondo del lavoro',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.advanced,
    summary:
      'A mixed-skills checkpoint across all five objectives of chapter 17: subjunctive ' +
      'conjunctions, further subjunctive triggers, the infinitive-vs-subjunctive choice, ' +
      'workplace vocabulary, and computer-internet terms. Find what is solid and what needs ' +
      'another pass before moving to chapter 18.',
    objectiveSkillSlugs: [
      'it-congiuntivo-conjunctions',
      'it-congiuntivo-other-uses',
      'it-congiuntivo-vs-infinito',
      'it-vocab-work',
      'it-vocab-computer-internet',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['business', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes self-check',
        prompt:
          'Five quick questions — one per objective. No pressure; the goal is to pinpoint what to revisit before chapter 18, which builds directly on the congiuntivo you’ve learned here.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Conjunctions',
        prompt:
          'Complete: "Invieremo il preventivo domani, ___ (provided that) il cliente confermi la disponibilità entro stasera."',
        exampleAnswer: 'purché il cliente confermi la disponibilità entro stasera.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Indefinite antecedent vs real referent',
        prompt:
          'Which is correct? (A) "Ho trovato un project manager che conosce Agile." (B) "Stiamo cercando un project manager che conosca Agile." (C) Both can be correct, depending on context.',
        exampleAnswer:
          '(C) Both can be correct: (A) uses the indicative because this person has been found and is real; (B) uses the subjunctive because the person is still being sought and is hypothetical.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Infinitive vs subjunctive',
        prompt:
          'Choose: "Il responsabile spera ___ ricevere / che il team riceva il feedback entro venerdì."',
        exampleAnswer:
          'Both are valid in different contexts: "spera di ricevere" if the manager hopes to receive it himself; "spera che il team riceva" if the team is doing the receiving.',
        notes:
          'This ambiguous item tests whether the learner understands the subject test at a conceptual level.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Vocabulary synthesis',
        prompt:
          'Translate: "She has been looking for a job for six months. Although she has strong digital skills, she hasn’t found a suitable position yet."',
        exampleAnswer:
          'Cerca lavoro da sei mesi. Benché abbia solide competenze digitali, non ha ancora trovato una posizione adatta.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess and plan',
        prompt:
          'Which of the five objectives feels strongest? Which do you want to revisit? Choose one and say what you’ll do differently.',
      },
    ],
  },
];

export default { unitCode, lessons };
