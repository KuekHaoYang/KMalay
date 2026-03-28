import type { CourseItem, ExerciseType, Lesson, Lexeme, Unit } from "../types";

interface HeadSeed {
  malay: string;
  english: string;
  malayHintLead: string;
}

interface ModifierSeed {
  malay: string;
  english: string;
}

interface DomainSeed {
  id: string;
  title: string;
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

const genericHeads: HeadSeed[] = [
  { malay: "analisis", english: "analysis", malayHintLead: "kajian" },
  { malay: "dasar", english: "policy", malayHintLead: "dasar" },
  { malay: "strategi", english: "strategy", malayHintLead: "rancangan strategik" },
  { malay: "pelan", english: "plan", malayHintLead: "pelan tindakan" },
  { malay: "program", english: "program", malayHintLead: "program" },
  { malay: "model", english: "model", malayHintLead: "model" },
  { malay: "agenda", english: "agenda", malayHintLead: "agenda utama" },
  { malay: "indikator", english: "indicator", malayHintLead: "petunjuk" },
  { malay: "rangka", english: "framework", malayHintLead: "rangka kerja" },
  { malay: "pendekatan", english: "approach", malayHintLead: "pendekatan" },
  { malay: "struktur", english: "structure", malayHintLead: "struktur" },
  { malay: "mekanisme", english: "mechanism", malayHintLead: "mekanisme" }
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
  xpReward: 20
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

const buildMalayHint = (head: HeadSeed, modifier: ModifierSeed) =>
  `${head.malayHintLead} tentang ${modifier.malay}`;

const buildEnglishGloss = (head: HeadSeed, modifier: ModifierSeed) =>
  `${modifier.english} ${head.english}`;

const domains: DomainSeed[] = [
  {
    id: "unit-mega-governance",
    title: "Governance & Public Systems",
    description: "Dense advanced policy, administration, and citizenship vocabulary.",
    color: "#274c77",
    accent: "#f4a261",
    icon: "🏛",
    modifiers: [
      { malay: "awam", english: "public" },
      { malay: "pentadbiran", english: "administrative" },
      { malay: "legislatif", english: "legislative" },
      { malay: "eksekutif", english: "executive" },
      { malay: "birokrasi", english: "bureaucratic" },
      { malay: "pilihan raya", english: "electoral" },
      { malay: "reformasi", english: "reform" },
      { malay: "tadbir urus", english: "governance" },
      { malay: "kepimpinan", english: "leadership" },
      { malay: "pengawasan", english: "oversight" },
      { malay: "perkhidmatan awam", english: "civil service" },
      { malay: "institusi", english: "institutional" },
      { malay: "persekutuan", english: "federal" },
      { malay: "negeri", english: "state" },
      { malay: "tempatan", english: "local" },
      { malay: "desentralisasi", english: "decentralization" },
      { malay: "akauntabiliti", english: "accountability" },
      { malay: "parlimen", english: "parliamentary" },
      { malay: "warganegara", english: "civic" },
      { malay: "partisipasi", english: "participatory" }
    ]
  },
  {
    id: "unit-mega-economics",
    title: "Economic Systems",
    description: "Expanded Malay for macro, trade, productivity, and labor topics.",
    color: "#2d6a4f",
    accent: "#95d5b2",
    icon: "📈",
    modifiers: [
      { malay: "pasaran", english: "market" },
      { malay: "inflasi", english: "inflation" },
      { malay: "fiskal", english: "fiscal" },
      { malay: "monetari", english: "monetary" },
      { malay: "pelaburan", english: "investment" },
      { malay: "perdagangan", english: "trade" },
      { malay: "permintaan", english: "demand" },
      { malay: "penawaran", english: "supply" },
      { malay: "perindustrian", english: "industrial" },
      { malay: "pengguna", english: "consumer" },
      { malay: "produktiviti", english: "productivity" },
      { malay: "persaingan", english: "competition" },
      { malay: "pertumbuhan", english: "growth" },
      { malay: "kemiskinan", english: "poverty" },
      { malay: "upah", english: "wage" },
      { malay: "harga", english: "price" },
      { malay: "eksport", english: "export" },
      { malay: "import", english: "import" },
      { malay: "pekerjaan", english: "employment" },
      { malay: "keusahawanan", english: "entrepreneurship" }
    ]
  },
  {
    id: "unit-mega-finance",
    title: "Finance & Accounting",
    description: "Advanced finance, bookkeeping, and reporting terms.",
    color: "#1b4332",
    accent: "#ffd166",
    icon: "💹",
    modifiers: [
      { malay: "akaun", english: "accounting" },
      { malay: "audit", english: "audit" },
      { malay: "cukai", english: "tax" },
      { malay: "bajet", english: "budget" },
      { malay: "hutang", english: "debt" },
      { malay: "aset", english: "asset" },
      { malay: "liabiliti", english: "liability" },
      { malay: "perbankan", english: "banking" },
      { malay: "pinjaman", english: "loan" },
      { malay: "kecairan", english: "liquidity" },
      { malay: "tunai", english: "cash" },
      { malay: "hasil", english: "revenue" },
      { malay: "perbelanjaan", english: "expenditure" },
      { malay: "risiko", english: "risk" },
      { malay: "simpanan", english: "savings" },
      { malay: "insurans", english: "insurance" },
      { malay: "pelaporan kewangan", english: "financial reporting" },
      { malay: "portfolio", english: "portfolio" },
      { malay: "dividen", english: "dividend" },
      { malay: "pelunasan", english: "repayment" }
    ]
  },
  {
    id: "unit-mega-education",
    title: "Education & Academia",
    description: "Academic vocabulary for pedagogy, assessment, and scholarship.",
    color: "#3a0ca3",
    accent: "#bde0fe",
    icon: "🎓",
    modifiers: [
      { malay: "kurikulum", english: "curriculum" },
      { malay: "pedagogi", english: "pedagogical" },
      { malay: "literasi", english: "literacy" },
      { malay: "numerasi", english: "numeracy" },
      { malay: "peperiksaan", english: "examination" },
      { malay: "pembelajaran", english: "learning" },
      { malay: "pengajaran", english: "teaching" },
      { malay: "universiti", english: "university" },
      { malay: "penyelidikan", english: "research" },
      { malay: "penilaian", english: "assessment" },
      { malay: "kokurikulum", english: "co-curricular" },
      { malay: "prasekolah", english: "preschool" },
      { malay: "menengah", english: "secondary-school" },
      { malay: "pengajian tinggi", english: "higher-education" },
      { malay: "bahasa", english: "language" },
      { malay: "sains", english: "science" },
      { malay: "matematik", english: "mathematics" },
      { malay: "sejarah", english: "history" },
      { malay: "rujukan", english: "reference" },
      { malay: "beasiswa", english: "scholarship" }
    ]
  },
  {
    id: "unit-mega-health",
    title: "Health & Medicine",
    description: "Medical, clinical, and public-health lexemes for advanced study.",
    color: "#9d0208",
    accent: "#ffba08",
    icon: "🩺",
    modifiers: [
      { malay: "diagnostik", english: "diagnostic" },
      { malay: "terapeutik", english: "therapeutic" },
      { malay: "klinikal", english: "clinical" },
      { malay: "epidemiologi", english: "epidemiological" },
      { malay: "vaksin", english: "vaccine" },
      { malay: "nutrisi", english: "nutritional" },
      { malay: "kesihatan mental", english: "mental-health" },
      { malay: "rawatan", english: "treatment" },
      { malay: "pencegahan", english: "prevention" },
      { malay: "pemulihan", english: "rehabilitation" },
      { malay: "kecemasan", english: "emergency" },
      { malay: "pembedahan", english: "surgical" },
      { malay: "farmasi", english: "pharmaceutical" },
      { malay: "pediatrik", english: "pediatric" },
      { malay: "geriatri", english: "geriatric" },
      { malay: "kesihatan komuniti", english: "community-health" },
      { malay: "kebersihan", english: "hygiene" },
      { malay: "penyakit berjangkit", english: "infectious-disease" },
      { malay: "penyakit kronik", english: "chronic-disease" },
      { malay: "ibu dan anak", english: "maternal-child" }
    ]
  },
  {
    id: "unit-mega-science",
    title: "Science & Research",
    description: "Scientific and methodological language far beyond the starter deck.",
    color: "#1d3557",
    accent: "#a8dadc",
    icon: "🔬",
    modifiers: [
      { malay: "eksperimen", english: "experimental" },
      { malay: "teori", english: "theoretical" },
      { malay: "hipotesis", english: "hypothesis" },
      { malay: "statistik", english: "statistical" },
      { malay: "molekul", english: "molecular" },
      { malay: "biologi", english: "biological" },
      { malay: "kimia", english: "chemical" },
      { malay: "fizik", english: "physical" },
      { malay: "astronomi", english: "astronomical" },
      { malay: "geologi", english: "geological" },
      { malay: "evolusi", english: "evolutionary" },
      { malay: "makmal", english: "laboratory" },
      { malay: "pemerhatian", english: "observational" },
      { malay: "pemboleh ubah", english: "variable" },
      { malay: "penemuan", english: "discovery" },
      { malay: "inovasi", english: "innovation" },
      { malay: "saintifik", english: "scientific" },
      { malay: "data", english: "data" },
      { malay: "inferens", english: "inferential" },
      { malay: "metodologi", english: "methodological" }
    ]
  },
  {
    id: "unit-mega-technology",
    title: "Technology & Computing",
    description: "Technical Malay for software, systems, and modern computing.",
    color: "#0f4c5c",
    accent: "#f1faee",
    icon: "💻",
    modifiers: [
      { malay: "perisian", english: "software" },
      { malay: "perkakasan", english: "hardware" },
      { malay: "algoritma", english: "algorithmic" },
      { malay: "rangkaian", english: "network" },
      { malay: "pangkalan data", english: "database" },
      { malay: "keselamatan siber", english: "cybersecurity" },
      { malay: "pengkomputeran awan", english: "cloud-computing" },
      { malay: "automasi", english: "automation" },
      { malay: "robotik", english: "robotics" },
      { malay: "pengaturcaraan", english: "programming" },
      { malay: "antara muka", english: "interface" },
      { malay: "mudah alih", english: "mobile" },
      { malay: "sensor", english: "sensor" },
      { malay: "pembelajaran mesin", english: "machine-learning" },
      { malay: "kecerdasan buatan", english: "artificial-intelligence" },
      { malay: "penyulitan", english: "encryption" },
      { malay: "pelayan", english: "server" },
      { malay: "aplikasi", english: "application" },
      { malay: "integrasi", english: "integration" },
      { malay: "realiti maya", english: "virtual-reality" }
    ]
  },
  {
    id: "unit-mega-environment",
    title: "Environment & Climate",
    description: "Environmental Malay covering ecology, emissions, and resource systems.",
    color: "#386641",
    accent: "#dad7cd",
    icon: "🌍",
    modifiers: [
      { malay: "iklim", english: "climate" },
      { malay: "karbon", english: "carbon" },
      { malay: "tenaga boleh baharu", english: "renewable-energy" },
      { malay: "biodiversiti", english: "biodiversity" },
      { malay: "pencemaran", english: "pollution" },
      { malay: "pemuliharaan", english: "conservation" },
      { malay: "kitar semula", english: "recycling" },
      { malay: "air", english: "water" },
      { malay: "hutan", english: "forest" },
      { malay: "lautan", english: "ocean" },
      { malay: "sungai", english: "river" },
      { malay: "banjir", english: "flood" },
      { malay: "kemarau", english: "drought" },
      { malay: "suhu", english: "temperature" },
      { malay: "cuaca", english: "weather" },
      { malay: "tanah", english: "soil" },
      { malay: "sisa", english: "waste" },
      { malay: "ekologi", english: "ecological" },
      { malay: "habitat", english: "habitat" },
      { malay: "pelepasan", english: "emissions" }
    ]
  },
  {
    id: "unit-mega-law",
    title: "Law & Justice",
    description: "Legal Malay for courts, rights, procedure, and enforcement.",
    color: "#5f0f40",
    accent: "#ffb703",
    icon: "⚖️",
    modifiers: [
      { malay: "perundangan", english: "legal" },
      { malay: "kehakiman", english: "judicial" },
      { malay: "perlembagaan", english: "constitutional" },
      { malay: "hak asasi", english: "human-rights" },
      { malay: "siasatan", english: "investigative" },
      { malay: "pendakwaan", english: "prosecutorial" },
      { malay: "pembelaan", english: "defense" },
      { malay: "kontrak", english: "contract" },
      { malay: "jenayah", english: "criminal" },
      { malay: "sivil", english: "civil" },
      { malay: "pematuhan", english: "compliance" },
      { malay: "pengawalseliaan", english: "regulatory" },
      { malay: "litigasi", english: "litigation" },
      { malay: "rayuan", english: "appellate" },
      { malay: "bukti", english: "evidentiary" },
      { malay: "prosedur", english: "procedural" },
      { malay: "tuntutan", english: "claims" },
      { malay: "mediasi", english: "mediation" },
      { malay: "arbitrasi", english: "arbitration" },
      { malay: "penguatkuasaan", english: "enforcement" }
    ]
  },
  {
    id: "unit-mega-media",
    title: "Media & Communication",
    description: "Newsroom, communication, and persuasion vocabulary in bulk.",
    color: "#003049",
    accent: "#f77f00",
    icon: "📰",
    modifiers: [
      { malay: "kewartawanan", english: "journalism" },
      { malay: "editorial", english: "editorial" },
      { malay: "penyiaran", english: "broadcast" },
      { malay: "kandungan", english: "content" },
      { malay: "penonton", english: "audience" },
      { malay: "propaganda", english: "propaganda" },
      { malay: "maklumat", english: "information" },
      { malay: "komunikasi", english: "communication" },
      { malay: "retorik", english: "rhetorical" },
      { malay: "visual", english: "visual" },
      { malay: "rangkaian sosial", english: "social-media" },
      { malay: "dokumentari", english: "documentary" },
      { malay: "naratif", english: "narrative" },
      { malay: "bahasa media", english: "media-language" },
      { malay: "penerbitan", english: "publishing" },
      { malay: "iklan", english: "advertising" },
      { malay: "hubungan awam", english: "public-relations" },
      { malay: "wawancara", english: "interview" },
      { malay: "berita", english: "news" },
      { malay: "penstriman", english: "streaming" }
    ]
  },
  {
    id: "unit-mega-culture",
    title: "Culture & Society",
    description: "Lexemes for identity, community, values, and social change.",
    color: "#7a2e1f",
    accent: "#ffd6a5",
    icon: "🪭",
    modifiers: [
      { malay: "budaya", english: "cultural" },
      { malay: "masyarakat", english: "societal" },
      { malay: "warisan", english: "heritage" },
      { malay: "adat", english: "customary" },
      { malay: "identiti", english: "identity" },
      { malay: "agama", english: "religious" },
      { malay: "etnik", english: "ethnic" },
      { malay: "komuniti", english: "community" },
      { malay: "bahasa ibunda", english: "mother-tongue" },
      { malay: "seni", english: "artistic" },
      { malay: "muzik", english: "musical" },
      { malay: "sastera", english: "literary" },
      { malay: "perayaan", english: "festival" },
      { malay: "keluarga", english: "family" },
      { malay: "generasi", english: "generational" },
      { malay: "gender", english: "gender" },
      { malay: "migrasi", english: "migratory" },
      { malay: "urbanisasi", english: "urban" },
      { malay: "luar bandar", english: "rural" },
      { malay: "solidariti", english: "solidarity" }
    ]
  },
  {
    id: "unit-mega-psychology",
    title: "Psychology & Behaviour",
    description: "Cognitive, behavioral, and social-psychology vocabulary at scale.",
    color: "#4b3f72",
    accent: "#ffcad4",
    icon: "🧠",
    modifiers: [
      { malay: "emosi", english: "emotional" },
      { malay: "motivasi", english: "motivational" },
      { malay: "tingkah laku", english: "behavioral" },
      { malay: "kognitif", english: "cognitive" },
      { malay: "persepsi", english: "perceptual" },
      { malay: "memori", english: "memory" },
      { malay: "personaliti", english: "personality" },
      { malay: "tekanan", english: "stress" },
      { malay: "kebimbangan", english: "anxiety" },
      { malay: "tabiat", english: "habitual" },
      { malay: "sosialisasi", english: "socialization" },
      { malay: "membuat keputusan", english: "decision-making" },
      { malay: "nilai diri", english: "self-esteem" },
      { malay: "penyesuaian", english: "adjustment" },
      { malay: "perkembangan", english: "developmental" },
      { malay: "minda", english: "mindset" },
      { malay: "interaksi", english: "interaction" },
      { malay: "refleksi", english: "reflective" },
      { malay: "psikososial", english: "psychosocial" },
      { malay: "kematangan", english: "maturity" }
    ]
  },
  {
    id: "unit-mega-engineering",
    title: "Industry & Engineering",
    description: "Engineering, manufacturing, and infrastructure lexemes in depth.",
    color: "#264653",
    accent: "#e9c46a",
    icon: "🏗️",
    modifiers: [
      { malay: "kejuruteraan", english: "engineering" },
      { malay: "pembuatan", english: "manufacturing" },
      { malay: "automotif", english: "automotive" },
      { malay: "aeroangkasa", english: "aerospace" },
      { malay: "elektrik", english: "electrical" },
      { malay: "mekanikal", english: "mechanical" },
      { malay: "bahan", english: "materials" },
      { malay: "reka bentuk", english: "design" },
      { malay: "pembinaan", english: "construction" },
      { malay: "kualiti", english: "quality" },
      { malay: "pengeluaran", english: "production" },
      { malay: "mesin", english: "machinery" },
      { malay: "penyelenggaraan", english: "maintenance" },
      { malay: "keselamatan industri", english: "industrial-safety" },
      { malay: "tenaga industri", english: "industrial-energy" },
      { malay: "kilang", english: "factory" },
      { malay: "robotik industri", english: "industrial-robotics" },
      { malay: "projek kejuruteraan", english: "engineering-project" },
      { malay: "infrastruktur", english: "infrastructure" },
      { malay: "piawaian", english: "standards" }
    ]
  },
  {
    id: "unit-mega-agriculture",
    title: "Agriculture & Food Systems",
    description: "Malay for farming, harvest, food security, and agro-systems.",
    color: "#52796f",
    accent: "#cad2c5",
    icon: "🌾",
    modifiers: [
      { malay: "pertanian", english: "agricultural" },
      { malay: "perladangan", english: "plantation" },
      { malay: "hortikultur", english: "horticultural" },
      { malay: "penternakan", english: "livestock" },
      { malay: "perikanan", english: "fisheries" },
      { malay: "benih", english: "seed" },
      { malay: "baja", english: "fertilizer" },
      { malay: "tanaman", english: "crop" },
      { malay: "tuaian", english: "harvest" },
      { malay: "pengairan", english: "irrigation" },
      { malay: "kesuburan tanah", english: "soil-fertility" },
      { malay: "bekalan makanan", english: "food-supply" },
      { malay: "keselamatan makanan", english: "food-safety" },
      { malay: "pasca tuai", english: "post-harvest" },
      { malay: "organik", english: "organic" },
      { malay: "agroekologi", english: "agroecological" },
      { malay: "sawit", english: "palm-oil" },
      { malay: "padi", english: "rice" },
      { malay: "kebun", english: "orchard" },
      { malay: "rantaian makanan", english: "food-chain" }
    ]
  },
  {
    id: "unit-mega-logistics",
    title: "Logistics & Transport",
    description: "Operations vocabulary for movement, warehousing, and supply chains.",
    color: "#003566",
    accent: "#ffc300",
    icon: "🚚",
    modifiers: [
      { malay: "logistik", english: "logistics" },
      { malay: "pengangkutan", english: "transport" },
      { malay: "pelabuhan", english: "port" },
      { malay: "lapangan terbang", english: "airport" },
      { malay: "rel", english: "rail" },
      { malay: "jalan raya", english: "road" },
      { malay: "penghantaran", english: "delivery" },
      { malay: "storan", english: "storage" },
      { malay: "inventori", english: "inventory" },
      { malay: "pembungkusan", english: "packaging" },
      { malay: "rantaian bekalan", english: "supply-chain" },
      { malay: "gudang", english: "warehouse" },
      { malay: "jadual", english: "schedule" },
      { malay: "transit", english: "transit" },
      { malay: "kastam", english: "customs" },
      { malay: "kargo", english: "cargo" },
      { malay: "penumpang", english: "passenger" },
      { malay: "navigasi", english: "navigation" },
      { malay: "laluan", english: "route" },
      { malay: "armada", english: "fleet" }
    ]
  },
  {
    id: "unit-mega-international",
    title: "International Relations",
    description: "Diplomacy, conflict, aid, and regional-policy vocabulary.",
    color: "#023047",
    accent: "#fb8500",
    icon: "🌐",
    modifiers: [
      { malay: "diplomatik", english: "diplomatic" },
      { malay: "geopolitik", english: "geopolitical" },
      { malay: "serantau", english: "regional" },
      { malay: "dua hala", english: "bilateral" },
      { malay: "pelbagai hala", english: "multilateral" },
      { malay: "kemanusiaan", english: "humanitarian" },
      { malay: "keselamatan global", english: "global-security" },
      { malay: "perdamaian", english: "peace" },
      { malay: "sekatan", english: "sanctions" },
      { malay: "konflik", english: "conflict" },
      { malay: "sempadan", english: "border" },
      { malay: "migran", english: "migrant" },
      { malay: "pelarian", english: "refugee" },
      { malay: "pembangunan antarabangsa", english: "international-development" },
      { malay: "perdagangan bebas", english: "free-trade" },
      { malay: "kerjasama ASEAN", english: "ASEAN-cooperation" },
      { malay: "maritim", english: "maritime" },
      { malay: "strategik antarabangsa", english: "international-strategic" },
      { malay: "bantuan luar", english: "foreign-aid" },
      { malay: "pertahanan", english: "defense" }
    ]
  },
  {
    id: "unit-mega-philosophy",
    title: "Philosophy & Reasoning",
    description: "Abstract reasoning vocabulary for concepts, truth, and argument.",
    color: "#432818",
    accent: "#ddb892",
    icon: "📚",
    modifiers: [
      { malay: "logik", english: "logical" },
      { malay: "etika", english: "ethical" },
      { malay: "metafizik", english: "metaphysical" },
      { malay: "epistemologi", english: "epistemological" },
      { malay: "hujah", english: "argumentative" },
      { malay: "penaakulan", english: "reasoning" },
      { malay: "normatif", english: "normative" },
      { malay: "kebenaran", english: "truth" },
      { malay: "moral", english: "moral" },
      { malay: "kewujudan", english: "existential" },
      { malay: "kesedaran", english: "consciousness" },
      { malay: "bahasa falsafah", english: "philosophy-of-language" },
      { malay: "dialektik", english: "dialectical" },
      { malay: "skeptik", english: "skeptical" },
      { malay: "tafsiran", english: "interpretive" },
      { malay: "konsep", english: "conceptual" },
      { malay: "prinsip", english: "principled" },
      { malay: "analogi", english: "analogical" },
      { malay: "inferens logik", english: "logical-inference" },
      { malay: "ontologi", english: "ontological" }
    ]
  },
  {
    id: "unit-mega-analytics",
    title: "Data & Analytics",
    description: "Large-scale lexeme pack for analytics, measurement, and forecasting.",
    color: "#14213d",
    accent: "#fca311",
    icon: "📊",
    modifiers: [
      { malay: "data raya", english: "big-data" },
      { malay: "kuantitatif", english: "quantitative" },
      { malay: "kualitatif", english: "qualitative" },
      { malay: "visualisasi", english: "visualization" },
      { malay: "ramalan", english: "predictive" },
      { malay: "pelaporan data", english: "data-reporting" },
      { malay: "pemodelan", english: "modeling" },
      { malay: "pengukuran", english: "measurement" },
      { malay: "pensampelan", english: "sampling" },
      { malay: "korelasi", english: "correlation" },
      { malay: "unjuran", english: "forecasting" },
      { malay: "eksploratori", english: "exploratory" },
      { malay: "deskriptif", english: "descriptive" },
      { malay: "inferensi", english: "inference" },
      { malay: "validasi", english: "validation" },
      { malay: "pembersihan data", english: "data-cleaning" },
      { malay: "integriti data", english: "data-integrity" },
      { malay: "metadata", english: "metadata" },
      { malay: "pemantauan", english: "monitoring" },
      { malay: "siri masa", english: "time-series" }
    ]
  }
];

let lessonNumber = 371;

const generated = domains.map((domain, domainIndex) => {
  const domainTag = domain.id.replace(/^unit-/, "");
  const difficultyTag = domainIndex < 6 ? "advanced" : domainIndex < 12 ? "upper-advanced" : "specialized";

  const items = domain.modifiers.flatMap((modifier) =>
    genericHeads.map((head) =>
      lexeme(
        `lx-${domainTag}-${slugify(head.malay)}-${slugify(modifier.malay)}`,
        `${head.malay} ${modifier.malay}`,
        [buildEnglishGloss(head, modifier)],
        [domainTag, "mega-lexicon", difficultyTag],
        {
          malayHint: buildMalayHint(head, modifier)
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
      `Build ${domain.title.toLocaleLowerCase("en-US")} vocabulary block ${index + 1}.`,
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

export const megaLexemePackItems: CourseItem[] = generated.flatMap((entry) => entry.items);
export const megaLexemePackLessons: Lesson[] = generated.flatMap((entry) => entry.lessons);
export const megaLexemePackUnits: Unit[] = generated.map((entry) => entry.unit);
