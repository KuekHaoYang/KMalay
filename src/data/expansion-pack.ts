import type { CourseItem, Lesson, Lexeme, Phrase, Unit } from "../types";

interface WordSeed {
  malay: string;
  english: string;
  partOfSpeech: Lexeme["partOfSpeech"];
}

interface DomainSeed {
  id: string;
  title: string;
  description: string;
  themeMalay: string;
  themeEnglish: string;
  color: string;
  accent: string;
  icon: string;
  words: WordSeed[];
}

const defaultTemplates = [
  "recognition",
  "reverse-recognition",
  "typed",
  "word-bank",
  "pair-match"
] as const;

const lexeme = (
  id: string,
  malay: string,
  english: string[],
  partOfSpeech: Lexeme["partOfSpeech"],
  tags: string[],
  extra: Partial<Lexeme> = {}
): Lexeme => ({
  id,
  kind: "lexeme",
  malay,
  english,
  acceptedAnswers: [malay, ...(extra.acceptedAnswers ?? [])],
  partOfSpeech,
  tags,
  ...extra
});

const phrase = (
  id: string,
  malay: string,
  english: string[],
  tags: string[],
  linkedLexemeIds: string[],
  usageContext: string,
  extra: Partial<Phrase> = {}
): Phrase => ({
  id,
  kind: "phrase",
  malay,
  english,
  acceptedAnswers: [malay, ...(extra.acceptedAnswers ?? [])],
  tags,
  linkedLexemeIds,
  usageContext,
  ...extra
});

const lesson = (
  id: string,
  unitId: string,
  title: string,
  subtitle: string,
  targetItemIds: string[]
): Lesson => ({
  id,
  unitId,
  title,
  subtitle,
  targetItemIds,
  masteryThreshold: 0.7,
  exerciseTemplates: [...defaultTemplates],
  xpReward: 18
});

const slugify = (value: string) =>
  value
    .toLocaleLowerCase("ms-MY")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

const capitalize = (value: string) => value.charAt(0).toLocaleUpperCase("ms-MY") + value.slice(1);
const capitalizeEnglish = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const chunk = <T,>(values: T[], size: number) => {
  const groups: T[][] = [];

  for (let index = 0; index < values.length; index += size) {
    groups.push(values.slice(index, index + size));
  }

  return groups;
};

const phraseTemplates = [
  {
    suffix: "importance",
    malay: (word: string, domain: DomainSeed) => `${capitalize(word)} itu penting dalam ${domain.themeMalay}.`,
    english: (word: string, domain: DomainSeed) =>
      `${capitalizeEnglish(word)} is important in ${domain.themeEnglish}.`,
    hint: (word: string) => `ayat tentang kepentingan ${word}`
  },
  {
    suffix: "discussion",
    malay: (word: string) => `Kita bincang tentang ${word}.`,
    english: (word: string) => `We discuss ${word}.`,
    hint: (word: string) => `ayat tentang perbincangan ${word}`
  },
  {
    suffix: "understand",
    malay: (word: string) => `Saya mahu faham ${word} ini.`,
    english: (word: string) => `I want to understand this ${word}.`,
    hint: (word: string) => `ayat tentang usaha memahami ${word}`
  },
  {
    suffix: "impact",
    malay: (word: string) => `${capitalize(word)} ini ada kesan besar.`,
    english: (word: string) => `This ${word} has a big impact.`,
    hint: (word: string) => `ayat tentang kesan ${word}`
  },
  {
    suffix: "topic",
    malay: (word: string) => `Topik ini melibatkan ${word}.`,
    english: (word: string) => `This topic involves ${word}.`,
    hint: (word: string) => `ayat tentang topik ${word}`
  }
];

const domains: DomainSeed[] = [
  {
    id: "unit-politik-sosial",
    title: "Politik, Sosial dan Pengaruh",
    description: "Kosa kata lanjut untuk pengaruh, masyarakat, dasar, dan kuasa.",
    themeMalay: "politik dan masyarakat",
    themeEnglish: "politics and society",
    color: "#4b1d3f",
    accent: "#f4a261",
    icon: "🏛️",
    words: [
      { malay: "pengaruh", english: "influence", partOfSpeech: "noun" },
      { malay: "kawalan politik", english: "political control", partOfSpeech: "noun" },
      { malay: "isu sosial", english: "social issue", partOfSpeech: "noun" },
      { malay: "isu ekonomi", english: "economic issue", partOfSpeech: "noun" },
      { malay: "arena politik", english: "political arena", partOfSpeech: "noun" },
      { malay: "demokrasi", english: "democracy", partOfSpeech: "noun" },
      { malay: "ideologi", english: "ideology", partOfSpeech: "noun" },
      { malay: "pilihan raya", english: "election", partOfSpeech: "noun" },
      { malay: "kempen", english: "campaign", partOfSpeech: "noun" },
      { malay: "dasar awam", english: "public policy", partOfSpeech: "noun" },
      { malay: "kuasa", english: "power", partOfSpeech: "noun" },
      { malay: "masyarakat", english: "society", partOfSpeech: "noun" },
      { malay: "perpaduan", english: "unity", partOfSpeech: "noun" },
      { malay: "perpecahan", english: "division", partOfSpeech: "noun" },
      { malay: "kepimpinan", english: "leadership", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-ekonomi-pasaran",
    title: "Ekonomi dan Pasaran",
    description: "Bahasa lanjut untuk pasaran, kewangan, dan tingkah laku ekonomi.",
    themeMalay: "ekonomi dan pasaran",
    themeEnglish: "economics and markets",
    color: "#1b4332",
    accent: "#95d5b2",
    icon: "📈",
    words: [
      { malay: "pelaburan", english: "investment", partOfSpeech: "noun" },
      { malay: "keuntungan", english: "profit", partOfSpeech: "noun" },
      { malay: "kerugian", english: "loss", partOfSpeech: "noun" },
      { malay: "inflasi", english: "inflation", partOfSpeech: "noun" },
      { malay: "pasaran", english: "market", partOfSpeech: "noun" },
      { malay: "pengguna", english: "consumer", partOfSpeech: "noun" },
      { malay: "pengeluar", english: "producer", partOfSpeech: "noun" },
      { malay: "permintaan", english: "demand", partOfSpeech: "noun" },
      { malay: "penawaran", english: "supply", partOfSpeech: "noun" },
      { malay: "pendapatan", english: "income", partOfSpeech: "noun" },
      { malay: "perbelanjaan", english: "expenditure", partOfSpeech: "noun" },
      { malay: "hutang", english: "debt", partOfSpeech: "noun" },
      { malay: "simpanan", english: "savings", partOfSpeech: "noun" },
      { malay: "cukai", english: "tax", partOfSpeech: "noun" },
      { malay: "subsidi", english: "subsidy", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-unda-tadbir",
    title: "Undang-undang dan Tadbir Urus",
    description: "Istilah formal untuk kerajaan, hak, siasatan, dan mahkamah.",
    themeMalay: "undang-undang dan tadbir urus",
    themeEnglish: "law and governance",
    color: "#5f0f40",
    accent: "#ffb703",
    icon: "⚖️",
    words: [
      { malay: "undang-undang", english: "law", partOfSpeech: "noun" },
      { malay: "perlembagaan", english: "constitution", partOfSpeech: "noun" },
      { malay: "kerajaan", english: "government", partOfSpeech: "noun" },
      { malay: "pentadbiran", english: "administration", partOfSpeech: "noun" },
      { malay: "kebebasan", english: "freedom", partOfSpeech: "noun" },
      { malay: "keadilan", english: "justice", partOfSpeech: "noun" },
      { malay: "hak asasi", english: "human rights", partOfSpeech: "noun" },
      { malay: "rasuah", english: "corruption", partOfSpeech: "noun" },
      { malay: "siasatan", english: "investigation", partOfSpeech: "noun" },
      { malay: "mahkamah", english: "court", partOfSpeech: "noun" },
      { malay: "hukuman", english: "punishment", partOfSpeech: "noun" },
      { malay: "perbicaraan", english: "trial", partOfSpeech: "noun" },
      { malay: "saksi", english: "witness", partOfSpeech: "noun" },
      { malay: "rayuan", english: "appeal", partOfSpeech: "noun" },
      { malay: "jabatan", english: "department", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-sains-kajian",
    title: "Sains dan Penyelidikan",
    description: "Kembangkan bahasa untuk kajian, data, teori, dan eksperimen.",
    themeMalay: "sains dan penyelidikan",
    themeEnglish: "science and research",
    color: "#1d3557",
    accent: "#a8dadc",
    icon: "🔬",
    words: [
      { malay: "hipotesis", english: "hypothesis", partOfSpeech: "noun" },
      { malay: "teori", english: "theory", partOfSpeech: "noun" },
      { malay: "eksperimen", english: "experiment", partOfSpeech: "noun" },
      { malay: "data", english: "data", partOfSpeech: "noun" },
      { malay: "analisis", english: "analysis", partOfSpeech: "noun" },
      { malay: "penyelidikan", english: "research", partOfSpeech: "noun" },
      { malay: "penemuan", english: "discovery", partOfSpeech: "noun" },
      { malay: "pemerhatian", english: "observation", partOfSpeech: "noun" },
      { malay: "pemboleh ubah", english: "variable", partOfSpeech: "noun" },
      { malay: "tenaga", english: "energy", partOfSpeech: "noun" },
      { malay: "jirim", english: "matter", partOfSpeech: "noun" },
      { malay: "molekul", english: "molecule", partOfSpeech: "noun" },
      { malay: "organisma", english: "organism", partOfSpeech: "noun" },
      { malay: "evolusi", english: "evolution", partOfSpeech: "noun" },
      { malay: "inovasi", english: "innovation", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-alam-iklim",
    title: "Alam Sekitar dan Iklim",
    description: "Belajar istilah untuk pencemaran, pemuliharaan, dan perubahan iklim.",
    themeMalay: "alam sekitar",
    themeEnglish: "the environment",
    color: "#386641",
    accent: "#dad7cd",
    icon: "🌍",
    words: [
      { malay: "ekosistem", english: "ecosystem", partOfSpeech: "noun" },
      { malay: "pencemaran", english: "pollution", partOfSpeech: "noun" },
      { malay: "pemuliharaan", english: "conservation", partOfSpeech: "noun" },
      { malay: "biodiversiti", english: "biodiversity", partOfSpeech: "noun" },
      { malay: "karbon", english: "carbon", partOfSpeech: "noun" },
      { malay: "iklim", english: "climate", partOfSpeech: "noun" },
      { malay: "kemarau", english: "drought", partOfSpeech: "noun" },
      { malay: "banjir", english: "flood", partOfSpeech: "noun" },
      { malay: "pembalakan", english: "logging", partOfSpeech: "noun" },
      { malay: "kitar semula", english: "recycling", partOfSpeech: "noun" },
      { malay: "sisa pepejal", english: "solid waste", partOfSpeech: "noun" },
      { malay: "tenaga boleh baharu", english: "renewable energy", partOfSpeech: "noun" },
      { malay: "pemanasan global", english: "global warming", partOfSpeech: "noun" },
      { malay: "sungai", english: "river", partOfSpeech: "noun" },
      { malay: "lautan", english: "ocean", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-kesihatan-awam-lanjut",
    title: "Kesihatan Awam",
    description: "Masuk ke bahasa wabak, rawatan, pencegahan, dan kesejahteraan.",
    themeMalay: "kesihatan awam",
    themeEnglish: "public health",
    color: "#9d0208",
    accent: "#ffba08",
    icon: "🩺",
    words: [
      { malay: "wabak", english: "outbreak", partOfSpeech: "noun" },
      { malay: "jangkitan", english: "infection", partOfSpeech: "noun" },
      { malay: "vaksin", english: "vaccine", partOfSpeech: "noun" },
      { malay: "rawatan", english: "treatment", partOfSpeech: "noun" },
      { malay: "pencegahan", english: "prevention", partOfSpeech: "noun" },
      { malay: "tekanan", english: "stress", partOfSpeech: "noun" },
      { malay: "pemakanan", english: "nutrition", partOfSpeech: "noun" },
      { malay: "senaman", english: "exercise", partOfSpeech: "noun" },
      { malay: "kesihatan mental", english: "mental health", partOfSpeech: "noun" },
      { malay: "gejala", english: "symptom", partOfSpeech: "noun" },
      { malay: "diagnosis", english: "diagnosis", partOfSpeech: "noun" },
      { malay: "pemulihan", english: "recovery", partOfSpeech: "noun" },
      { malay: "risiko", english: "risk", partOfSpeech: "noun" },
      { malay: "pesakit", english: "patient", partOfSpeech: "noun" },
      { malay: "doktor pakar", english: "specialist doctor", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-pendidikan-lanjut",
    title: "Pembelajaran Lanjutan",
    description: "Tambah bahasa untuk hujah, tafsiran, penilaian, dan sintesis.",
    themeMalay: "pembelajaran lanjutan",
    themeEnglish: "advanced study",
    color: "#3a0ca3",
    accent: "#bde0fe",
    icon: "🎓",
    words: [
      { malay: "tafsiran", english: "interpretation", partOfSpeech: "noun" },
      { malay: "kesusasteraan", english: "literature", partOfSpeech: "noun" },
      { malay: "karangan", english: "essay", partOfSpeech: "noun" },
      { malay: "perbahasan", english: "debate", partOfSpeech: "noun" },
      { malay: "analisis kritis", english: "critical analysis", partOfSpeech: "noun" },
      { malay: "kosa kata", english: "vocabulary", partOfSpeech: "noun" },
      { malay: "pemahaman", english: "comprehension", partOfSpeech: "noun" },
      { malay: "rujukan", english: "reference", partOfSpeech: "noun" },
      { malay: "bibliografi", english: "bibliography", partOfSpeech: "noun" },
      { malay: "pembentangan", english: "presentation", partOfSpeech: "noun" },
      { malay: "penilaian", english: "evaluation", partOfSpeech: "noun" },
      { malay: "kesahan", english: "validity", partOfSpeech: "noun" },
      { malay: "ketepatan", english: "accuracy", partOfSpeech: "noun" },
      { malay: "hujah balas", english: "counterargument", partOfSpeech: "noun" },
      { malay: "sintesis", english: "synthesis", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-budaya-identiti-lanjut",
    title: "Budaya dan Identiti",
    description: "Buka kosa kata untuk warisan, adat, bahasa, dan kepelbagaian.",
    themeMalay: "budaya dan identiti",
    themeEnglish: "culture and identity",
    color: "#7a2e1f",
    accent: "#ffd6a5",
    icon: "🪭",
    words: [
      { malay: "warisan", english: "heritage", partOfSpeech: "noun" },
      { malay: "tradisi", english: "tradition", partOfSpeech: "noun" },
      { malay: "adat", english: "custom", partOfSpeech: "noun" },
      { malay: "bahasa ibunda", english: "mother tongue", partOfSpeech: "noun" },
      { malay: "identiti", english: "identity", partOfSpeech: "noun" },
      { malay: "kepelbagaian", english: "diversity", partOfSpeech: "noun" },
      { malay: "etnik", english: "ethnicity", partOfSpeech: "noun" },
      { malay: "seni halus", english: "fine arts", partOfSpeech: "noun" },
      { malay: "budaya popular", english: "popular culture", partOfSpeech: "noun" },
      { malay: "muzik tradisional", english: "traditional music", partOfSpeech: "noun" },
      { malay: "perayaan", english: "festival", partOfSpeech: "noun" },
      { malay: "nilai murni", english: "moral values", partOfSpeech: "noun" },
      { malay: "kepercayaan", english: "belief", partOfSpeech: "noun" },
      { malay: "agama", english: "religion", partOfSpeech: "noun" },
      { malay: "sejarah lisan", english: "oral history", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-media-digital-lanjut",
    title: "Media Digital",
    description: "Tambah istilah moden untuk privasi, akaun, kandungan, dan rangkaian.",
    themeMalay: "media digital",
    themeEnglish: "digital media",
    color: "#0f4c5c",
    accent: "#f1faee",
    icon: "💻",
    words: [
      { malay: "algoritma", english: "algorithm", partOfSpeech: "noun" },
      { malay: "privasi", english: "privacy", partOfSpeech: "noun" },
      { malay: "akaun digital", english: "digital account", partOfSpeech: "noun" },
      { malay: "keselamatan siber", english: "cybersecurity", partOfSpeech: "noun" },
      { malay: "rangkaian", english: "network", partOfSpeech: "noun" },
      { malay: "kandungan", english: "content", partOfSpeech: "noun" },
      { malay: "penyuntingan", english: "editing", partOfSpeech: "noun" },
      { malay: "siaran langsung", english: "livestream", partOfSpeech: "noun" },
      { malay: "tontonan", english: "viewership", partOfSpeech: "noun" },
      { malay: "aliran semasa", english: "current trend", partOfSpeech: "noun" },
      { malay: "muat turun", english: "download", partOfSpeech: "noun" },
      { malay: "muat naik", english: "upload", partOfSpeech: "noun" },
      { malay: "capaian", english: "access", partOfSpeech: "noun" },
      { malay: "paparan", english: "display", partOfSpeech: "noun" },
      { malay: "penggunaan data", english: "data usage", partOfSpeech: "noun" }
    ]
  },
  {
    id: "unit-antarabangsa-lanjut",
    title: "Hubungan Antarabangsa",
    description: "Gunakan bahasa untuk diplomasi, konflik, bantuan, dan keamanan.",
    themeMalay: "hubungan antarabangsa",
    themeEnglish: "international relations",
    color: "#003049",
    accent: "#f77f00",
    icon: "🌐",
    words: [
      { malay: "diplomasi", english: "diplomacy", partOfSpeech: "noun" },
      { malay: "sempadan", english: "border", partOfSpeech: "noun" },
      { malay: "konflik", english: "conflict", partOfSpeech: "noun" },
      { malay: "rundingan", english: "negotiation", partOfSpeech: "noun" },
      { malay: "perdagangan", english: "trade", partOfSpeech: "noun" },
      { malay: "pakatan", english: "alliance", partOfSpeech: "noun" },
      { malay: "bantuan kemanusiaan", english: "humanitarian aid", partOfSpeech: "noun" },
      { malay: "pelarian", english: "refugee", partOfSpeech: "noun" },
      { malay: "krisis", english: "crisis", partOfSpeech: "noun" },
      { malay: "sekatan", english: "sanctions", partOfSpeech: "noun" },
      { malay: "keamanan", english: "peace", partOfSpeech: "noun" },
      { malay: "perjanjian", english: "agreement", partOfSpeech: "noun" },
      { malay: "kerjasama serantau", english: "regional cooperation", partOfSpeech: "noun" },
      { malay: "cabaran global", english: "global challenge", partOfSpeech: "noun" },
      { malay: "hubungan dua hala", english: "bilateral relations", partOfSpeech: "noun" }
    ]
  }
];

let lessonNumber = 251;

const generated = domains.map((domain) => {
  const domainTag = domain.id.replace(/^unit-/, "");
  const lexemes = domain.words.map((word) =>
    lexeme(
      `lx-${domainTag}-${slugify(word.malay)}`,
      word.malay,
      [word.english],
      word.partOfSpeech,
      [domainTag, "expansion", "advanced"]
    )
  );

  const phrases = lexemes.flatMap((item) =>
    phraseTemplates.map((template) =>
      phrase(
        `ph-${domainTag}-${slugify(item.malay)}-${template.suffix}`,
        template.malay(item.malay, domain),
        [template.english(item.english[0], domain)],
        [domainTag, "expansion", "phrase"],
        [item.id],
        domain.title,
        {
          malayHint: template.hint(item.malay)
        }
      )
    )
  );

  const lexemeLessons = chunk(lexemes.map((item) => item.id), 8).map((targetItemIds, index) =>
    lesson(
      `lesson-${lessonNumber++}`,
      domain.id,
      `Istilah ${index + 1}`,
      `Kuasai kosa kata ${domain.title.toLocaleLowerCase("ms-MY")} bahagian ${index + 1}.`,
      targetItemIds
    )
  );

  const phraseLessons = chunk(phrases.map((item) => item.id), 8).map((targetItemIds, index) =>
    lesson(
      `lesson-${lessonNumber++}`,
      domain.id,
      `Frasa ${index + 1}`,
      `Gunakan frasa ${domain.title.toLocaleLowerCase("ms-MY")} bahagian ${index + 1}.`,
      targetItemIds
    )
  );

  const unit: Unit = {
    id: domain.id,
    title: domain.title,
    description: domain.description,
    color: domain.color,
    accent: domain.accent,
    icon: domain.icon,
    lessonIds: [...lexemeLessons, ...phraseLessons].map((entry) => entry.id)
  };

  return {
    items: [...lexemes, ...phrases],
    lessons: [...lexemeLessons, ...phraseLessons],
    unit
  };
});

export const expansionPackItems: CourseItem[] = generated.flatMap((entry) => entry.items);
export const expansionPackLessons: Lesson[] = generated.flatMap((entry) => entry.lessons);
export const expansionPackUnits: Unit[] = generated.map((entry) => entry.unit);
