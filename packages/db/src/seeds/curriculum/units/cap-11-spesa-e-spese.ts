// Capitolo 11 — Spesa e spese
// Theme: groceries & shopping. Neighbourhood shops, quantities with ne,
// the locative/idiomatic particle ci, combined double pronouns, and the
// informal imperative. Regional focus: La Basilicata e la Calabria.
//
// All content original (copyright-safe).

import { CEFRLevel, LessonType, SkillCategory, TaskType } from '@prisma/client';
import type { SeedUnit } from '../types';

const unit: SeedUnit = {
  code: 'cap-11',
  order: 11,
  title: 'Spesa e spese',
  subtitle: 'The particles ne and ci, double pronouns, and commands',
  theme: 'food',
  level: CEFRLevel.intermediate,
  summary:
    'Head to the neighbourhood market and speciality shops of a southern Italian town. You’ll learn ' +
    'to ask for quantities and replace them with ne (Quante mele vuoi? — Ne voglio due), use ci to ' +
    'stand in for places and to build idiomatic verb phrases, combine two pronouns into one elegant ' +
    'form (glielo, ce ne, me lo…), and fire off confident informal commands — including the tricky ' +
    'short irregulars that double their consonant when a pronoun attaches (dimmi, fammi, dallo).',
  canDo: [
    'Shop at the market and speciality stores, asking for and specifying quantities',
    'Replace a quantity or a topic with ne, and adjust past-participle agreement accordingly',
    'Use ci to replace a place name and in idiomatic expressions (pensarci, crederci, riuscirci)',
    'Combine indirect and direct object pronouns into double-pronoun forms (me lo, gliela, ce ne…)',
    'Give instructions and requests in the informal imperative to friends or family',
    'Name the main neighbourhood shops and everyday grocery items',
  ],
  culturalNotes: [
    {
      title: 'The speciality shop is alive and well',
      body:
        'Despite the spread of the supermercato, Italians still prize their neighbourhood specialists ' +
        'for everyday shopping. The panetteria for bread baked that morning, the macelleria where the ' +
        'butcher knows your cut by name, the pescheria for the catch of the day, and the fruttivendolo ' +
        'for seasonal produce — each stop is also a social ritual. Regulars are greeted by name; the ' +
        'commesso will often wrap your purchase in paper and add a personal touch. Time spent this way ' +
        'is not considered inefficient: it is the fabric of daily life.',
    },
    {
      title: 'Mercati, mercatini, and the usato',
      body:
        'Italy’s open-air markets (i mercati) divide into the daily food market — often in the main ' +
        'piazza or a dedicated square — and the weekly or monthly mercatino. The mercatino dell’usato ' +
        '(second-hand market) is a beloved institution where you can find vintage clothing, old books, ' +
        'kitchen utensils, and vinyl records. In the south, Saturday morning markets are social ' +
        'fixtures; in larger northern cities, specialised mercatini for antiques (antiquariato) or ' +
        'organic food (bio) draw weekend crowds from across the region.',
    },
    {
      title: 'La Basilicata e la Calabria: cucina povera e prodotti DOP',
      body:
        'The two southernmost regions of the Italian peninsula share a tradition of cucina povera — ' +
        'resourceful cooking built on dried legumes, preserved meats, and sun-dried vegetables. ' +
        'Basilicata is home to the peperoni cruschi (crispy dried sweet peppers, DOP) and the ' +
        'celebrated Aglianico del Vulture wine. Calabria is known for its fiery ’nduja — a spreadable, ' +
        'intensely spiced pork salume — as well as bergamot (used in Earl Grey tea) grown exclusively ' +
        'on its Ionian coast. Shopping in local markets here means encountering flavours and techniques ' +
        'rarely found farther north.',
    },
  ],

  // ─── Skills ───────────────────────────────────────────────────────────────
  skills: [
    // 1. ne — partitive / quantity / topic replacement
    {
      slug: 'it-ne',
      name: 'The pronoun ne — quantities and topics',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Ne replaces a partitive quantity (Quante mele vuoi? — Ne voglio due) or a di + noun phrase ' +
        '(Parliamo di politica → Ne parliamo). In the passato prossimo with avere, the past participle ' +
        'agrees in gender and number with the quantity ne represents: Ne ho comprate tre (mele, f. pl.).',
      prerequisiteSlugs: ['it-direct-object-pronouns', 'it-passato-prossimo-avere'],
      examples: [
        {
          target: 'Hai del pane? — Sì, ne ho ancora un po’.',
          native: 'Do you have any bread? — Yes, I still have a little.',
          note: 'ne replaces del pane (partitive)',
        },
        {
          target: 'Quanti etti di prosciutto vuole? — Ne vorrei due, grazie.',
          native: 'How many hectograms of prosciutto would you like? — I’d like two, thanks.',
          note: 'ne replaces di prosciutto; the quantity (due) follows the verb',
        },
        {
          target: 'Parliamo di questo formaggio. → Ne parliamo.',
          native: 'Let’s talk about this cheese. → Let’s talk about it.',
          note: 'ne replaces di + topic',
        },
        {
          target: 'Quante uova hai comprato? — Ne ho comprate sei.',
          native: 'How many eggs did you buy? — I bought six.',
          note: 'past participle agrees with uova (f. pl.): comprate',
        },
      ],
      commonMistakes: [
        'omitting ne entirely and repeating the noun (Voglio due — instead of Ne voglio due)',
        'placing ne after the verb (voglio ne due instead of ne voglio due)',
        'forgetting past-participle agreement when ne is present (ho comprato instead of ho comprate)',
        'using ne for direct objects that are not partitive or di + topic (confusing it with lo/la/li/le)',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.error_correction,
      ],
      compatibleThemes: ['food', 'business', 'travel', 'culture'],
      teachingNotes:
        'The three uses of ne — partitive, quantity, and topic — should be introduced in that order; ' +
        'the quantity use is the most frequent in a shopping context. Participle agreement is the single ' +
        'hardest point: drill it with food nouns in all four gender/number combinations (pane m.s., ' +
        'mele f.pl., biscotti m.pl., arance f.pl.) so the pattern becomes automatic.',
    },

    // 2. ci — locative and idiomatic
    {
      slug: 'it-ci',
      name: 'The particle ci — places and idioms',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'Ci replaces a place introduced by a, in, or su (Vai al mercato? — Sì, ci vado domani). ' +
        'It also forms c’è / ci sono (there is / there are) and enters fixed idiomatic phrases with ' +
        'verbs that take a: pensarci (to think about it), crederci (to believe in it), riuscirci ' +
        '(to manage it/succeed). Contrast ci (location/idiom) with ne (partitive/topic).',
      prerequisiteSlugs: ['it-simple-prepositions', 'it-articulated-prepositions'],
      examples: [
        {
          target: 'Vai alla pescheria oggi? — Sì, ci vado nel pomeriggio.',
          native: 'Are you going to the fish shop today? — Yes, I’m going there this afternoon.',
          note: 'ci = alla pescheria',
        },
        {
          target: 'C’è ancora del latte in frigo?',
          native: 'Is there any milk left in the fridge?',
          note: 'c’è = ci è; singular subject',
        },
        {
          target: 'Ci sono molte offerte al mercato oggi.',
          native: 'There are a lot of deals at the market today.',
          note: 'ci sono with plural subject',
        },
        {
          target: 'Non ci credo — il pesce costa già dieci euro all’etto!',
          native: 'I can’t believe it — the fish already costs ten euros per hundred grams!',
          note: 'crederci = to believe in it/that',
        },
        {
          target: 'Ho provato ad aprire il barattolo ma non ci riesco.',
          native: 'I tried to open the jar but I can’t manage it.',
          note: 'riuscirci = to manage/succeed at it',
        },
      ],
      commonMistakes: [
        'dropping ci entirely and leaving the place unexpressed (vado domani instead of ci vado domani)',
        'confusing ci (location) with ne (partitive/topic): Vai al fruttivendolo? → Ci vado, not "Ne vado"',
        'forgetting c’è / ci sono agreement — c’è before singular, ci sono before plural',
        'placing ci after the verb in a simple tense (vado ci instead of ci vado)',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.fill_blank,
        TaskType.multiple_choice,
        TaskType.translation,
      ],
      compatibleThemes: ['food', 'travel', 'business', 'culture'],
      teachingNotes:
        'Introduce ci first in the c’è/ci sono frame (already familiar from cap-01), then add the ' +
        'locative replacement function, then the idiomatic verbs. The pensarci/crederci/riuscirci ' +
        'triad is best taught as a memorized list rather than derived from a rule. Explicitly ' +
        'contrast with ne: "ci goes somewhere; ne comes from something."',
    },

    // 3. Double pronouns (pronomi combinati)
    {
      slug: 'it-double-pronouns',
      name: 'Double pronouns (pronomi combinati)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'When an indirect and a direct object pronoun appear together, the indirect comes first and ' +
        'its form changes: mi → me, ti → te, ci → ce, vi → ve. Gli and le both fuse into glie-, ' +
        'giving glielo, gliela, glieli, gliele, gliene. The combined pronoun goes before the verb ' +
        'or attaches to an infinitive or imperative as one word.',
      prerequisiteSlugs: ['it-direct-object-pronouns', 'it-indirect-object-pronouns'],
      examples: [
        {
          target: 'Me lo dai, per favore? (= dai a me il pane)',
          native: 'Will you give it to me, please? (the bread)',
          note: 'mi + lo → me lo',
        },
        {
          target: 'Te la mando domani. (= mando a te la ricetta)',
          native: 'I’ll send it to you tomorrow. (the recipe)',
          note: 'ti + la → te la',
        },
        {
          target: 'Glielo porto subito. (= porto a lui/lei lo scontrino)',
          native: 'I’ll bring it to him/her right away. (the receipt)',
          note: 'gli/le + lo → glielo',
        },
        {
          target: 'Ce ne porti mezzo chilo? (= porti a noi ne)',
          native: 'Can you bring us half a kilo of it?',
          note: 'ci + ne → ce ne',
        },
        {
          target: 'Vuoi farglielo vedere? (= fare vedere a loro/lui il prodotto)',
          native: 'Do you want to show it to them?',
          note: 'double pronoun attaches to infinitive fare; gli + lo → glielo',
        },
      ],
      commonMistakes: [
        'keeping mi/ti/ci/vi unchanged (mi lo instead of me lo)',
        'using le + lo separately instead of glielo (le lo porto instead of glielo porto)',
        'putting the double pronoun after the verb in a simple tense (porto me lo instead of me lo porto)',
        'splitting the double pronoun when attaching to an infinitive (darmi lo instead of darmelo)',
      ],
      recommendedPracticeTypes: [
        TaskType.pronoun_replacement,
        TaskType.translation,
        TaskType.fill_blank,
        TaskType.error_correction,
      ],
      compatibleThemes: ['food', 'business', 'family', 'travel'],
      teachingNotes:
        'Teach the transformation table in one block: mi→me, ti→te, ci→ce, vi→ve, gli/le→glie-. ' +
        'The glie- fusion is where most errors occur — emphasize that gli and le BOTH become glie-. ' +
        'Use a shopping scenario to drill: "Can you show it to me?" (Puoi mostrarmelo?), "I’ll give it ' +
        'to her" (Glielo do). Placement rules (before conjugated verb, attached to infinitive/imperative) ' +
        'should be drilled in contrast pairs.',
    },

    // 4. Imperativo informale (tu/noi/voi)
    {
      slug: 'it-imperativo-informal',
      name: 'Informal imperative (tu, noi, voi)',
      category: SkillCategory.grammar,
      level: CEFRLevel.intermediate,
      description:
        'The tu imperative of -are verbs ends in -a (Parla!); -ere and -ire verbs take -i (Prendi! ' +
        'Senti!). The noi form (let’s…) and voi form follow -iamo/-ate/-ete/-ite. The negative tu ' +
        'imperative uses non + infinitive (Non parlare!). Irregular tu imperatives: va’, da’, fa’, ' +
        'sta’, di’. Pronouns attach to the end (Dimmi!, Fallo!); after the short irregulars the ' +
        'initial consonant of the pronoun doubles (dimmi, fammi, dallo, vacci, dicci).',
      prerequisiteSlugs: [
        'it-regular-are-verbs-present',
        'it-regular-ere-verbs-present',
        'it-regular-ire-verbs-present',
        'it-direct-object-pronouns',
      ],
      examples: [
        {
          target: 'Compra il pane! / Non comprare il dolce.',
          native: 'Buy the bread! / Don’t buy the dessert.',
          note: '-are tu imperative = -a; negative tu = non + infinitive',
        },
        {
          target: 'Prendi mezzo chilo di prosciutto.',
          native: 'Get half a kilo of prosciutto.',
          note: '-ere verb: prend- + -i',
        },
        {
          target: 'Andiamo al mercato!',
          native: 'Let’s go to the market!',
          note: 'noi form = andiamo; same as present tense',
        },
        {
          target: 'Dimmi quanto costa!',
          native: 'Tell me how much it costs!',
          note: 'di’ (irregular tu of dire) + mi → dimmi (consonant doubles)',
        },
        {
          target: 'Daglielo subito.',
          native: 'Give it to him/her right away.',
          note: 'da’ (dare) + gli + lo → daglielo; da’ + doubled consonant rule',
        },
      ],
      commonMistakes: [
        'using the -are infinitive instead of -a for the tu imperative (comprare instead of compra)',
        'forming the negative tu imperative with non + -a instead of non + infinitive (non compra instead of non comprare)',
        'not doubling the consonant after the short irregulars (dami instead of dammi; falo instead of fallo)',
        'separating the pronoun from the imperative instead of attaching it (compra lo instead of compralo)',
      ],
      recommendedPracticeTypes: [
        TaskType.conjugation,
        TaskType.fill_blank,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['food', 'family', 'travel', 'culture'],
      teachingNotes:
        'Lead with the easy pattern (-a/-i/-iamo) before introducing irregulars. The short-form ' +
        'irregulars (va’, da’, fa’, sta’, di’) are best memorized as a set since the doubling rule ' +
        'only applies after them. Use a recipe or a shopping-list roleplay: asking a friend to buy ' +
        'things is a natural, personalized imperative drill. Tie the pronoun-attachment lesson directly ' +
        'to the double-pronoun skill already taught in this chapter.',
    },

    // 5. Vocabulary — shops
    {
      slug: 'it-vocab-shops',
      name: 'Shops and market vocabulary (i negozi)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'The speciality shops of an Italian neighbourhood: the bakery, butcher, fishmonger, deli, ' +
        'greengrocer, pastry shop, and general food store — plus the people who work in them and the ' +
        'key commercial terms every shopper needs.',
      prerequisiteSlugs: ['it-vocab-city-places', 'it-definite-articles'],
      examples: [
        {
          target: 'Vado in panetteria a prendere il pane.',
          native: 'I’m going to the bakery to get bread.',
          note: 'in + speciality shop (no article needed with in)',
        },
        {
          target: 'La commessa mi ha mostrato le offerte in vetrina.',
          native: 'The shop assistant showed me the deals in the window.',
          note: 'la commessa (f) / il commesso (m)',
        },
        {
          target: 'I saldi iniziano il giorno dopo Natale.',
          native: 'The sales start the day after Christmas.',
        },
      ],
      commonMistakes: [
        'using al instead of in before speciality shop names (al panetteria instead of in panetteria)',
        'confusing il negoziante (shop owner) with il commesso (shop assistant/employee)',
        'using la macelleria for fish — fish is la pescheria; macelleria is the butcher’s',
      ],
      recommendedPracticeTypes: [TaskType.multiple_choice, TaskType.fill_blank, TaskType.roleplay],
      compatibleThemes: ['food', 'business', 'travel', 'culture'],
      teachingNotes:
        'Pair each shop with its speciality product to build a mental map of the neighbourhood: ' +
        'panetteria → pane, macelleria → carne, pescheria → pesce, fruttivendolo → frutta e verdura. ' +
        'Personalize by asking the learner which shops they already visit in their own city.',
    },

    // 6. Vocabulary — groceries & quantities
    {
      slug: 'it-vocab-groceries',
      name: 'Groceries and quantities (alimentari e misure)',
      category: SkillCategory.vocabulary,
      level: CEFRLevel.intermediate,
      description:
        'Essential food items for the weekly shop — bread, meat, fish, fruit, vegetables, dairy — ' +
        'and the units used at the counter: un etto (100 g), un chilo, una confezione, una bottiglia. ' +
        'Master fare la spesa (to do the grocery shopping) and the receipt (lo scontrino).',
      prerequisiteSlugs: ['it-vocab-food-restaurant', 'it-vocab-bar-drinks'],
      examples: [
        {
          target: 'Fare la spesa al mercato è più economico che al supermercato.',
          native: 'Grocery shopping at the market is cheaper than at the supermarket.',
          note: 'fare la spesa = to do the grocery shopping (not fare le spese, which means general shopping)',
        },
        {
          target: 'Vorrei due etti di formaggio e un chilo di mele, per favore.',
          native: 'I’d like 200 grams of cheese and a kilo of apples, please.',
          note: 'un etto = 100 g; standard Italian deli unit',
        },
        {
          target: 'Non dimenticare lo scontrino — potresti averne bisogno.',
          native: 'Don’t forget the receipt — you might need it.',
          note: 'lo scontrino (fiscal receipt) is legally required in Italy',
        },
      ],
      commonMistakes: [
        'confusing fare la spesa (groceries) with fare le spese (shopping in general, including clothes etc.)',
        'mistranslating un etto as "an ounce" — un etto = 100 g, roughly 3.5 oz',
        'omitting the partitive article: say del pane / della carne, not just pane/carne when ordering',
        'forgetting that le uova is feminine plural (le, not i) despite its -a singular (l’uovo, m.)',
      ],
      recommendedPracticeTypes: [
        TaskType.fill_blank,
        TaskType.roleplay,
        TaskType.translation,
        TaskType.speaking_prompt,
      ],
      compatibleThemes: ['food', 'business', 'family', 'culture'],
      teachingNotes:
        'The fare la spesa / fare le spese distinction is worth an explicit cultural note — Italian ' +
        'differentiates the food shop from leisure shopping. Drill quantities (un etto, due etti, un chilo) ' +
        'with ne immediately so the two skills reinforce each other: "Ne vuole due etti?" — "Sì, ne voglio due." ' +
        'Personalize by asking the learner what they typically buy each week.',
    },
  ],

  // ─── Lesson templates ─────────────────────────────────────────────────────
  lessonTemplates: [
    // 1. Scenario roleplay — shopping at the market with ne
    {
      slug: 'cap11-al-mercato-con-ne',
      title: 'Al mercato: quante ne vuoi?',
      lessonType: LessonType.scenario_roleplay,
      level: CEFRLevel.intermediate,
      summary:
        'You’re at a Saturday morning market in Potenza. Work through three stalls — fruit, cheese, ' +
        'and fresh pasta — asking for quantities, replacing them with ne, and practising the shopkeeper ' +
        'formulas all in one immersive run.',
      objectiveSkillSlugs: ['it-ne', 'it-vocab-groceries', 'it-vocab-shops'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['food', 'travel', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Set the scene',
          prompt:
            'It’s Saturday morning and you’re at the outdoor market. You need fruit, cheese, and ' +
            'fresh pasta. The trick: every time the vendor asks "Quanti/e ne vuole?", you’ll answer ' +
            'with ne — not by repeating the noun.',
          notes:
            'If the learner has shared food preferences, set one stall to their favourite ingredient ' +
            '(e.g. substitute pasta for fish if they love seafood).',
        },
        {
          taskType: TaskType.roleplay,
          focus: 'Buy fruit — use ne for the quantity',
          prompt:
            'The fruttivendolo asks: "Quante mele desidera?" Answer with a specific quantity using ne, ' +
            'then ask the price.',
          exampleAnswer: 'Ne vorrei un chilo, grazie. Quanto costano?',
          notes: 'Coach the learner to place ne before the verb, not after.',
        },
        {
          taskType: TaskType.pronoun_replacement,
          focus: 'Replace the noun in the vendor’s question',
          prompt:
            'The cheese vendor says: "Abbiamo del pecorino fresco." Reply that you’d like two hundred ' +
            'grams of it, using ne.',
          exampleAnswer: 'Ne vorrei due etti, per favore.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Passato prossimo with ne — participle agreement',
          prompt:
            'Complete: Ho preso delle pesche al mercato. → Ne ho pres___ tre. (pesche = f. pl.)',
          exampleAnswer: 'Ne ho prese tre.',
          notes: 'Emphasize: the participle agrees with the feminine plural noun that ne replaces.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Recap your market haul',
          prompt:
            'Tell me what you bought and how much: use ne for each item and include at least one ' +
            'passato prossimo with agreement.',
          notes: 'Personalize to whatever items appeared in the roleplay.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The ne placement and agreement rules',
          prompt:
            'In one sentence each: where does ne go in a simple tense, and when does the participle agree?',
        },
      ],
    },

    // 2. Grammar — ne & ci contrasted
    {
      slug: 'cap11-ne-e-ci',
      title: 'Ne e ci — due piccole parole, mille usi',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Master the full range of ne (partitive, quantity, topic) and ci (locative, c’è/ci sono, ' +
        'idiomatic), then sharpen the contrast between them so you always reach for the right one.',
      objectiveSkillSlugs: ['it-ne', 'it-ci'],
      defaultDurationMinutes: 11,
      compatibleThemes: ['food', 'travel', 'business'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'Two particles, two jobs',
          prompt:
            'Ci goes SOMEWHERE or DOES something (locative / idiomatic). Ne comes FROM something ' +
            'or means SOME of something (partitive / topic). Neither replaces a direct object the ' +
            'way lo/la does.',
          notes: 'Use a two-column contrast chart: ci (location/idiom) | ne (quantity/topic).',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'ci or ne?',
          prompt:
            'Choose ci or ne:\n' +
            '(a) Sei mai stata a Matera? — Sì, ___ sono andata l’estate scorsa.\n' +
            '(b) Quante bottiglie compriamo? — ___ prendo due.\n' +
            '(c) Pensi ancora all’Amalfi? — Sì, ___ penso spesso.',
          exampleAnswer: '(a) ci; (b) ne; (c) ci',
          notes: '(a) locative; (b) partitive quantity; (c) pensarci idiomatic.',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'c’è / ci sono with shopping items',
          prompt:
            'Fill in c’è or ci sono:\n' +
            '(a) ___ ancora del latte?\n' +
            '(b) ___ tre panetterie in questa via.\n' +
            '(c) Non ___ più sconti oggi.',
          exampleAnswer: 'c’è; ci sono; ci sono',
        },
        {
          taskType: TaskType.translation,
          focus: 'Idiomatic ci in action',
          prompt: 'Translate: "I tried to use the self-checkout but I couldn’t manage it."',
          exampleAnswer: 'Ho provato a usare la cassa automatica ma non ci sono riuscito/a.',
          notes: 'riuscirci = to succeed/manage; ci is obligatory here.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The ci/ne decision tree',
          prompt:
            'Give me one example sentence with ci (locative), one with ci (idiomatic), and one with ' +
            'ne (quantity). Explain why you chose each.',
        },
      ],
    },

    // 3. Grammar — double pronouns
    {
      slug: 'cap11-me-lo-dai',
      title: 'Me lo dai? — pronomi combinati in the shop',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Learn the full double-pronoun transformation table — me lo, te la, glielo, ce ne, and the ' +
        'rest — through a series of shop and kitchen scenarios where you need to say "give it to me," ' +
        '"I’ll send it to you," and "bring us some of it."',
      objectiveSkillSlugs: ['it-double-pronouns', 'it-ne'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['food', 'business', 'family'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'How the table transforms',
          prompt:
            'When two pronouns meet, the indirect one changes: mi→me, ti→te, ci→ce, vi→ve. Gli and ' +
            'le BOTH become glie- and fuse with the direct pronoun into one word: glielo, gliela, ' +
            'glieli, gliele, gliene.',
          notes:
            'Write the transformation table on screen. Stress that glielo/gliela serve BOTH him and her.',
        },
        {
          taskType: TaskType.pronoun_replacement,
          focus: 'Build the double pronoun',
          prompt:
            'Replace both underlined objects with the correct double pronoun:\n' +
            '(a) Do [a te] [il sacchetto]. → ___\n' +
            '(b) Mando [a lei] [la ricevuta]. → ___\n' +
            '(c) Portano [a noi] [del vino]. → ___',
          exampleAnswer: '(a) Te lo do. (b) Gliela mando. (c) Ce ne portano.',
          notes: 'Walk the learner through: identify IOP, transform it, then attach DOP or ne.',
        },
        {
          taskType: TaskType.error_correction,
          focus: 'Catch the untransformed pronoun',
          prompt:
            'Fix the errors:\n' + '(a) Mi lo dà. (→ ___)\n' + '(b) Gli la consegno domani. (→ ___)',
          exampleAnswer: '(a) Me lo dà. (b) Gliela consegno domani.',
        },
        {
          taskType: TaskType.translation,
          focus: 'Double pronouns with infinitives',
          prompt:
            'Translate: "Can you bring it to me?" (the receipt — lo scontrino) and ' +
            '"I want to send some of it to them" (del formaggio).',
          exampleAnswer:
            'Puoi portarmelo? / Voglio mandarne loro — or: Voglio mandarglielo un po’.',
          notes:
            'Accept gliene for "to them + some". Clarify that the pronoun attaches to the infinitive.',
        },
        {
          taskType: TaskType.recap,
          focus: 'The glie- rule',
          prompt: 'Why do both gli (him/them) and le (her) become glie- before a direct pronoun?',
          notes:
            'Learners often think only gli fuses; reinforce that le also fuses into the same glie- form.',
        },
      ],
    },

    // 4. Grammar + speaking — informal imperative
    {
      slug: 'cap11-imperativo-con-amici',
      title: 'Dimmi, fallo, daglielo — commands with friends',
      lessonType: LessonType.grammar,
      level: CEFRLevel.intermediate,
      summary:
        'Build the informal imperative forms for tu, noi, and voi, tackle the irregular short forms, ' +
        'and practise attaching pronouns — finishing with a recipe scenario where you give a friend ' +
        'step-by-step instructions for a Calabrian dish.',
      objectiveSkillSlugs: ['it-imperativo-informal', 'it-double-pronouns'],
      defaultDurationMinutes: 12,
      compatibleThemes: ['food', 'family', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.explanation,
          focus: 'The -are/-ere/-ire pattern and the negative',
          prompt:
            '-are verbs: drop the -re, keep the -a (compra, parla). -ere/-ire verbs: drop the -re, ' +
            'keep or change to -i (prendi, senti). Negative tu: non + infinitive (non comprare, non ' +
            'parlare). Noi = present tense -iamo; voi = -ate/-ete/-ite.',
          notes:
            'Flag that the tu -are imperative (compra!) looks like the 3rd-person present — a common source of confusion.',
        },
        {
          taskType: TaskType.conjugation,
          focus: 'Form the tu imperative',
          prompt:
            'Give the tu imperative (positive and negative):\n' +
            '(a) comprare → ___ / ___\n' +
            '(b) prendere → ___ / ___\n' +
            '(c) sentire → ___ / ___',
          exampleAnswer:
            '(a) compra / non comprare; (b) prendi / non prendere; (c) senti / non sentire',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Irregular short forms with pronoun doubling',
          prompt:
            'Complete with the correct imperative + attached pronoun:\n' +
            '(a) ___ (dire + mi) quello che pensi!\n' +
            '(b) ___ (fare + lo) subito!\n' +
            '(c) ___ (dare + gli + lo) — è il suo scontrino.',
          exampleAnswer: '(a) Dimmi; (b) Fallo; (c) Daglielo',
          notes:
            'All three involve short irregulars: di’, fa’, da’. Consonant doubles before attached pronoun.',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Give a friend the steps of a simple recipe',
          prompt:
            'You’re showing a friend how to make a quick pasta dish from scratch. Give at least four ' +
            'instructions using the tu imperative, including one with a pronoun attached.',
          exampleAnswer:
            'Prendi una pentola grande. Mettici l’acqua e portala a bollore. Aggiungi il sale. ' +
            'Butta la pasta e aspetta dieci minuti.',
          notes:
            'Personalize to the learner’s cooking interests. If they mentioned a favourite dish in ' +
            'their profile, use that dish as the prompt.',
        },
        {
          taskType: TaskType.recap,
          focus: 'Irregular list and the doubling rule',
          prompt:
            'Name the five short irregular tu imperatives and give one example of each with a ' +
            'pronoun attached and the consonant doubled.',
        },
      ],
    },

    // 5. Vocabulary review — shops & groceries
    {
      slug: 'cap11-dove-si-compra',
      title: 'Dove si compra? — shops, goods, and the market',
      lessonType: LessonType.vocabulary_review,
      level: CEFRLevel.intermediate,
      summary:
        'Lock in the names of the speciality shops, the groceries you find in each, and the ' +
        'transaction vocabulary — using the impersonal si (from cap-10) to describe what you buy ' +
        'where, and building toward a confident shopping monologue.',
      objectiveSkillSlugs: ['it-vocab-shops', 'it-vocab-groceries', 'it-impersonal-si'],
      defaultDurationMinutes: 9,
      compatibleThemes: ['food', 'business', 'culture'],
      taskBlueprint: [
        {
          taskType: TaskType.briefing,
          focus: 'Map the neighbourhood',
          prompt:
            'Picture your ideal Italian street: a panetteria, a macelleria, a pescheria, a ' +
            'fruttivendolo, a salumeria, and a pasticceria. By the end of this lesson you’ll ' +
            'know exactly what to buy in each one.',
          notes:
            'Mention that southern Italian shops often keep the traditional split; contrast with big-city supermercati.',
        },
        {
          taskType: TaskType.multiple_choice,
          focus: 'Shop → product matching',
          prompt:
            'Where do you go for each item? Match shop to product:\n' +
            '(a) il pane fresco → ___\n' +
            '(b) le sarde — ___\n' +
            '(c) la ’nduja — ___\n' +
            '(d) le pesche — ___',
          exampleAnswer:
            '(a) la panetteria; (b) la pescheria; (c) la salumeria; (d) il fruttivendolo',
        },
        {
          taskType: TaskType.fill_blank,
          focus: 'Quantities and packaging',
          prompt:
            'Complete with the right unit:\n' +
            '(a) Vorrei ___ etto di salame. (one)\n' +
            '(b) Dammi una ___ di latte. (carton/pack)\n' +
            '(c) Prendiamo un ___ di arance. (kilo)',
          exampleAnswer: '(a) un; (b) confezione; (c) chilo',
        },
        {
          taskType: TaskType.speaking_prompt,
          focus: 'Your typical shopping week',
          prompt:
            'Describe where you do your grocery shopping, what you usually buy, and how much of ' +
            'each thing — use ne at least twice.',
          notes:
            'Personalize entirely to the learner: if they shop at a supermarket, contrast it with the Italian ideal.',
        },
        {
          taskType: TaskType.recap,
          focus: 'fare la spesa vs fare le spese',
          prompt:
            'Explain the difference between fare la spesa and fare le spese, and give one example ' +
            'sentence for each.',
        },
      ],
    },
  ],

  // ─── Thematic vocabulary bank ─────────────────────────────────────────────
  vocabulary: [
    // I negozi
    {
      slug: 'cap11-il-negozio',
      targetText: 'il negozio',
      nativeText: 'the shop / store',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-negozi',
    },
    {
      slug: 'cap11-il-supermercato',
      targetText: 'il supermercato',
      nativeText: 'the supermarket',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-negozi',
      exampleSentence: 'Al supermercato si trova tutto, ma preferisco i negozi di quartiere.',
      exampleTranslation:
        'You can find everything at the supermarket, but I prefer neighbourhood shops.',
    },
    {
      slug: 'cap11-il-mercato',
      targetText: 'il mercato',
      nativeText: 'the (open-air) market',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-negozi',
      exampleSentence: 'Il mercato del sabato mattina è sempre pieno di gente.',
      exampleTranslation: 'The Saturday morning market is always full of people.',
    },
    {
      slug: 'cap11-la-panetteria',
      targetText: 'la panetteria',
      nativeText: 'the bakery (bread)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-negozi',
    },
    {
      slug: 'cap11-la-macelleria',
      targetText: 'la macelleria',
      nativeText: 'the butcher’s shop',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-negozi',
      exampleSentence: 'Vado in macelleria a prendere il pollo per stasera.',
      exampleTranslation: 'I’m going to the butcher’s to get chicken for tonight.',
    },
    {
      slug: 'cap11-la-pescheria',
      targetText: 'la pescheria',
      nativeText: 'the fishmonger’s / fish shop',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-negozi',
    },
    {
      slug: 'cap11-la-salumeria',
      targetText: 'la salumeria',
      nativeText: 'the deli / cured-meats shop',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-negozi',
      exampleSentence: 'La salumeria di questo quartiere ha la ’nduja calabrese.',
      exampleTranslation: 'The deli in this neighbourhood has Calabrian ’nduja.',
    },
    {
      slug: 'cap11-il-fruttivendolo',
      targetText: 'il fruttivendolo',
      nativeText: 'the greengrocer’s',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-negozi',
      exampleSentence: 'Al fruttivendolo ci sono peperoni cruschi della Basilicata.',
      exampleTranslation: 'At the greengrocer’s there are cruschi peppers from Basilicata.',
    },
    {
      slug: 'cap11-la-pasticceria',
      targetText: 'la pasticceria',
      nativeText: 'the pastry shop / cake shop',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-negozi',
    },
    {
      slug: 'cap11-il-negoziante',
      targetText: 'il/la negoziante',
      nativeText: 'the shopkeeper / shop owner',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-negozi',
    },
    {
      slug: 'cap11-il-commesso',
      targetText: 'il commesso / la commessa',
      nativeText: 'the shop assistant',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-negozi',
      exampleSentence: 'La commessa mi ha aiutato a scegliere il formaggio giusto.',
      exampleTranslation: 'The shop assistant helped me choose the right cheese.',
    },
    {
      slug: 'cap11-la-vetrina',
      targetText: 'la vetrina',
      nativeText: 'the shop window / display case',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'i-negozi',
    },
    {
      slug: 'cap11-i-saldi',
      targetText: 'i saldi',
      nativeText: 'the sales (seasonal discounts)',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'i-negozi',
      exampleSentence: 'I saldi estivi iniziano a luglio in tutta Italia.',
      exampleTranslation: 'The summer sales start in July across all of Italy.',
    },
    // La spesa
    {
      slug: 'cap11-fare-la-spesa',
      targetText: 'fare la spesa',
      nativeText: 'to do the grocery shopping',
      partOfSpeech: 'phrase',
      theme: 'la-spesa',
      exampleSentence: 'Faccio la spesa ogni martedì al mercato rionale.',
      exampleTranslation: 'I do the grocery shopping every Tuesday at the local market.',
    },
    {
      slug: 'cap11-gli-alimentari',
      targetText: 'gli alimentari',
      nativeText: 'the grocery store / food shop',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-spesa',
    },
    {
      slug: 'cap11-il-pane',
      targetText: 'il pane',
      nativeText: 'the bread',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-spesa',
      exampleSentence: 'Ho comprato il pane in panetteria — ne ho presi due filoni.',
      exampleTranslation: 'I bought bread at the bakery — I got two loaves.',
    },
    {
      slug: 'cap11-la-carne',
      targetText: 'la carne',
      nativeText: 'the meat',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-spesa',
    },
    {
      slug: 'cap11-il-pesce',
      targetText: 'il pesce',
      nativeText: 'the fish',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-spesa',
    },
    {
      slug: 'cap11-la-frutta',
      targetText: 'la frutta',
      nativeText: 'the fruit (collective)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-spesa',
      exampleSentence: 'Quanta frutta vuoi? — Ne voglio mezzo chilo.',
      exampleTranslation: 'How much fruit do you want? — I’d like half a kilo.',
    },
    {
      slug: 'cap11-la-verdura',
      targetText: 'la verdura',
      nativeText: 'the vegetables (collective)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-spesa',
    },
    {
      slug: 'cap11-il-latte',
      targetText: 'il latte',
      nativeText: 'the milk',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-spesa',
    },
    {
      slug: 'cap11-le-uova',
      targetText: 'le uova',
      nativeText: 'the eggs (pl.)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-spesa',
      exampleSentence: 'Ne ho comprate sei — mi servono per la frittata.',
      exampleTranslation: 'I bought six of them — I need them for the omelette.',
    },
    {
      slug: 'cap11-il-formaggio',
      targetText: 'il formaggio',
      nativeText: 'the cheese',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-spesa',
      exampleSentence: 'Ne prendo un etto — un pecorino stagionato di Basilicata.',
      exampleTranslation: 'I’ll take a hundred grams — an aged pecorino from Basilicata.',
    },
    {
      slug: 'cap11-un-etto',
      targetText: 'un etto (di)',
      nativeText: 'a hundred grams (of)',
      partOfSpeech: 'phrase',
      theme: 'la-spesa',
      exampleSentence: 'Due etti di prosciutto crudo, per favore.',
      exampleTranslation: 'Two hundred grams of cured ham, please.',
    },
    {
      slug: 'cap11-un-chilo',
      targetText: 'un chilo (di)',
      nativeText: 'a kilogram (of)',
      partOfSpeech: 'phrase',
      theme: 'la-spesa',
    },
    {
      slug: 'cap11-una-confezione',
      targetText: 'una confezione',
      nativeText: 'a packet / pack / carton',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-spesa',
    },
    {
      slug: 'cap11-una-bottiglia',
      targetText: 'una bottiglia (di)',
      nativeText: 'a bottle (of)',
      partOfSpeech: 'noun',
      gender: 'f',
      theme: 'la-spesa',
      exampleSentence: 'Compra una bottiglia di vino Aglianico — ce n’è ancora una in offerta.',
      exampleTranslation: 'Buy a bottle of Aglianico wine — there’s still one on sale.',
    },
    {
      slug: 'cap11-lo-scontrino',
      targetText: 'lo scontrino',
      nativeText: 'the (fiscal) receipt',
      partOfSpeech: 'noun',
      gender: 'm',
      theme: 'la-spesa',
      exampleSentence: 'Tieni sempre lo scontrino — è obbligatorio per legge.',
      exampleTranslation: 'Always keep the receipt — it is required by law.',
    },
  ],
};

export default unit;
