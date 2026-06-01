// Additional lesson templates for Capitolo 12 — Cercare casa.
//
// These EXTEND the templates authored inline in units/cap-12-cercare-casa.ts.
// Slugs beginning cap12- that already exist in the unit file are:
//   cap12-visita-allappartamento, cap12-qualche-ogni-tutto, cap12-non-niente-non-mai,
//   cap12-scusi-mi-dica, cap12-arredare-casa
// All slugs below are new and do not collide with those.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs globally unique; objectives reference real skill slugs.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-12';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Grammar drill — qualche (singular) vs alcuni/alcune (plural) ────────
  {
    slug: 'cap12-drill-qualche-vs-alcuni',
    title: 'Qualche stanza vs alcune stanze — the singular trap',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'A focused drill on the #1 indefinite-adjective error: qualche always takes a ' +
      'singular noun even when the meaning is plural. Contrast it directly with ' +
      'alcuni/alcune (plural) until the pattern is automatic.',
    objectiveSkillSlugs: ['it-indefinite-adjectives'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The singular trap',
        prompt:
          'Qualche means "a few" but it always governs a SINGULAR noun. ' +
          '"Ho visto qualche appartamento" = I saw a few apartments — note appartamento, not appartamenti. ' +
          'Alcuni/alcune carries the same meaning with a PLURAL noun: "ho visto alcuni appartamenti." ' +
          'Both are correct; the noun number is the only difference.',
        notes:
          'Show the minimal pair side-by-side before any exercise. The contrast is the entire lesson.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Which noun form follows qualche?',
        prompt:
          'The landlord said there are a few problems. Which is correct?\n' +
          'A) qualche problemi   B) qualche problema   C) alcune problema',
        exampleAnswer: 'B) qualche problema',
        notes: 'Probe both the singular-after-qualche rule and the tempting plural in A.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose qualche or alcuni/alcune with the right noun form',
        prompt:
          'Complete with qualche OR alcuni/alcune + the noun in the correct form:\n' +
          '(a) Ho trovato ___ annunci (interesting) — (annuncio, m.).\n' +
          '(b) C’è ___ difetto (flaw) nell’impianto elettrico.\n' +
          '(c) ___ finestre (window, f.) danno sul cortile.',
        exampleAnswer: '(a) alcuni annunci interessanti; (b) qualche difetto; (c) Alcune finestre',
        notes:
          'In (a) the plural annunci is the clue that alcuni is needed. ' +
          'In (b) the singular difetto after qualche. In (c) the plural finestre triggers alcune.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the noun after qualche',
        prompt:
          'Each sentence has one error. Correct it:\n' +
          '(a) Ho fatto qualche domande al proprietario.\n' +
          '(b) Alcune stanza del piano terra è umida.',
        exampleAnswer:
          '(a) Ho fatto qualche domanda al proprietario. (qualche → singular)\n' +
          '(b) Alcune stanze del piano terra sono umide. (alcune → plural noun + plural verb)',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce both forms from English',
        prompt:
          'Translate using the form in brackets:\n' +
          '(a) I visited a few apartments downtown. [qualche]\n' +
          '(b) Some rooms have a great view. [alcune]',
        exampleAnswer:
          '(a) Ho visitato qualche appartamento in centro.\n' +
          '(b) Alcune stanze hanno una bella vista.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The one rule',
        prompt:
          'Qualche means "some/a few" — what number must the noun after it always be? ' +
          'And when do you switch to alcuni/alcune instead?',
        exampleAnswer:
          'Qualche always takes a singular noun. Use alcuni/alcune when you want to make ' +
          'the plurality explicit through the noun itself.',
      },
    ],
  },

  // ── 2. Grammar drill — indefinite pronouns qualcuno/qualcosa/niente/nessuno ─
  {
    slug: 'cap12-drill-indefinite-pronouns',
    title: 'Qualcuno, qualcosa, niente, nessuno — indefinite pronouns in context',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Drill the four most-used indefinite pronouns through apartment-hunt scenarios: ' +
      'qualcuno (someone), qualcosa (something), niente (nothing), nessuno (no one). ' +
      'Includes the productive qualcosa di + adjective and qualcosa da + infinitive templates.',
    objectiveSkillSlugs: ['it-indefinite-pronouns', 'it-negatives'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Standalone pronouns — no noun needed',
        prompt:
          'These pronouns stand alone — they replace a noun, not modify one.\n' +
          'qualcuno = someone/anyone\n' +
          'qualcosa = something/anything\n' +
          'nessuno = no one (with non when verb follows)\n' +
          'niente/nulla = nothing (with non when verb follows)\n\n' +
          'Two useful templates:\n' +
          '  qualcosa di + adjective (adj stays m. sg.): qualcosa di bello\n' +
          '  qualcosa da + infinitive: qualcosa da fare',
        notes:
          'Anchor qualcosa di bello — the masculine-singular adjective is the most common slip.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose the right indefinite pronoun',
        prompt:
          'Complete with qualcuno, qualcosa, nessuno, or niente:\n' +
          '(a) Ha chiamato ___ mentre ero fuori a vedere l’appartamento?\n' +
          '(b) Non ho trovato ___ di adatto al mio budget.\n' +
          '(c) ___ ha lasciato la porta aperta.\n' +
          '(d) Non c’è ___ di sbagliato con il riscaldamento.',
        exampleAnswer: '(a) qualcuno; (b) niente; (c) Qualcuno; (d) niente',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'qualcosa di + adjective: the masculine singular rule',
        prompt:
          'Complete with the correct form of the adjective (watch: it stays masculine singular):\n' +
          '(a) Cerco qualcosa di ___ (luminoso) in zona tranquilla.\n' +
          '(b) Hai trovato qualcosa di ___ (interessante)?\n' +
          '(c) Voglio qualcosa di ___ (spazioso) per la mia famiglia.',
        exampleAnswer: '(a) luminoso; (b) interessante; (c) spazioso',
        notes:
          'Even if the speaker is female or seeking a female-gender noun, the adjective in qualcosa di stays m. sg.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce the pronouns in English → Italian',
        prompt:
          'Translate:\n' +
          '(a) Nobody came to see the apartment.\n' +
          '(b) Is there anything to fix in the kitchen?\n' +
          '(c) I found something beautiful near the park.',
        exampleAnswer:
          '(a) Nessuno è venuto a vedere l’appartamento.\n' +
          '(b) C’è qualcosa da sistemare in cucina?\n' +
          '(c) Ho trovato qualcosa di bello vicino al parco.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Pronoun or adjective?',
        prompt:
          'What is the difference between "qualche stanza" and "qualcosa"? ' +
          'And why is it qualcosa di bello, not di bella?',
        exampleAnswer:
          'Qualche is an adjective — it modifies a noun (qualche stanza). ' +
          'Qualcosa is a pronoun — it stands alone. ' +
          'The adjective after qualcosa di is always m. sg. because qualcosa is invariable.',
      },
    ],
  },

  // ── 3. Grammar drill — double negation non…niente/mai/più/ancora ──────────
  {
    slug: 'cap12-drill-double-negative',
    title: 'Non ho più niente — the double-negative drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Rapid-fire practice on Italian double negation: non before the verb + a second ' +
      'negative (niente, nessuno, mai, più, ancora, né…né) after it. Includes the ' +
      'pre-verb subject exception where non drops entirely.',
    objectiveSkillSlugs: ['it-negatives'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'culture', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two negatives reinforce, not cancel',
        prompt:
          'In Italian, non…niente does NOT mean "something." Both negatives are required — ' +
          'they intensify, not cancel. The only exception: when nessuno or niente LEADS the ' +
          'sentence as a subject, non disappears. "Nessuno ha chiamato" is correct — no non needed.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Add the second negative word',
        prompt:
          'Complete the sentence with the correct negative:\n' +
          '(a) Non abito ___ in quella strada. (no longer)\n' +
          '(b) Non abbiamo ___ firmato il contratto. (not yet)\n' +
          '(c) Non ha telefonato ___ in tutta la settimana. (never)\n' +
          '(d) L’affitto non include ___ il gas ___ la luce. (neither…nor)',
        exampleAnswer: '(a) più; (b) ancora; (c) mai; (d) né…né',
      },
      {
        taskType: TaskType.translation,
        focus: 'Translate using the correct double negative',
        prompt:
          'Translate:\n' +
          '(a) We no longer live on the first floor.\n' +
          '(b) The landlord has never answered our messages.\n' +
          '(c) There is nothing wrong with the apartment.',
        exampleAnswer:
          '(a) Non abitiamo più al primo piano.\n' +
          '(b) Il proprietario non ha mai risposto ai nostri messaggi.\n' +
          '(c) Non c’è niente di sbagliato nell’appartamento.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the missing or misplaced negative',
        prompt:
          'Fix each sentence:\n' +
          '(a) Non ho ancora visto nessuno appartamento di questo tipo.\n' +
          '(b) Nessuno non ha risposto all’annuncio.\n' +
          '(c) Il contratto non è firmato mai.',
        exampleAnswer:
          '(a) Non ho ancora visto nessun appartamento di questo tipo. ' +
          '(nessuno before a noun = nessun, like an article)\n' +
          '(b) Nessuno ha risposto all’annuncio. (subject negation — drop non)\n' +
          '(c) Il contratto non è mai stato firmato. ' +
          '(mai sits between auxiliary and participle in compound tenses)',
      },
      {
        taskType: TaskType.recap,
        focus: 'The pre-verb subject rule',
        prompt:
          'When is it correct to say "Nessuno è venuto" without non? ' +
          'And what changes if nessuno comes after the verb?',
        exampleAnswer:
          'When nessuno is the grammatical subject and comes before the verb, non is dropped. ' +
          'When it follows the verb, non must precede the verb: Non è venuto nessuno.',
      },
    ],
  },

  // ── 4. Grammar drill — formal imperative conjugation ─────────────────────
  {
    slug: 'cap12-drill-imperativo-formal',
    title: 'Prenda, senta, vada — building the formal imperative',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Step-by-step conjugation drill for the Lei formal imperative: -are verbs get -i, ' +
      '-ere/-ire verbs get -a, and key irregulars (vada, dica, venga, sia, faccia, stia) ' +
      'must be memorised. Pronoun placement — always before the verb — is drilled throughout.',
    objectiveSkillSlugs: ['it-imperativo-formal'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'business', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The subjunctive form = formal imperative',
        prompt:
          '-ARE verbs → replace -are with -i: parlare → Parli! aspettare → Aspetti! firmare → Firmi!\n' +
          '-ERE / -IRE verbs → replace ending with -a: prendere → Prenda! leggere → Legga! sentire → Senta!\n' +
          'Irregulars to memorise: vada (andare), dica (dire), faccia (fare), venga (venire), ' +
          'sia (essere), abbia (avere), stia (stare).\n' +
          'PRONOUNS: always precede the formal imperative — Mi dica, Si accomodi, Le mostri. ' +
          'This is the OPPOSITE of the informal where they attach as suffixes.',
        notes:
          'The pronoun rule is the single key contrast with cap11 informal imperative. ' +
          'Use the dimmi vs mi dica pair immediately.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Form the Lei imperative for each verb',
        prompt:
          'Give the formal (Lei) imperative:\n' +
          'parlare, scrivere, aprire, dire, fare, andare, venire, stare',
        exampleAnswer: 'Parli, Scriva, Apra, Dica, Faccia, Vada, Venga, Stia',
        notes: 'Flag all four fully irregular forms. Reward self-correction.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Pronoun before the formal imperative',
        prompt:
          'Rewrite each informal command as a formal one with the pronoun in the correct position:\n' +
          '(a) Informal: dimmi → Formal: ___\n' +
          '(b) Informal: seguimi → Formal: ___\n' +
          '(c) Informal: accomodati → Formal: ___\n' +
          '(d) Informal: mostrami l’appartamento → Formal: ___',
        exampleAnswer: '(a) Mi dica; (b) Mi segua; (c) Si accomodi; (d) Mi mostri l’appartamento',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch form and pronoun errors',
        prompt:
          'Fix the errors:\n' +
          '(a) Signora, parla più lentamente, per favore.\n' +
          '(b) Prenda-mi il contratto domani.\n' +
          '(c) Signor Rossi, va pure avanti.',
        exampleAnswer:
          '(a) Signora, parli più lentamente. (indicative parla → subjunctive parli)\n' +
          '(b) Mi prenda il contratto domani. (pronoun precedes, no suffix)\n' +
          '(c) Signor Rossi, vada pure avanti. (irregular: vada, not va)',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Give formal instructions in a real-world scenario',
        prompt:
          'You are a real-estate agent greeting a client. Give five formal instructions: ' +
          'invite them in, ask them to follow you, tell them to look at the view from the balcony, ' +
          'ask them to sign the form, and reassure them not to worry about the price.',
        exampleAnswer:
          'Si accomodi. / Mi segua. / Guardi che vista dal balcone! / ' +
          'Firmi pure qui. / Non si preoccupi del prezzo.',
        notes: 'Personalise the apartment detail to match the learner’s known preferences.',
      },
    ],
  },

  // ── 5. Error-correction clinic ─────────────────────────────────────────────
  {
    slug: 'cap12-clinic-indefinites-negatives-imperative',
    title: 'Clinic: qualche singular, double negative, and formal commands',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'A targeted error-correction clinic on the three most common mistakes in this ' +
      'chapter: qualche with a plural noun, a missing double negative, and informal ' +
      'imperative used where the formal is needed. Diagnose, fix, and explain.',
    objectiveSkillSlugs: ['it-indefinite-adjectives', 'it-negatives', 'it-imperativo-formal'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'culture', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Three chapters, three classic slips',
        prompt:
          'I will show you sentences with the errors that come up most in this chapter. ' +
          'Spot each one, explain why it is wrong, and write the correct version.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'qualche + plural noun',
        prompt:
          'Fix:\n' +
          '(a) Ho visitato qualche appartamenti questa settimana.\n' +
          '(b) Ci sono qualche stanze libere al secondo piano.',
        exampleAnswer:
          '(a) Ho visitato qualche appartamento questa settimana. (qualche → singular)\n' +
          '(b) Ci sono alcune stanze libere al secondo piano. ' +
          '(some/several with plural noun → alcune, not qualche)',
        notes:
          'In (b), the verb ci sono confirms plural. Use alcune or qualche stanza (singular) — never qualche stanze.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Double negative — missing non or misplaced negative word',
        prompt:
          'Fix:\n' +
          '(a) Hai trovato nessuno a casa quando sei andato?\n' +
          '(b) Non abitiamo lì più da mesi. (word-order issue only)',
        exampleAnswer:
          '(a) Non hai trovato nessuno a casa quando sei andato? ' +
          '(nessuno follows the verb → non is required before the verb)\n' +
          '(b) Non abitiamo più lì da mesi. ' +
          '(più comes directly after the conjugated verb, before the location adverb)',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Informal imperative used in a formal context',
        prompt:
          'The speaker is talking to a landlord (Lei register). Fix:\n' +
          '(a) Dimmi il prezzo dell’affitto, per favore.\n' +
          '(b) Signor Bianchi, vieni a vedere il contratto quando puoi.',
        exampleAnswer:
          '(a) Mi dica il prezzo dell’affitto, per favore. (formal: mi dica, not dimmi)\n' +
          '(b) Signor Bianchi, venga a vedere il contratto quando può. ' +
          '(formal: venga + può, irregular Lei imperative of venire and potere)',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Produce clean sentences across all three areas',
        prompt:
          'Write three correct sentences: one using qualche + singular noun, one using a ' +
          'double negative with non…ancora, and one formal imperative with a pronoun before the verb.',
        notes: 'Accept any topic — home context is natural here but not required.',
      },
    ],
  },

  // ── 6. Scenario roleplay — view an apartment & negotiate with Lei ─────────
  {
    slug: 'cap12-roleplay-agente-immobiliare',
    title: 'Con l’agente immobiliare — a formal apartment tour',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.upper_intermediate,
    summary:
      'You’ve arranged a viewing through an estate agent (un’agente immobiliare). ' +
      'Use the Lei register throughout: ask formal questions, respond to the agent’s ' +
      'formal imperatives, describe what the flat has and doesn’t have, and say whether ' +
      'you want to proceed.',
    objectiveSkillSlugs: [
      'it-imperativo-formal',
      'it-vocab-home',
      'it-negatives',
      'it-indefinite-adjectives',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['family', 'culture', 'travel', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'It’s a Saturday morning. You’ve responded to an online listing for a three-room ' +
          'apartment (un trilocale) on the second floor in a quiet neighbourhood. ' +
          'The estate agent, Signora Ferretti, meets you outside the building. ' +
          'You will address each other with Lei throughout.',
        notes:
          'If the learner has mentioned a dream-home preference (garden, big kitchen, natural light), ' +
          'reference it in the listing description to personalise the scenario.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Arrive and greet the agent formally',
        prompt:
          'Introduce yourself, confirm the appointment, and respond naturally when the agent ' +
          'says: "Prego, si accomodi. Mi segua pure."',
        exampleAnswer:
          'Buongiorno, sono [nome]. Abbiamo un appuntamento per le undici. — ' +
          'Certamente, grazie. La seguo.',
        notes:
          'Coach the learner to respond to "si accomodi" and "mi segua" with natural formal replies.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask formal questions about each room',
        prompt:
          'As the agent shows you each room, ask about: (a) the size of the living room, ' +
          '(b) whether there is a washing machine, (c) which floor the apartment is on, ' +
          '(d) whether the heating is included in the rent.',
        exampleAnswer:
          '(a) Quanto è grande il soggiorno?\n' +
          '(b) C’è la lavatrice?\n' +
          '(c) A che piano si trova?\n' +
          '(d) Il riscaldamento è incluso nell’affitto?',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Respond with formal imperatives as the agent',
        prompt:
          'You are now the agent. Complete each instruction to the prospective tenant:\n' +
          '(a) ___ pure il contratto con calma. (prendere)\n' +
          '(b) ___ se ha altre domande. (dirmi)\n' +
          '(c) Non ___ — le spese sono già incluse. (preoccuparsi)',
        exampleAnswer:
          '(a) Prenda pure il contratto con calma.\n' +
          '(b) Mi dica se ha altre domande.\n' +
          '(c) Non si preoccupi.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe what the apartment has and does not have',
        prompt:
          'Summarise the apartment to a friend over the phone — describe three things it ' +
          'has (using qualche and alcuni/alcune) and two things it does not have ' +
          '(using double negatives).',
        exampleAnswer:
          'Ha alcune stanze molto luminose e qualche mobile incluso. Il soggiorno è spazioso. ' +
          'Purtroppo non c’è né il balcone né il giardino, e non c’è ancora il riscaldamento autonomo.',
        notes:
          'Reward correct qualche + singular and at least one double negative. Gently correct if both negatives are missing.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Would you rent it?',
        prompt:
          'Say whether you would take the apartment and why. Use at least one formal ' +
          'imperative phrase you would say to the agent (e.g. "Le mando un messaggio domani") ' +
          'and one double negative about something the flat lacks.',
        notes:
          'This open reflection captures genuine output and can seed the next lesson with follow-up on the learner’s real housing interests.',
      },
    ],
  },

  // ── 7. Scenario roleplay — describe where furniture goes ─────────────────
  {
    slug: 'cap12-roleplay-arredare-insieme',
    title: 'Dove mettiamo il divano? — furnishing a new flat together',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.intermediate,
    summary:
      'You and a flatmate are furnishing an empty apartment. Decide where every piece ' +
      'of furniture goes, use all the spatial prepositions (sopra, sotto, accanto a, ' +
      'davanti a, dietro, tra), and practise the vocabulary for furniture and rooms.',
    objectiveSkillSlugs: ['it-vocab-furniture', 'it-vocab-home', 'it-indefinite-adjectives'],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'culture', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'An empty apartment, two opinions',
        prompt:
          'You’ve just collected the keys to your new apartment — a two-bedroom flat on the ' +
          'third floor. The removal van has arrived with all the furniture and you need to ' +
          'decide where everything goes. Your flatmate has different taste, so you’ll need ' +
          'to negotiate.',
        notes:
          'If the learner has expressed a décor style, reference it. The "disagreement" element makes the roleplay richer.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Place the living room furniture',
        prompt:
          'Your flatmate suggests: "Mettiamo il divano davanti alla TV." You disagree — ' +
          'suggest an alternative position for the sofa using sopra, accanto a, or tra.',
        exampleAnswer:
          'No, mettiamo il divano accanto alla finestra, tra la lampada e lo scaffale. ' +
          'È più luminoso lì.',
        notes: 'Encourage use of at least two spatial prepositions in the response.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Describe where each item is now placed',
        prompt:
          'Complete the description of the finished living room:\n' +
          '(a) Il quadro è ___ il divano. (above)\n' +
          '(b) La lampada è ___ il divano e lo scaffale. (between)\n' +
          '(c) Il tappeto è ___ il tavolo. (under)\n' +
          '(d) Le sedie sono ___ il tavolo. (in front of)',
        exampleAnswer:
          '(a) sopra il divano; (b) tra il divano e lo scaffale; ' +
          '(c) sotto il tavolo; (d) davanti al tavolo',
        notes:
          'Remind the learner that davanti a contracts with the article (davanti al, davanti alla) ' +
          'but sopra and sotto do not require a.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe your bedroom layout',
        prompt:
          'Describe where every important object in your bedroom is (real or ideal): ' +
          'use at least six furniture items and four different spatial prepositions.',
        notes:
          'Accept approximate descriptions and correct gently. The goal is fluent spatial narration.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Prepositions that contract and those that don’t',
        prompt:
          'Which spatial prepositions require a contraction with the definite article? ' +
          'Give one example each.',
        exampleAnswer:
          'accanto a and davanti a contract: accanto al letto, davanti alla porta. ' +
          'sopra, sotto, dietro, and tra do not take a before the article: sopra il tavolo, tra i mobili.',
      },
    ],
  },

  // ── 8. Listening challenge — an apartment described ───────────────────────
  {
    slug: 'cap12-listening-descrizione-appartamento',
    title: 'Listening gym: what does the apartment have?',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'Listen to a short spoken description of an apartment and answer questions about ' +
      'what it has, what it is missing, and where the key pieces of furniture are. ' +
      'Trains ear recognition of home vocabulary, negatives, and spatial prepositions.',
    objectiveSkillSlugs: ['it-vocab-home', 'it-vocab-furniture', 'it-negatives'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Listen for three things',
        prompt:
          'You will hear a short description of an apartment (about 90 seconds). ' +
          'Listen for: (1) what rooms and features it has, (2) what it does NOT have, ' +
          '(3) where one or two pieces of furniture are placed. ' +
          'You can listen twice before answering.',
        notes:
          'Script for the engine: a natural-paced monologue by a young Italian describing their ' +
          'new apartment — mention three rooms, a balcony, no garage, no dishwasher, and locate ' +
          'the bookshelf and the table. Use double negatives (non…ancora, non…né…né) naturally.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'What does the apartment have?',
        prompt: 'List three features or rooms the speaker mentions that the apartment HAS.',
        exampleAnswer:
          'Answers will vary per generated audio; typical: due camere da letto, un balcone, la cucina attrezzata.',
        notes: 'Engine should confirm correct items and note any the learner missed.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'What is the apartment missing?',
        prompt:
          'Which TWO items does the speaker say the apartment does NOT have?\n' +
          'A) il balcone   B) il garage   C) la lavastoviglie   D) l’ascensore',
        exampleAnswer: 'B) il garage and C) la lavastoviglie',
        notes: 'The correct answers should be set in the generated audio script.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Where is the bookshelf?',
        prompt: 'What does the speaker say about where the bookshelf (lo scaffale) is?',
        exampleAnswer: 'Lo scaffale è accanto alla finestra, tra il divano e la lampada.',
        notes: 'Tests retention of spatial prepositions heard in context.',
      },
      {
        taskType: TaskType.recap,
        focus: 'What you caught — and what you missed',
        prompt:
          'Which detail in the description was hardest to catch on first listen? ' +
          'Was it the vocabulary, the negatives, or the spatial prepositions?',
        notes:
          'This metacognitive reflection helps the engine prioritise the next listening assignment.',
      },
    ],
  },

  // ── 9. Speaking challenge — describe your real or dream home ─────────────
  {
    slug: 'cap12-speaking-la-mia-casa',
    title: 'La mia casa — describe your home in Italian',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'An extended speaking task: describe your real home or your dream apartment in ' +
      'Italian — every room, the furniture, what it has and what it lacks — using the ' +
      'full range of chapter vocabulary and grammar.',
    objectiveSkillSlugs: [
      'it-vocab-home',
      'it-vocab-furniture',
      'it-indefinite-adjectives',
      'it-negatives',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'culture', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your home, your words',
        prompt:
          'You are going to describe your home — real or imaginary — in as much detail as you can. ' +
          'Aim for at least eight sentences. Use rooms, furniture, spatial prepositions, indefinite ' +
          'adjectives (qualche, ogni, alcuni/alcune, tutto), and at least one double negative ' +
          '(non…niente, non…più, non…ancora). There are no wrong homes.',
        notes:
          'If learner profile includes known living situation, surface a gentle prompt (e.g. "You mentioned you live in a flat…").',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe the rooms and layout',
        prompt:
          'Start with the overall apartment: how many rooms, which floor, and what it is near. ' +
          'Then go room by room.',
        notes: 'The floor and neighbourhood anchor the geography before moving inside.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe the furniture and where things are',
        prompt:
          'Pick your favourite room and describe every piece of furniture in it. ' +
          'Where is each item in relation to the others? Use at least four spatial prepositions.',
        notes: 'Push for precision: sopra, accanto a, tra, davanti a, sotto, dietro.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Say what your home has and what it lacks',
        prompt:
          'Use indefinite adjectives to describe quantity (qualche armadio, alcune finestre, ogni stanza) ' +
          'and at least two double negatives to say what your home does not have or has not yet.',
        exampleAnswer:
          'La mia casa ha qualche armadio in camera e alcune finestre grandi. ' +
          'Ogni stanza è luminosa. Non c’è ancora un giardino e non abbiamo né un garage né un balcone.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Your dream home',
        prompt:
          'If you could change one thing about your home (or design your dream home from scratch), ' +
          'what would it be? Answer in Italian using at least one formal imperative ' +
          '(imagine giving instructions to an architect).',
        notes:
          'The architect scenario invites formal-imperative production in a fun, creative context.',
      },
    ],
  },

  // ── 10. Vocabulary review — home, furniture, and positions ────────────────
  {
    slug: 'cap12-vocab-review-casa-mobili-posizioni',
    title: 'Vocabulary review: rooms, furniture, and where things are',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.intermediate,
    summary:
      'A comprehensive vocabulary check across all three lexical sets of the chapter: ' +
      'home vocabulary (rooms, rental terms), furniture (il divano, l’armadio, lo scaffale), ' +
      'and spatial prepositions (sopra, accanto a, tra, davanti a). Mixes recognition and production.',
    objectiveSkillSlugs: ['it-vocab-home', 'it-vocab-furniture'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'art'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Three lexical sets, one review',
        prompt:
          'This review covers the vocabulary of rooms, furniture, and spatial positions. ' +
          'Work quickly — the goal is to see which words are solid and which need another look.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Room vocabulary',
        prompt:
          'Where do you sleep?\n' +
          'A) il soggiorno   B) la cucina   C) la camera da letto   D) il bagno',
        exampleAnswer: 'C) la camera da letto',
        notes: 'Follow up by asking where each of the other three items belongs.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Furniture in the right room',
        prompt:
          'Match each piece of furniture to its most natural room:\n' +
          '(a) il frigorifero → ___\n' +
          '(b) il letto → ___\n' +
          '(c) il divano → ___\n' +
          '(d) la lavatrice → ___',
        exampleAnswer:
          '(a) la cucina; (b) la camera da letto; (c) il soggiorno; (d) il bagno o la cucina',
      },
      {
        taskType: TaskType.translation,
        focus: 'Spatial prepositions into Italian',
        prompt:
          'Translate:\n' +
          '(a) The wardrobe is next to the window.\n' +
          '(b) The lamp is between the sofa and the bookcase.\n' +
          '(c) The shoes are under the bed.',
        exampleAnswer:
          '(a) L’armadio è accanto alla finestra.\n' +
          '(b) La lampada è tra il divano e lo scaffale.\n' +
          '(c) Le scarpe sono sotto il letto.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Quick-fire room tour',
        prompt:
          'Name every room in your home and one piece of furniture in each room — as fast as you can.',
        notes:
          'Reward fluency over perfect grammar here. Any hesitation on a room name flags it for targeted review.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Which words are not yet solid?',
        prompt:
          'Which vocabulary item from the three sets — rooms, furniture, or spatial positions — ' +
          'are you least confident about right now?',
        notes: 'Seed the learner’s weakness into the next daily mission or vocabulary drill.',
      },
    ],
  },

  // ── 11. Progress check ────────────────────────────────────────────────────
  {
    slug: 'cap12-progress-check',
    title: 'Chapter checkpoint: la casa, le case, le regole',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A mixed checkpoint across the whole chapter: indefinite adjectives and pronouns, ' +
      'double negation, the formal imperative with correct pronoun placement, and home and ' +
      'furniture vocabulary. Identifies what is solid and what needs a second pass.',
    objectiveSkillSlugs: [
      'it-indefinite-adjectives',
      'it-indefinite-pronouns',
      'it-negatives',
      'it-imperativo-formal',
      'it-vocab-home',
      'it-vocab-furniture',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'culture', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes checkpoint',
        prompt:
          'A quick tour of the whole chapter. No time pressure — just see where you are ' +
          'before moving on. Each question targets a different skill.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'qualche + noun number',
        prompt:
          'Which is correct?\n' + 'A) qualche stanze   B) qualche stanza   C) qualche le stanze',
        exampleAnswer: 'B) qualche stanza',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Indefinite pronoun + adjective template',
        prompt: 'Complete: Ho trovato ___ di ___ (something / beautiful) in questa zona.',
        exampleAnswer: 'qualcosa di bello',
        notes: 'The adjective stays m. sg. after qualcosa di.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Double negative',
        prompt:
          'Make this sentence negative using non…più:\n' + '"Abitiamo in quel quartiere." → ___',
        exampleAnswer: 'Non abitiamo più in quel quartiere.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Formal imperative + pronoun placement',
        prompt:
          'Complete with the correct formal imperative and pronoun position:\n' +
          '"___ (dirmi) quando arriva il trasloco."',
        exampleAnswer: 'Mi dica quando arriva il trasloco.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Home vocabulary in context',
        prompt: 'Translate: The monthly rent includes utilities but not the garage.',
        exampleAnswer: 'L’affitto mensile include le spese ma non il garage.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess the chapter',
        prompt:
          'Which of the four grammar topics — indefinite adjectives, indefinite pronouns, ' +
          'double negation, or the formal imperative — do you want to revisit?',
        notes: 'Route the learner to the appropriate drill lesson based on their answer.',
      },
    ],
  },
];

export default { unitCode, lessons };
