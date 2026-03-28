import type { CourseItem, ExerciseType, Lesson, Lexeme, Unit } from "../types";

interface HeadSeed {
  malay: string;
  english: string;
}

interface ModifierSeed {
  malay: string;
  english: string;
}

interface DomainSeed {
  id: string;
  title: string;
  english: string;
  description: string;
  color: string;
  accent: string;
  icon: string;
  modifiers: ModifierSeed[];
}

const defaultTemplates: ExerciseType[] = [
  "recognition",
  "reverse-recognition",
  "typed",
  "word-bank",
  "pair-match"
];

const heads: HeadSeed[] = [
  { malay: "struktur", english: "structure" },
  { malay: "fungsi", english: "function" },
  { malay: "makna", english: "meaning" },
  { malay: "pola", english: "pattern" },
  { malay: "penggunaan", english: "usage" },
  { malay: "analisis", english: "analysis" },
  { malay: "contoh", english: "example" },
  { malay: "ciri", english: "feature" },
  { malay: "kategori", english: "category" },
  { malay: "bentuk", english: "form" },
  { malay: "variasi", english: "variation" },
  { malay: "unsur", english: "element" },
  { malay: "hubungan", english: "relation" },
  { malay: "konteks", english: "context" },
  { malay: "peranan", english: "role" },
  { malay: "tafsiran", english: "interpretation" }
];

const lexeme = (
  id: string,
  malay: string,
  english: string[],
  tags: string[],
  extra: Partial<Lexeme> = {}
): Lexeme => ({
  id,
  kind: "lexeme",
  malay,
  english,
  acceptedAnswers: [malay, ...(extra.acceptedAnswers ?? [])],
  partOfSpeech: "noun",
  tags,
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
  masteryThreshold: 0.72,
  exerciseTemplates: [...defaultTemplates],
  xpReward: 21
});

const slugify = (value: string) =>
  value
    .toLocaleLowerCase("ms-MY")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

const chunk = <T,>(values: T[], size: number) => {
  const groups: T[][] = [];

  for (let index = 0; index < values.length; index += size) {
    groups.push(values.slice(index, index + size));
  }

  return groups;
};

const buildEnglishGloss = (head: HeadSeed, domain: DomainSeed, modifier: ModifierSeed) =>
  `${head.english} of ${domain.english}: ${modifier.english}`;

const buildMalayHint = (head: HeadSeed, domain: DomainSeed, modifier: ModifierSeed) =>
  `${head.malay} untuk ${domain.title.toLocaleLowerCase("ms-MY")} ${modifier.malay}`;

const domains: DomainSeed[] = [
  {
    id: "unit-linguistics-morfem",
    title: "Morfem",
    english: "morpheme",
    description: "Istilah lanjut untuk bentuk, fungsi, dan analisis morfem.",
    color: "#264653",
    accent: "#f4a261",
    icon: "🧩",
    modifiers: [
      { malay: "bebas", english: "free" },
      { malay: "terikat", english: "bound" },
      { malay: "akar", english: "root" },
      { malay: "dasar", english: "base" },
      { malay: "awalan", english: "prefix" },
      { malay: "akhiran", english: "suffix" },
      { malay: "apitan", english: "circumfix" },
      { malay: "sisipan", english: "infix" },
      { malay: "derivasi", english: "derivational" },
      { malay: "gramatis", english: "grammatical" },
      { malay: "leksikal", english: "lexical" },
      { malay: "produktif", english: "productive" },
      { malay: "tidak produktif", english: "non-productive" },
      { malay: "fonologi", english: "phonological" },
      { malay: "semantik", english: "semantic" },
      { malay: "varian", english: "variant" }
    ]
  },
  {
    id: "unit-linguistics-kata",
    title: "Kata",
    english: "word",
    description: "Kembangkan kosa istilah tentang kata sebagai unit bahasa.",
    color: "#1d3557",
    accent: "#a8dadc",
    icon: "🔤",
    modifiers: [
      { malay: "umum", english: "general" },
      { malay: "khusus", english: "specific" },
      { malay: "abstrak", english: "abstract" },
      { malay: "konkrit", english: "concrete" },
      { malay: "lisan", english: "spoken" },
      { malay: "tulisan", english: "written" },
      { malay: "standard", english: "standard" },
      { malay: "dialek", english: "dialectal" },
      { malay: "formal", english: "formal" },
      { malay: "tidak formal", english: "informal" },
      { malay: "pinjaman", english: "loan" },
      { malay: "serapan", english: "borrowed" },
      { malay: "kekerapan tinggi", english: "high-frequency" },
      { malay: "kekerapan rendah", english: "low-frequency" },
      { malay: "baharu", english: "new" },
      { malay: "lama", english: "old" }
    ]
  },
  {
    id: "unit-linguistics-leksem",
    title: "Leksem",
    english: "lexeme",
    description: "Belajar istilah untuk keluarga bentuk dan makna leksem.",
    color: "#4a4e69",
    accent: "#f2cc8f",
    icon: "📘",
    modifiers: [
      { malay: "teras", english: "core" },
      { malay: "terbitan", english: "derived" },
      { malay: "varian", english: "variant" },
      { malay: "polisemi", english: "polysemous" },
      { malay: "homonim", english: "homonymous" },
      { malay: "sinonim", english: "synonymous" },
      { malay: "antonim", english: "antonymous" },
      { malay: "aktif", english: "active" },
      { malay: "pasif", english: "passive" },
      { malay: "baku", english: "standardized" },
      { malay: "kolokial", english: "colloquial" },
      { malay: "teknikal", english: "technical" },
      { malay: "sastera", english: "literary" },
      { malay: "register tinggi", english: "high-register" },
      { malay: "register biasa", english: "neutral-register" },
      { malay: "makna luas", english: "broad-meaning" }
    ]
  },
  {
    id: "unit-linguistics-frasa",
    title: "Frasa",
    english: "phrase",
    description: "Tambahkan istilah analisis untuk frasa dalam tatabahasa.",
    color: "#355070",
    accent: "#f28482",
    icon: "🧱",
    modifiers: [
      { malay: "nama", english: "noun" },
      { malay: "kerja", english: "verb" },
      { malay: "adjektif", english: "adjective" },
      { malay: "sendi nama", english: "prepositional" },
      { malay: "inti", english: "head" },
      { malay: "penerang", english: "modifier" },
      { malay: "endosentrik", english: "endocentric" },
      { malay: "eksosentrik", english: "exocentric" },
      { malay: "mudah", english: "simple" },
      { malay: "kompleks", english: "complex" },
      { malay: "koordinatif", english: "coordinative" },
      { malay: "atributif", english: "attributive" },
      { malay: "predikatif", english: "predicative" },
      { malay: "tetap", english: "fixed" },
      { malay: "bebas", english: "free" },
      { malay: "idiomatik", english: "idiomatic" }
    ]
  },
  {
    id: "unit-linguistics-klausa",
    title: "Klausa",
    english: "clause",
    description: "Istilah klausa untuk subjek, predikat, dan hubungan sintaksis.",
    color: "#3d405b",
    accent: "#81b29a",
    icon: "🪢",
    modifiers: [
      { malay: "bebas", english: "independent" },
      { malay: "terikat", english: "dependent" },
      { malay: "utama", english: "main" },
      { malay: "pancangan", english: "subordinate" },
      { malay: "relatif", english: "relative" },
      { malay: "komplemen", english: "complement" },
      { malay: "keterangan", english: "adverbial" },
      { malay: "aktif", english: "active" },
      { malay: "pasif", english: "passive" },
      { malay: "transitif", english: "transitive" },
      { malay: "tak transitif", english: "intransitive" },
      { malay: "nominal", english: "nominal" },
      { malay: "adjektival", english: "adjectival" },
      { malay: "paralel", english: "parallel" },
      { malay: "gabungan", english: "combined" },
      { malay: "diselangi", english: "interrupted" }
    ]
  },
  {
    id: "unit-linguistics-ayat",
    title: "Ayat",
    english: "sentence",
    description: "Bangunkan kosa istilah untuk jenis dan binaan ayat.",
    color: "#5f0f40",
    accent: "#ffb703",
    icon: "✍️",
    modifiers: [
      { malay: "penyata", english: "declarative" },
      { malay: "tanya", english: "interrogative" },
      { malay: "perintah", english: "imperative" },
      { malay: "seruan", english: "exclamative" },
      { malay: "mudah", english: "simple" },
      { malay: "majmuk", english: "compound" },
      { malay: "songsang", english: "inverted" },
      { malay: "aktif", english: "active" },
      { malay: "pasif", english: "passive" },
      { malay: "transitif", english: "transitive" },
      { malay: "tak transitif", english: "intransitive" },
      { malay: "gramatis", english: "grammatical" },
      { malay: "retorik", english: "rhetorical" },
      { malay: "ringkas", english: "concise" },
      { malay: "panjang", english: "extended" },
      { malay: "baku", english: "standard" }
    ]
  },
  {
    id: "unit-linguistics-wacana",
    title: "Wacana",
    english: "discourse",
    description: "Wacana, kohesi, koheren, dan analisis teks yang lebih luas.",
    color: "#003049",
    accent: "#fb8500",
    icon: "🗂️",
    modifiers: [
      { malay: "naratif", english: "narrative" },
      { malay: "deskriptif", english: "descriptive" },
      { malay: "ekspositori", english: "expository" },
      { malay: "argumentatif", english: "argumentative" },
      { malay: "persuasif", english: "persuasive" },
      { malay: "kohesi", english: "cohesive" },
      { malay: "koheren", english: "coherent" },
      { malay: "formal", english: "formal" },
      { malay: "tidak formal", english: "informal" },
      { malay: "lisan", english: "spoken" },
      { malay: "tulisan", english: "written" },
      { malay: "akademik", english: "academic" },
      { malay: "media", english: "media" },
      { malay: "digital", english: "digital" },
      { malay: "antarapersona", english: "interpersonal" },
      { malay: "kritikal", english: "critical" }
    ]
  },
  {
    id: "unit-linguistics-kata-tunggal",
    title: "Kata Tunggal",
    english: "simple word",
    description: "Istilah bagi kata tunggal dan penggunaannya dalam konteks.",
    color: "#2a9d8f",
    accent: "#e9c46a",
    icon: "1",
    modifiers: [
      { malay: "asal", english: "basic" },
      { malay: "baku", english: "standard" },
      { malay: "kolokial", english: "colloquial" },
      { malay: "umum", english: "general" },
      { malay: "khusus", english: "specific" },
      { malay: "abstrak", english: "abstract" },
      { malay: "konkrit", english: "concrete" },
      { malay: "aktif", english: "active" },
      { malay: "jarang", english: "rare" },
      { malay: "lazim", english: "common" },
      { malay: "teknikal", english: "technical" },
      { malay: "sastera", english: "literary" },
      { malay: "pinjaman", english: "loan" },
      { malay: "serapan", english: "borrowed" },
      { malay: "tempatan", english: "local" },
      { malay: "baharu", english: "new" }
    ]
  },
  {
    id: "unit-linguistics-kata-terbitan",
    title: "Kata Terbitan",
    english: "derived word",
    description: "Pelajari jenis, imbuhan, dan fungsi kata terbitan.",
    color: "#457b9d",
    accent: "#ffd166",
    icon: "➕",
    modifiers: [
      { malay: "berawalan", english: "prefixed" },
      { malay: "berakhiran", english: "suffixed" },
      { malay: "berapitan", english: "circumfixed" },
      { malay: "bersisipan", english: "infixed" },
      { malay: "nominal", english: "nominal" },
      { malay: "verbal", english: "verbal" },
      { malay: "adjektival", english: "adjectival" },
      { malay: "adverbal", english: "adverbial" },
      { malay: "produktif", english: "productive" },
      { malay: "tidak produktif", english: "non-productive" },
      { malay: "makna baharu", english: "new-meaning" },
      { malay: "makna gramatis", english: "grammatical-meaning" },
      { malay: "bentuk kompleks", english: "complex-form" },
      { malay: "bentuk lazim", english: "common-form" },
      { malay: "asal Melayu", english: "native-Malay" },
      { malay: "pinjaman", english: "borrowed-base" }
    ]
  },
  {
    id: "unit-linguistics-kata-majmuk",
    title: "Kata Majmuk",
    english: "compound word",
    description: "Jenis dan pola pembentukan kata majmuk yang lebih luas.",
    color: "#6d597a",
    accent: "#f28482",
    icon: "🔗",
    modifiers: [
      { malay: "mantap", english: "established" },
      { malay: "bebas", english: "open" },
      { malay: "rangkai kata", english: "phrase-like" },
      { malay: "istilah khusus", english: "technical-term" },
      { malay: "kiasan", english: "figurative" },
      { malay: "nama khas", english: "proper-name" },
      { malay: "umum", english: "general" },
      { malay: "teknikal", english: "technical" },
      { malay: "sains", english: "scientific" },
      { malay: "pentadbiran", english: "administrative" },
      { malay: "budaya", english: "cultural" },
      { malay: "media", english: "media" },
      { malay: "baharu", english: "new" },
      { malay: "tradisional", english: "traditional" },
      { malay: "rapat", english: "tight-form" },
      { malay: "longgar", english: "loose-form" }
    ]
  },
  {
    id: "unit-linguistics-kata-ganda",
    title: "Kata Ganda",
    english: "reduplicated word",
    description: "Variasi bentuk dan makna kata ganda dalam Bahasa Melayu.",
    color: "#9a031e",
    accent: "#fb8b24",
    icon: "🔁",
    modifiers: [
      { malay: "penuh", english: "full" },
      { malay: "separa", english: "partial" },
      { malay: "berentak", english: "rhythmic" },
      { malay: "berimbuhan", english: "affixed" },
      { malay: "nama", english: "nominal" },
      { malay: "kerja", english: "verbal" },
      { malay: "adjektif", english: "adjectival" },
      { malay: "penegas", english: "emphatic" },
      { malay: "jamak", english: "pluralizing" },
      { malay: "bermakna pelbagai", english: "varied-meaning" },
      { malay: "kolokial", english: "colloquial" },
      { malay: "sastera", english: "literary" },
      { malay: "lazim", english: "common" },
      { malay: "jarang", english: "rare" },
      { malay: "baharu", english: "recent" },
      { malay: "lama", english: "older" }
    ]
  },
  {
    id: "unit-linguistics-kata-nama",
    title: "Kata Nama",
    english: "noun",
    description: "Kata nama am, khas, konkrit, abstrak, dan sebagainya.",
    color: "#588157",
    accent: "#dad7cd",
    icon: "🏷️",
    modifiers: [
      { malay: "am", english: "common" },
      { malay: "khas", english: "proper" },
      { malay: "hidup", english: "animate" },
      { malay: "tak hidup", english: "inanimate" },
      { malay: "konkrit", english: "concrete" },
      { malay: "abstrak", english: "abstract" },
      { malay: "tempat", english: "place" },
      { malay: "masa", english: "time" },
      { malay: "institusi", english: "institution" },
      { malay: "gelaran", english: "title" },
      { malay: "kolektif", english: "collective" },
      { malay: "bilangan", english: "countable" },
      { malay: "tidak terhitung", english: "uncountable" },
      { malay: "pinjaman", english: "loan" },
      { malay: "teknikal", english: "technical" },
      { malay: "budaya", english: "cultural" }
    ]
  },
  {
    id: "unit-linguistics-kata-kerja",
    title: "Kata Kerja",
    english: "verb",
    description: "Kata kerja transitif, tak transitif, aktif, dan pasif.",
    color: "#1f7a8c",
    accent: "#bfdbf7",
    icon: "⚙️",
    modifiers: [
      { malay: "transitif", english: "transitive" },
      { malay: "tak transitif", english: "intransitive" },
      { malay: "aktif", english: "active" },
      { malay: "pasif", english: "passive" },
      { malay: "tindakan", english: "action" },
      { malay: "keadaan", english: "stative" },
      { malay: "bantu", english: "auxiliary" },
      { malay: "modal", english: "modal" },
      { malay: "berimbuhan", english: "affixed" },
      { malay: "asal", english: "basic" },
      { malay: "kausatif", english: "causative" },
      { malay: "refleksif", english: "reflexive" },
      { malay: "resiprokal", english: "reciprocal" },
      { malay: "formal", english: "formal" },
      { malay: "kolokial", english: "colloquial" },
      { malay: "teknikal", english: "technical" }
    ]
  },
  {
    id: "unit-linguistics-kata-adjektif",
    title: "Kata Adjektif",
    english: "adjective",
    description: "Istilah untuk sifat, ukuran, warna, dan nilai adjektif.",
    color: "#bc4749",
    accent: "#f2e8cf",
    icon: "🎨",
    modifiers: [
      { malay: "sifat", english: "quality" },
      { malay: "warna", english: "color" },
      { malay: "ukuran", english: "size" },
      { malay: "bentuk", english: "shape" },
      { malay: "jarak", english: "distance" },
      { malay: "masa", english: "time" },
      { malay: "pancaindera", english: "sensory" },
      { malay: "emosi", english: "emotional" },
      { malay: "nilai", english: "evaluative" },
      { malay: "perbandingan", english: "comparative" },
      { malay: "intensiti", english: "intensity" },
      { malay: "mutlak", english: "absolute" },
      { malay: "gradabel", english: "gradable" },
      { malay: "predikatif", english: "predicative" },
      { malay: "atributif", english: "attributive" },
      { malay: "sastera", english: "literary" }
    ]
  },
  {
    id: "unit-linguistics-kata-tugas",
    title: "Kata Tugas",
    english: "function word",
    description: "Fokus pada partikel, hubung, penegas, dan kata tugas lain.",
    color: "#6c757d",
    accent: "#ffd6a5",
    icon: "🧰",
    modifiers: [
      { malay: "hubung", english: "conjunction" },
      { malay: "sendi nama", english: "preposition" },
      { malay: "bantu", english: "helper" },
      { malay: "pembenar", english: "affirmative" },
      { malay: "nafi", english: "negative" },
      { malay: "penegas", english: "emphatic" },
      { malay: "tanya", english: "interrogative" },
      { malay: "seru", english: "exclamatory" },
      { malay: "arah", english: "directive" },
      { malay: "pembatas", english: "limiting" },
      { malay: "pemeri", english: "copular" },
      { malay: "bilangan", english: "numeral" },
      { malay: "penekan", english: "focus" },
      { malay: "wacana", english: "discourse" },
      { malay: "modaliti", english: "modality" },
      { malay: "pembanding", english: "comparative-marker" }
    ]
  },
  {
    id: "unit-linguistics-simpulan-bahasa",
    title: "Simpulan Bahasa",
    english: "idiomatic expression",
    description: "Istilah analisis dan kategori untuk simpulan bahasa.",
    color: "#7f5539",
    accent: "#ddb892",
    icon: "💬",
    modifiers: [
      { malay: "haiwan", english: "animal-themed" },
      { malay: "anggota badan", english: "body-themed" },
      { malay: "kerja", english: "work-themed" },
      { malay: "emosi", english: "emotion-themed" },
      { malay: "hubungan", english: "relationship-themed" },
      { malay: "rezeki", english: "livelihood-themed" },
      { malay: "sifat", english: "character-themed" },
      { malay: "keadaan", english: "state-themed" },
      { malay: "nasihat", english: "advisory" },
      { malay: "kritikan", english: "critical" },
      { malay: "budaya", english: "cultural" },
      { malay: "harian", english: "daily-life" },
      { malay: "pendidikan", english: "education-themed" },
      { malay: "kiasan", english: "figurative" },
      { malay: "lama", english: "traditional" },
      { malay: "baharu", english: "modern" }
    ]
  },
  {
    id: "unit-linguistics-perumpamaan",
    title: "Perumpamaan",
    english: "simile proverb",
    description: "Tambah kosa istilah tentang perumpamaan dan bentuk kiasan.",
    color: "#9c6644",
    accent: "#ede0d4",
    icon: "🪞",
    modifiers: [
      { malay: "alam", english: "nature-themed" },
      { malay: "haiwan", english: "animal-themed" },
      { malay: "manusia", english: "human-themed" },
      { malay: "kerja", english: "work-themed" },
      { malay: "keluarga", english: "family-themed" },
      { malay: "masyarakat", english: "society-themed" },
      { malay: "nasihat", english: "advisory" },
      { malay: "sindiran", english: "satirical" },
      { malay: "perbandingan", english: "comparative" },
      { malay: "nilai murni", english: "moral-value" },
      { malay: "budaya", english: "cultural" },
      { malay: "tingkah laku", english: "behavior-themed" },
      { malay: "keadaan", english: "state-themed" },
      { malay: "tradisional", english: "traditional" },
      { malay: "pembelajaran", english: "learning-themed" },
      { malay: "kehidupan", english: "life-themed" }
    ]
  },
  {
    id: "unit-linguistics-pepatah",
    title: "Pepatah",
    english: "proverbial saying",
    description: "Pepatah sebagai wacana ringkas yang membawa nilai dan panduan.",
    color: "#6f1d1b",
    accent: "#ffe6a7",
    icon: "📜",
    modifiers: [
      { malay: "nasihat", english: "advisory" },
      { malay: "kepimpinan", english: "leadership-themed" },
      { malay: "kerjasama", english: "cooperation-themed" },
      { malay: "usaha", english: "effort-themed" },
      { malay: "ilmu", english: "knowledge-themed" },
      { malay: "masa", english: "time-themed" },
      { malay: "masyarakat", english: "society-themed" },
      { malay: "keluarga", english: "family-themed" },
      { malay: "kebijaksanaan", english: "wisdom-themed" },
      { malay: "moral", english: "moral" },
      { malay: "pekerjaan", english: "work-themed" },
      { malay: "pendidikan", english: "education-themed" },
      { malay: "politik", english: "politics-themed" },
      { malay: "budaya", english: "cultural" },
      { malay: "tradisional", english: "traditional" },
      { malay: "kontemporari", english: "contemporary" }
    ]
  },
  {
    id: "unit-linguistics-bidalan",
    title: "Bidalan",
    english: "didactic proverb",
    description: "Bidalan dengan fokus pada ajaran, teguran, dan nilai hidup.",
    color: "#5a189a",
    accent: "#ffd6ff",
    icon: "🪶",
    modifiers: [
      { malay: "ajaran", english: "didactic" },
      { malay: "teguran", english: "reproachful" },
      { malay: "peringatan", english: "warning" },
      { malay: "nilai hidup", english: "life-value" },
      { malay: "disiplin", english: "discipline-themed" },
      { malay: "kesederhanaan", english: "moderation-themed" },
      { malay: "kejujuran", english: "honesty-themed" },
      { malay: "usaha", english: "effort-themed" },
      { malay: "akhlak", english: "ethics-themed" },
      { malay: "pengalaman", english: "experience-themed" },
      { malay: "hubungan", english: "relationship-themed" },
      { malay: "masyarakat", english: "society-themed" },
      { malay: "keluarga", english: "family-themed" },
      { malay: "sekolah", english: "school-themed" },
      { malay: "tradisional", english: "traditional" },
      { malay: "tafsiran moden", english: "modern-interpretation" }
    ]
  }
];

let lessonNumber = 911;

const generated = domains.map((domain, domainIndex) => {
  const domainTag = domain.id.replace(/^unit-/, "");
  const difficultyTag =
    domainIndex < 7 ? "upper-advanced" : domainIndex < 14 ? "specialized" : "immersion";

  const items = domain.modifiers.flatMap((modifier) =>
    heads.map((head) =>
      lexeme(
        `lx-${domainTag}-${slugify(head.malay)}-${slugify(modifier.malay)}`,
        `${head.malay} ${domain.title.toLocaleLowerCase("ms-MY")} ${modifier.malay}`,
        [buildEnglishGloss(head, domain, modifier)],
        [domainTag, "linguistics-pack", difficultyTag],
        {
          malayHint: buildMalayHint(head, domain, modifier)
        }
      )
    )
  );

  const lessons = chunk(
    items.map((item) => item.id),
    8
  ).map((targetItemIds, index) =>
    lesson(
      `lesson-${lessonNumber++}`,
      domain.id,
      `${domain.title} ${index + 1}`,
      `Kembangkan istilah ${domain.title.toLocaleLowerCase("ms-MY")} bahagian ${index + 1}.`,
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
    lessonIds: lessons.map((entry) => entry.id)
  };

  return {
    items,
    lessons,
    unit
  };
});

export const linguisticsPackItems: CourseItem[] = generated.flatMap((entry) => entry.items);
export const linguisticsPackLessons: Lesson[] = generated.flatMap((entry) => entry.lessons);
export const linguisticsPackUnits: Unit[] = generated.map((entry) => entry.unit);
