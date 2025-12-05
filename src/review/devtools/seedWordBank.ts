import {
  STORE_NAME,
  getDb,
  type WordEntry,
  type WordMeaning,
} from "../../index-db";

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const DEFAULT_EASE_FACTOR = 2.5;

interface SeedWordConfig {
  word: string;
  sourceUrl: string;
  meanings: WordMeaning[];
  reviewOffsetDays: number;
  easeFactor?: number;
  intervalDays?: number;
  repetitions?: number;
  lapses?: number;
  isMastered?: number;
  masteredAt?: string | null;
}

const dictionaryUrl = (slug: string) =>
  `https://www.merriam-webster.com/dictionary/${slug}`;

const SEED_WORDS: SeedWordConfig[] = [
  {
    word: "abstruse",
    sourceUrl: dictionaryUrl("abstruse"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "difficult to comprehend for the average mind",
        example:
          "Her dissertation was filled with abstruse proofs that only specialists could decode.",
      },
    ],
    reviewOffsetDays: -7,
    intervalDays: 6,
    repetitions: 4,
  },
  {
    word: "perspicacious",
    sourceUrl: dictionaryUrl("perspicacious"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "keenly discerning and astute",
        example:
          "The perspicacious editor spotted thematic flaws in the manuscript immediately.",
      },
    ],
    reviewOffsetDays: 2,
    intervalDays: 3,
  },
  {
    word: "obdurate",
    sourceUrl: dictionaryUrl("obdurate"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "stubbornly refusing to change one's course",
        example:
          "Despite overwhelming evidence, the obdurate official would not relent.",
      },
    ],
    reviewOffsetDays: 1,
  },
  {
    word: "lachrymose",
    sourceUrl: dictionaryUrl("lachrymose"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "tending to cause or display excessive weeping",
        example: "The film’s lachrymose ending left the audience teary-eyed.",
      },
    ],
    reviewOffsetDays: -1,
    repetitions: 3,
  },
  {
    word: "ineffable",
    sourceUrl: dictionaryUrl("ineffable"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "too great or extreme to be expressed in words",
        example: "They stared at the aurora in ineffable wonder.",
      },
    ],
    reviewOffsetDays: 4,
  },
  {
    word: "sagacious",
    sourceUrl: dictionaryUrl("sagacious"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "showing keen practical sense and judgment",
        example:
          "A sagacious mentor can compress years of mistakes into one lesson.",
      },
    ],
    reviewOffsetDays: 3,
  },
  {
    word: "recondite",
    sourceUrl: dictionaryUrl("recondite"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "dealing with very obscure subject matter",
        example:
          "The lecturer delved into recondite aspects of medieval theology.",
      },
    ],
    reviewOffsetDays: -5,
    intervalDays: 5,
    repetitions: 5,
  },
  {
    word: "intransigent",
    sourceUrl: dictionaryUrl("intransigent"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "refusing to compromise or abandon an extreme position",
        example:
          "Negotiations stalled because of the CEO’s intransigent stance.",
      },
    ],
    reviewOffsetDays: 2,
  },
  {
    word: "mellifluous",
    sourceUrl: dictionaryUrl("mellifluous"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "having a smooth, rich and pleasant sound",
        example: "Her mellifluous narration made the documentary irresistible.",
      },
    ],
    reviewOffsetDays: 5,
  },
  {
    word: "lugubrious",
    sourceUrl: dictionaryUrl("lugubrious"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "excessively mournful or gloomy",
        example: "Dim lighting lent the lobby a lugubrious atmosphere.",
      },
    ],
    reviewOffsetDays: -2,
  },
  {
    word: "obfuscate",
    sourceUrl: dictionaryUrl("obfuscate"),
    meanings: [
      {
        partOfSpeech: "verb",
        definition: "to render something unclear or unintelligible",
        example:
          "The lawyer tried to obfuscate the timeline with tangential details.",
      },
    ],
    reviewOffsetDays: 1,
  },
  {
    word: "pernicious",
    sourceUrl: dictionaryUrl("pernicious"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "highly injurious or destructive",
        example: "The pernicious weed swiftly overtook neighboring crops.",
      },
    ],
    reviewOffsetDays: -3,
  },
  {
    word: "quixotic",
    sourceUrl: dictionaryUrl("quixotic"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "exceedingly idealistic and impractical",
        example: "His quixotic crusade to catalog every cloud soon fizzled.",
      },
    ],
    reviewOffsetDays: -3,
    repetitions: 2,
  },
  {
    word: "sycophant",
    sourceUrl: dictionaryUrl("sycophant"),
    meanings: [
      {
        partOfSpeech: "noun",
        definition: "one who flatters for personal gain",
        example:
          "The board was tired of the sycophant who agreed with everything the director said.",
      },
    ],
    reviewOffsetDays: 4,
  },
  {
    word: "truculent",
    sourceUrl: dictionaryUrl("truculent"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "eager to fight or displaying ferocious aggression",
        example: "His truculent tweets alienated long-time allies.",
      },
    ],
    reviewOffsetDays: 1,
  },
  {
    word: "verisimilitude",
    sourceUrl: dictionaryUrl("verisimilitude"),
    meanings: [
      {
        partOfSpeech: "noun",
        definition: "the appearance of being true or real",
        example: "Fine-grained props added verisimilitude to the period drama.",
      },
    ],
    reviewOffsetDays: -6,
    intervalDays: 7,
  },
  {
    word: "vicissitude",
    sourceUrl: dictionaryUrl("vicissitude"),
    meanings: [
      {
        partOfSpeech: "noun",
        definition:
          "a change of circumstances, typically unwelcome or unpleasant",
        example:
          "Startups must be resilient to the vicissitudes of funding cycles.",
      },
    ],
    reviewOffsetDays: -4,
    repetitions: 3,
  },
  {
    word: "grandiloquent",
    sourceUrl: dictionaryUrl("grandiloquent"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "pompous or extravagant in language, style, or manner",
        example:
          "The keynote was stuffed with grandiloquent promises and little substance.",
      },
    ],
    reviewOffsetDays: -5,
  },
  {
    word: "pulchritudinous",
    sourceUrl: dictionaryUrl("pulchritudinous"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "characterized by great physical beauty",
        example: "They wandered through a pulchritudinous alpine valley.",
      },
    ],
    reviewOffsetDays: 2,
  },
  {
    word: "abstemious",
    sourceUrl: dictionaryUrl("abstemious"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition:
          "marked by restraint especially in the consumption of food or alcohol",
        example: "An abstemious diet kept the athlete in peak condition.",
      },
    ],
    reviewOffsetDays: -2,
  },
  {
    word: "antediluvian",
    sourceUrl: dictionaryUrl("antediluvian"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "extremely old-fashioned or antiquated",
        example: "The legacy billing system felt positively antediluvian.",
      },
    ],
    reviewOffsetDays: 3,
  },
  {
    word: "sententious",
    sourceUrl: dictionaryUrl("sententious"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "given to moralizing in a pompous manner",
        example: "His toast was more sententious sermon than celebration.",
      },
    ],
    reviewOffsetDays: 0,
  },
  {
    word: "obstreperous",
    sourceUrl: dictionaryUrl("obstreperous"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "noisily resisting control or restraint",
        example: "The obstreperous crowd ignored the ushers’ pleas.",
      },
    ],
    reviewOffsetDays: -1,
  },
  {
    word: "jejune",
    sourceUrl: dictionaryUrl("jejune"),
    meanings: [
      {
        partOfSpeech: "adjective",
        definition: "devoid of significance or nutritive value; dull",
        example: "The analyst’s jejune remarks offered no actionable insight.",
      },
    ],
    reviewOffsetDays: 2,
  },
];

const buildEntries = (now = Date.now()): WordEntry[] => {
  return SEED_WORDS.map((seed) => {
    const normalizedWord = seed.word.toLowerCase().trim();
    const offsetMs = seed.reviewOffsetDays * DAY_IN_MS;
    const nextReviewAt = new Date(now + offsetMs).toISOString();

    return {
      word: normalizedWord,
      sourceUrl: seed.sourceUrl,
      meanings: seed.meanings,
      easeFactor: seed.easeFactor ?? DEFAULT_EASE_FACTOR,
      intervalDays:
        seed.intervalDays ?? Math.max(0, Math.abs(seed.reviewOffsetDays)),
      repetitions: seed.repetitions ?? (seed.reviewOffsetDays <= 0 ? 2 : 0),
      nextReviewAt,
      lapses: seed.lapses ?? (seed.reviewOffsetDays < 0 ? 1 : 0),
      isMastered: seed.isMastered ?? 0,
      masteredAt: seed.masteredAt ?? null,
    };
  });
};

export interface SeedOptions {
  clearExisting?: boolean;
}

export interface SeedResult {
  inserted: number;
  cleared: boolean;
  words: string[];
}

export async function seedLexmoraDb(
  options: SeedOptions = {}
): Promise<SeedResult> {
  const { clearExisting = false } = options;
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const entries = buildEntries();

  if (clearExisting) {
    await tx.store.clear();
  }

  for (const entry of entries) {
    await tx.store.put(entry);
  }

  await tx.done;

  const insertedWords = entries.map((entry) => entry.word);
  const result: SeedResult = {
    inserted: entries.length,
    cleared: clearExisting,
    words: insertedWords,
  };

  console.info(
    `[Lexmora] Seeded ${result.inserted} words${
      clearExisting ? " after clearing existing data" : ""
    }.`,
    insertedWords.slice(0, 5),
    "..."
  );

  return result;
}

declare global {
  interface Window {
    seedLexmoraDb?: typeof seedLexmoraDb;
  }
}

if (typeof window !== "undefined") {
  window.seedLexmoraDb = seedLexmoraDb;
  console.info(
    "[Lexmora] Dev helper ready. Run window.seedLexmoraDb({ clearExisting: true }) to reseed IndexedDB."
  );
}
