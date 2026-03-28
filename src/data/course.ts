import type {
  CourseData,
  CourseItem,
  ExerciseType,
  Lesson,
  Lexeme,
  Phrase,
  Unit
} from "../types";
import { expansionPackItems, expansionPackLessons, expansionPackUnits } from "./expansion-pack";

const defaultTemplates: ExerciseType[] = [
  "recognition",
  "reverse-recognition",
  "typed",
  "word-bank",
  "pair-match"
];

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

const items: CourseItem[] = [
  lexeme("lx-saya", "saya", ["I", "me"], "pronoun", ["starter", "self"]),
  lexeme("lx-awak", "awak", ["you"], "pronoun", ["starter", "person"], {
    registerNote: "Common casual 'you'. Friendlier than 'anda'."
  }),
  lexeme("lx-anda", "anda", ["you"], "pronoun", ["register", "person"], {
    registerNote: "More formal or polite than 'awak'."
  }),
  lexeme("lx-dia", "dia", ["he", "she", "him", "her"], "pronoun", ["starter", "person"]),
  lexeme("lx-kami", "kami", ["we (not including you)"], "pronoun", ["group"]),
  lexeme("lx-kita", "kita", ["we (including you)"], "pronoun", ["group"]),
  lexeme("lx-mereka", "mereka", ["they", "them"], "pronoun", ["group"]),
  lexeme("lx-ini", "ini", ["this"], "particle", ["starter", "pointer"]),
  lexeme("lx-itu", "itu", ["that"], "particle", ["starter", "pointer"]),
  lexeme("lx-sini", "sini", ["here"], "adverb", ["place"]),
  lexeme("lx-sana", "sana", ["there"], "adverb", ["place"]),
  lexeme("lx-ya", "ya", ["yes"], "expression", ["starter", "reply"]),
  lexeme("lx-tidak", "tidak", ["no", "not"], "particle", ["starter", "reply"]),
  lexeme("lx-mungkin", "mungkin", ["maybe"], "adverb", ["starter", "reply"]),
  lexeme("lx-tolong", "tolong", ["please", "help"], "expression", ["starter", "courtesy"]),
  lexeme("lx-maaf", "maaf", ["sorry", "excuse me"], "expression", ["starter", "courtesy"]),
  lexeme("lx-terima-kasih", "terima kasih", ["thank you"], "expression", ["starter", "courtesy"]),
  lexeme("lx-apa", "apa", ["what"], "question", ["starter", "question"]),
  lexeme("lx-siapa", "siapa", ["who"], "question", ["starter", "question"]),
  lexeme("lx-bila", "bila", ["when"], "question", ["starter", "question"]),
  lexeme("lx-di-mana", "di mana", ["where"], "question", ["starter", "question"]),
  lexeme("lx-kenapa", "kenapa", ["why"], "question", ["question"]),
  lexeme("lx-bagaimana", "bagaimana", ["how"], "question", ["starter", "question"]),
  lexeme("lx-berapa", "berapa", ["how many", "how much"], "question", ["starter", "question"]),
  lexeme("lx-ada", "ada", ["there is", "have"], "verb", ["starter", "verb"]),
  lexeme("lx-mahu", "mahu", ["want"], "verb", ["starter", "verb"], {
    registerNote: "Neutral standard form. 'Nak' is the common casual form."
  }),
  lexeme("lx-nak", "nak", ["want"], "verb", ["register", "verb"], {
    registerNote: "Very common spoken short form of 'mahu'."
  }),
  lexeme("lx-suka", "suka", ["like", "enjoy"], "verb", ["starter", "verb"]),
  lexeme("lx-pergi", "pergi", ["go"], "verb", ["starter", "verb"]),
  lexeme("lx-datang", "datang", ["come"], "verb", ["starter", "verb"]),
  lexeme("lx-lihat", "lihat", ["see", "look"], "verb", ["starter", "verb"]),
  lexeme("lx-dengar", "dengar", ["hear", "listen"], "verb", ["verb"]),
  lexeme("lx-cakap", "cakap", ["speak", "say"], "verb", ["starter", "verb"]),
  lexeme("lx-belajar", "belajar", ["study", "learn"], "verb", ["school", "verb"]),
  lexeme("lx-baca", "baca", ["read"], "verb", ["school", "verb"]),
  lexeme("lx-tulis", "tulis", ["write"], "verb", ["school", "verb"]),
  lexeme("lx-faham", "faham", ["understand"], "verb", ["school", "verb"]),
  lexeme("lx-tahu", "tahu", ["know"], "verb", ["school", "verb"]),
  lexeme("lx-boleh", "boleh", ["can", "may"], "verb", ["ability", "verb"]),
  lexeme("lx-mesti", "mesti", ["must"], "verb", ["ability", "verb"]),
  lexeme("lx-tinggal", "tinggal", ["live", "stay"], "verb", ["home", "verb"]),
  lexeme("lx-duduk", "duduk", ["sit"], "verb", ["verb"]),
  lexeme("lx-kerja", "kerja", ["work"], "verb", ["verb"]),
  lexeme("lx-makan", "makan", ["eat"], "verb", ["food", "verb"]),
  lexeme("lx-minum", "minum", ["drink"], "verb", ["food", "verb"]),
  lexeme("lx-bangun", "bangun", ["wake up", "get up"], "verb", ["routine", "verb"]),
  lexeme("lx-tidur", "tidur", ["sleep"], "verb", ["routine", "verb"]),
  lexeme("lx-mandi", "mandi", ["bathe", "shower"], "verb", ["routine", "verb"]),
  lexeme("lx-basuh", "basuh", ["wash"], "verb", ["routine", "verb"]),
  lexeme("lx-tanya", "tanya", ["ask"], "verb", ["school", "verb"]),
  lexeme("lx-bantu", "bantu", ["help"], "verb", ["starter", "verb"]),
  lexeme("lx-cari", "cari", ["look for", "search"], "verb", ["movement", "verb"]),
  lexeme("lx-jumpa", "jumpa", ["meet", "see"], "verb", ["movement", "verb"]),
  lexeme("lx-bawa", "bawa", ["bring", "carry"], "verb", ["movement", "verb"]),
  lexeme("lx-beli", "beli", ["buy"], "verb", ["food", "verb"]),
  lexeme("lx-masak", "masak", ["cook"], "verb", ["food", "verb"]),
  lexeme("lx-balik", "balik", ["go back", "return"], "verb", ["movement", "verb"]),
  lexeme("lx-tunggu", "tunggu", ["wait"], "verb", ["movement", "verb"]),
  lexeme("lx-masuk", "masuk", ["enter", "go in"], "verb", ["movement", "verb"]),
  lexeme("lx-keluar", "keluar", ["exit", "go out"], "verb", ["movement", "verb"]),
  lexeme("lx-naik", "naik", ["go up", "ride"], "verb", ["movement", "verb"]),
  lexeme("lx-turun", "turun", ["go down", "get down"], "verb", ["movement", "verb"]),
  lexeme("lx-pakai", "pakai", ["wear", "use"], "verb", ["routine", "verb"]),
  lexeme("lx-buka", "buka", ["open"], "verb", ["routine", "verb"]),
  lexeme("lx-tutup", "tutup", ["close", "shut"], "verb", ["routine", "verb"]),
  lexeme("lx-mari", "mari", ["come on", "let's"], "expression", ["movement", "expression"]),
  lexeme("lx-harga", "harga", ["price"], "noun", ["shopping"]),
  lexeme("lx-belum", "belum", ["not yet"], "adverb", ["time"]),
  lexeme("lx-nama", "nama", ["name"], "noun", ["identity"]),
  lexeme("lx-dari", "dari", ["from"], "preposition", ["identity"]),
  lexeme("lx-sifar", "sifar", ["zero"], "number", ["numbers"]),
  lexeme("lx-satu", "satu", ["one"], "number", ["numbers"]),
  lexeme("lx-dua", "dua", ["two"], "number", ["numbers"]),
  lexeme("lx-tiga", "tiga", ["three"], "number", ["numbers"]),
  lexeme("lx-empat", "empat", ["four"], "number", ["numbers"]),
  lexeme("lx-lima", "lima", ["five"], "number", ["numbers"]),
  lexeme("lx-enam", "enam", ["six"], "number", ["numbers"]),
  lexeme("lx-tujuh", "tujuh", ["seven"], "number", ["numbers"]),
  lexeme("lx-lapan", "lapan", ["eight"], "number", ["numbers"]),
  lexeme("lx-sembilan", "sembilan", ["nine"], "number", ["numbers"]),
  lexeme("lx-sepuluh", "sepuluh", ["ten"], "number", ["numbers"]),
  lexeme("lx-dua-puluh", "dua puluh", ["twenty"], "number", ["numbers"]),
  lexeme("lx-tiga-puluh", "tiga puluh", ["thirty"], "number", ["numbers"]),
  lexeme("lx-seratus", "seratus", ["one hundred", "hundred"], "number", ["numbers"]),
  lexeme("lx-hari-ini", "hari ini", ["today"], "time", ["time"]),
  lexeme("lx-esok", "esok", ["tomorrow"], "time", ["time"]),
  lexeme("lx-semalam", "semalam", ["yesterday"], "time", ["time"]),
  lexeme("lx-sekarang", "sekarang", ["now"], "time", ["time"]),
  lexeme("lx-nanti", "nanti", ["later"], "time", ["time"]),
  lexeme("lx-pagi", "pagi", ["morning"], "time", ["time"]),
  lexeme("lx-tengah-hari", "tengah hari", ["noon", "midday"], "time", ["time"]),
  lexeme("lx-petang", "petang", ["afternoon", "evening"], "time", ["time"], {
    registerNote: "Usually late afternoon to early evening."
  }),
  lexeme("lx-malam", "malam", ["night"], "time", ["time"]),
  lexeme("lx-minit", "minit", ["minute"], "time", ["time"]),
  lexeme("lx-jam", "jam", ["hour", "o'clock"], "time", ["time"]),
  lexeme("lx-hari", "hari", ["day"], "time", ["time"]),
  lexeme("lx-minggu", "minggu", ["week"], "time", ["time"]),
  lexeme("lx-bulan", "bulan", ["month"], "time", ["time"]),
  lexeme("lx-isnin", "Isnin", ["Monday"], "time", ["time"]),
  lexeme("lx-selasa", "Selasa", ["Tuesday"], "time", ["time"]),
  lexeme("lx-rabu", "Rabu", ["Wednesday"], "time", ["time"]),
  lexeme("lx-khamis", "Khamis", ["Thursday"], "time", ["time"]),
  lexeme("lx-jumaat", "Jumaat", ["Friday"], "time", ["time"]),
  lexeme("lx-sabtu", "Sabtu", ["Saturday"], "time", ["time"]),
  lexeme("lx-ahad", "Ahad", ["Sunday"], "time", ["time"]),
  lexeme("lx-sekolah", "sekolah", ["school"], "noun", ["school"]),
  lexeme("lx-kelas", "kelas", ["class", "classroom"], "noun", ["school"]),
  lexeme("lx-guru", "guru", ["teacher"], "noun", ["school"]),
  lexeme("lx-murid", "murid", ["student", "pupil"], "noun", ["school"]),
  lexeme("lx-buku", "buku", ["book"], "noun", ["school"]),
  lexeme("lx-pensel", "pensel", ["pencil"], "noun", ["school"]),
  lexeme("lx-pen", "pen", ["pen"], "noun", ["school"]),
  lexeme("lx-kertas", "kertas", ["paper"], "noun", ["school"]),
  lexeme("lx-meja", "meja", ["table", "desk"], "noun", ["school"]),
  lexeme("lx-kerusi", "kerusi", ["chair"], "noun", ["school"]),
  lexeme("lx-beg", "beg", ["bag"], "noun", ["school"]),
  lexeme("lx-latihan", "latihan", ["exercise", "practice"], "noun", ["school"]),
  lexeme("lx-kerja-rumah", "kerja rumah", ["homework"], "noun", ["school"]),
  lexeme("lx-ujian", "ujian", ["test"], "noun", ["school"]),
  lexeme("lx-peperiksaan", "peperiksaan", ["exam"], "noun", ["school"]),
  lexeme("lx-soalan", "soalan", ["question"], "noun", ["school"]),
  lexeme("lx-jawapan", "jawapan", ["answer"], "noun", ["school"]),
  lexeme("lx-perpustakaan", "perpustakaan", ["library"], "noun", ["school"]),
  lexeme("lx-kantin", "kantin", ["canteen"], "noun", ["school"]),
  lexeme("lx-makmal", "makmal", ["lab"], "noun", ["school"]),
  lexeme("lx-komputer", "komputer", ["computer"], "noun", ["school"]),
  lexeme("lx-bahasa-melayu", "bahasa Melayu", ["Malay language"], "noun", ["school"]),
  lexeme("lx-air", "air", ["water"], "noun", ["food"]),
  lexeme("lx-teh", "teh", ["tea"], "noun", ["food"]),
  lexeme("lx-kopi", "kopi", ["coffee"], "noun", ["food"]),
  lexeme("lx-nasi", "nasi", ["rice"], "noun", ["food"]),
  lexeme("lx-roti", "roti", ["bread"], "noun", ["food"]),
  lexeme("lx-ayam", "ayam", ["chicken"], "noun", ["food"]),
  lexeme("lx-ikan", "ikan", ["fish"], "noun", ["food"]),
  lexeme("lx-telur", "telur", ["egg"], "noun", ["food"]),
  lexeme("lx-sayur", "sayur", ["vegetable"], "noun", ["food"]),
  lexeme("lx-buah", "buah", ["fruit"], "noun", ["food"]),
  lexeme("lx-epal", "epal", ["apple"], "noun", ["food"]),
  lexeme("lx-pisang", "pisang", ["banana"], "noun", ["food"]),
  lexeme("lx-gula", "gula", ["sugar"], "noun", ["food"]),
  lexeme("lx-garam", "garam", ["salt"], "noun", ["food"]),
  lexeme("lx-lapar", "lapar", ["hungry"], "adjective", ["food", "state"]),
  lexeme("lx-kenyang", "kenyang", ["full"], "adjective", ["food", "state"]),
  lexeme("lx-manis", "manis", ["sweet"], "adjective", ["food", "taste"]),
  lexeme("lx-pedas", "pedas", ["spicy"], "adjective", ["food", "taste"]),
  lexeme("lx-sedap", "sedap", ["delicious", "tasty"], "adjective", ["food", "taste"]),
  lexeme("lx-panas", "panas", ["hot"], "adjective", ["food", "weather"]),
  lexeme("lx-sejuk", "sejuk", ["cold", "cool"], "adjective", ["food", "weather"]),
  lexeme("lx-sarapan", "sarapan", ["breakfast"], "noun", ["food"]),
  lexeme("lx-makan-tengah-hari", "makan tengah hari", ["lunch"], "noun", ["food"]),
  lexeme("lx-makan-malam", "makan malam", ["dinner"], "noun", ["food"]),
  lexeme("lx-rumah", "rumah", ["house", "home"], "noun", ["place"]),
  lexeme("lx-bilik", "bilik", ["room"], "noun", ["place"]),
  lexeme("lx-dapur", "dapur", ["kitchen"], "noun", ["place"]),
  lexeme("lx-tandas", "tandas", ["toilet", "bathroom"], "noun", ["place"]),
  lexeme("lx-kedai", "kedai", ["shop", "store"], "noun", ["place"]),
  lexeme("lx-pasar", "pasar", ["market"], "noun", ["place"]),
  lexeme("lx-jalan", "jalan", ["road", "street"], "noun", ["place"]),
  lexeme("lx-bas", "bas", ["bus"], "noun", ["transport"]),
  lexeme("lx-kereta", "kereta", ["car"], "noun", ["transport"]),
  lexeme("lx-kiri", "kiri", ["left"], "adjective", ["direction"]),
  lexeme("lx-kanan", "kanan", ["right"], "adjective", ["direction"]),
  lexeme("lx-depan", "depan", ["front", "in front"], "noun", ["direction"]),
  lexeme("lx-belakang", "belakang", ["back", "behind"], "noun", ["direction"]),
  lexeme("lx-dekat", "dekat", ["near", "close"], "adjective", ["direction"]),
  lexeme("lx-jauh", "jauh", ["far"], "adjective", ["direction"]),
  lexeme("lx-besar", "besar", ["big"], "adjective", ["description"]),
  lexeme("lx-kecil", "kecil", ["small"], "adjective", ["description"]),
  lexeme("lx-panjang", "panjang", ["long"], "adjective", ["description"]),
  lexeme("lx-pendek", "pendek", ["short"], "adjective", ["description"]),
  lexeme("lx-baru", "baru", ["new"], "adjective", ["description"]),
  lexeme("lx-lama", "lama", ["old", "long time"], "adjective", ["description"]),
  lexeme("lx-cantik", "cantik", ["beautiful", "pretty"], "adjective", ["description"]),
  lexeme("lx-buruk", "buruk", ["bad", "ugly"], "adjective", ["description"]),
  lexeme("lx-mudah", "mudah", ["easy"], "adjective", ["description"]),
  lexeme("lx-susah", "susah", ["difficult"], "adjective", ["description"]),
  lexeme("lx-cepat", "cepat", ["fast", "quick"], "adjective", ["description"]),
  lexeme("lx-lambat", "lambat", ["slow", "late"], "adjective", ["description"]),
  lexeme("lx-merah", "merah", ["red"], "adjective", ["color"]),
  lexeme("lx-biru", "biru", ["blue"], "adjective", ["color"]),
  lexeme("lx-hijau", "hijau", ["green"], "adjective", ["color"]),
  lexeme("lx-putih", "putih", ["white"], "adjective", ["color"]),
  lexeme("lx-hitam", "hitam", ["black"], "adjective", ["color"]),
  lexeme("lx-ibu", "ibu", ["mother"], "noun", ["family"]),
  lexeme("lx-ayah", "ayah", ["father"], "noun", ["family"]),
  lexeme("lx-abang", "abang", ["older brother"], "noun", ["family"]),
  lexeme("lx-kakak", "kakak", ["older sister"], "noun", ["family"]),
  lexeme("lx-adik", "adik", ["younger sibling"], "noun", ["family"]),
  lexeme("lx-kawan", "kawan", ["friend"], "noun", ["people"]),
  lexeme("lx-cikgu", "cikgu", ["teacher"], "noun", ["school", "people"], {
    registerNote: "Everyday way to address a teacher."
  }),
  lexeme("lx-dan", "dan", ["and"], "particle", ["connector"]),
  lexeme("lx-atau", "atau", ["or"], "particle", ["connector"]),
  lexeme("lx-sangat", "sangat", ["very"], "adverb", ["modifier"]),
  lexeme("lx-sudah", "sudah", ["already"], "adverb", ["time"]),
  lexeme("lx-banyak", "banyak", ["many", "much", "a lot"], "adjective", ["quantity"]),
  lexeme("lx-sedikit", "sedikit", ["a little", "few"], "adjective", ["quantity"]),
  lexeme("lx-semua", "semua", ["all", "everyone"], "pronoun", ["quantity"]),
  lexeme("lx-perlu", "perlu", ["need"], "verb", ["school", "verb"]),
  lexeme("lx-ke", "ke", ["to"], "preposition", ["movement"]),
  lexeme("lx-ulang", "ulang", ["repeat"], "verb", ["school", "verb"]),
  lexeme("lx-matematik", "matematik", ["math", "mathematics"], "noun", ["school"]),
  lexeme("lx-sains", "sains", ["science"], "noun", ["school"]),
  lexeme("lx-sejarah", "sejarah", ["history"], "noun", ["school"]),
  lexeme("lx-bahasa-inggeris", "bahasa Inggeris", ["English language"], "noun", ["school"]),
  lexeme("lx-baju", "baju", ["shirt", "clothes"], "noun", ["shopping", "routine"]),
  lexeme("lx-kasut", "kasut", ["shoes"], "noun", ["shopping", "routine"]),
  lexeme("lx-cuaca", "cuaca", ["weather"], "noun", ["weather"]),
  lexeme("lx-hujan", "hujan", ["rain", "raining"], "noun", ["weather"]),
  lexeme("lx-kerana", "kerana", ["because"], "particle", ["connector"]),
  lexeme("lx-rasa", "rasa", ["feel", "think"], "verb", ["conversation"]),
  lexeme("lx-fikir", "fikir", ["think"], "verb", ["conversation"]),
  lexeme("lx-betul", "betul", ["correct", "right"], "adjective", ["conversation"]),
  lexeme("lx-salah", "salah", ["wrong", "incorrect"], "adjective", ["conversation"]),
  lexeme("lx-penting", "penting", ["important"], "adjective", ["conversation"]),
  lexeme("lx-lebih", "lebih", ["more"], "adverb", ["comparison"]),
  lexeme("lx-kurang", "kurang", ["less"], "adverb", ["comparison"]),
  lexeme("lx-murah", "murah", ["cheap"], "adjective", ["shopping"]),
  lexeme("lx-mahal", "mahal", ["expensive"], "adjective", ["shopping"]),
  lexeme("lx-pilih", "pilih", ["choose", "pick"], "verb", ["comparison", "shopping", "verb"]),
  lexeme("lx-bagus", "bagus", ["good", "nice"], "adjective", ["conversation"]),
  lexeme("lx-nota", "nota", ["notes"], "noun", ["school"]),
  lexeme("lx-contoh", "contoh", ["example"], "noun", ["school"]),
  lexeme("lx-jawab", "jawab", ["answer"], "verb", ["school", "verb"]),
  lexeme("lx-semak", "semak", ["check", "review"], "verb", ["school", "verb"]),
  lexeme("lx-hantar", "hantar", ["send", "submit"], "verb", ["school", "verb"]),
  lexeme("lx-siap", "siap", ["ready", "finished"], "adjective", ["school"]),
  lexeme("lx-tunjuk", "tunjuk", ["show"], "verb", ["school", "verb"]),
  lexeme("lx-pinjam", "pinjam", ["borrow"], "verb", ["school", "verb"]),
  lexeme("lx-kongsi", "kongsi", ["share"], "verb", ["school", "verb"]),
  lexeme("lx-guna", "guna", ["use"], "verb", ["school", "verb"]),
  lexeme("lx-bincang", "bincang", ["discuss"], "verb", ["school", "verb"]),
  lexeme("lx-lupa", "lupa", ["forget"], "verb", ["school", "verb"]),
  lexeme("lx-sakit", "sakit", ["sick", "hurt", "pain"], "adjective", ["health"]),
  lexeme("lx-penat", "penat", ["tired"], "adjective", ["health"]),
  lexeme("lx-haus", "haus", ["thirsty"], "adjective", ["health"]),
  lexeme("lx-sihat", "sihat", ["healthy", "well"], "adjective", ["health"]),
  lexeme("lx-rehat", "rehat", ["rest", "take a break"], "verb", ["health", "routine"]),
  lexeme("lx-demam", "demam", ["fever"], "noun", ["health"]),
  lexeme("lx-kepala", "kepala", ["head"], "noun", ["health"]),
  lexeme("lx-perut", "perut", ["stomach"], "noun", ["health"]),
  lexeme("lx-ubat", "ubat", ["medicine"], "noun", ["health"]),
  lexeme("lx-klinik", "klinik", ["clinic"], "noun", ["health", "place"]),
  lexeme("lx-batuk", "batuk", ["cough"], "noun", ["health"]),
  lexeme("lx-selesema", "selesema", ["cold", "flu"], "noun", ["health"], {
    registerNote: "Common everyday word for a cold or flu-like illness."
  }),
  lexeme("lx-payung", "payung", ["umbrella"], "noun", ["weather"]),
  lexeme("lx-basah", "basah", ["wet"], "adjective", ["weather"]),
  lexeme("lx-kering", "kering", ["dry"], "adjective", ["weather"]),
  lexeme("lx-angin", "angin", ["wind"], "noun", ["weather"]),
  lexeme("lx-matahari", "matahari", ["sun"], "noun", ["weather"]),
  lexeme("lx-cerah", "cerah", ["bright", "clear"], "adjective", ["weather"]),
  lexeme("lx-mendung", "mendung", ["cloudy", "overcast"], "adjective", ["weather"]),
  lexeme("lx-sapu", "sapu", ["sweep"], "verb", ["home", "verb"]),
  lexeme("lx-lap", "lap", ["wipe"], "verb", ["home", "verb"]),
  lexeme("lx-bersih", "bersih", ["clean"], "adjective", ["home"]),
  lexeme("lx-kotor", "kotor", ["dirty"], "adjective", ["home"]),
  lexeme("lx-cuci", "cuci", ["wash", "clean"], "verb", ["home", "verb"]),
  lexeme("lx-sampah", "sampah", ["trash", "rubbish"], "noun", ["home"]),
  lexeme("lx-lantai", "lantai", ["floor"], "noun", ["home"]),
  lexeme("lx-tingkap", "tingkap", ["window"], "noun", ["home"]),
  lexeme("lx-pintu", "pintu", ["door"], "noun", ["home"]),
  lexeme("lx-lampu", "lampu", ["light", "lamp"], "noun", ["home"]),
  lexeme("lx-pakaian", "pakaian", ["clothing", "clothes"], "noun", ["home"]),
  lexeme("lx-susun", "susun", ["arrange", "organize"], "verb", ["home", "verb"]),
  lexeme("lx-duit", "duit", ["money"], "noun", ["shopping"]),
  lexeme("lx-ringgit", "ringgit", ["ringgit"], "noun", ["shopping"]),
  lexeme("lx-sen", "sen", ["cent"], "noun", ["shopping"]),
  lexeme("lx-dompet", "dompet", ["wallet"], "noun", ["shopping"]),
  lexeme("lx-resit", "resit", ["receipt"], "noun", ["shopping"]),
  lexeme("lx-diskaun", "diskaun", ["discount"], "noun", ["shopping"]),
  lexeme("lx-jual", "jual", ["sell"], "verb", ["shopping", "verb"]),
  lexeme("lx-bayar", "bayar", ["pay"], "verb", ["shopping", "verb"]),
  lexeme("lx-kira", "kira", ["count", "calculate"], "verb", ["shopping", "verb"]),
  lexeme("lx-cuba", "cuba", ["try"], "verb", ["shopping", "verb"]),
  lexeme("lx-tempah", "tempah", ["order", "book"], "verb", ["shopping", "verb"]),
  lexeme("lx-cukup", "cukup", ["enough"], "adjective", ["shopping"]),
  lexeme("lx-telefon", "telefon", ["phone"], "noun", ["technology"]),
  lexeme("lx-mesej", "mesej", ["message"], "noun", ["technology"]),
  lexeme("lx-gambar", "gambar", ["picture", "image"], "noun", ["technology"]),
  lexeme("lx-video", "video", ["video"], "noun", ["technology"]),
  lexeme("lx-muzik", "muzik", ["music"], "noun", ["technology"]),
  lexeme("lx-internet", "internet", ["internet"], "noun", ["technology"]),
  lexeme("lx-skrin", "skrin", ["screen"], "noun", ["technology"]),
  lexeme("lx-cas", "cas", ["charge"], "verb", ["technology", "verb"]),
  lexeme("lx-bateri", "bateri", ["battery"], "noun", ["technology"]),
  lexeme("lx-aplikasi", "aplikasi", ["app", "application"], "noun", ["technology"]),
  lexeme("lx-kata-laluan", "kata laluan", ["password"], "noun", ["technology"]),
  lexeme("lx-muat-turun", "muat turun", ["download"], "verb", ["technology", "verb"]),
  lexeme("lx-gembira", "gembira", ["happy"], "adjective", ["emotion"]),
  lexeme("lx-sedih", "sedih", ["sad"], "adjective", ["emotion"]),
  lexeme("lx-marah", "marah", ["angry"], "adjective", ["emotion"]),
  lexeme("lx-takut", "takut", ["afraid", "scared"], "adjective", ["emotion"]),
  lexeme("lx-malu", "malu", ["shy", "embarrassed"], "adjective", ["emotion"]),
  lexeme("lx-risau", "risau", ["worried"], "adjective", ["emotion"]),
  lexeme("lx-seronok", "seronok", ["fun", "excited"], "adjective", ["emotion"]),
  lexeme("lx-tenang", "tenang", ["calm"], "adjective", ["emotion"]),
  lexeme("lx-bosan", "bosan", ["bored"], "adjective", ["emotion"]),
  lexeme("lx-ramah", "ramah", ["friendly"], "adjective", ["emotion"]),
  lexeme("lx-sibuk", "sibuk", ["busy"], "adjective", ["emotion"]),
  lexeme("lx-baik", "baik", ["kind", "good"], "adjective", ["emotion"]),
  lexeme("lx-pokok", "pokok", ["tree"], "noun", ["nature"]),
  lexeme("lx-bunga", "bunga", ["flower"], "noun", ["nature"]),
  lexeme("lx-sungai", "sungai", ["river"], "noun", ["nature"]),
  lexeme("lx-laut", "laut", ["sea"], "noun", ["nature"]),
  lexeme("lx-gunung", "gunung", ["mountain"], "noun", ["nature"]),
  lexeme("lx-pantai", "pantai", ["beach"], "noun", ["nature"]),
  lexeme("lx-taman", "taman", ["park"], "noun", ["nature"]),
  lexeme("lx-haiwan", "haiwan", ["animal"], "noun", ["nature"]),
  lexeme("lx-burung", "burung", ["bird"], "noun", ["nature"]),
  lexeme("lx-kucing", "kucing", ["cat"], "noun", ["nature"]),
  lexeme("lx-anjing", "anjing", ["dog"], "noun", ["nature"]),
  lexeme("lx-tinggi", "tinggi", ["tall", "high"], "adjective", ["nature"]),
  lexeme("lx-jalan-kaki", "jalan kaki", ["walk", "go on foot"], "expression", ["nature", "movement"]),
  lexeme("lx-stesen", "stesen", ["station"], "noun", ["city"]),
  lexeme("lx-tiket", "tiket", ["ticket"], "noun", ["city"]),
  lexeme("lx-peta", "peta", ["map"], "noun", ["city"]),
  lexeme("lx-lorong", "lorong", ["lane", "alley"], "noun", ["city"]),
  lexeme("lx-simpang", "simpang", ["junction", "intersection"], "noun", ["city"]),
  lexeme("lx-lampu-isyarat", "lampu isyarat", ["traffic light"], "noun", ["city"]),
  lexeme("lx-penumpang", "penumpang", ["passenger"], "noun", ["city"]),
  lexeme("lx-teksi", "teksi", ["taxi"], "noun", ["city"]),
  lexeme("lx-motosikal", "motosikal", ["motorcycle"], "noun", ["city"]),
  lexeme("lx-lif", "lif", ["elevator"], "noun", ["city"]),
  lexeme("lx-tangga", "tangga", ["stairs"], "noun", ["city"]),
  lexeme("lx-tingkat", "tingkat", ["floor", "level"], "noun", ["city"]),
  lexeme("lx-projek", "projek", ["project"], "noun", ["school"]),
  lexeme("lx-kumpulan", "kumpulan", ["group"], "noun", ["school"]),
  lexeme("lx-markah", "markah", ["marks", "score"], "noun", ["school"]),
  lexeme("lx-jadual", "jadual", ["schedule", "timetable"], "noun", ["school"]),
  lexeme("lx-subjek", "subjek", ["subject"], "noun", ["school"]),
  lexeme("lx-peraturan", "peraturan", ["rule"], "noun", ["school"]),
  lexeme("lx-pembentangan", "pembentangan", ["presentation"], "noun", ["school"]),
  lexeme("lx-dewan", "dewan", ["hall"], "noun", ["school"]),
  lexeme("lx-pejabat", "pejabat", ["office"], "noun", ["school"]),
  lexeme("lx-rujukan", "rujukan", ["reference"], "noun", ["school"]),
  lexeme("lx-laporan", "laporan", ["report"], "noun", ["school"]),
  lexeme("lx-eksperimen", "eksperimen", ["experiment"], "noun", ["school"]),
  lexeme("lx-ikut", "ikut", ["follow"], "verb", ["school", "verb"]),
  lexeme("lx-selalu", "selalu", ["always"], "adverb", ["time"]),
  lexeme("lx-kadang-kadang", "kadang-kadang", ["sometimes"], "adverb", ["time"]),
  lexeme("lx-jarang", "jarang", ["rarely"], "adverb", ["time"]),
  lexeme("lx-setiap", "setiap", ["every"], "adjective", ["time"]),
  lexeme("lx-sebelum", "sebelum", ["before"], "preposition", ["time"]),
  lexeme("lx-selepas", "selepas", ["after"], "preposition", ["time"]),
  lexeme("lx-awal", "awal", ["early"], "adjective", ["time"]),
  lexeme("lx-lewat", "lewat", ["late"], "adjective", ["time"]),
  lexeme("lx-mula", "mula", ["start", "begin"], "verb", ["time", "verb"]),
  lexeme("lx-habis", "habis", ["finish", "end"], "verb", ["time", "verb"]),
  lexeme("lx-cuti", "cuti", ["holiday", "off day"], "noun", ["time"]),
  lexeme("lx-rancangan", "rancangan", ["plan"], "noun", ["time"]),
  lexeme("lx-polis", "polis", ["police"], "noun", ["services"]),
  lexeme("lx-bomba", "bomba", ["fire brigade"], "noun", ["services"]),
  lexeme("lx-hospital", "hospital", ["hospital"], "noun", ["services"]),
  lexeme("lx-bank", "bank", ["bank"], "noun", ["services"]),
  lexeme("lx-pejabat-post", "pejabat pos", ["post office"], "noun", ["services"]),
  lexeme("lx-kecemasan", "kecemasan", ["emergency"], "noun", ["services"]),
  lexeme("lx-hilang", "hilang", ["lost", "missing"], "adjective", ["services"]),
  lexeme("lx-rosak", "rosak", ["broken"], "adjective", ["services"]),
  lexeme("lx-sesat", "sesat", ["lost", "disoriented"], "adjective", ["services"]),
  lexeme("lx-bahaya", "bahaya", ["danger", "dangerous"], "noun", ["services"]),
  lexeme("lx-panggil", "panggil", ["call", "summon"], "verb", ["services", "verb"]),
  lexeme("lx-lapor", "lapor", ["report"], "verb", ["services", "verb"]),
  lexeme("lx-kuat", "kuat", ["loud", "strong"], "adjective", ["listening"]),
  lexeme("lx-perlahan", "perlahan", ["slowly", "slow", "softly"], "adverb", ["listening"]),
  lexeme("lx-jelas", "jelas", ["clear", "clearly"], "adjective", ["listening"]),
  lexeme("lx-terang", "terang", ["bright"], "adjective", ["listening", "neighborhood"]),
  lexeme("lx-bising", "bising", ["noisy"], "adjective", ["listening"]),
  lexeme("lx-senyap", "senyap", ["quiet", "silent"], "adjective", ["listening"]),
  lexeme("lx-maksud", "maksud", ["meaning"], "noun", ["listening", "school"]),
  lexeme("lx-sebut", "sebut", ["say", "mention", "pronounce"], "verb", ["listening", "verb"]),
  lexeme("lx-terangkan", "terangkan", ["explain"], "verb", ["listening", "verb"]),
  lexeme("lx-suara", "suara", ["voice", "sound"], "noun", ["listening"]),
  lexeme("lx-dengan", "dengan", ["with"], "preposition", ["connector"]),
  lexeme("lx-seluar", "seluar", ["pants", "trousers"], "noun", ["clothes"]),
  lexeme("lx-stokin", "stokin", ["socks"], "noun", ["clothes"]),
  lexeme("lx-jaket", "jaket", ["jacket"], "noun", ["clothes"]),
  lexeme("lx-topi", "topi", ["hat", "cap"], "noun", ["clothes"]),
  lexeme("lx-uniform", "uniform", ["uniform"], "noun", ["clothes", "school"]),
  lexeme("lx-saiz", "saiz", ["size"], "noun", ["clothes", "shopping"]),
  lexeme("lx-warna", "warna", ["color"], "noun", ["clothes"]),
  lexeme("lx-kemas", "kemas", ["neat", "tidy"], "adjective", ["clothes"]),
  lexeme("lx-longgar", "longgar", ["loose"], "adjective", ["clothes"]),
  lexeme("lx-ketat", "ketat", ["tight"], "adjective", ["clothes"]),
  lexeme("lx-sesuai", "sesuai", ["suitable", "fits"], "adjective", ["clothes"]),
  lexeme("lx-mee", "mee", ["noodles"], "noun", ["restaurant", "food"]),
  lexeme("lx-sup", "sup", ["soup"], "noun", ["restaurant", "food"]),
  lexeme("lx-jus", "jus", ["juice"], "noun", ["restaurant", "food"]),
  lexeme("lx-susu", "susu", ["milk"], "noun", ["restaurant", "food"]),
  lexeme("lx-sambal", "sambal", ["sambal", "chili paste"], "noun", ["restaurant", "food"]),
  lexeme("lx-mangkuk", "mangkuk", ["bowl"], "noun", ["restaurant"]),
  lexeme("lx-pinggan", "pinggan", ["plate"], "noun", ["restaurant"]),
  lexeme("lx-sudu", "sudu", ["spoon"], "noun", ["restaurant"]),
  lexeme("lx-garpu", "garpu", ["fork"], "noun", ["restaurant"]),
  lexeme("lx-pesan", "pesan", ["order"], "verb", ["restaurant", "verb"]),
  lexeme("lx-hidang", "hidang", ["serve"], "verb", ["restaurant", "verb"]),
  lexeme("lx-tambah", "tambah", ["add", "extra"], "verb", ["restaurant", "verb"]),
  lexeme("lx-dalam", "dalam", ["in", "inside"], "preposition", ["restaurant", "place"]),
  lexeme("lx-hobi", "hobi", ["hobby"], "noun", ["hobby"]),
  lexeme("lx-bola", "bola", ["ball"], "noun", ["hobby", "sports"]),
  lexeme("lx-badminton", "badminton", ["badminton"], "noun", ["hobby", "sports"]),
  lexeme("lx-berenang", "berenang", ["swim", "swimming"], "verb", ["hobby", "verb"]),
  lexeme("lx-berlari", "berlari", ["run", "running"], "verb", ["hobby", "verb"]),
  lexeme("lx-bermain", "bermain", ["play", "playing"], "verb", ["hobby", "verb"]),
  lexeme("lx-lukis", "lukis", ["draw"], "verb", ["hobby", "verb"]),
  lexeme("lx-menyanyi", "menyanyi", ["sing"], "verb", ["hobby", "verb"]),
  lexeme("lx-menonton", "menonton", ["watch"], "verb", ["hobby", "verb"]),
  lexeme("lx-gitar", "gitar", ["guitar"], "noun", ["hobby"]),
  lexeme("lx-filem", "filem", ["movie", "film"], "noun", ["hobby"]),
  lexeme("lx-lagu", "lagu", ["song"], "noun", ["hobby"]),
  lexeme("lx-tangan", "tangan", ["hand", "arm"], "noun", ["body"]),
  lexeme("lx-kaki", "kaki", ["leg", "foot"], "noun", ["body"]),
  lexeme("lx-mata", "mata", ["eye"], "noun", ["body"]),
  lexeme("lx-mulut", "mulut", ["mouth"], "noun", ["body"]),
  lexeme("lx-hidung", "hidung", ["nose"], "noun", ["body"]),
  lexeme("lx-telinga", "telinga", ["ear"], "noun", ["body"]),
  lexeme("lx-doktor", "doktor", ["doctor"], "noun", ["body", "health"]),
  lexeme("lx-janji-temu", "janji temu", ["appointment"], "noun", ["body", "health"]),
  lexeme("lx-ukur", "ukur", ["measure"], "verb", ["body", "health", "verb"]),
  lexeme("lx-suhu", "suhu", ["temperature"], "noun", ["body", "health"]),
  lexeme("lx-pedih", "pedih", ["stinging", "sore"], "adjective", ["body", "health"]),
  lexeme("lx-gigi", "gigi", ["tooth", "teeth"], "noun", ["body"]),
  lexeme("lx-muka", "muka", ["face"], "noun", ["body"]),
  lexeme("lx-januari", "Januari", ["January"], "time", ["dates"]),
  lexeme("lx-februari", "Februari", ["February"], "time", ["dates"]),
  lexeme("lx-mac", "Mac", ["March"], "time", ["dates"]),
  lexeme("lx-april", "April", ["April"], "time", ["dates"]),
  lexeme("lx-mei", "Mei", ["May"], "time", ["dates"]),
  lexeme("lx-jun", "Jun", ["June"], "time", ["dates"]),
  lexeme("lx-julai", "Julai", ["July"], "time", ["dates"]),
  lexeme("lx-ogos", "Ogos", ["August"], "time", ["dates"]),
  lexeme("lx-september", "September", ["September"], "time", ["dates"]),
  lexeme("lx-oktober", "Oktober", ["October"], "time", ["dates"]),
  lexeme("lx-november", "November", ["November"], "time", ["dates"]),
  lexeme("lx-disember", "Disember", ["December"], "time", ["dates"]),
  lexeme("lx-tarikh", "tarikh", ["date"], "time", ["dates"]),
  lexeme("lx-tahun", "tahun", ["year"], "time", ["dates"]),
  lexeme("lx-hari-jadi", "hari jadi", ["birthday"], "noun", ["dates"]),
  lexeme("lx-pada", "pada", ["on", "at"], "preposition", ["dates"]),
  lexeme("lx-minggu-depan", "minggu depan", ["next week"], "time", ["dates"]),
  lexeme("lx-minggu-lepas", "minggu lepas", ["last week"], "time", ["dates"]),
  lexeme("lx-sepupu", "sepupu", ["cousin"], "noun", ["family-events"]),
  lexeme("lx-nenek", "nenek", ["grandmother"], "noun", ["family-events"]),
  lexeme("lx-datuk", "datuk", ["grandfather"], "noun", ["family-events"]),
  lexeme("lx-jiran", "jiran", ["neighbor"], "noun", ["family-events"]),
  lexeme("lx-tetamu", "tetamu", ["guest"], "noun", ["family-events"]),
  lexeme("lx-lawat", "lawat", ["visit"], "verb", ["family-events", "verb"]),
  lexeme("lx-jemput", "jemput", ["invite"], "verb", ["family-events", "verb"]),
  lexeme("lx-hadiah", "hadiah", ["gift"], "noun", ["family-events"]),
  lexeme("lx-majlis", "majlis", ["event", "ceremony"], "noun", ["family-events"]),
  lexeme("lx-kahwin", "kahwin", ["marry", "wedding"], "noun", ["family-events"]),
  lexeme("lx-rumah-terbuka", "rumah terbuka", ["open house"], "noun", ["family-events"]),
  lexeme("lx-kenduri", "kenduri", ["feast", "gathering"], "noun", ["family-events"]),
  lexeme("lx-lapangan-terbang", "lapangan terbang", ["airport"], "noun", ["travel"]),
  lexeme("lx-kapal-terbang", "kapal terbang", ["airplane"], "noun", ["travel"]),
  lexeme("lx-pasport", "pasport", ["passport"], "noun", ["travel"]),
  lexeme("lx-bagasi", "bagasi", ["luggage", "baggage"], "noun", ["travel"]),
  lexeme("lx-hotel", "hotel", ["hotel"], "noun", ["travel"]),
  lexeme("lx-tempahan", "tempahan", ["booking", "reservation"], "noun", ["travel"]),
  lexeme("lx-tiba", "tiba", ["arrive"], "verb", ["travel", "verb"]),
  lexeme("lx-berlepas", "berlepas", ["depart"], "verb", ["travel", "verb"]),
  lexeme("lx-pelancong", "pelancong", ["tourist"], "noun", ["travel"]),
  lexeme("lx-lawatan", "lawatan", ["trip", "visit"], "noun", ["travel"]),
  lexeme("lx-kaunter", "kaunter", ["counter"], "noun", ["travel"]),
  lexeme("lx-pemandu", "pemandu", ["driver"], "noun", ["travel"]),
  lexeme("lx-perkataan", "perkataan", ["word"], "noun", ["language"]),
  lexeme("lx-ayat", "ayat", ["sentence"], "noun", ["language"]),
  lexeme("lx-terjemah", "terjemah", ["translate"], "verb", ["language", "verb"]),
  lexeme("lx-hafal", "hafal", ["memorize"], "verb", ["language", "verb"]),
  lexeme("lx-tatabahasa", "tatabahasa", ["grammar"], "noun", ["language"]),
  lexeme("lx-kamus", "kamus", ["dictionary"], "noun", ["language"]),
  lexeme("lx-sebutan", "sebutan", ["pronunciation"], "noun", ["language"]),
  lexeme("lx-betulkan", "betulkan", ["correct", "fix"], "verb", ["language", "verb"]),
  lexeme("lx-ringkas", "ringkas", ["short", "brief"], "adjective", ["language"]),
  lexeme("lx-penuh", "penuh", ["full", "complete"], "adjective", ["language"]),
  lexeme("lx-ejaan", "ejaan", ["spelling"], "noun", ["language"]),
  lexeme("lx-ulangkaji", "ulangkaji", ["revise", "revision"], "verb", ["language", "verb"]),
  lexeme("lx-restoran", "restoran", ["restaurant"], "noun", ["neighborhood"]),
  lexeme("lx-kedai-buku", "kedai buku", ["bookstore"], "noun", ["neighborhood"]),
  lexeme("lx-farmasi", "farmasi", ["pharmacy"], "noun", ["neighborhood"]),
  lexeme("lx-surau", "surau", ["prayer room"], "noun", ["neighborhood"]),
  lexeme("lx-masjid", "masjid", ["mosque"], "noun", ["neighborhood"]),
  lexeme("lx-pusat-beli-belah", "pusat beli-belah", ["shopping mall"], "noun", ["neighborhood"]),
  lexeme("lx-perhentian-bas", "perhentian bas", ["bus stop"], "noun", ["neighborhood"]),
  lexeme("lx-jambatan", "jambatan", ["bridge"], "noun", ["neighborhood"]),
  lexeme("lx-lampu-jalan", "lampu jalan", ["street light"], "noun", ["neighborhood"]),
  lexeme("lx-lori", "lori", ["lorry", "truck"], "noun", ["neighborhood"]),
  lexeme("lx-balai-polis", "balai polis", ["police station"], "noun", ["neighborhood"]),
  lexeme("lx-pasar-raya", "pasar raya", ["supermarket"], "noun", ["neighborhood"]),
  phrase(
    "ph-apa-khabar",
    "Apa khabar?",
    ["How are you?"],
    ["starter", "phrase"],
    ["lx-apa"],
    "Greeting"
  ),
  phrase(
    "ph-saya-tidak-faham",
    "Saya tidak faham.",
    ["I don't understand."],
    ["starter", "phrase"],
    ["lx-saya", "lx-tidak", "lx-faham"],
    "Classroom survival"
  ),
  phrase(
    "ph-boleh-ulang",
    "Boleh ulang?",
    ["Can you repeat that?"],
    ["starter", "phrase"],
    ["lx-boleh"],
    "Asking for repetition"
  ),
  phrase(
    "ph-tolong-bantu-saya",
    "Tolong bantu saya.",
    ["Please help me."],
    ["starter", "phrase"],
    ["lx-tolong", "lx-bantu", "lx-saya"],
    "Requesting help"
  ),
  phrase(
    "ph-saya-mahu-air",
    "Saya mahu air.",
    ["I want water."],
    ["starter", "phrase"],
    ["lx-saya", "lx-mahu", "lx-air"],
    "Basic request"
  ),
  phrase(
    "ph-jumpa-lagi",
    "Jumpa lagi.",
    ["See you again.", "See you later."],
    ["starter", "phrase"],
    ["lx-jumpa"],
    "Goodbye"
  ),
  phrase(
    "ph-saya-nak-pergi-sekolah",
    "Saya nak pergi sekolah.",
    ["I want to go to school."],
    ["time", "phrase"],
    ["lx-saya", "lx-nak", "lx-pergi", "lx-sekolah"],
    "Daily routine"
  ),
  phrase(
    "ph-di-mana-kelas-saya",
    "Di mana kelas saya?",
    ["Where is my class?"],
    ["school", "phrase"],
    ["lx-di-mana", "lx-kelas", "lx-saya"],
    "Finding a classroom"
  ),
  phrase(
    "ph-saya-ada-kerja-rumah",
    "Saya ada kerja rumah.",
    ["I have homework."],
    ["school", "phrase"],
    ["lx-saya", "lx-ada", "lx-kerja-rumah"],
    "School task"
  ),
  phrase(
    "ph-boleh-saya-masuk",
    "Boleh saya masuk?",
    ["May I come in?"],
    ["school", "phrase"],
    ["lx-boleh", "lx-saya", "lx-masuk"],
    "Classroom politeness"
  ),
  phrase(
    "ph-saya-belum-siap",
    "Saya belum siap.",
    ["I am not done yet."],
    ["school", "phrase"],
    ["lx-saya", "lx-belum"],
    "School task"
  ),
  phrase(
    "ph-cikgu-saya-tidak-tahu",
    "Cikgu, saya tidak tahu.",
    ["Teacher, I don't know."],
    ["school", "phrase"],
    ["lx-cikgu", "lx-saya", "lx-tidak", "lx-tahu"],
    "Classroom survival"
  ),
  phrase(
    "ph-saya-suka-belajar-bahasa-melayu",
    "Saya suka belajar bahasa Melayu.",
    ["I like learning Malay."],
    ["school", "phrase"],
    ["lx-saya", "lx-suka", "lx-belajar", "lx-bahasa-melayu"],
    "Self-expression"
  ),
  phrase(
    "ph-saya-lapar",
    "Saya lapar.",
    ["I am hungry."],
    ["food", "phrase"],
    ["lx-saya", "lx-lapar"],
    "Food need"
  ),
  phrase(
    "ph-saya-kenyang",
    "Saya kenyang.",
    ["I am full."],
    ["food", "phrase"],
    ["lx-saya", "lx-kenyang"],
    "Food state"
  ),
  phrase(
    "ph-berapa-harga-ini",
    "Berapa harga ini?",
    ["How much is this?"],
    ["food", "shopping", "phrase"],
    ["lx-berapa", "lx-harga", "lx-ini"],
    "Shopping"
  ),
  phrase(
    "ph-saya-mahu-nasi",
    "Saya mahu nasi.",
    ["I want rice."],
    ["food", "phrase"],
    ["lx-saya", "lx-mahu", "lx-nasi"],
    "Ordering food"
  ),
  phrase(
    "ph-air-ini-sejuk",
    "Air ini sejuk.",
    ["This water is cold."],
    ["food", "phrase"],
    ["lx-air", "lx-ini", "lx-sejuk"],
    "Describing food or drink"
  ),
  phrase(
    "ph-makanan-ini-sedap",
    "Makanan ini sedap.",
    ["This food is delicious."],
    ["food", "phrase"],
    ["lx-ini", "lx-sedap"],
    "Describing food"
  ),
  phrase(
    "ph-di-mana-tandas",
    "Di mana tandas?",
    ["Where is the toilet?"],
    ["place", "phrase"],
    ["lx-di-mana", "lx-tandas"],
    "Finding facilities"
  ),
  phrase(
    "ph-saya-di-rumah",
    "Saya di rumah.",
    ["I am at home."],
    ["place", "phrase"],
    ["lx-saya", "lx-rumah"],
    "Location"
  ),
  phrase(
    "ph-saya-tunggu-di-sini",
    "Saya tunggu di sini.",
    ["I will wait here."],
    ["place", "phrase"],
    ["lx-saya", "lx-tunggu", "lx-sini"],
    "Location"
  ),
  phrase(
    "ph-mari-pergi-sekarang",
    "Mari pergi sekarang.",
    ["Let's go now."],
    ["place", "phrase"],
    ["lx-mari", "lx-pergi", "lx-sekarang"],
    "Movement"
  ),
  phrase(
    "ph-kedai-itu-dekat",
    "Kedai itu dekat.",
    ["That shop is near."],
    ["place", "phrase"],
    ["lx-kedai", "lx-itu", "lx-dekat"],
    "Directions"
  ),
  phrase(
    "ph-jalan-ini-jauh",
    "Jalan ini jauh.",
    ["This road is far."],
    ["place", "phrase"],
    ["lx-jalan", "lx-ini", "lx-jauh"],
    "Directions"
  ),
  phrase(
    "ph-selamat-pagi",
    "Selamat pagi.",
    ["Good morning."],
    ["starter", "phrase"],
    ["lx-pagi"],
    "Greeting"
  ),
  phrase(
    "ph-selamat-malam",
    "Selamat malam.",
    ["Good night."],
    ["starter", "phrase"],
    ["lx-malam"],
    "Greeting"
  ),
  phrase(
    "ph-apa-nama-awak",
    "Apa nama awak?",
    ["What is your name?"],
    ["starter", "phrase"],
    ["lx-apa", "lx-nama", "lx-awak"],
    "Introducing yourself"
  ),
  phrase(
    "ph-saya-dari-penang",
    "Saya dari Penang.",
    ["I am from Penang."],
    ["starter", "phrase"],
    ["lx-saya", "lx-dari"],
    "Introducing yourself"
  ),
  phrase(
    "ph-anda-dari-mana",
    "Anda dari mana?",
    ["Where are you from?"],
    ["people", "phrase"],
    ["lx-anda", "lx-dari"],
    "Polite introduction"
  ),
  phrase(
    "ph-ini-kawan-saya",
    "Ini kawan saya.",
    ["This is my friend."],
    ["people", "phrase"],
    ["lx-ini", "lx-kawan", "lx-saya"],
    "Introducing someone"
  ),
  phrase(
    "ph-mereka-di-sekolah",
    "Mereka di sekolah.",
    ["They are at school."],
    ["people", "phrase"],
    ["lx-mereka", "lx-sekolah"],
    "Talking about people"
  ),
  phrase(
    "ph-kami-tunggu-di-sana",
    "Kami tunggu di sana.",
    ["We will wait there."],
    ["people", "phrase"],
    ["lx-kami", "lx-tunggu", "lx-sana"],
    "Making a plan"
  ),
  phrase(
    "ph-saya-tinggal-di-penang",
    "Saya tinggal di Penang.",
    ["I live in Penang."],
    ["people", "phrase"],
    ["lx-saya", "lx-tinggal"],
    "Talking about where you live"
  ),
  phrase(
    "ph-ini-ibu-saya",
    "Ini ibu saya.",
    ["This is my mother."],
    ["people", "phrase"],
    ["lx-ini", "lx-ibu", "lx-saya"],
    "Introducing family"
  ),
  phrase(
    "ph-buku-itu-baru",
    "Buku itu baru.",
    ["That book is new."],
    ["describe", "phrase"],
    ["lx-buku", "lx-itu", "lx-baru"],
    "Describing objects"
  ),
  phrase(
    "ph-kereta-itu-besar",
    "Kereta itu besar.",
    ["That car is big."],
    ["describe", "phrase"],
    ["lx-kereta", "lx-itu", "lx-besar"],
    "Describing size"
  ),
  phrase(
    "ph-bilik-ini-kecil",
    "Bilik ini kecil.",
    ["This room is small."],
    ["describe", "phrase"],
    ["lx-bilik", "lx-ini", "lx-kecil"],
    "Describing size"
  ),
  phrase(
    "ph-soalan-ini-susah",
    "Soalan ini susah.",
    ["This question is difficult."],
    ["describe", "phrase"],
    ["lx-soalan", "lx-ini", "lx-susah"],
    "Describing difficulty"
  ),
  phrase(
    "ph-latihan-ini-mudah",
    "Latihan ini mudah.",
    ["This exercise is easy."],
    ["describe", "phrase"],
    ["lx-latihan", "lx-ini", "lx-mudah"],
    "Describing difficulty"
  ),
  phrase(
    "ph-baju-ini-merah",
    "Baju ini merah.",
    ["This shirt is red."],
    ["describe", "phrase"],
    ["lx-baju", "lx-ini", "lx-merah"],
    "Describing color"
  ),
  phrase(
    "ph-saya-perlu-buku",
    "Saya perlu buku.",
    ["I need a book."],
    ["routine", "phrase"],
    ["lx-saya", "lx-perlu", "lx-buku"],
    "Need statement"
  ),
  phrase(
    "ph-saya-mahu-beli-baju",
    "Saya mahu beli baju.",
    ["I want to buy clothes."],
    ["routine", "shopping", "phrase"],
    ["lx-saya", "lx-mahu", "lx-beli", "lx-baju"],
    "Shopping"
  ),
  phrase(
    "ph-berapa-harga-baju-ini",
    "Berapa harga baju ini?",
    ["How much is this shirt?"],
    ["routine", "shopping", "phrase"],
    ["lx-berapa", "lx-harga", "lx-baju", "lx-ini"],
    "Shopping"
  ),
  phrase(
    "ph-saya-pergi-ke-kantin",
    "Saya pergi ke kantin.",
    ["I am going to the canteen."],
    ["routine", "school", "phrase"],
    ["lx-saya", "lx-pergi", "lx-ke", "lx-kantin"],
    "School movement"
  ),
  phrase(
    "ph-kami-naik-bas",
    "Kami naik bas.",
    ["We take the bus."],
    ["routine", "phrase"],
    ["lx-kami", "lx-naik", "lx-bas"],
    "Travel"
  ),
  phrase(
    "ph-boleh-saya-beli-air",
    "Boleh saya beli air?",
    ["Can I buy water?"],
    ["routine", "shopping", "phrase"],
    ["lx-boleh", "lx-saya", "lx-beli", "lx-air"],
    "Asking permission"
  ),
  phrase(
    "ph-hari-ini-saya-ada-ujian",
    "Hari ini saya ada ujian.",
    ["Today I have a test."],
    ["routine", "school", "phrase"],
    ["lx-hari-ini", "lx-saya", "lx-ada", "lx-ujian"],
    "School schedule"
  ),
  phrase(
    "ph-esok-saya-ada-peperiksaan",
    "Esok saya ada peperiksaan.",
    ["Tomorrow I have an exam."],
    ["routine", "school", "phrase"],
    ["lx-esok", "lx-saya", "lx-ada", "lx-peperiksaan"],
    "School schedule"
  ),
  phrase(
    "ph-cikgu-boleh-ulang-soalan",
    "Cikgu, boleh ulang soalan?",
    ["Teacher, can you repeat the question?"],
    ["routine", "school", "phrase"],
    ["lx-cikgu", "lx-boleh", "lx-ulang", "lx-soalan"],
    "Classroom survival"
  ),
  phrase(
    "ph-saya-sudah-makan",
    "Saya sudah makan.",
    ["I already ate."],
    ["routine", "food", "phrase"],
    ["lx-saya", "lx-sudah", "lx-makan"],
    "Daily routine"
  ),
  phrase(
    "ph-cuaca-hari-ini-panas",
    "Cuaca hari ini panas.",
    ["The weather is hot today."],
    ["routine", "weather", "phrase"],
    ["lx-cuaca", "lx-hari-ini", "lx-panas"],
    "Talking about weather"
  ),
  phrase(
    "ph-saya-pakai-baju-biru",
    "Saya pakai baju biru.",
    ["I am wearing a blue shirt."],
    ["routine", "phrase"],
    ["lx-saya", "lx-pakai", "lx-baju", "lx-biru"],
    "Talking about clothes"
  ),
  phrase(
    "ph-saya-rasa-soalan-ini-susah",
    "Saya rasa soalan ini susah.",
    ["I think this question is difficult."],
    ["thinking", "phrase"],
    ["lx-saya", "lx-rasa", "lx-soalan", "lx-ini", "lx-susah"],
    "Giving an opinion"
  ),
  phrase(
    "ph-jawapan-ini-betul",
    "Jawapan ini betul.",
    ["This answer is correct."],
    ["thinking", "phrase"],
    ["lx-jawapan", "lx-ini", "lx-betul"],
    "Checking work"
  ),
  phrase(
    "ph-jawapan-itu-salah",
    "Jawapan itu salah.",
    ["That answer is wrong."],
    ["thinking", "phrase"],
    ["lx-jawapan", "lx-itu", "lx-salah"],
    "Checking work"
  ),
  phrase(
    "ph-yang-ini-lebih-murah",
    "Yang ini lebih murah.",
    ["This one is cheaper."],
    ["thinking", "shopping", "phrase"],
    ["lx-ini", "lx-lebih", "lx-murah"],
    "Comparing things"
  ),
  phrase(
    "ph-saya-mahu-pilih-yang-ini",
    "Saya mahu pilih yang ini.",
    ["I want to choose this one."],
    ["thinking", "shopping", "phrase"],
    ["lx-saya", "lx-mahu", "lx-pilih", "lx-ini"],
    "Choosing"
  ),
  phrase(
    "ph-tolong-tunjuk-contoh",
    "Tolong tunjuk contoh.",
    ["Please show an example."],
    ["thinking", "school", "phrase"],
    ["lx-tolong", "lx-tunjuk", "lx-contoh"],
    "Requesting clarification"
  ),
  phrase(
    "ph-boleh-saya-pinjam-pen",
    "Boleh saya pinjam pen?",
    ["May I borrow a pen?"],
    ["thinking", "school", "phrase"],
    ["lx-boleh", "lx-saya", "lx-pinjam", "lx-pen"],
    "Classroom request"
  ),
  phrase(
    "ph-saya-sudah-hantar-kerja-rumah",
    "Saya sudah hantar kerja rumah.",
    ["I already submitted my homework."],
    ["thinking", "school", "phrase"],
    ["lx-saya", "lx-sudah", "lx-hantar", "lx-kerja-rumah"],
    "Reporting task completion"
  ),
  phrase(
    "ph-mari-bincang-soalan-ini",
    "Mari bincang soalan ini.",
    ["Let's discuss this question."],
    ["thinking", "school", "phrase"],
    ["lx-mari", "lx-bincang", "lx-soalan", "lx-ini"],
    "Collaborating"
  ),
  phrase(
    "ph-saya-lupa-bawa-buku",
    "Saya lupa bawa buku.",
    ["I forgot to bring my book."],
    ["thinking", "school", "phrase"],
    ["lx-saya", "lx-lupa", "lx-bawa", "lx-buku"],
    "Admitting a problem"
  ),
  phrase(
    "ph-saya-sakit-kepala",
    "Saya sakit kepala.",
    ["I have a headache."],
    ["health", "phrase"],
    ["lx-saya", "lx-sakit", "lx-kepala"],
    "Describing illness"
  ),
  phrase(
    "ph-perut-saya-sakit",
    "Perut saya sakit.",
    ["My stomach hurts."],
    ["health", "phrase"],
    ["lx-perut", "lx-saya", "lx-sakit"],
    "Describing illness"
  ),
  phrase(
    "ph-saya-penat-dan-haus",
    "Saya penat dan haus.",
    ["I am tired and thirsty."],
    ["health", "phrase"],
    ["lx-saya", "lx-penat", "lx-dan", "lx-haus"],
    "Describing condition"
  ),
  phrase(
    "ph-saya-perlu-rehat",
    "Saya perlu rehat.",
    ["I need rest."],
    ["health", "phrase"],
    ["lx-saya", "lx-perlu", "lx-rehat"],
    "Describing need"
  ),
  phrase(
    "ph-saya-perlu-ubat",
    "Saya perlu ubat.",
    ["I need medicine."],
    ["health", "phrase"],
    ["lx-saya", "lx-perlu", "lx-ubat"],
    "Describing need"
  ),
  phrase(
    "ph-saya-perlu-payung-kerana-hujan",
    "Saya perlu payung kerana hujan.",
    ["I need an umbrella because it is raining."],
    ["health", "weather", "phrase"],
    ["lx-saya", "lx-perlu", "lx-payung", "lx-kerana", "lx-hujan"],
    "Weather problem"
  ),
  phrase(
    "ph-kasut-saya-basah",
    "Kasut saya basah.",
    ["My shoes are wet."],
    ["weather", "phrase"],
    ["lx-kasut", "lx-saya", "lx-basah"],
    "Weather result"
  ),
  phrase(
    "ph-cuaca-hari-ini-mendung",
    "Cuaca hari ini mendung.",
    ["The weather is cloudy today."],
    ["weather", "phrase"],
    ["lx-cuaca", "lx-hari-ini", "lx-mendung"],
    "Talking about weather"
  ),
  phrase(
    "ph-hari-ini-cerah-dan-panas",
    "Hari ini cerah dan panas.",
    ["Today is bright and hot."],
    ["weather", "phrase"],
    ["lx-hari-ini", "lx-cerah", "lx-dan", "lx-panas"],
    "Talking about weather"
  ),
  phrase(
    "ph-saya-pergi-ke-klinik",
    "Saya pergi ke klinik.",
    ["I am going to the clinic."],
    ["health", "phrase"],
    ["lx-saya", "lx-pergi", "lx-ke", "lx-klinik"],
    "Health errand"
  ),
  phrase(
    "ph-kenapa-awak-lambat",
    "Kenapa awak lambat?",
    ["Why are you late?"],
    ["repair", "phrase"],
    ["lx-kenapa", "lx-awak", "lx-lambat"],
    "Conversation repair"
  ),
  phrase(
    "ph-boleh-bantu-saya-sekarang",
    "Boleh bantu saya sekarang?",
    ["Can you help me now?"],
    ["repair", "phrase"],
    ["lx-boleh", "lx-bantu", "lx-saya", "lx-sekarang"],
    "Asking for help"
  ),
  phrase(
    "ph-kita-mesti-pergi-sekarang",
    "Kita mesti pergi sekarang.",
    ["We must go now."],
    ["repair", "phrase"],
    ["lx-kita", "lx-mesti", "lx-pergi", "lx-sekarang"],
    "Urgency"
  ),
  phrase(
    "ph-saya-nak-beli-air",
    "Saya nak beli air.",
    ["I want to buy water."],
    ["repair", "phrase"],
    ["lx-saya", "lx-nak", "lx-beli", "lx-air"],
    "Casual request"
  ),
  phrase(
    "ph-mari-ulang-soalan-ini",
    "Mari ulang soalan ini.",
    ["Let's repeat this question."],
    ["repair", "phrase"],
    ["lx-mari", "lx-ulang", "lx-soalan", "lx-ini"],
    "Reviewing something"
  ),
  phrase(
    "ph-kenapa-awak-di-sini",
    "Kenapa awak di sini?",
    ["Why are you here?"],
    ["repair", "phrase"],
    ["lx-kenapa", "lx-awak", "lx-sini"],
    "Checking location"
  ),
  phrase(
    "ph-saya-pergi-ke-sana",
    "Saya pergi ke sana.",
    ["I am going there."],
    ["repair", "phrase"],
    ["lx-saya", "lx-pergi", "lx-ke", "lx-sana"],
    "Movement"
  ),
  phrase(
    "ph-boleh-kita-masuk-sekarang",
    "Boleh kita masuk sekarang?",
    ["Can we go in now?"],
    ["repair", "phrase"],
    ["lx-boleh", "lx-kita", "lx-masuk", "lx-sekarang"],
    "Permission"
  ),
  phrase(
    "ph-awak-di-sini-atau-sana",
    "Awak di sini atau sana?",
    ["Are you here or there?"],
    ["repair", "phrase"],
    ["lx-awak", "lx-sini", "lx-atau", "lx-sana"],
    "Clarifying location"
  ),
  phrase(
    "ph-mari-bantu-dia",
    "Mari bantu dia.",
    ["Let's help him or her."],
    ["repair", "phrase"],
    ["lx-mari", "lx-bantu", "lx-dia"],
    "Helping someone"
  ),
  phrase(
    "ph-kita-mesti-ulang-soalan-ini",
    "Kita mesti ulang soalan ini.",
    ["We must repeat this question."],
    ["repair", "phrase"],
    ["lx-kita", "lx-mesti", "lx-ulang", "lx-soalan", "lx-ini"],
    "Reviewing something"
  ),
  phrase(
    "ph-lantai-ini-kotor",
    "Lantai ini kotor.",
    ["This floor is dirty."],
    ["home", "phrase"],
    ["lx-lantai", "lx-ini", "lx-kotor"],
    "Household observation"
  ),
  phrase(
    "ph-bilik-ini-bersih",
    "Bilik ini bersih.",
    ["This room is clean."],
    ["home", "phrase"],
    ["lx-bilik", "lx-ini", "lx-bersih"],
    "Household observation"
  ),
  phrase(
    "ph-tolong-buka-pintu",
    "Tolong buka pintu.",
    ["Please open the door."],
    ["home", "phrase"],
    ["lx-tolong", "lx-buka", "lx-pintu"],
    "Household request"
  ),
  phrase(
    "ph-tutup-tingkap-itu",
    "Tutup tingkap itu.",
    ["Close that window."],
    ["home", "phrase"],
    ["lx-tutup", "lx-tingkap", "lx-itu"],
    "Household request"
  ),
  phrase(
    "ph-saya-susun-buku",
    "Saya susun buku.",
    ["I arrange the books."],
    ["home", "phrase"],
    ["lx-saya", "lx-susun", "lx-buku"],
    "Household action"
  ),
  phrase(
    "ph-saya-cuci-pakaian",
    "Saya cuci pakaian.",
    ["I wash clothes."],
    ["home", "phrase"],
    ["lx-saya", "lx-cuci", "lx-pakaian"],
    "Household action"
  ),
  phrase(
    "ph-saya-sapu-lantai",
    "Saya sapu lantai.",
    ["I sweep the floor."],
    ["home", "phrase"],
    ["lx-saya", "lx-sapu", "lx-lantai"],
    "Household action"
  ),
  phrase(
    "ph-saya-lap-meja",
    "Saya lap meja.",
    ["I wipe the table."],
    ["home", "phrase"],
    ["lx-saya", "lx-lap", "lx-meja"],
    "Household action"
  ),
  phrase(
    "ph-sampah-itu-di-sini",
    "Sampah itu di sini.",
    ["That trash is here."],
    ["home", "phrase"],
    ["lx-sampah", "lx-itu", "lx-sini"],
    "Household observation"
  ),
  phrase(
    "ph-saya-tutup-lampu",
    "Saya tutup lampu.",
    ["I turn off the light."],
    ["home", "phrase"],
    ["lx-saya", "lx-tutup", "lx-lampu"],
    "Household action"
  ),
  phrase(
    "ph-tingkap-ini-bersih",
    "Tingkap ini bersih.",
    ["This window is clean."],
    ["home", "phrase"],
    ["lx-tingkap", "lx-ini", "lx-bersih"],
    "Household observation"
  ),
  phrase(
    "ph-pakaian-ini-kotor",
    "Pakaian ini kotor.",
    ["These clothes are dirty."],
    ["home", "phrase"],
    ["lx-pakaian", "lx-ini", "lx-kotor"],
    "Household observation"
  ),
  phrase(
    "ph-saya-ada-duit",
    "Saya ada duit.",
    ["I have money."],
    ["shopping", "phrase"],
    ["lx-saya", "lx-ada", "lx-duit"],
    "Money statement"
  ),
  phrase(
    "ph-boleh-saya-bayar-sekarang",
    "Boleh saya bayar sekarang?",
    ["Can I pay now?"],
    ["shopping", "phrase"],
    ["lx-boleh", "lx-saya", "lx-bayar", "lx-sekarang"],
    "Paying"
  ),
  phrase(
    "ph-saya-mahu-resit",
    "Saya mahu resit.",
    ["I want a receipt."],
    ["shopping", "phrase"],
    ["lx-saya", "lx-mahu", "lx-resit"],
    "Shopping"
  ),
  phrase(
    "ph-harga-ini-dua-ringgit",
    "Harga ini dua ringgit.",
    ["This costs two ringgit."],
    ["shopping", "phrase"],
    ["lx-harga", "lx-ini", "lx-dua", "lx-ringgit"],
    "Money statement"
  ),
  phrase(
    "ph-dompet-saya-di-rumah",
    "Dompet saya di rumah.",
    ["My wallet is at home."],
    ["shopping", "phrase"],
    ["lx-dompet", "lx-saya", "lx-rumah"],
    "Problem during shopping"
  ),
  phrase(
    "ph-ada-diskaun",
    "Ada diskaun?",
    ["Is there a discount?"],
    ["shopping", "phrase"],
    ["lx-ada", "lx-diskaun"],
    "Shopping"
  ),
  phrase(
    "ph-saya-cuba-baju-ini",
    "Saya cuba baju ini.",
    ["I try this shirt on."],
    ["shopping", "phrase"],
    ["lx-saya", "lx-cuba", "lx-baju", "lx-ini"],
    "Shopping action"
  ),
  phrase(
    "ph-kedai-itu-jual-roti",
    "Kedai itu jual roti.",
    ["That shop sells bread."],
    ["shopping", "phrase"],
    ["lx-kedai", "lx-itu", "lx-jual", "lx-roti"],
    "Shopping observation"
  ),
  phrase(
    "ph-saya-tempah-makanan",
    "Saya tempah makanan.",
    ["I order food."],
    ["shopping", "phrase"],
    ["lx-saya", "lx-tempah"],
    "Shopping action"
  ),
  phrase(
    "ph-duit-itu-cukup",
    "Duit itu cukup.",
    ["That money is enough."],
    ["shopping", "phrase"],
    ["lx-duit", "lx-itu", "lx-cukup"],
    "Money statement"
  ),
  phrase(
    "ph-saya-bayar-di-sini",
    "Saya bayar di sini.",
    ["I pay here."],
    ["shopping", "phrase"],
    ["lx-saya", "lx-bayar", "lx-sini"],
    "Paying"
  ),
  phrase(
    "ph-resit-itu-di-mana",
    "Resit itu di mana?",
    ["Where is that receipt?"],
    ["shopping", "phrase"],
    ["lx-resit", "lx-itu", "lx-di-mana"],
    "Looking for something"
  ),
  phrase(
    "ph-telefon-saya-di-rumah",
    "Telefon saya di rumah.",
    ["My phone is at home."],
    ["technology", "phrase"],
    ["lx-telefon", "lx-saya", "lx-rumah"],
    "Device location"
  ),
  phrase(
    "ph-saya-hantar-mesej",
    "Saya hantar mesej.",
    ["I send a message."],
    ["technology", "phrase"],
    ["lx-saya", "lx-hantar", "lx-mesej"],
    "Using technology"
  ),
  phrase(
    "ph-gambar-ini-cantik",
    "Gambar ini cantik.",
    ["This picture is beautiful."],
    ["technology", "phrase"],
    ["lx-gambar", "lx-ini", "lx-cantik"],
    "Describing media"
  ),
  phrase(
    "ph-video-itu-panjang",
    "Video itu panjang.",
    ["That video is long."],
    ["technology", "phrase"],
    ["lx-video", "lx-itu", "lx-panjang"],
    "Describing media"
  ),
  phrase(
    "ph-muzik-ini-bagus",
    "Muzik ini bagus.",
    ["This music is good."],
    ["technology", "phrase"],
    ["lx-muzik", "lx-ini", "lx-bagus"],
    "Describing media"
  ),
  phrase(
    "ph-internet-di-sini-lambat",
    "Internet di sini lambat.",
    ["The internet is slow here."],
    ["technology", "phrase"],
    ["lx-internet", "lx-sini", "lx-lambat"],
    "Technology problem"
  ),
  phrase(
    "ph-saya-buka-aplikasi-ini",
    "Saya buka aplikasi ini.",
    ["I open this app."],
    ["technology", "phrase"],
    ["lx-saya", "lx-buka", "lx-aplikasi", "lx-ini"],
    "Using technology"
  ),
  phrase(
    "ph-kata-laluan-saya-salah",
    "Kata laluan saya salah.",
    ["My password is wrong."],
    ["technology", "phrase"],
    ["lx-kata-laluan", "lx-saya", "lx-salah"],
    "Technology problem"
  ),
  phrase(
    "ph-saya-cas-telefon",
    "Saya cas telefon.",
    ["I charge the phone."],
    ["technology", "phrase"],
    ["lx-saya", "lx-cas", "lx-telefon"],
    "Using technology"
  ),
  phrase(
    "ph-saya-muat-turun-video",
    "Saya muat turun video.",
    ["I download a video."],
    ["technology", "phrase"],
    ["lx-saya", "lx-muat-turun", "lx-video"],
    "Using technology"
  ),
  phrase(
    "ph-mesej-itu-penting",
    "Mesej itu penting.",
    ["That message is important."],
    ["technology", "phrase"],
    ["lx-mesej", "lx-itu", "lx-penting"],
    "Technology observation"
  ),
  phrase(
    "ph-saya-lihat-gambar-itu",
    "Saya lihat gambar itu.",
    ["I look at that picture."],
    ["technology", "phrase"],
    ["lx-saya", "lx-lihat", "lx-gambar", "lx-itu"],
    "Using technology"
  ),
  phrase(
    "ph-saya-gembira-hari-ini",
    "Saya gembira hari ini.",
    ["I am happy today."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-gembira", "lx-hari-ini"],
    "Describing feeling"
  ),
  phrase(
    "ph-dia-sedih-sekarang",
    "Dia sedih sekarang.",
    ["He or she is sad now."],
    ["emotion", "phrase"],
    ["lx-dia", "lx-sedih", "lx-sekarang"],
    "Describing feeling"
  ),
  phrase(
    "ph-saya-marah-kerana-lambat",
    "Saya marah kerana lambat.",
    ["I am angry because it is late."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-marah", "lx-kerana", "lx-lambat"],
    "Describing feeling"
  ),
  phrase(
    "ph-saya-malu-di-kelas",
    "Saya malu di kelas.",
    ["I am shy in class."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-malu", "lx-kelas"],
    "Describing feeling"
  ),
  phrase(
    "ph-saya-risau-hari-ini",
    "Saya risau hari ini.",
    ["I am worried today."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-risau", "lx-hari-ini"],
    "Describing feeling"
  ),
  phrase(
    "ph-saya-takut-sekarang",
    "Saya takut sekarang.",
    ["I am scared now."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-takut", "lx-sekarang"],
    "Describing feeling"
  ),
  phrase(
    "ph-kawan-saya-ramah",
    "Kawan saya ramah.",
    ["My friend is friendly."],
    ["emotion", "phrase"],
    ["lx-kawan", "lx-saya", "lx-ramah"],
    "Describing personality"
  ),
  phrase(
    "ph-cikgu-itu-baik",
    "Cikgu itu baik.",
    ["That teacher is kind."],
    ["emotion", "phrase"],
    ["lx-cikgu", "lx-itu", "lx-baik"],
    "Describing personality"
  ),
  phrase(
    "ph-saya-bosan-di-rumah",
    "Saya bosan di rumah.",
    ["I am bored at home."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-bosan", "lx-rumah"],
    "Describing feeling"
  ),
  phrase(
    "ph-dia-sibuk-hari-ini",
    "Dia sibuk hari ini.",
    ["He or she is busy today."],
    ["emotion", "phrase"],
    ["lx-dia", "lx-sibuk", "lx-hari-ini"],
    "Describing condition"
  ),
  phrase(
    "ph-saya-seronok-di-sekolah",
    "Saya seronok di sekolah.",
    ["I am having fun at school."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-seronok", "lx-sekolah"],
    "Describing feeling"
  ),
  phrase(
    "ph-saya-tenang-sekarang",
    "Saya tenang sekarang.",
    ["I am calm now."],
    ["emotion", "phrase"],
    ["lx-saya", "lx-tenang", "lx-sekarang"],
    "Describing feeling"
  ),
  phrase(
    "ph-taman-itu-cantik",
    "Taman itu cantik.",
    ["That park is beautiful."],
    ["nature", "phrase"],
    ["lx-taman", "lx-itu", "lx-cantik"],
    "Describing nature"
  ),
  phrase(
    "ph-saya-suka-pantai",
    "Saya suka pantai.",
    ["I like the beach."],
    ["nature", "phrase"],
    ["lx-saya", "lx-suka", "lx-pantai"],
    "Nature preference"
  ),
  phrase(
    "ph-burung-itu-kecil",
    "Burung itu kecil.",
    ["That bird is small."],
    ["nature", "phrase"],
    ["lx-burung", "lx-itu", "lx-kecil"],
    "Describing animals"
  ),
  phrase(
    "ph-kucing-itu-di-rumah",
    "Kucing itu di rumah.",
    ["That cat is at home."],
    ["nature", "phrase"],
    ["lx-kucing", "lx-itu", "lx-rumah"],
    "Talking about animals"
  ),
  phrase(
    "ph-anjing-itu-besar",
    "Anjing itu besar.",
    ["That dog is big."],
    ["nature", "phrase"],
    ["lx-anjing", "lx-itu", "lx-besar"],
    "Describing animals"
  ),
  phrase(
    "ph-saya-jalan-kaki-ke-sekolah",
    "Saya jalan kaki ke sekolah.",
    ["I walk to school."],
    ["nature", "phrase"],
    ["lx-saya", "lx-jalan-kaki", "lx-ke", "lx-sekolah"],
    "Movement"
  ),
  phrase(
    "ph-pokok-itu-hijau",
    "Pokok itu hijau.",
    ["That tree is green."],
    ["nature", "phrase"],
    ["lx-pokok", "lx-itu", "lx-hijau"],
    "Describing nature"
  ),
  phrase(
    "ph-bunga-ini-merah",
    "Bunga ini merah.",
    ["This flower is red."],
    ["nature", "phrase"],
    ["lx-bunga", "lx-ini", "lx-merah"],
    "Describing nature"
  ),
  phrase(
    "ph-sungai-itu-jauh",
    "Sungai itu jauh.",
    ["That river is far."],
    ["nature", "phrase"],
    ["lx-sungai", "lx-itu", "lx-jauh"],
    "Talking about location"
  ),
  phrase(
    "ph-laut-itu-biru",
    "Laut itu biru.",
    ["The sea is blue."],
    ["nature", "phrase"],
    ["lx-laut", "lx-itu", "lx-biru"],
    "Describing nature"
  ),
  phrase(
    "ph-gunung-itu-tinggi",
    "Gunung itu tinggi.",
    ["That mountain is high."],
    ["nature", "phrase"],
    ["lx-gunung", "lx-itu", "lx-tinggi"],
    "Describing nature"
  ),
  phrase(
    "ph-stesen-itu-di-mana",
    "Stesen itu di mana?",
    ["Where is the station?"],
    ["city", "phrase"],
    ["lx-stesen", "lx-itu", "lx-di-mana"],
    "Finding a place"
  ),
  phrase(
    "ph-saya-perlu-tiket",
    "Saya perlu tiket.",
    ["I need a ticket."],
    ["city", "phrase"],
    ["lx-saya", "lx-perlu", "lx-tiket"],
    "Travel need"
  ),
  phrase(
    "ph-saya-lihat-peta-ini",
    "Saya lihat peta ini.",
    ["I look at this map."],
    ["city", "phrase"],
    ["lx-saya", "lx-lihat", "lx-peta", "lx-ini"],
    "Using a map"
  ),
  phrase(
    "ph-lorong-itu-kecil",
    "Lorong itu kecil.",
    ["That lane is small."],
    ["city", "phrase"],
    ["lx-lorong", "lx-itu", "lx-kecil"],
    "Describing a place"
  ),
  phrase(
    "ph-simpang-itu-di-depan",
    "Simpang itu di depan.",
    ["That junction is in front."],
    ["city", "phrase"],
    ["lx-simpang", "lx-itu", "lx-depan"],
    "Giving directions"
  ),
  phrase(
    "ph-lampu-isyarat-itu-merah",
    "Lampu isyarat itu merah.",
    ["That traffic light is red."],
    ["city", "phrase"],
    ["lx-lampu-isyarat", "lx-itu", "lx-merah"],
    "Traffic"
  ),
  phrase(
    "ph-saya-naik-teksi",
    "Saya naik teksi.",
    ["I take a taxi."],
    ["city", "phrase"],
    ["lx-saya", "lx-naik", "lx-teksi"],
    "Travel"
  ),
  phrase(
    "ph-motosikal-itu-cepat",
    "Motosikal itu cepat.",
    ["That motorcycle is fast."],
    ["city", "phrase"],
    ["lx-motosikal", "lx-itu", "lx-cepat"],
    "Describing transport"
  ),
  phrase(
    "ph-saya-guna-lif",
    "Saya guna lif.",
    ["I use the elevator."],
    ["city", "phrase"],
    ["lx-saya", "lx-guna", "lx-lif"],
    "Movement"
  ),
  phrase(
    "ph-tangga-itu-panjang",
    "Tangga itu panjang.",
    ["That staircase is long."],
    ["city", "phrase"],
    ["lx-tangga", "lx-itu", "lx-panjang"],
    "Describing place"
  ),
  phrase(
    "ph-ini-tingkat-dua",
    "Ini tingkat dua.",
    ["This is the second floor."],
    ["city", "phrase"],
    ["lx-ini", "lx-tingkat", "lx-dua"],
    "Giving location"
  ),
  phrase(
    "ph-penumpang-itu-di-sana",
    "Penumpang itu di sana.",
    ["That passenger is there."],
    ["city", "phrase"],
    ["lx-penumpang", "lx-itu", "lx-sana"],
    "Talking about people"
  ),
  phrase(
    "ph-projek-ini-susah",
    "Projek ini susah.",
    ["This project is difficult."],
    ["school", "phrase"],
    ["lx-projek", "lx-ini", "lx-susah"],
    "School task"
  ),
  phrase(
    "ph-kumpulan-saya-kecil",
    "Kumpulan saya kecil.",
    ["My group is small."],
    ["school", "phrase"],
    ["lx-kumpulan", "lx-saya", "lx-kecil"],
    "School task"
  ),
  phrase(
    "ph-markah-saya-bagus",
    "Markah saya bagus.",
    ["My marks are good."],
    ["school", "phrase"],
    ["lx-markah", "lx-saya", "lx-bagus"],
    "School result"
  ),
  phrase(
    "ph-subjek-ini-penting",
    "Subjek ini penting.",
    ["This subject is important."],
    ["school", "phrase"],
    ["lx-subjek", "lx-ini", "lx-penting"],
    "School judgment"
  ),
  phrase(
    "ph-jadual-ini-panjang",
    "Jadual ini panjang.",
    ["This schedule is long."],
    ["school", "phrase"],
    ["lx-jadual", "lx-ini", "lx-panjang"],
    "School schedule"
  ),
  phrase(
    "ph-kita-mesti-ikut-peraturan",
    "Kita mesti ikut peraturan.",
    ["We must follow the rules."],
    ["school", "phrase"],
    ["lx-kita", "lx-mesti", "lx-ikut", "lx-peraturan"],
    "School rule"
  ),
  phrase(
    "ph-pembentangan-itu-penting",
    "Pembentangan itu penting.",
    ["That presentation is important."],
    ["school", "phrase"],
    ["lx-pembentangan", "lx-itu", "lx-penting"],
    "School task"
  ),
  phrase(
    "ph-dewan-itu-besar",
    "Dewan itu besar.",
    ["That hall is big."],
    ["school", "phrase"],
    ["lx-dewan", "lx-itu", "lx-besar"],
    "School place"
  ),
  phrase(
    "ph-pejabat-itu-di-depan",
    "Pejabat itu di depan.",
    ["That office is in front."],
    ["school", "phrase"],
    ["lx-pejabat", "lx-itu", "lx-depan"],
    "School place"
  ),
  phrase(
    "ph-saya-perlu-rujukan",
    "Saya perlu rujukan.",
    ["I need a reference."],
    ["school", "phrase"],
    ["lx-saya", "lx-perlu", "lx-rujukan"],
    "School task"
  ),
  phrase(
    "ph-laporan-ini-panjang",
    "Laporan ini panjang.",
    ["This report is long."],
    ["school", "phrase"],
    ["lx-laporan", "lx-ini", "lx-panjang"],
    "School task"
  ),
  phrase(
    "ph-eksperimen-ini-susah",
    "Eksperimen ini susah.",
    ["This experiment is difficult."],
    ["school", "phrase"],
    ["lx-eksperimen", "lx-ini", "lx-susah"],
    "School task"
  ),
  phrase(
    "ph-saya-selalu-bangun-awal",
    "Saya selalu bangun awal.",
    ["I always wake up early."],
    ["time", "phrase"],
    ["lx-saya", "lx-selalu", "lx-bangun", "lx-awal"],
    "Daily routine"
  ),
  phrase(
    "ph-dia-kadang-kadang-lewat",
    "Dia kadang-kadang lewat.",
    ["He or she is sometimes late."],
    ["time", "phrase"],
    ["lx-dia", "lx-kadang-kadang", "lx-lewat"],
    "Daily routine"
  ),
  phrase(
    "ph-kita-mula-sekarang",
    "Kita mula sekarang.",
    ["We start now."],
    ["time", "phrase"],
    ["lx-kita", "lx-mula", "lx-sekarang"],
    "Starting something"
  ),
  phrase(
    "ph-kelas-habis-petang",
    "Kelas habis petang.",
    ["Class ends in the afternoon."],
    ["time", "phrase"],
    ["lx-kelas", "lx-habis", "lx-petang"],
    "Schedule"
  ),
  phrase(
    "ph-saya-ada-rancangan",
    "Saya ada rancangan.",
    ["I have a plan."],
    ["time", "phrase"],
    ["lx-saya", "lx-ada", "lx-rancangan"],
    "Plan"
  ),
  phrase(
    "ph-esok-cuti",
    "Esok cuti.",
    ["Tomorrow is a holiday."],
    ["time", "phrase"],
    ["lx-esok", "lx-cuti"],
    "Schedule"
  ),
  phrase(
    "ph-saya-jarang-minum-kopi",
    "Saya jarang minum kopi.",
    ["I rarely drink coffee."],
    ["time", "phrase"],
    ["lx-saya", "lx-jarang", "lx-minum", "lx-kopi"],
    "Habit"
  ),
  phrase(
    "ph-setiap-hari-saya-belajar",
    "Setiap hari saya belajar.",
    ["I study every day."],
    ["time", "phrase"],
    ["lx-setiap", "lx-hari", "lx-saya", "lx-belajar"],
    "Habit"
  ),
  phrase(
    "ph-sebelum-ujian-saya-baca",
    "Sebelum ujian saya baca.",
    ["Before the test I read."],
    ["time", "phrase"],
    ["lx-sebelum", "lx-ujian", "lx-saya", "lx-baca"],
    "Habit"
  ),
  phrase(
    "ph-selepas-sekolah-saya-balik",
    "Selepas sekolah saya balik.",
    ["After school I go home."],
    ["time", "phrase"],
    ["lx-selepas", "lx-sekolah", "lx-saya", "lx-balik"],
    "Routine"
  ),
  phrase(
    "ph-rancangan-itu-penting",
    "Rancangan itu penting.",
    ["That plan is important."],
    ["time", "phrase"],
    ["lx-rancangan", "lx-itu", "lx-penting"],
    "Judgment"
  ),
  phrase(
    "ph-saya-mula-esok",
    "Saya mula esok.",
    ["I start tomorrow."],
    ["time", "phrase"],
    ["lx-saya", "lx-mula", "lx-esok"],
    "Plan"
  ),
  phrase(
    "ph-saya-pergi-ke-hospital",
    "Saya pergi ke hospital.",
    ["I am going to the hospital."],
    ["services", "phrase"],
    ["lx-saya", "lx-pergi", "lx-ke", "lx-hospital"],
    "Emergency travel"
  ),
  phrase(
    "ph-telefon-saya-hilang",
    "Telefon saya hilang.",
    ["My phone is lost."],
    ["services", "phrase"],
    ["lx-telefon", "lx-saya", "lx-hilang"],
    "Problem"
  ),
  phrase(
    "ph-bas-itu-rosak",
    "Bas itu rosak.",
    ["That bus is broken."],
    ["services", "phrase"],
    ["lx-bas", "lx-itu", "lx-rosak"],
    "Problem"
  ),
  phrase(
    "ph-saya-sesat-di-sini",
    "Saya sesat di sini.",
    ["I am lost here."],
    ["services", "phrase"],
    ["lx-saya", "lx-sesat", "lx-sini"],
    "Problem"
  ),
  phrase(
    "ph-ini-kecemasan",
    "Ini kecemasan.",
    ["This is an emergency."],
    ["services", "phrase"],
    ["lx-ini", "lx-kecemasan"],
    "Emergency"
  ),
  phrase(
    "ph-panggil-polis",
    "Panggil polis.",
    ["Call the police."],
    ["services", "phrase"],
    ["lx-panggil", "lx-polis"],
    "Emergency"
  ),
  phrase(
    "ph-bank-itu-di-sana",
    "Bank itu di sana.",
    ["That bank is there."],
    ["services", "phrase"],
    ["lx-bank", "lx-itu", "lx-sana"],
    "Location"
  ),
  phrase(
    "ph-bomba-datang-sekarang",
    "Bomba datang sekarang.",
    ["The fire brigade is coming now."],
    ["services", "phrase"],
    ["lx-bomba", "lx-datang", "lx-sekarang"],
    "Emergency"
  ),
  phrase(
    "ph-bahaya-di-jalan-ini",
    "Bahaya di jalan ini.",
    ["There is danger on this road."],
    ["services", "phrase"],
    ["lx-bahaya", "lx-jalan", "lx-ini"],
    "Warning"
  ),
  phrase(
    "ph-saya-perlu-bantuan-kecemasan",
    "Saya perlu bantuan kecemasan.",
    ["I need emergency help."],
    ["services", "phrase"],
    ["lx-saya", "lx-perlu", "lx-kecemasan"],
    "Emergency"
  ),
  phrase(
    "ph-saya-lapor-sekarang",
    "Saya lapor sekarang.",
    ["I report it now."],
    ["services", "phrase"],
    ["lx-saya", "lx-lapor", "lx-sekarang"],
    "Reporting"
  ),
  phrase(
    "ph-pejabat-post-itu-di-mana",
    "Pejabat pos itu di mana?",
    ["Where is the post office?"],
    ["services", "phrase"],
    ["lx-pejabat-post", "lx-itu", "lx-di-mana"],
    "Finding a service"
  ),
  phrase(
    "ph-saya-dengar-muzik-itu",
    "Saya dengar muzik itu.",
    ["I hear that music."],
    ["listening", "phrase"],
    ["lx-saya", "lx-dengar", "lx-muzik", "lx-itu"],
    "Listening"
  ),
  phrase(
    "ph-boleh-cakap-perlahan",
    "Boleh cakap perlahan?",
    ["Can you speak slowly or more softly?"],
    ["listening", "phrase"],
    ["lx-boleh", "lx-cakap", "lx-perlahan"],
    "Requesting clarity"
  ),
  phrase(
    "ph-suara-itu-kuat",
    "Suara itu kuat.",
    ["That voice is loud."],
    ["listening", "phrase"],
    ["lx-suara", "lx-itu", "lx-kuat"],
    "Describing sound"
  ),
  phrase(
    "ph-kelas-ini-bising",
    "Kelas ini bising.",
    ["This class is noisy."],
    ["listening", "phrase"],
    ["lx-kelas", "lx-ini", "lx-bising"],
    "Describing sound"
  ),
  phrase(
    "ph-bilik-itu-senyap",
    "Bilik itu senyap.",
    ["That room is quiet."],
    ["listening", "phrase"],
    ["lx-bilik", "lx-itu", "lx-senyap"],
    "Describing sound"
  ),
  phrase(
    "ph-apa-maksud-ini",
    "Apa maksud ini?",
    ["What does this mean?"],
    ["listening", "phrase"],
    ["lx-apa", "lx-maksud", "lx-ini"],
    "Asking meaning"
  ),
  phrase(
    "ph-cikgu-saya-belum-faham",
    "Cikgu, saya belum faham.",
    ["Teacher, I still do not understand."],
    ["listening", "phrase"],
    ["lx-cikgu", "lx-saya", "lx-belum", "lx-faham"],
    "Classroom survival"
  ),
  phrase(
    "ph-cikgu-terangkan-soalan-ini",
    "Cikgu, terangkan soalan ini.",
    ["Teacher, explain this question."],
    ["listening", "phrase"],
    ["lx-cikgu", "lx-terangkan", "lx-soalan", "lx-ini"],
    "Asking for explanation"
  ),
  phrase(
    "ph-dia-sebut-nama-saya",
    "Dia sebut nama saya.",
    ["He or she says my name."],
    ["listening", "phrase"],
    ["lx-dia", "lx-sebut", "lx-nama", "lx-saya"],
    "Listening"
  ),
  phrase(
    "ph-saya-suka-sejarah",
    "Saya suka sejarah.",
    ["I like history."],
    ["listening", "phrase"],
    ["lx-saya", "lx-suka", "lx-sejarah"],
    "School subject"
  ),
  phrase(
    "ph-boleh-cakap-dengan-jelas",
    "Boleh cakap dengan jelas?",
    ["Can you speak clearly?"],
    ["listening", "phrase"],
    ["lx-boleh", "lx-cakap", "lx-dengan", "lx-jelas"],
    "Requesting clarity"
  ),
  phrase(
    "ph-saya-pakai-kasut-hitam",
    "Saya pakai kasut hitam.",
    ["I wear black shoes."],
    ["clothes", "phrase"],
    ["lx-saya", "lx-pakai", "lx-kasut", "lx-hitam"],
    "Clothing"
  ),
  phrase(
    "ph-dia-pakai-jaket-biru",
    "Dia pakai jaket biru.",
    ["He or she is wearing a blue jacket."],
    ["clothes", "phrase"],
    ["lx-dia", "lx-pakai", "lx-jaket", "lx-biru"],
    "Clothing"
  ),
  phrase(
    "ph-topi-itu-baru",
    "Topi itu baru.",
    ["That hat is new."],
    ["clothes", "phrase"],
    ["lx-topi", "lx-itu", "lx-baru"],
    "Clothing"
  ),
  phrase(
    "ph-uniform-ini-putih",
    "Uniform ini putih.",
    ["This uniform is white."],
    ["clothes", "phrase"],
    ["lx-uniform", "lx-ini", "lx-putih"],
    "Clothing"
  ),
  phrase(
    "ph-stokin-saya-basah",
    "Stokin saya basah.",
    ["My socks are wet."],
    ["clothes", "phrase"],
    ["lx-stokin", "lx-saya", "lx-basah"],
    "Clothing problem"
  ),
  phrase(
    "ph-seluar-ini-hitam",
    "Seluar ini hitam.",
    ["These pants are black."],
    ["clothes", "phrase"],
    ["lx-seluar", "lx-ini", "lx-hitam"],
    "Clothing"
  ),
  phrase(
    "ph-saiz-ini-sesuai",
    "Saiz ini sesuai.",
    ["This size fits."],
    ["clothes", "phrase"],
    ["lx-saiz", "lx-ini", "lx-sesuai"],
    "Shopping"
  ),
  phrase(
    "ph-baju-itu-longgar",
    "Baju itu longgar.",
    ["That shirt is loose."],
    ["clothes", "phrase"],
    ["lx-baju", "lx-itu", "lx-longgar"],
    "Clothing fit"
  ),
  phrase(
    "ph-seluar-ini-ketat",
    "Seluar ini ketat.",
    ["These pants are tight."],
    ["clothes", "phrase"],
    ["lx-seluar", "lx-ini", "lx-ketat"],
    "Clothing fit"
  ),
  phrase(
    "ph-uniform-saya-kemas",
    "Uniform saya kemas.",
    ["My uniform is neat."],
    ["clothes", "phrase"],
    ["lx-uniform", "lx-saya", "lx-kemas"],
    "Appearance"
  ),
  phrase(
    "ph-warna-ini-cantik",
    "Warna ini cantik.",
    ["This color is beautiful."],
    ["clothes", "phrase"],
    ["lx-warna", "lx-ini", "lx-cantik"],
    "Color"
  ),
  phrase(
    "ph-kasut-itu-mahal",
    "Kasut itu mahal.",
    ["Those shoes are expensive."],
    ["clothes", "phrase"],
    ["lx-kasut", "lx-itu", "lx-mahal"],
    "Shopping"
  ),
  phrase(
    "ph-saya-pesan-mee-sup",
    "Saya pesan mee sup.",
    ["I order noodle soup."],
    ["restaurant", "phrase"],
    ["lx-saya", "lx-pesan", "lx-mee", "lx-sup"],
    "Ordering food"
  ),
  phrase(
    "ph-saya-mahu-jus-epal",
    "Saya mahu jus epal.",
    ["I want apple juice."],
    ["restaurant", "phrase"],
    ["lx-saya", "lx-mahu", "lx-jus", "lx-epal"],
    "Ordering drink"
  ),
  phrase(
    "ph-mee-ini-pedas",
    "Mee ini pedas.",
    ["These noodles are spicy."],
    ["restaurant", "phrase"],
    ["lx-mee", "lx-ini", "lx-pedas"],
    "Describing food"
  ),
  phrase(
    "ph-mee-ini-dalam-mangkuk",
    "Mee ini dalam mangkuk.",
    ["These noodles are in a bowl."],
    ["restaurant", "phrase"],
    ["lx-mee", "lx-ini", "lx-dalam", "lx-mangkuk"],
    "Food container"
  ),
  phrase(
    "ph-saya-guna-sudu",
    "Saya guna sudu.",
    ["I use a spoon."],
    ["restaurant", "phrase"],
    ["lx-saya", "lx-guna", "lx-sudu"],
    "At the table"
  ),
  phrase(
    "ph-dia-hidang-makanan",
    "Dia hidang makanan.",
    ["He or she serves food."],
    ["restaurant", "phrase"],
    ["lx-dia", "lx-hidang"],
    "Restaurant action"
  ),
  phrase(
    "ph-boleh-tambah-sambal",
    "Boleh tambah sambal?",
    ["Can you add sambal?"],
    ["restaurant", "phrase"],
    ["lx-boleh", "lx-tambah", "lx-sambal"],
    "Ordering food"
  ),
  phrase(
    "ph-saya-mahu-susu-sejuk",
    "Saya mahu susu sejuk.",
    ["I want cold milk."],
    ["restaurant", "phrase"],
    ["lx-saya", "lx-mahu", "lx-susu", "lx-sejuk"],
    "Ordering drink"
  ),
  phrase(
    "ph-saya-guna-garpu",
    "Saya guna garpu.",
    ["I use a fork."],
    ["restaurant", "phrase"],
    ["lx-saya", "lx-guna", "lx-garpu"],
    "At the table"
  ),
  phrase(
    "ph-pinggan-ini-bersih",
    "Pinggan ini bersih.",
    ["This plate is clean."],
    ["restaurant", "phrase"],
    ["lx-pinggan", "lx-ini", "lx-bersih"],
    "Tableware"
  ),
  phrase(
    "ph-saya-pesan-air-dan-roti",
    "Saya pesan air dan roti.",
    ["I order water and bread."],
    ["restaurant", "phrase"],
    ["lx-saya", "lx-pesan", "lx-air", "lx-dan", "lx-roti"],
    "Ordering food"
  ),
  phrase(
    "ph-hobi-saya-berenang",
    "Hobi saya berenang.",
    ["My hobby is swimming."],
    ["hobby", "phrase"],
    ["lx-hobi", "lx-saya", "lx-berenang"],
    "Talking about hobbies"
  ),
  phrase(
    "ph-kami-bermain-bola",
    "Kami bermain bola.",
    ["We play ball."],
    ["hobby", "phrase"],
    ["lx-kami", "lx-bermain", "lx-bola"],
    "Sports"
  ),
  phrase(
    "ph-saya-suka-badminton",
    "Saya suka badminton.",
    ["I like badminton."],
    ["hobby", "phrase"],
    ["lx-saya", "lx-suka", "lx-badminton"],
    "Sports"
  ),
  phrase(
    "ph-saya-suka-menonton-filem",
    "Saya suka menonton filem.",
    ["I like watching movies."],
    ["hobby", "phrase"],
    ["lx-saya", "lx-suka", "lx-menonton", "lx-filem"],
    "Hobby"
  ),
  phrase(
    "ph-dia-menyanyi-dengan-baik",
    "Dia menyanyi dengan baik.",
    ["He or she sings well."],
    ["hobby", "phrase"],
    ["lx-dia", "lx-menyanyi", "lx-dengan", "lx-baik"],
    "Hobby"
  ),
  phrase(
    "ph-saya-bermain-gitar",
    "Saya bermain gitar.",
    ["I play guitar."],
    ["hobby", "phrase"],
    ["lx-saya", "lx-bermain", "lx-gitar"],
    "Hobby"
  ),
  phrase(
    "ph-saya-dengar-lagu-ini",
    "Saya dengar lagu ini.",
    ["I listen to this song."],
    ["hobby", "phrase"],
    ["lx-saya", "lx-dengar", "lx-lagu", "lx-ini"],
    "Media hobby"
  ),
  phrase(
    "ph-dia-berlari-di-taman",
    "Dia berlari di taman.",
    ["He or she runs in the park."],
    ["hobby", "phrase"],
    ["lx-dia", "lx-berlari", "lx-taman"],
    "Sports"
  ),
  phrase(
    "ph-saya-lukis-gambar",
    "Saya lukis gambar.",
    ["I draw a picture."],
    ["hobby", "phrase"],
    ["lx-saya", "lx-lukis", "lx-gambar"],
    "Hobby"
  ),
  phrase(
    "ph-badminton-itu-seronok",
    "Badminton itu seronok.",
    ["Badminton is fun."],
    ["hobby", "phrase"],
    ["lx-badminton", "lx-itu", "lx-seronok"],
    "Hobby"
  ),
  phrase(
    "ph-kami-bermain-di-taman",
    "Kami bermain di taman.",
    ["We play in the park."],
    ["hobby", "phrase"],
    ["lx-kami", "lx-bermain", "lx-taman"],
    "Hobby"
  ),
  phrase(
    "ph-tangan-saya-sakit",
    "Tangan saya sakit.",
    ["My hand hurts."],
    ["body", "phrase"],
    ["lx-tangan", "lx-saya", "lx-sakit"],
    "Body"
  ),
  phrase(
    "ph-kaki-saya-penat",
    "Kaki saya penat.",
    ["My legs are tired."],
    ["body", "phrase"],
    ["lx-kaki", "lx-saya", "lx-penat"],
    "Body"
  ),
  phrase(
    "ph-mata-saya-pedih",
    "Mata saya pedih.",
    ["My eyes sting."],
    ["body", "phrase"],
    ["lx-mata", "lx-saya"],
    "Body"
  ),
  phrase(
    "ph-doktor-itu-baik",
    "Doktor itu baik.",
    ["That doctor is kind."],
    ["body", "phrase"],
    ["lx-doktor", "lx-itu", "lx-baik"],
    "Health"
  ),
  phrase(
    "ph-saya-ada-janji-temu",
    "Saya ada janji temu.",
    ["I have an appointment."],
    ["body", "phrase"],
    ["lx-saya", "lx-ada", "lx-janji-temu"],
    "Health"
  ),
  phrase(
    "ph-dia-ukur-suhu-saya",
    "Dia ukur suhu saya.",
    ["He or she measures my temperature."],
    ["body", "phrase"],
    ["lx-dia", "lx-ukur", "lx-suhu", "lx-saya"],
    "Health"
  ),
  phrase(
    "ph-mulut-saya-kering",
    "Mulut saya kering.",
    ["My mouth is dry."],
    ["body", "phrase"],
    ["lx-mulut", "lx-saya", "lx-kering"],
    "Body"
  ),
  phrase(
    "ph-gigi-saya-sakit",
    "Gigi saya sakit.",
    ["My teeth hurt."],
    ["body", "phrase"],
    ["lx-gigi", "lx-saya", "lx-sakit"],
    "Body"
  ),
  phrase(
    "ph-muka-saya-panas",
    "Muka saya panas.",
    ["My face feels hot."],
    ["body", "phrase"],
    ["lx-muka", "lx-saya", "lx-panas"],
    "Body"
  ),
  phrase(
    "ph-hidung-saya-sejuk",
    "Hidung saya sejuk.",
    ["My nose feels cold."],
    ["body", "phrase"],
    ["lx-hidung", "lx-saya", "lx-sejuk"],
    "Body"
  ),
  phrase(
    "ph-telinga-saya-sakit",
    "Telinga saya sakit.",
    ["My ear hurts."],
    ["body", "phrase"],
    ["lx-telinga", "lx-saya", "lx-sakit"],
    "Body"
  ),
  phrase(
    "ph-hari-jadi-saya-pada-disember",
    "Hari jadi saya pada Disember.",
    ["My birthday is in December."],
    ["dates", "phrase"],
    ["lx-hari-jadi", "lx-saya", "lx-pada", "lx-disember"],
    "Date"
  ),
  phrase(
    "ph-ujian-itu-pada-oktober",
    "Ujian itu pada Oktober.",
    ["That test is in October."],
    ["dates", "phrase"],
    ["lx-ujian", "lx-itu", "lx-pada", "lx-oktober"],
    "Date"
  ),
  phrase(
    "ph-saya-balik-pada-hari-sabtu",
    "Saya balik pada hari Sabtu.",
    ["I go home on Saturday."],
    ["dates", "phrase"],
    ["lx-saya", "lx-balik", "lx-pada", "lx-hari", "lx-sabtu"],
    "Date"
  ),
  phrase(
    "ph-minggu-depan-saya-ada-peperiksaan",
    "Minggu depan saya ada peperiksaan.",
    ["Next week I have an exam."],
    ["dates", "phrase"],
    ["lx-minggu-depan", "lx-saya", "lx-ada", "lx-peperiksaan"],
    "Date"
  ),
  phrase(
    "ph-minggu-lepas-saya-cuti",
    "Minggu lepas saya cuti.",
    ["Last week I was on holiday."],
    ["dates", "phrase"],
    ["lx-minggu-lepas", "lx-saya", "lx-cuti"],
    "Date"
  ),
  phrase(
    "ph-tarikh-itu-penting",
    "Tarikh itu penting.",
    ["That date is important."],
    ["dates", "phrase"],
    ["lx-tarikh", "lx-itu", "lx-penting"],
    "Date"
  ),
  phrase(
    "ph-tahun-ini-sibuk",
    "Tahun ini sibuk.",
    ["This year is busy."],
    ["dates", "phrase"],
    ["lx-tahun", "lx-ini", "lx-sibuk"],
    "Date"
  ),
  phrase(
    "ph-januari-itu-awal-tahun",
    "Januari itu awal tahun.",
    ["January is early in the year."],
    ["dates", "phrase"],
    ["lx-januari", "lx-awal", "lx-tahun"],
    "Date"
  ),
  phrase(
    "ph-september-itu-bulan-penting",
    "September itu bulan penting.",
    ["September is an important month."],
    ["dates", "phrase"],
    ["lx-september", "lx-itu", "lx-bulan", "lx-penting"],
    "Date"
  ),
  phrase(
    "ph-disember-itu-bulan-cuti",
    "Disember itu bulan cuti.",
    ["December is a holiday month."],
    ["dates", "phrase"],
    ["lx-disember", "lx-itu", "lx-bulan", "lx-cuti"],
    "Date"
  ),
  phrase(
    "ph-nenek-saya-di-rumah",
    "Nenek saya di rumah.",
    ["My grandmother is at home."],
    ["family-events", "phrase"],
    ["lx-nenek", "lx-saya", "lx-rumah"],
    "Family"
  ),
  phrase(
    "ph-jiran-itu-ramah",
    "Jiran itu ramah.",
    ["That neighbor is friendly."],
    ["family-events", "phrase"],
    ["lx-jiran", "lx-itu", "lx-ramah"],
    "Neighborhood"
  ),
  phrase(
    "ph-kami-jemput-kawan",
    "Kami jemput kawan.",
    ["We invite a friend."],
    ["family-events", "phrase"],
    ["lx-kami", "lx-jemput", "lx-kawan"],
    "Invitation"
  ),
  phrase(
    "ph-saya-bawa-hadiah",
    "Saya bawa hadiah.",
    ["I bring a gift."],
    ["family-events", "phrase"],
    ["lx-saya", "lx-bawa", "lx-hadiah"],
    "Family event"
  ),
  phrase(
    "ph-majlis-itu-besar",
    "Majlis itu besar.",
    ["That event is big."],
    ["family-events", "phrase"],
    ["lx-majlis", "lx-itu", "lx-besar"],
    "Family event"
  ),
  phrase(
    "ph-kami-lawat-datuk",
    "Kami lawat datuk.",
    ["We visit grandfather."],
    ["family-events", "phrase"],
    ["lx-kami", "lx-lawat", "lx-datuk"],
    "Family"
  ),
  phrase(
    "ph-sepupu-saya-datang-esok",
    "Sepupu saya datang esok.",
    ["My cousin is coming tomorrow."],
    ["family-events", "phrase"],
    ["lx-sepupu", "lx-saya", "lx-datang", "lx-esok"],
    "Family"
  ),
  phrase(
    "ph-tetamu-itu-di-sana",
    "Tetamu itu di sana.",
    ["That guest is there."],
    ["family-events", "phrase"],
    ["lx-tetamu", "lx-itu", "lx-sana"],
    "Family event"
  ),
  phrase(
    "ph-majlis-kahwin-itu-cantik",
    "Majlis kahwin itu cantik.",
    ["That wedding event is beautiful."],
    ["family-events", "phrase"],
    ["lx-majlis", "lx-kahwin", "lx-itu", "lx-cantik"],
    "Family event"
  ),
  phrase(
    "ph-rumah-terbuka-itu-seronok",
    "Rumah terbuka itu seronok.",
    ["That open house is fun."],
    ["family-events", "phrase"],
    ["lx-rumah-terbuka", "lx-itu", "lx-seronok"],
    "Family event"
  ),
  phrase(
    "ph-kenduri-itu-di-rumah-nenek",
    "Kenduri itu di rumah nenek.",
    ["That feast is at grandmother's house."],
    ["family-events", "phrase"],
    ["lx-kenduri", "lx-itu", "lx-rumah", "lx-nenek"],
    "Family event"
  ),
  phrase(
    "ph-kami-jemput-jiran",
    "Kami jemput jiran.",
    ["We invite the neighbor."],
    ["family-events", "phrase"],
    ["lx-kami", "lx-jemput", "lx-jiran"],
    "Invitation"
  ),
  phrase(
    "ph-lapangan-terbang-itu-jauh",
    "Lapangan terbang itu jauh.",
    ["That airport is far."],
    ["travel", "phrase"],
    ["lx-lapangan-terbang", "lx-itu", "lx-jauh"],
    "Travel"
  ),
  phrase(
    "ph-saya-ada-pasport",
    "Saya ada pasport.",
    ["I have a passport."],
    ["travel", "phrase"],
    ["lx-saya", "lx-ada", "lx-pasport"],
    "Travel"
  ),
  phrase(
    "ph-bagasi-saya-besar",
    "Bagasi saya besar.",
    ["My luggage is big."],
    ["travel", "phrase"],
    ["lx-bagasi", "lx-saya", "lx-besar"],
    "Travel"
  ),
  phrase(
    "ph-kami-tiba-malam-ini",
    "Kami tiba malam ini.",
    ["We arrive tonight."],
    ["travel", "phrase"],
    ["lx-kami", "lx-tiba", "lx-malam", "lx-ini"],
    "Travel"
  ),
  phrase(
    "ph-kapal-terbang-itu-lewat",
    "Kapal terbang itu lewat.",
    ["That airplane is late."],
    ["travel", "phrase"],
    ["lx-kapal-terbang", "lx-itu", "lx-lewat"],
    "Travel"
  ),
  phrase(
    "ph-saya-ada-tempahan-hotel",
    "Saya ada tempahan hotel.",
    ["I have a hotel booking."],
    ["travel", "phrase"],
    ["lx-saya", "lx-ada", "lx-tempahan", "lx-hotel"],
    "Travel"
  ),
  phrase(
    "ph-pemandu-itu-ramah",
    "Pemandu itu ramah.",
    ["That driver is friendly."],
    ["travel", "phrase"],
    ["lx-pemandu", "lx-itu", "lx-ramah"],
    "Travel"
  ),
  phrase(
    "ph-pelancong-itu-di-sana",
    "Pelancong itu di sana.",
    ["That tourist is over there."],
    ["travel", "phrase"],
    ["lx-pelancong", "lx-itu", "lx-sana"],
    "Travel"
  ),
  phrase(
    "ph-kami-berlepas-esok",
    "Kami berlepas esok.",
    ["We leave tomorrow."],
    ["travel", "phrase"],
    ["lx-kami", "lx-berlepas", "lx-esok"],
    "Travel"
  ),
  phrase(
    "ph-saya-pergi-ke-hotel",
    "Saya pergi ke hotel.",
    ["I go to the hotel."],
    ["travel", "phrase"],
    ["lx-saya", "lx-pergi", "lx-ke", "lx-hotel"],
    "Travel"
  ),
  phrase(
    "ph-kaunter-itu-di-depan",
    "Kaunter itu di depan.",
    ["That counter is in front."],
    ["travel", "phrase"],
    ["lx-kaunter", "lx-itu", "lx-depan"],
    "Travel"
  ),
  phrase(
    "ph-lawatan-ini-seronok",
    "Lawatan ini seronok.",
    ["This trip is fun."],
    ["travel", "phrase"],
    ["lx-lawatan", "lx-ini", "lx-seronok"],
    "Travel"
  ),
  phrase(
    "ph-perkataan-ini-mudah",
    "Perkataan ini mudah.",
    ["This word is easy."],
    ["language", "phrase"],
    ["lx-perkataan", "lx-ini", "lx-mudah"],
    "Language learning"
  ),
  phrase(
    "ph-ayat-itu-panjang",
    "Ayat itu panjang.",
    ["That sentence is long."],
    ["language", "phrase"],
    ["lx-ayat", "lx-itu", "lx-panjang"],
    "Language learning"
  ),
  phrase(
    "ph-saya-guna-kamus",
    "Saya guna kamus.",
    ["I use a dictionary."],
    ["language", "phrase"],
    ["lx-saya", "lx-guna", "lx-kamus"],
    "Language learning"
  ),
  phrase(
    "ph-boleh-betulkan-ayat-ini",
    "Boleh betulkan ayat ini?",
    ["Can you correct this sentence?"],
    ["language", "phrase"],
    ["lx-boleh", "lx-betulkan", "lx-ayat", "lx-ini"],
    "Language learning"
  ),
  phrase(
    "ph-sebutan-saya-salah",
    "Sebutan saya salah.",
    ["My pronunciation is wrong."],
    ["language", "phrase"],
    ["lx-sebutan", "lx-saya", "lx-salah"],
    "Language learning"
  ),
  phrase(
    "ph-saya-ulangkaji-malam-ini",
    "Saya ulangkaji malam ini.",
    ["I revise tonight."],
    ["language", "phrase"],
    ["lx-saya", "lx-ulangkaji", "lx-malam", "lx-ini"],
    "Language learning"
  ),
  phrase(
    "ph-tatabahasa-ini-susah",
    "Tatabahasa ini susah.",
    ["This grammar is difficult."],
    ["language", "phrase"],
    ["lx-tatabahasa", "lx-ini", "lx-susah"],
    "Language learning"
  ),
  phrase(
    "ph-nota-ini-ringkas",
    "Nota ini ringkas.",
    ["These notes are brief."],
    ["language", "phrase"],
    ["lx-nota", "lx-ini", "lx-ringkas"],
    "Language learning"
  ),
  phrase(
    "ph-jawapan-itu-penuh",
    "Jawapan itu penuh.",
    ["That answer is complete."],
    ["language", "phrase"],
    ["lx-jawapan", "lx-itu", "lx-penuh"],
    "Language learning"
  ),
  phrase(
    "ph-saya-hafal-perkataan-ini",
    "Saya hafal perkataan ini.",
    ["I memorize this word."],
    ["language", "phrase"],
    ["lx-saya", "lx-hafal", "lx-perkataan", "lx-ini"],
    "Language learning"
  ),
  phrase(
    "ph-boleh-terjemah-ayat-ini",
    "Boleh terjemah ayat ini?",
    ["Can you translate this sentence?"],
    ["language", "phrase"],
    ["lx-boleh", "lx-terjemah", "lx-ayat", "lx-ini"],
    "Language learning"
  ),
  phrase(
    "ph-ejaan-itu-betul",
    "Ejaan itu betul.",
    ["That spelling is correct."],
    ["language", "phrase"],
    ["lx-ejaan", "lx-itu", "lx-betul"],
    "Language learning"
  ),
  phrase(
    "ph-restoran-itu-di-depan",
    "Restoran itu di depan.",
    ["That restaurant is in front."],
    ["neighborhood", "phrase"],
    ["lx-restoran", "lx-itu", "lx-depan"],
    "Neighborhood"
  ),
  phrase(
    "ph-farmasi-itu-di-mana",
    "Farmasi itu di mana?",
    ["Where is the pharmacy?"],
    ["neighborhood", "phrase"],
    ["lx-farmasi", "lx-itu", "lx-di-mana"],
    "Neighborhood"
  ),
  phrase(
    "ph-saya-pergi-ke-kedai-buku",
    "Saya pergi ke kedai buku.",
    ["I go to the bookstore."],
    ["neighborhood", "phrase"],
    ["lx-saya", "lx-pergi", "lx-ke", "lx-kedai-buku"],
    "Neighborhood"
  ),
  phrase(
    "ph-surau-itu-dekat",
    "Surau itu dekat.",
    ["That prayer room is near."],
    ["neighborhood", "phrase"],
    ["lx-surau", "lx-itu", "lx-dekat"],
    "Neighborhood"
  ),
  phrase(
    "ph-masjid-itu-besar",
    "Masjid itu besar.",
    ["That mosque is big."],
    ["neighborhood", "phrase"],
    ["lx-masjid", "lx-itu", "lx-besar"],
    "Neighborhood"
  ),
  phrase(
    "ph-perhentian-bas-itu-di-sana",
    "Perhentian bas itu di sana.",
    ["That bus stop is over there."],
    ["neighborhood", "phrase"],
    ["lx-perhentian-bas", "lx-itu", "lx-sana"],
    "Neighborhood"
  ),
  phrase(
    "ph-pusat-beli-belah-itu-jauh",
    "Pusat beli-belah itu jauh.",
    ["That shopping mall is far."],
    ["neighborhood", "phrase"],
    ["lx-pusat-beli-belah", "lx-itu", "lx-jauh"],
    "Neighborhood"
  ),
  phrase(
    "ph-jambatan-itu-panjang",
    "Jambatan itu panjang.",
    ["That bridge is long."],
    ["neighborhood", "phrase"],
    ["lx-jambatan", "lx-itu", "lx-panjang"],
    "Neighborhood"
  ),
  phrase(
    "ph-lori-itu-besar",
    "Lori itu besar.",
    ["That lorry is big."],
    ["neighborhood", "phrase"],
    ["lx-lori", "lx-itu", "lx-besar"],
    "Neighborhood"
  ),
  phrase(
    "ph-balai-polis-itu-di-depan",
    "Balai polis itu di depan.",
    ["That police station is in front."],
    ["neighborhood", "phrase"],
    ["lx-balai-polis", "lx-itu", "lx-depan"],
    "Neighborhood"
  ),
  phrase(
    "ph-pasar-raya-itu-dekat",
    "Pasar raya itu dekat.",
    ["That supermarket is near."],
    ["neighborhood", "phrase"],
    ["lx-pasar-raya", "lx-itu", "lx-dekat"],
    "Neighborhood"
  ),
  phrase(
    "ph-lampu-jalan-itu-terang",
    "Lampu jalan itu terang.",
    ["That street light is bright."],
    ["neighborhood", "phrase"],
    ["lx-lampu-jalan", "lx-itu"],
    "Neighborhood"
  ),
  lexeme("lx-banding", "banding", ["compare"], "verb", ["advanced", "thinking"], {
    malayHint: "lihat dua perkara untuk cari persamaan dan perbezaan"
  }),
  lexeme("lx-serupa", "serupa", ["similar"], "adjective", ["advanced", "thinking"], {
    malayHint: "hampir sama"
  }),
  lexeme("lx-bukti", "bukti", ["evidence", "proof"], "noun", ["advanced", "thinking"], {
    malayHint: "sesuatu yang menyokong jawapan atau dakwaan"
  }),
  lexeme("lx-sebab", "sebab", ["reason", "cause"], "noun", ["advanced", "thinking"], {
    malayHint: "punca atau alasan"
  }),
  lexeme("lx-dibenarkan", "dibenarkan", ["allowed", "permitted"], "adjective", ["advanced", "rules"], {
    malayHint: "boleh dibuat mengikut peraturan"
  }),
  lexeme("lx-dilarang", "dilarang", ["forbidden", "prohibited"], "adjective", ["advanced", "rules"], {
    malayHint: "tidak boleh dibuat"
  }),
  lexeme("lx-izin", "izin", ["permission"], "noun", ["advanced", "rules"], {
    malayHint: "kebenaran untuk buat sesuatu"
  }),
  lexeme("lx-patut", "patut", ["should", "ought to"], "verb", ["advanced", "rules"], {
    malayHint: "sesuatu yang wajar dibuat"
  }),
  lexeme("lx-langkah", "langkah", ["step"], "noun", ["advanced", "process"], {
    malayHint: "satu peringkat dalam sesuatu proses"
  }),
  lexeme("lx-kemudian", "kemudian", ["after that", "then"], "adverb", ["advanced", "process"], {
    malayHint: "selepas itu"
  }),
  lexeme("lx-seterusnya", "seterusnya", ["next", "afterward"], "adverb", ["advanced", "process"], {
    malayHint: "bahagian yang datang selepas itu"
  }),
  lexeme("lx-proses", "proses", ["process"], "noun", ["advanced", "process"], {
    malayHint: "cara sesuatu berlaku langkah demi langkah"
  }),
  lexeme("lx-kesan", "kesan", ["effect", "impact"], "noun", ["advanced", "result"], {
    malayHint: "hasil atau akibat daripada sesuatu"
  }),
  lexeme("lx-menyebabkan", "menyebabkan", ["causes"], "verb", ["advanced", "result"], {
    malayHint: "menjadikan sesuatu berlaku"
  }),
  lexeme("lx-berjaya", "berjaya", ["succeed", "successful"], "verb", ["advanced", "result"], {
    malayHint: "mencapai hasil yang baik"
  }),
  lexeme("lx-gagal", "gagal", ["fail", "failed"], "verb", ["advanced", "result"], {
    malayHint: "tidak berjaya"
  }),
  lexeme("lx-borang", "borang", ["form"], "noun", ["advanced", "office"], {
    malayHint: "kertas atau fail untuk diisi"
  }),
  lexeme("lx-tandatangan", "tandatangan", ["signature"], "noun", ["advanced", "office"], {
    malayHint: "nama yang ditulis sebagai pengesahan"
  }),
  lexeme("lx-dokumen", "dokumen", ["document"], "noun", ["advanced", "office"], {
    malayHint: "bahan bertulis yang penting"
  }),
  lexeme("lx-serah", "serah", ["submit", "hand over"], "verb", ["advanced", "office"], {
    malayHint: "beri sesuatu kepada pihak lain secara rasmi"
  }),
  lexeme("lx-setuju", "setuju", ["agree"], "verb", ["advanced", "discussion"], {
    malayHint: "terima sesuatu pendapat"
  }),
  lexeme("lx-bantah", "bantah", ["object", "oppose"], "verb", ["advanced", "discussion"], {
    malayHint: "tidak setuju dan melawan sesuatu cadangan"
  }),
  lexeme("lx-cadang", "cadang", ["suggest", "propose"], "verb", ["advanced", "discussion"], {
    malayHint: "beri satu idea untuk dipertimbangkan"
  }),
  lexeme("lx-keputusan", "keputusan", ["decision"], "noun", ["advanced", "discussion"], {
    malayHint: "hasil pilihan atau pertimbangan"
  }),
  lexeme("lx-jika", "jika", ["if"], "particle", ["advanced", "condition"], {
    malayHint: "kata untuk keadaan yang mungkin berlaku"
  }),
  lexeme("lx-syarat", "syarat", ["condition", "requirement"], "noun", ["advanced", "condition"], {
    malayHint: "perkara yang mesti dipenuhi"
  }),
  lexeme("lx-kecuali", "kecuali", ["unless", "except"], "particle", ["advanced", "condition"], {
    malayHint: "tidak termasuk satu keadaan tertentu"
  }),
  lexeme("lx-peluang", "peluang", ["chance", "opportunity"], "noun", ["advanced", "condition"], {
    malayHint: "kemungkinan baik untuk berjaya atau mendapat sesuatu"
  }),
  lexeme("lx-huraikan", "huraikan", ["describe", "elaborate"], "verb", ["advanced", "explanation"], {
    malayHint: "terangkan dengan lebih panjang"
  }),
  lexeme("lx-jelaskan", "jelaskan", ["explain", "clarify"], "verb", ["advanced", "explanation"], {
    malayHint: "terangkan supaya lebih faham"
  }),
  lexeme("lx-isi", "isi", ["content", "main point"], "noun", ["advanced", "explanation"], {
    malayHint: "maklumat utama dalam jawapan atau tulisan"
  }),
  lexeme("lx-utama", "utama", ["main", "primary"], "adjective", ["advanced", "explanation"], {
    malayHint: "yang paling penting"
  }),
  lexeme("lx-notis", "notis", ["notice"], "noun", ["advanced", "notice"], {
    malayHint: "pesanan rasmi yang dipaparkan"
  }),
  lexeme("lx-pengumuman", "pengumuman", ["announcement"], "noun", ["advanced", "notice"], {
    malayHint: "maklumat yang diberitahu kepada ramai orang"
  }),
  lexeme("lx-gangguan", "gangguan", ["disruption", "disturbance"], "noun", ["advanced", "notice"], {
    malayHint: "sesuatu yang mengganggu perjalanan biasa"
  }),
  lexeme("lx-kelewatan", "kelewatan", ["delay"], "noun", ["advanced", "notice"], {
    malayHint: "keadaan menjadi lambat daripada masa biasa"
  }),
  lexeme("lx-komitmen", "komitmen", ["commitment"], "noun", ["advanced", "planning"], {
    malayHint: "tanggungjawab yang sudah dijanji"
  }),
  lexeme("lx-tangguh", "tangguh", ["postpone", "delay"], "verb", ["advanced", "planning"], {
    malayHint: "alih ke masa yang lebih lewat"
  }),
  lexeme("lx-teruskan", "teruskan", ["continue"], "verb", ["advanced", "planning"], {
    malayHint: "buat lagi tanpa berhenti"
  }),
  lexeme("lx-sahkan", "sahkan", ["confirm"], "verb", ["advanced", "planning"], {
    malayHint: "pastikan sesuatu benar atau tetap"
  }),
  lexeme("lx-petikan", "petikan", ["passage", "excerpt"], "noun", ["immersive", "classroom"], {
    malayHint: "bahagian teks untuk dibaca"
  }),
  lexeme("lx-perenggan", "perenggan", ["paragraph"], "noun", ["immersive", "classroom"], {
    malayHint: "bahagian tulisan yang terdiri daripada beberapa ayat"
  }),
  lexeme("lx-tajuk", "tajuk", ["title", "heading"], "noun", ["immersive", "classroom"], {
    malayHint: "nama bagi sesuatu tulisan atau topik"
  }),
  lexeme("lx-format", "format", ["format"], "noun", ["immersive", "classroom"], {
    malayHint: "bentuk susunan yang perlu diikut"
  }),
  lexeme("lx-nilai", "nilai", ["evaluate", "assess"], "verb", ["immersive", "reasoning"], {
    malayHint: "tentukan baik buruk atau kekuatan sesuatu"
  }),
  lexeme("lx-alasan", "alasan", ["reason", "justification"], "noun", ["immersive", "reasoning"], {
    malayHint: "sebab yang diberi untuk menyokong sesuatu"
  }),
  lexeme("lx-munasabah", "munasabah", ["reasonable"], "adjective", ["immersive", "reasoning"], {
    malayHint: "boleh diterima oleh akal"
  }),
  lexeme("lx-andaian", "andaian", ["assumption"], "noun", ["immersive", "reasoning"], {
    malayHint: "sesuatu yang dianggap benar tanpa bukti cukup"
  }),
  lexeme("lx-walaupun", "walaupun", ["although", "even though"], "particle", ["immersive", "connector"], {
    malayHint: "kata untuk dua idea yang bertentangan"
  }),
  lexeme("lx-namun", "namun", ["however"], "adverb", ["immersive", "connector"], {
    malayHint: "kata untuk menunjukkan pertentangan idea"
  }),
  lexeme("lx-sebaliknya", "sebaliknya", ["instead", "on the contrary"], "adverb", ["immersive", "connector"], {
    malayHint: "pilihan atau keadaan yang bertentangan"
  }),
  lexeme("lx-selain-itu", "selain itu", ["besides that", "in addition"], "adverb", ["immersive", "connector"], {
    malayHint: "tambahan kepada idea yang baru disebut"
  }),
  lexeme("lx-sejak", "sejak", ["since"], "preposition", ["immersive", "time"], {
    malayHint: "bermula dari satu masa dahulu"
  }),
  lexeme("lx-hingga", "hingga", ["until", "up to"], "preposition", ["immersive", "time"], {
    malayHint: "sampai ke satu had masa"
  }),
  lexeme("lx-sepanjang", "sepanjang", ["throughout"], "preposition", ["immersive", "time"], {
    malayHint: "meliputi seluruh tempoh"
  }),
  lexeme("lx-apabila", "apabila", ["when"], "particle", ["immersive", "time"], {
    malayHint: "pada masa sesuatu berlaku"
  }),
  lexeme("lx-rumusan", "rumusan", ["summary"], "noun", ["immersive", "report"], {
    malayHint: "ringkasan isi penting"
  }),
  lexeme("lx-dapatan", "dapatan", ["finding", "result"], "noun", ["immersive", "report"], {
    malayHint: "hasil yang ditemui"
  }),
  lexeme("lx-kesimpulan", "kesimpulan", ["conclusion"], "noun", ["immersive", "report"], {
    malayHint: "hasil akhir daripada pemerhatian atau hujah"
  }),
  lexeme("lx-kaedah", "kaedah", ["method"], "noun", ["immersive", "report"], {
    malayHint: "cara yang digunakan untuk buat sesuatu"
  }),
  lexeme("lx-aduan", "aduan", ["complaint"], "noun", ["immersive", "service"], {
    malayHint: "laporan tentang masalah atau rasa tidak puas hati"
  }),
  lexeme("lx-giliran", "giliran", ["turn"], "noun", ["immersive", "service"], {
    malayHint: "masa seseorang mendapat peluang selepas menunggu"
  }),
  lexeme("lx-permohonan", "permohonan", ["application", "request"], "noun", ["immersive", "service"], {
    malayHint: "permintaan rasmi"
  }),
  lexeme("lx-pengesahan", "pengesahan", ["verification", "confirmation"], "noun", ["immersive", "service"], {
    malayHint: "bukti bahawa sesuatu telah disahkan"
  }),
  lexeme("lx-gotong-royong", "gotong-royong", ["communal work", "community cleanup"], "noun", ["immersive", "community"], {
    malayHint: "kerja bersama-sama untuk kepentingan ramai"
  }),
  lexeme("lx-kebersihan", "kebersihan", ["cleanliness"], "noun", ["immersive", "community"], {
    malayHint: "keadaan bersih"
  }),
  lexeme("lx-keselamatan", "keselamatan", ["safety"], "noun", ["immersive", "community"], {
    malayHint: "keadaan selamat dan bebas daripada bahaya"
  }),
  lexeme("lx-tanggungjawab", "tanggungjawab", ["responsibility"], "noun", ["immersive", "community"], {
    malayHint: "tugas yang mesti dijaga dan dilakukan"
  }),
  lexeme("lx-fakta", "fakta", ["fact"], "noun", ["immersive", "media"], {
    malayHint: "maklumat yang benar"
  }),
  lexeme("lx-maklumat", "maklumat", ["information"], "noun", ["immersive", "media"], {
    malayHint: "isi atau keterangan tentang sesuatu"
  }),
  lexeme("lx-palsu", "palsu", ["false", "fake"], "adjective", ["immersive", "media"], {
    malayHint: "tidak benar"
  }),
  lexeme("lx-rakaman", "rakaman", ["recording"], "noun", ["immersive", "media"], {
    malayHint: "suara atau gambar yang disimpan"
  }),
  lexeme("lx-sokong", "sokong", ["support"], "verb", ["immersive", "argument"], {
    malayHint: "berdiri di pihak sesuatu idea"
  }),
  lexeme("lx-tegaskan", "tegaskan", ["emphasize", "stress"], "verb", ["immersive", "argument"], {
    malayHint: "sebut dengan kuat dan jelas bahawa sesuatu penting"
  }),
  lexeme("lx-akui", "akui", ["admit", "acknowledge"], "verb", ["immersive", "argument"], {
    malayHint: "terima bahawa sesuatu itu benar"
  }),
  lexeme("lx-sangkal", "sangkal", ["deny", "refute"], "verb", ["immersive", "argument"], {
    malayHint: "menolak sesuatu dakwaan atau pendapat"
  }),
  lexeme("lx-kefahaman", "kefahaman", ["understanding", "comprehension"], "noun", ["immersive", "mastery"], {
    malayHint: "keadaan benar-benar faham"
  }),
  lexeme("lx-kefasihan", "kefasihan", ["fluency"], "noun", ["immersive", "mastery"], {
    malayHint: "keupayaan bercakap dengan lancar"
  }),
  lexeme("lx-kesilapan", "kesilapan", ["mistake", "error"], "noun", ["immersive", "mastery"], {
    malayHint: "perbuatan atau jawapan yang salah"
  }),
  lexeme("lx-pembetulan", "pembetulan", ["correction"], "noun", ["immersive", "mastery"], {
    malayHint: "perkara yang membaiki kesalahan"
  }),
  phrase(
    "ph-dua-jawapan-itu-serupa",
    "Dua jawapan itu serupa.",
    ["Those two answers are similar."],
    ["advanced", "comparison", "phrase"],
    ["lx-dua", "lx-jawapan", "lx-serupa"],
    "Discussion",
    {
      malayHint: "ayat untuk kata dua jawapan hampir sama"
    }
  ),
  phrase(
    "ph-boleh-beri-bukti-untuk-jawapan-ini",
    "Boleh beri bukti untuk jawapan ini?",
    ["Can you give evidence for this answer?"],
    ["advanced", "comparison", "phrase"],
    ["lx-boleh", "lx-bukti", "lx-jawapan"],
    "Discussion",
    {
      malayHint: "ayat untuk minta bukti bagi satu jawapan"
    }
  ),
  phrase(
    "ph-kita-perlu-banding-dua-jawapan-ini",
    "Kita perlu banding dua jawapan ini.",
    ["We need to compare these two answers."],
    ["advanced", "comparison", "phrase"],
    ["lx-kita", "lx-perlu", "lx-banding", "lx-dua", "lx-jawapan"],
    "Discussion",
    {
      malayHint: "ayat untuk membandingkan dua jawapan"
    }
  ),
  phrase(
    "ph-apa-sebab-awak-pilih-ini",
    "Apa sebab awak pilih ini?",
    ["What is your reason for choosing this?"],
    ["advanced", "comparison", "phrase"],
    ["lx-apa", "lx-sebab", "lx-awak", "lx-pilih"],
    "Discussion",
    {
      malayHint: "ayat untuk tanya alasan bagi sesuatu pilihan"
    }
  ),
  phrase(
    "ph-telefon-tidak-dibenarkan-di-sini",
    "Telefon tidak dibenarkan di sini.",
    ["Phones are not allowed here."],
    ["advanced", "rules", "phrase"],
    ["lx-telefon", "lx-tidak", "lx-dibenarkan", "lx-sini"],
    "Rules",
    {
      malayHint: "ayat untuk menyatakan sesuatu tidak dibenarkan"
    }
  ),
  phrase(
    "ph-saya-perlu-izin-sebelum-masuk",
    "Saya perlu izin sebelum masuk.",
    ["I need permission before entering."],
    ["advanced", "rules", "phrase"],
    ["lx-saya", "lx-perlu", "lx-izin", "lx-sebelum", "lx-masuk"],
    "Rules",
    {
      malayHint: "ayat untuk minta atau nyatakan keperluan izin"
    }
  ),
  phrase(
    "ph-awak-patut-semak-jawapan-lagi",
    "Awak patut semak jawapan lagi.",
    ["You should check the answer again."],
    ["advanced", "rules", "phrase"],
    ["lx-awak", "lx-patut", "lx-semak", "lx-jawapan"],
    "Rules",
    {
      malayHint: "ayat untuk beri nasihat"
    }
  ),
  phrase(
    "ph-telefon-itu-dilarang-di-kelas",
    "Telefon itu dilarang di kelas.",
    ["That phone is forbidden in class."],
    ["advanced", "rules", "phrase"],
    ["lx-telefon", "lx-itu", "lx-dilarang", "lx-kelas"],
    "Rules",
    {
      malayHint: "ayat untuk menyatakan sesuatu dilarang"
    }
  ),
  phrase(
    "ph-langkah-ini-penting",
    "Langkah ini penting.",
    ["This step is important."],
    ["advanced", "process", "phrase"],
    ["lx-langkah", "lx-ini", "lx-penting"],
    "Process",
    {
      malayHint: "ayat untuk menunjukkan satu langkah yang penting"
    }
  ),
  phrase(
    "ph-kemudian-kami-tulis-jawapan",
    "Kemudian kami tulis jawapan.",
    ["Then we write the answer."],
    ["advanced", "process", "phrase"],
    ["lx-kemudian", "lx-kami", "lx-tulis", "lx-jawapan"],
    "Process",
    {
      malayHint: "ayat untuk menunjukkan langkah selepas itu"
    }
  ),
  phrase(
    "ph-seterusnya-baca-soalan-itu",
    "Seterusnya baca soalan itu.",
    ["Next, read that question."],
    ["advanced", "process", "phrase"],
    ["lx-seterusnya", "lx-baca", "lx-soalan", "lx-itu"],
    "Process",
    {
      malayHint: "ayat arahan untuk langkah seterusnya"
    }
  ),
  phrase(
    "ph-proses-ini-tidak-mudah",
    "Proses ini tidak mudah.",
    ["This process is not easy."],
    ["advanced", "process", "phrase"],
    ["lx-proses", "lx-ini", "lx-tidak", "lx-mudah"],
    "Process",
    {
      malayHint: "ayat untuk menilai sesuatu proses"
    }
  ),
  phrase(
    "ph-hujan-menyebabkan-kami-lewat",
    "Hujan menyebabkan kami lewat.",
    ["Rain caused us to be late."],
    ["advanced", "result", "phrase"],
    ["lx-hujan", "lx-menyebabkan", "lx-kami", "lx-lewat"],
    "Cause and effect",
    {
      malayHint: "ayat untuk menunjukkan punca sesuatu masalah"
    }
  ),
  phrase(
    "ph-kumpulan-kami-berjaya-hari-ini",
    "Kumpulan kami berjaya hari ini.",
    ["Our group succeeded today."],
    ["advanced", "result", "phrase"],
    ["lx-kumpulan", "lx-kami", "lx-berjaya", "lx-hari-ini"],
    "Cause and effect",
    {
      malayHint: "ayat untuk menyatakan kejayaan"
    }
  ),
  phrase(
    "ph-dia-gagal-ujian-itu",
    "Dia gagal ujian itu.",
    ["He failed that test."],
    ["advanced", "result", "phrase"],
    ["lx-dia", "lx-gagal", "lx-ujian", "lx-itu"],
    "Cause and effect",
    {
      malayHint: "ayat untuk menyatakan kegagalan"
    }
  ),
  phrase(
    "ph-kesan-keputusan-itu-besar",
    "Kesan keputusan itu besar.",
    ["The effect of that decision is big."],
    ["advanced", "result", "phrase"],
    ["lx-kesan", "lx-keputusan", "lx-itu", "lx-besar"],
    "Cause and effect",
    {
      malayHint: "ayat untuk menyebut kesan sesuatu keputusan"
    }
  ),
  phrase(
    "ph-tolong-serah-borang-itu-hari-ini",
    "Tolong serah borang itu hari ini.",
    ["Please submit that form today."],
    ["advanced", "office", "phrase"],
    ["lx-tolong", "lx-serah", "lx-borang", "lx-itu", "lx-hari-ini"],
    "School office",
    {
      malayHint: "ayat untuk arahkan seseorang menyerahkan borang"
    }
  ),
  phrase(
    "ph-dokumen-ini-perlu-tandatangan-guru",
    "Dokumen ini perlu tandatangan guru.",
    ["This document needs a teacher's signature."],
    ["advanced", "office", "phrase"],
    ["lx-dokumen", "lx-perlu", "lx-tandatangan", "lx-guru"],
    "School office",
    {
      malayHint: "ayat untuk menyatakan dokumen perlu ditandatangani"
    }
  ),
  phrase(
    "ph-borang-itu-di-pejabat",
    "Borang itu di pejabat.",
    ["That form is at the office."],
    ["advanced", "office", "phrase"],
    ["lx-borang", "lx-itu", "lx-pejabat"],
    "School office",
    {
      malayHint: "ayat untuk nyatakan lokasi borang"
    }
  ),
  phrase(
    "ph-saya-serah-dokumen-semalam",
    "Saya serah dokumen semalam.",
    ["I submitted the document yesterday."],
    ["advanced", "office", "phrase"],
    ["lx-saya", "lx-serah", "lx-dokumen", "lx-semalam"],
    "School office",
    {
      malayHint: "ayat untuk menyatakan dokumen telah diserahkan"
    }
  ),
  phrase(
    "ph-saya-setuju-dengan-jawapan-itu",
    "Saya setuju dengan jawapan itu.",
    ["I agree with that answer."],
    ["advanced", "discussion", "phrase"],
    ["lx-saya", "lx-setuju", "lx-dengan", "lx-jawapan", "lx-itu"],
    "Discussion",
    {
      malayHint: "ayat untuk menyatakan persetujuan"
    }
  ),
  phrase(
    "ph-dia-bantah-keputusan-itu",
    "Dia bantah keputusan itu.",
    ["He objects to that decision."],
    ["advanced", "discussion", "phrase"],
    ["lx-dia", "lx-bantah", "lx-keputusan", "lx-itu"],
    "Discussion",
    {
      malayHint: "ayat untuk menyatakan bantahan"
    }
  ),
  phrase(
    "ph-saya-cadang-kita-mula-sekarang",
    "Saya cadang kita mula sekarang.",
    ["I suggest we start now."],
    ["advanced", "discussion", "phrase"],
    ["lx-saya", "lx-cadang", "lx-kita", "lx-sekarang"],
    "Discussion",
    {
      malayHint: "ayat untuk memberi cadangan"
    }
  ),
  phrase(
    "ph-keputusan-itu-belum-jelas",
    "Keputusan itu belum jelas.",
    ["That decision is not clear yet."],
    ["advanced", "discussion", "phrase"],
    ["lx-keputusan", "lx-itu", "lx-belum", "lx-jelas"],
    "Discussion",
    {
      malayHint: "ayat untuk menyatakan keputusan masih tidak jelas"
    }
  ),
  phrase(
    "ph-jika-hujan-kami-tunggu-di-sini",
    "Jika hujan kami tunggu di sini.",
    ["If it rains, we wait here."],
    ["advanced", "condition", "phrase"],
    ["lx-jika", "lx-hujan", "lx-kami", "lx-tunggu", "lx-sini"],
    "Condition",
    {
      malayHint: "ayat untuk keadaan yang bergantung pada cuaca"
    }
  ),
  phrase(
    "ph-apa-syarat-untuk-masuk",
    "Apa syarat untuk masuk?",
    ["What is the requirement to enter?"],
    ["advanced", "condition", "phrase"],
    ["lx-apa", "lx-syarat", "lx-masuk"],
    "Condition",
    {
      malayHint: "ayat untuk tanya syarat"
    }
  ),
  phrase(
    "ph-saya-datang-kecuali-hujan",
    "Saya datang kecuali hujan.",
    ["I will come unless it rains."],
    ["advanced", "condition", "phrase"],
    ["lx-saya", "lx-datang", "lx-kecuali", "lx-hujan"],
    "Condition",
    {
      malayHint: "ayat untuk nyatakan pengecualian"
    }
  ),
  phrase(
    "ph-dia-ada-peluang-besar",
    "Dia ada peluang besar.",
    ["He has a big chance."],
    ["advanced", "condition", "phrase"],
    ["lx-dia", "lx-ada", "lx-peluang", "lx-besar"],
    "Condition",
    {
      malayHint: "ayat untuk menyatakan kemungkinan yang baik"
    }
  ),
  phrase(
    "ph-boleh-jelaskan-jawapan-ini-lagi",
    "Boleh jelaskan jawapan ini lagi?",
    ["Can you explain this answer again?"],
    ["advanced", "explanation", "phrase"],
    ["lx-boleh", "lx-jelaskan", "lx-jawapan", "lx-ini"],
    "Explanation",
    {
      malayHint: "ayat untuk minta penjelasan tambahan"
    }
  ),
  phrase(
    "ph-cikgu-minta-huraikan-isi-utama",
    "Cikgu minta huraikan isi utama.",
    ["The teacher asked for the main point to be elaborated."],
    ["advanced", "explanation", "phrase"],
    ["lx-cikgu", "lx-huraikan", "lx-isi", "lx-utama"],
    "Explanation",
    {
      malayHint: "ayat untuk huraikan isi paling penting"
    }
  ),
  phrase(
    "ph-isi-utama-itu-penting",
    "Isi utama itu penting.",
    ["That main point is important."],
    ["advanced", "explanation", "phrase"],
    ["lx-isi", "lx-utama", "lx-itu", "lx-penting"],
    "Explanation",
    {
      malayHint: "ayat untuk kenal pasti isi yang penting"
    }
  ),
  phrase(
    "ph-huraikan-jawapan-ini-dengan-ringkas",
    "Huraikan jawapan ini dengan ringkas.",
    ["Explain this answer briefly."],
    ["advanced", "explanation", "phrase"],
    ["lx-huraikan", "lx-jawapan", "lx-ini", "lx-dengan", "lx-ringkas"],
    "Explanation",
    {
      malayHint: "ayat arahan untuk menghuraikan secara pendek"
    }
  ),
  phrase(
    "ph-tolong-baca-notis-itu",
    "Tolong baca notis itu.",
    ["Please read that notice."],
    ["advanced", "notice", "phrase"],
    ["lx-tolong", "lx-baca", "lx-notis", "lx-itu"],
    "Public notice",
    {
      malayHint: "ayat untuk menyuruh seseorang membaca notis"
    }
  ),
  phrase(
    "ph-ada-pengumuman-baru-hari-ini",
    "Ada pengumuman baru hari ini.",
    ["There is a new announcement today."],
    ["advanced", "notice", "phrase"],
    ["lx-ada", "lx-pengumuman", "lx-baru", "lx-hari-ini"],
    "Public notice",
    {
      malayHint: "ayat untuk memberitahu ada pengumuman baharu"
    }
  ),
  phrase(
    "ph-ada-gangguan-di-jalan-ini",
    "Ada gangguan di jalan ini.",
    ["There is a disruption on this road."],
    ["advanced", "notice", "phrase"],
    ["lx-ada", "lx-gangguan", "lx-jalan", "lx-ini"],
    "Public notice",
    {
      malayHint: "ayat untuk melaporkan gangguan"
    }
  ),
  phrase(
    "ph-bas-itu-ada-kelewatan",
    "Bas itu ada kelewatan.",
    ["That bus is delayed."],
    ["advanced", "notice", "phrase"],
    ["lx-bas", "lx-itu", "lx-ada", "lx-kelewatan"],
    "Public notice",
    {
      malayHint: "ayat untuk menyatakan kelewatan"
    }
  ),
  phrase(
    "ph-kita-perlu-sahkan-tempahan-itu",
    "Kita perlu sahkan tempahan itu.",
    ["We need to confirm that booking."],
    ["advanced", "planning", "phrase"],
    ["lx-kita", "lx-perlu", "lx-sahkan", "lx-tempahan", "lx-itu"],
    "Planning",
    {
      malayHint: "ayat untuk mengesahkan satu tempahan"
    }
  ),
  phrase(
    "ph-saya-tidak-boleh-tangguh-lagi",
    "Saya tidak boleh tangguh lagi.",
    ["I cannot postpone it anymore."],
    ["advanced", "planning", "phrase"],
    ["lx-saya", "lx-tidak", "lx-boleh", "lx-tangguh"],
    "Planning",
    {
      malayHint: "ayat untuk nyatakan sesuatu tidak boleh ditunda lagi"
    }
  ),
  phrase(
    "ph-kami-teruskan-esok-pagi",
    "Kami teruskan esok pagi.",
    ["We continue tomorrow morning."],
    ["advanced", "planning", "phrase"],
    ["lx-kami", "lx-teruskan", "lx-esok", "lx-pagi"],
    "Planning",
    {
      malayHint: "ayat untuk sambung rancangan pada masa lain"
    }
  ),
  phrase(
    "ph-komitmen-ini-penting",
    "Komitmen ini penting.",
    ["This commitment is important."],
    ["advanced", "planning", "phrase"],
    ["lx-komitmen", "lx-ini", "lx-penting"],
    "Planning",
    {
      malayHint: "ayat untuk menilai sesuatu komitmen"
    }
  ),
  phrase(
    "ph-baca-petikan-itu-sekarang",
    "Baca petikan itu sekarang.",
    ["Read that passage now."],
    ["immersive", "classroom", "phrase"],
    ["lx-baca", "lx-petikan", "lx-itu", "lx-sekarang"],
    "Classroom Malay",
    {
      malayHint: "ayat arahan untuk membaca petikan"
    }
  ),
  phrase(
    "ph-perenggan-ini-panjang",
    "Perenggan ini panjang.",
    ["This paragraph is long."],
    ["immersive", "classroom", "phrase"],
    ["lx-perenggan", "lx-ini", "lx-panjang"],
    "Classroom Malay",
    {
      malayHint: "ayat untuk menilai panjang satu perenggan"
    }
  ),
  phrase(
    "ph-tajuk-itu-jelas",
    "Tajuk itu jelas.",
    ["That title is clear."],
    ["immersive", "classroom", "phrase"],
    ["lx-tajuk", "lx-itu", "lx-jelas"],
    "Classroom Malay",
    {
      malayHint: "ayat untuk menilai tajuk"
    }
  ),
  phrase(
    "ph-ikut-format-yang-betul",
    "Ikut format yang betul.",
    ["Follow the correct format."],
    ["immersive", "classroom", "phrase"],
    ["lx-ikut", "lx-format", "lx-betul"],
    "Classroom Malay",
    {
      malayHint: "ayat arahan untuk ikut susunan yang betul"
    }
  ),
  phrase(
    "ph-kita-perlu-nilai-jawapan-ini",
    "Kita perlu nilai jawapan ini.",
    ["We need to evaluate this answer."],
    ["immersive", "reasoning", "phrase"],
    ["lx-kita", "lx-perlu", "lx-nilai", "lx-jawapan", "lx-ini"],
    "Reasoning",
    {
      malayHint: "ayat untuk menilai satu jawapan"
    }
  ),
  phrase(
    "ph-alasan-itu-kurang-munasabah",
    "Alasan itu kurang munasabah.",
    ["That reason is less reasonable."],
    ["immersive", "reasoning", "phrase"],
    ["lx-alasan", "lx-itu", "lx-kurang", "lx-munasabah"],
    "Reasoning",
    {
      malayHint: "ayat untuk menolak alasan yang lemah"
    }
  ),
  phrase(
    "ph-andaian-itu-belum-kuat",
    "Andaian itu belum kuat.",
    ["That assumption is not strong yet."],
    ["immersive", "reasoning", "phrase"],
    ["lx-andaian", "lx-itu", "lx-belum", "lx-kuat"],
    "Reasoning",
    {
      malayHint: "ayat untuk menyatakan andaian masih lemah"
    }
  ),
  phrase(
    "ph-apa-alasan-awak",
    "Apa alasan awak?",
    ["What is your reason?"],
    ["immersive", "reasoning", "phrase"],
    ["lx-apa", "lx-alasan", "lx-awak"],
    "Reasoning",
    {
      malayHint: "ayat pendek untuk minta alasan"
    }
  ),
  phrase(
    "ph-walaupun-susah-saya-cuba",
    "Walaupun susah saya cuba.",
    ["Although it is hard, I try."],
    ["immersive", "connector", "phrase"],
    ["lx-walaupun", "lx-susah", "lx-saya", "lx-cuba"],
    "Connector Malay",
    {
      malayHint: "ayat untuk tunjuk pertentangan tetapi masih mahu teruskan"
    }
  ),
  phrase(
    "ph-namun-jawapan-itu-tidak-jelas",
    "Namun jawapan itu tidak jelas.",
    ["However, that answer is not clear."],
    ["immersive", "connector", "phrase"],
    ["lx-namun", "lx-jawapan", "lx-itu", "lx-tidak", "lx-jelas"],
    "Connector Malay",
    {
      malayHint: "ayat untuk menambah pertentangan kepada idea sebelumnya"
    }
  ),
  phrase(
    "ph-sebaliknya-kami-pilih-ini",
    "Sebaliknya kami pilih ini.",
    ["Instead, we choose this."],
    ["immersive", "connector", "phrase"],
    ["lx-sebaliknya", "lx-kami", "lx-pilih", "lx-ini"],
    "Connector Malay",
    {
      malayHint: "ayat untuk beri pilihan yang bertentangan"
    }
  ),
  phrase(
    "ph-selain-itu-ada-satu-soalan",
    "Selain itu ada satu soalan.",
    ["Besides that, there is one more question."],
    ["immersive", "connector", "phrase"],
    ["lx-selain-itu", "lx-ada", "lx-satu", "lx-soalan"],
    "Connector Malay",
    {
      malayHint: "ayat untuk menambah satu lagi perkara"
    }
  ),
  phrase(
    "ph-sejak-pagi-dia-belajar",
    "Sejak pagi dia belajar.",
    ["He has been studying since morning."],
    ["immersive", "time", "phrase"],
    ["lx-sejak", "lx-pagi", "lx-dia", "lx-belajar"],
    "Time relations",
    {
      malayHint: "ayat untuk menunjukkan sesuatu bermula pada waktu lalu"
    }
  ),
  phrase(
    "ph-perpustakaan-itu-buka-hingga-malam",
    "Perpustakaan itu buka hingga malam.",
    ["That library stays open until night."],
    ["immersive", "time", "phrase"],
    ["lx-perpustakaan", "lx-itu", "lx-buka", "lx-hingga", "lx-malam"],
    "Time relations",
    {
      malayHint: "ayat untuk tempoh yang berakhir pada masa tertentu"
    }
  ),
  phrase(
    "ph-sepanjang-minggu-ini-sibuk",
    "Sepanjang minggu ini sibuk.",
    ["It is busy throughout this week."],
    ["immersive", "time", "phrase"],
    ["lx-sepanjang", "lx-minggu", "lx-ini", "lx-sibuk"],
    "Time relations",
    {
      malayHint: "ayat untuk keadaan yang berlaku sepanjang satu tempoh"
    }
  ),
  phrase(
    "ph-apabila-hujan-kami-masuk-kelas",
    "Apabila hujan kami masuk kelas.",
    ["When it rains, we go into class."],
    ["immersive", "time", "phrase"],
    ["lx-apabila", "lx-hujan", "lx-kami", "lx-masuk", "lx-kelas"],
    "Time relations",
    {
      malayHint: "ayat untuk kaitkan satu tindakan dengan satu masa"
    }
  ),
  phrase(
    "ph-rumusan-itu-ringkas-dan-jelas",
    "Rumusan itu ringkas dan jelas.",
    ["That summary is brief and clear."],
    ["immersive", "report", "phrase"],
    ["lx-rumusan", "lx-itu", "lx-ringkas", "lx-dan", "lx-jelas"],
    "Reporting",
    {
      malayHint: "ayat untuk menilai kualiti rumusan"
    }
  ),
  phrase(
    "ph-dapatan-itu-penting",
    "Dapatan itu penting.",
    ["That finding is important."],
    ["immersive", "report", "phrase"],
    ["lx-dapatan", "lx-itu", "lx-penting"],
    "Reporting",
    {
      malayHint: "ayat untuk tekankan hasil penemuan"
    }
  ),
  phrase(
    "ph-apa-kesimpulan-awak",
    "Apa kesimpulan awak?",
    ["What is your conclusion?"],
    ["immersive", "report", "phrase"],
    ["lx-apa", "lx-kesimpulan", "lx-awak"],
    "Reporting",
    {
      malayHint: "ayat untuk minta kesimpulan"
    }
  ),
  phrase(
    "ph-kaedah-ini-lebih-sesuai",
    "Kaedah ini lebih sesuai.",
    ["This method is more suitable."],
    ["immersive", "report", "phrase"],
    ["lx-kaedah", "lx-ini", "lx-lebih", "lx-sesuai"],
    "Reporting",
    {
      malayHint: "ayat untuk bandingkan kaedah"
    }
  ),
  phrase(
    "ph-saya-hantar-aduan-semalam",
    "Saya hantar aduan semalam.",
    ["I sent a complaint yesterday."],
    ["immersive", "service", "phrase"],
    ["lx-saya", "lx-hantar", "lx-aduan", "lx-semalam"],
    "Service counter",
    {
      malayHint: "ayat untuk menyatakan aduan sudah dihantar"
    }
  ),
  phrase(
    "ph-tunggu-giliran-di-sini",
    "Tunggu giliran di sini.",
    ["Wait for your turn here."],
    ["immersive", "service", "phrase"],
    ["lx-tunggu", "lx-giliran", "lx-sini"],
    "Service counter",
    {
      malayHint: "ayat arahan ketika beratur"
    }
  ),
  phrase(
    "ph-permohonan-itu-perlu-pengesahan",
    "Permohonan itu perlu pengesahan.",
    ["That application needs verification."],
    ["immersive", "service", "phrase"],
    ["lx-permohonan", "lx-itu", "lx-perlu", "lx-pengesahan"],
    "Service counter",
    {
      malayHint: "ayat untuk nyatakan satu permohonan belum lengkap"
    }
  ),
  phrase(
    "ph-giliran-saya-belum-tiba",
    "Giliran saya belum tiba.",
    ["My turn has not arrived yet."],
    ["immersive", "service", "phrase"],
    ["lx-giliran", "lx-saya", "lx-belum", "lx-tiba"],
    "Service counter",
    {
      malayHint: "ayat untuk kata masih menunggu giliran"
    }
  ),
  phrase(
    "ph-gotong-royong-itu-pada-hari-ahad",
    "Gotong-royong itu pada hari Ahad.",
    ["That communal work is on Sunday."],
    ["immersive", "community", "phrase"],
    ["lx-gotong-royong", "lx-itu", "lx-pada", "lx-hari", "lx-ahad"],
    "Community",
    {
      malayHint: "ayat untuk menyebut masa program komuniti"
    }
  ),
  phrase(
    "ph-kebersihan-kelas-itu-tanggungjawab-kami",
    "Kebersihan kelas itu tanggungjawab kami.",
    ["The cleanliness of that class is our responsibility."],
    ["immersive", "community", "phrase"],
    ["lx-kebersihan", "lx-kelas", "lx-itu", "lx-tanggungjawab", "lx-kami"],
    "Community",
    {
      malayHint: "ayat untuk kaitkan tanggungjawab dengan kebersihan"
    }
  ),
  phrase(
    "ph-keselamatan-di-jalan-itu-penting",
    "Keselamatan di jalan itu penting.",
    ["Safety on that road is important."],
    ["immersive", "community", "phrase"],
    ["lx-keselamatan", "lx-jalan", "lx-itu", "lx-penting"],
    "Community",
    {
      malayHint: "ayat untuk tekankan pentingnya keselamatan"
    }
  ),
  phrase(
    "ph-tanggungjawab-anda-penting",
    "Tanggungjawab anda penting.",
    ["Your responsibility is important."],
    ["immersive", "community", "phrase"],
    ["lx-tanggungjawab", "lx-anda", "lx-penting"],
    "Community",
    {
      malayHint: "ayat untuk ingatkan seseorang tentang tanggungjawab"
    }
  ),
  phrase(
    "ph-semak-fakta-sebelum-kongsi",
    "Semak fakta sebelum kongsi.",
    ["Check the facts before sharing."],
    ["immersive", "media", "phrase"],
    ["lx-semak", "lx-fakta", "lx-sebelum", "lx-kongsi"],
    "Media",
    {
      malayHint: "ayat arahan supaya periksa kebenaran maklumat dahulu"
    }
  ),
  phrase(
    "ph-maklumat-itu-mungkin-palsu",
    "Maklumat itu mungkin palsu.",
    ["That information may be false."],
    ["immersive", "media", "phrase"],
    ["lx-maklumat", "lx-itu", "lx-mungkin", "lx-palsu"],
    "Media",
    {
      malayHint: "ayat untuk beri amaran bahawa maklumat belum pasti benar"
    }
  ),
  phrase(
    "ph-rakaman-itu-jelas",
    "Rakaman itu jelas.",
    ["That recording is clear."],
    ["immersive", "media", "phrase"],
    ["lx-rakaman", "lx-itu", "lx-jelas"],
    "Media",
    {
      malayHint: "ayat untuk menilai kualiti rakaman"
    }
  ),
  phrase(
    "ph-kami-tidak-kongsi-maklumat-palsu",
    "Kami tidak kongsi maklumat palsu.",
    ["We do not share false information."],
    ["immersive", "media", "phrase"],
    ["lx-kami", "lx-tidak", "lx-kongsi", "lx-maklumat", "lx-palsu"],
    "Media",
    {
      malayHint: "ayat untuk nyatakan pendirian terhadap maklumat palsu"
    }
  ),
  phrase(
    "ph-saya-sokong-keputusan-itu",
    "Saya sokong keputusan itu.",
    ["I support that decision."],
    ["immersive", "argument", "phrase"],
    ["lx-saya", "lx-sokong", "lx-keputusan", "lx-itu"],
    "Argument",
    {
      malayHint: "ayat untuk menyokong satu keputusan"
    }
  ),
  phrase(
    "ph-dia-tegaskan-jawapan-itu",
    "Dia tegaskan jawapan itu.",
    ["He emphasized that answer."],
    ["immersive", "argument", "phrase"],
    ["lx-dia", "lx-tegaskan", "lx-jawapan", "lx-itu"],
    "Argument",
    {
      malayHint: "ayat untuk menegaskan satu jawapan"
    }
  ),
  phrase(
    "ph-saya-akui-saya-lewat",
    "Saya akui saya lewat.",
    ["I admit that I was late."],
    ["immersive", "argument", "phrase"],
    ["lx-saya", "lx-akui", "lx-lewat"],
    "Argument",
    {
      malayHint: "ayat untuk mengaku satu kesalahan atau keadaan"
    }
  ),
  phrase(
    "ph-mereka-sangkal-jawapan-itu",
    "Mereka sangkal jawapan itu.",
    ["They refuted that answer."],
    ["immersive", "argument", "phrase"],
    ["lx-mereka", "lx-sangkal", "lx-jawapan", "lx-itu"],
    "Argument",
    {
      malayHint: "ayat untuk menolak satu jawapan"
    }
  ),
  phrase(
    "ph-kefahaman-saya-lebih-baik",
    "Kefahaman saya lebih baik.",
    ["My understanding is better."],
    ["immersive", "mastery", "phrase"],
    ["lx-kefahaman", "lx-saya", "lx-lebih", "lx-baik"],
    "Mastery",
    {
      malayHint: "ayat untuk menilai perkembangan kefahaman"
    }
  ),
  phrase(
    "ph-kefasihan-datang-dengan-latihan",
    "Kefasihan datang dengan latihan.",
    ["Fluency comes with practice."],
    ["immersive", "mastery", "phrase"],
    ["lx-kefasihan", "lx-datang", "lx-dengan", "lx-latihan"],
    "Mastery",
    {
      malayHint: "ayat untuk jelaskan bagaimana kefasihan terbina"
    }
  ),
  phrase(
    "ph-kesilapan-itu-jelas",
    "Kesilapan itu jelas.",
    ["That mistake is clear."],
    ["immersive", "mastery", "phrase"],
    ["lx-kesilapan", "lx-itu", "lx-jelas"],
    "Mastery",
    {
      malayHint: "ayat untuk mengenal pasti satu kesilapan"
    }
  ),
  phrase(
    "ph-pembetulan-itu-baik-untuk-saya",
    "Pembetulan itu baik untuk saya.",
    ["That correction is good for me."],
    ["immersive", "mastery", "phrase"],
    ["lx-pembetulan", "lx-itu", "lx-baik", "lx-saya"],
    "Mastery",
    {
      malayHint: "ayat untuk menerima pembetulan sebagai sesuatu yang berguna"
    }
  )
];

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
  exerciseTemplates: defaultTemplates,
  xpReward: 15
});

const lessons: Lesson[] = [
  lesson("lesson-1", "unit-core", "You & Things", "Meet the most important core words.", [
    "lx-saya",
    "lx-awak",
    "lx-dia",
    "lx-ini",
    "lx-itu",
    "lx-ada"
  ]),
  lesson("lesson-2", "unit-core", "Replies & Courtesy", "Fast survival replies.", [
    "lx-ya",
    "lx-tidak",
    "lx-mungkin",
    "lx-tolong",
    "lx-maaf",
    "lx-terima-kasih"
  ]),
  lesson("lesson-3", "unit-core", "Question Words", "Ask the right thing.", [
    "lx-apa",
    "lx-siapa",
    "lx-bila",
    "lx-di-mana",
    "lx-berapa",
    "lx-bagaimana"
  ]),
  lesson("lesson-4", "unit-core", "Basic Verbs", "Talk about simple actions.", [
    "lx-mahu",
    "lx-suka",
    "lx-pergi",
    "lx-datang",
    "lx-lihat",
    "lx-cakap"
  ]),
  lesson("lesson-5", "unit-core", "Survival Phrases", "The first phrases you will actually use.", [
    "ph-apa-khabar",
    "ph-saya-tidak-faham",
    "ph-boleh-ulang",
    "ph-tolong-bantu-saya",
    "ph-saya-mahu-air",
    "ph-jumpa-lagi"
  ]),
  lesson("lesson-6", "unit-time", "Numbers 0-5", "Count the easy half first.", [
    "lx-sifar",
    "lx-satu",
    "lx-dua",
    "lx-tiga",
    "lx-empat",
    "lx-lima"
  ]),
  lesson("lesson-7", "unit-time", "Numbers 6-20", "Push your counting range higher.", [
    "lx-enam",
    "lx-tujuh",
    "lx-lapan",
    "lx-sembilan",
    "lx-sepuluh",
    "lx-dua-puluh"
  ]),
  lesson("lesson-8", "unit-time", "Today & Later", "Anchor your day.", [
    "lx-hari-ini",
    "lx-esok",
    "lx-semalam",
    "lx-sekarang",
    "lx-nanti",
    "lx-jam"
  ]),
  lesson("lesson-9", "unit-time", "Parts of the Day", "Name time windows clearly.", [
    "lx-pagi",
    "lx-tengah-hari",
    "lx-petang",
    "lx-malam",
    "lx-hari",
    "lx-minggu"
  ]),
  lesson("lesson-10", "unit-time", "Days & Plans", "School-week language.", [
    "lx-bulan",
    "lx-isnin",
    "lx-selasa",
    "lx-rabu",
    "lx-khamis",
    "lx-jumaat"
  ]),
  lesson("lesson-11", "unit-school", "School Basics", "The places and people you hear every day.", [
    "lx-sekolah",
    "lx-kelas",
    "lx-guru",
    "lx-murid",
    "lx-buku",
    "lx-pensel"
  ]),
  lesson("lesson-12", "unit-school", "Classroom Objects", "Things around your desk.", [
    "lx-pen",
    "lx-kertas",
    "lx-meja",
    "lx-kerusi",
    "lx-beg",
    "lx-komputer"
  ]),
  lesson("lesson-13", "unit-school", "Study Actions", "What you do in class.", [
    "lx-belajar",
    "lx-baca",
    "lx-tulis",
    "lx-faham",
    "lx-tahu",
    "lx-tanya"
  ]),
  lesson("lesson-14", "unit-school", "Homework & Tests", "Academic pressure, in Malay.", [
    "lx-latihan",
    "lx-kerja-rumah",
    "lx-ujian",
    "lx-peperiksaan",
    "lx-soalan",
    "lx-jawapan"
  ]),
  lesson("lesson-15", "unit-school", "Classroom Phrases", "Useful student sentences.", [
    "ph-di-mana-kelas-saya",
    "ph-saya-ada-kerja-rumah",
    "ph-boleh-saya-masuk",
    "ph-saya-belum-siap",
    "ph-cikgu-saya-tidak-tahu",
    "ph-saya-suka-belajar-bahasa-melayu"
  ]),
  lesson("lesson-16", "unit-food", "Food Basics", "The first things to order.", [
    "lx-air",
    "lx-teh",
    "lx-kopi",
    "lx-nasi",
    "lx-roti",
    "lx-ayam"
  ]),
  lesson("lesson-17", "unit-food", "More Food", "Round out your canteen vocabulary.", [
    "lx-ikan",
    "lx-telur",
    "lx-sayur",
    "lx-buah",
    "lx-epal",
    "lx-pisang"
  ]),
  lesson("lesson-18", "unit-food", "Taste & Hunger", "Describe how food feels.", [
    "lx-lapar",
    "lx-kenyang",
    "lx-manis",
    "lx-pedas",
    "lx-sedap",
    "lx-panas"
  ]),
  lesson("lesson-19", "unit-food", "Daily Routine", "Simple everyday actions.", [
    "lx-makan",
    "lx-minum",
    "lx-bangun",
    "lx-tidur",
    "lx-mandi",
    "lx-basuh"
  ]),
  lesson("lesson-20", "unit-food", "Food Phrases", "Speak up at the table or stall.", [
    "ph-saya-lapar",
    "ph-saya-kenyang",
    "ph-berapa-harga-ini",
    "ph-saya-mahu-nasi",
    "ph-air-ini-sejuk",
    "ph-makanan-ini-sedap"
  ]),
  lesson("lesson-21", "unit-places", "Home & Nearby Places", "Core places around daily life.", [
    "lx-rumah",
    "lx-bilik",
    "lx-dapur",
    "lx-tandas",
    "lx-kedai",
    "lx-pasar"
  ]),
  lesson("lesson-22", "unit-places", "Directions", "Move around and point correctly.", [
    "lx-jalan",
    "lx-bas",
    "lx-kereta",
    "lx-kiri",
    "lx-kanan",
    "lx-depan"
  ]),
  lesson("lesson-23", "unit-places", "Movement Verbs", "Describe motion and waiting.", [
    "lx-belakang",
    "lx-dekat",
    "lx-jauh",
    "lx-masuk",
    "lx-keluar",
    "lx-tunggu"
  ]),
  lesson("lesson-24", "unit-places", "Going Back & Forth", "Travel language you reuse constantly.", [
    "lx-balik",
    "lx-naik",
    "lx-turun",
    "lx-cari",
    "lx-jumpa",
    "lx-bawa"
  ]),
  lesson("lesson-25", "unit-places", "Place Phrases", "Ask, locate, and move.", [
    "ph-di-mana-tandas",
    "ph-saya-di-rumah",
    "ph-saya-tunggu-di-sini",
    "ph-mari-pergi-sekarang",
    "ph-kedai-itu-dekat",
    "ph-jalan-ini-jauh"
  ]),
  lesson("lesson-26", "unit-people", "Group Pronouns", "Talk about you, us, and them more precisely.", [
    "lx-anda",
    "lx-kami",
    "lx-kita",
    "lx-mereka",
    "lx-nama",
    "lx-dari"
  ]),
  lesson("lesson-27", "unit-people", "Family & Friends", "People close to daily life.", [
    "lx-ibu",
    "lx-ayah",
    "lx-abang",
    "lx-kakak",
    "lx-adik",
    "lx-kawan"
  ]),
  lesson("lesson-28", "unit-people", "Connectors & Quantity", "Link ideas and talk about amount.", [
    "lx-dan",
    "lx-atau",
    "lx-banyak",
    "lx-sedikit",
    "lx-semua",
    "lx-perlu"
  ]),
  lesson("lesson-29", "unit-people", "Subjects & School Places", "Vocabulary for school subjects and locations.", [
    "lx-perpustakaan",
    "lx-kantin",
    "lx-makmal",
    "lx-matematik",
    "lx-sains",
    "lx-bahasa-inggeris"
  ]),
  lesson("lesson-30", "unit-people", "People Phrases", "Introduce people and say where they are from.", [
    "ph-anda-dari-mana",
    "ph-ini-kawan-saya",
    "ph-mereka-di-sekolah",
    "ph-kami-tunggu-di-sana",
    "ph-saya-tinggal-di-penang",
    "ph-ini-ibu-saya"
  ]),
  lesson("lesson-31", "unit-describe", "Size & Age", "Describe how big, small, new, or old things are.", [
    "lx-besar",
    "lx-kecil",
    "lx-panjang",
    "lx-pendek",
    "lx-baru",
    "lx-lama"
  ]),
  lesson("lesson-32", "unit-describe", "Quality & Pace", "Talk about difficulty, speed, and judgment.", [
    "lx-mudah",
    "lx-susah",
    "lx-cepat",
    "lx-lambat",
    "lx-cantik",
    "lx-buruk"
  ]),
  lesson("lesson-33", "unit-describe", "Colors & Clothes", "Describe clothing and color quickly.", [
    "lx-merah",
    "lx-biru",
    "lx-hijau",
    "lx-putih",
    "lx-hitam",
    "lx-baju"
  ]),
  lesson("lesson-34", "unit-describe", "Weather & Timing", "Add weather words and common modifiers.", [
    "lx-cuaca",
    "lx-hujan",
    "lx-sejuk",
    "lx-panas",
    "lx-sangat",
    "lx-sudah"
  ]),
  lesson("lesson-35", "unit-describe", "Description Phrases", "Turn description words into usable sentences.", [
    "ph-buku-itu-baru",
    "ph-kereta-itu-besar",
    "ph-bilik-ini-kecil",
    "ph-soalan-ini-susah",
    "ph-latihan-ini-mudah",
    "ph-baju-ini-merah"
  ]),
  lesson("lesson-36", "unit-routine", "Home Actions", "Useful verbs around home and everyday movement.", [
    "lx-tinggal",
    "lx-duduk",
    "lx-kerja",
    "lx-pakai",
    "lx-buka",
    "lx-tutup"
  ]),
  lesson("lesson-37", "unit-routine", "Meals & Cooking", "Words around food prep and mealtimes.", [
    "lx-masak",
    "lx-gula",
    "lx-garam",
    "lx-sarapan",
    "lx-makan-tengah-hari",
    "lx-makan-malam"
  ]),
  lesson("lesson-38", "unit-routine", "Weekend & Schedule", "Extra schedule language you still need in real life.", [
    "lx-sabtu",
    "lx-ahad",
    "lx-minit",
    "lx-tiga-puluh",
    "lx-seratus",
    "lx-bahasa-melayu"
  ]),
  lesson("lesson-39", "unit-routine", "School Routine Phrases", "The kind of lines that actually happen during a school week.", [
    "ph-hari-ini-saya-ada-ujian",
    "ph-esok-saya-ada-peperiksaan",
    "ph-cikgu-boleh-ulang-soalan",
    "ph-saya-pergi-ke-kantin",
    "ph-saya-sudah-makan",
    "ph-boleh-saya-beli-air"
  ]),
  lesson("lesson-40", "unit-routine", "Daily Use Phrases", "Blend school, shopping, travel, and weather.", [
    "ph-saya-perlu-buku",
    "ph-saya-mahu-beli-baju",
    "ph-berapa-harga-baju-ini",
    "ph-kami-naik-bas",
    "ph-cuaca-hari-ini-panas",
    "ph-saya-pakai-baju-biru"
  ]),
  lesson("lesson-41", "unit-thinking", "Opinions & Reasons", "Say what you think and why.", [
    "lx-kerana",
    "lx-rasa",
    "lx-fikir",
    "lx-betul",
    "lx-salah",
    "lx-penting"
  ]),
  lesson("lesson-42", "unit-thinking", "Comparison & Choice", "Compare options and choose between them.", [
    "lx-lebih",
    "lx-kurang",
    "lx-murah",
    "lx-mahal",
    "lx-pilih",
    "lx-bagus"
  ]),
  lesson("lesson-43", "unit-thinking", "Study Workflow", "Words for explaining and submitting work.", [
    "lx-nota",
    "lx-contoh",
    "lx-jawab",
    "lx-semak",
    "lx-hantar",
    "lx-siap"
  ]),
  lesson("lesson-44", "unit-thinking", "Classroom Utility Verbs", "The practical verbs that keep class moving.", [
    "lx-tunjuk",
    "lx-pinjam",
    "lx-kongsi",
    "lx-guna",
    "lx-bincang",
    "lx-lupa"
  ]),
  lesson("lesson-45", "unit-thinking", "Thinking Phrases", "Turn judgment and school logic into real sentences.", [
    "ph-saya-rasa-soalan-ini-susah",
    "ph-jawapan-ini-betul",
    "ph-jawapan-itu-salah",
    "ph-yang-ini-lebih-murah",
    "ph-saya-mahu-pilih-yang-ini",
    "ph-tolong-tunjuk-contoh",
    "ph-boleh-saya-pinjam-pen",
    "ph-saya-sudah-hantar-kerja-rumah"
  ]),
  lesson("lesson-46", "unit-health", "Feeling Unwell", "Basic condition words you need immediately.", [
    "lx-sakit",
    "lx-penat",
    "lx-haus",
    "lx-sihat",
    "lx-rehat",
    "lx-demam"
  ]),
  lesson("lesson-47", "unit-health", "Body & Care", "Say what hurts and what treatment you need.", [
    "lx-kepala",
    "lx-perut",
    "lx-ubat",
    "lx-klinik",
    "lx-batuk",
    "lx-selesema"
  ]),
  lesson("lesson-48", "unit-health", "Rain & Outdoor Words", "Weather words that affect actual daily movement.", [
    "lx-payung",
    "lx-basah",
    "lx-kering",
    "lx-angin",
    "lx-matahari",
    "lx-cerah"
  ]),
  lesson("lesson-49", "unit-health", "Weather States", "Describe the day without falling back to English.", [
    "lx-cuaca",
    "lx-hujan",
    "lx-panas",
    "lx-sejuk",
    "lx-mendung",
    "lx-hari-ini"
  ]),
  lesson("lesson-50", "unit-health", "Health & Weather Phrases", "The phrases you need when the day goes wrong.", [
    "ph-saya-sakit-kepala",
    "ph-perut-saya-sakit",
    "ph-saya-penat-dan-haus",
    "ph-saya-perlu-rehat",
    "ph-saya-perlu-payung-kerana-hujan",
    "ph-kasut-saya-basah",
    "ph-cuaca-hari-ini-mendung",
    "ph-saya-pergi-ke-klinik"
  ]),
  lesson("lesson-51", "unit-repair", "Help & Location", "Useful repair words for asking and clarifying.", [
    "lx-sini",
    "lx-sana",
    "lx-kenapa",
    "lx-boleh",
    "lx-mesti",
    "lx-bantu"
  ]),
  lesson("lesson-52", "unit-repair", "Casual Speech", "Common casual words that show up constantly in real speech.", [
    "lx-nak",
    "lx-mari",
    "lx-beli",
    "lx-harga",
    "lx-ke",
    "lx-ulang"
  ]),
  lesson("lesson-53", "unit-repair", "Warm Greetings", "Simple greetings and self-introduction phrases.", [
    "ph-saya-nak-pergi-sekolah",
    "ph-selamat-pagi",
    "ph-selamat-malam",
    "ph-apa-nama-awak",
    "ph-saya-dari-penang",
    "ph-mari-bincang-soalan-ini"
  ]),
  lesson("lesson-54", "unit-repair", "Urgent Repair Phrases", "Fix confusion quickly and keep the conversation moving.", [
    "ph-kenapa-awak-lambat",
    "ph-boleh-bantu-saya-sekarang",
    "ph-kita-mesti-pergi-sekarang",
    "ph-saya-nak-beli-air",
    "ph-mari-ulang-soalan-ini",
    "ph-saya-lupa-bawa-buku"
  ]),
  lesson("lesson-55", "unit-repair", "Direction & Permission", "Ask where to go and whether you can do it.", [
    "ph-saya-perlu-ubat",
    "ph-saya-pergi-ke-sana",
    "ph-boleh-kita-masuk-sekarang",
    "ph-awak-di-sini-atau-sana",
    "ph-mari-bantu-dia",
    "ph-kita-mesti-ulang-soalan-ini"
  ]),
  lesson("lesson-56", "unit-home", "Cleaning Verbs", "Core household actions you can use immediately.", [
    "lx-sapu",
    "lx-lap",
    "lx-cuci",
    "lx-susun",
    "lx-bersih",
    "lx-kotor"
  ]),
  lesson("lesson-57", "unit-home", "Things in the House", "The parts of a room you mention while cleaning or organizing.", [
    "lx-sampah",
    "lx-lantai",
    "lx-tingkap",
    "lx-pintu",
    "lx-lampu",
    "lx-pakaian"
  ]),
  lesson("lesson-58", "unit-home", "Chore Phrases 1", "Turn household words into direct useful sentences.", [
    "ph-lantai-ini-kotor",
    "ph-bilik-ini-bersih",
    "ph-tolong-buka-pintu",
    "ph-tutup-tingkap-itu",
    "ph-saya-susun-buku",
    "ph-saya-cuci-pakaian"
  ]),
  lesson("lesson-59", "unit-home", "Chore Phrases 2", "More short phrases for actual chores around the house.", [
    "ph-saya-sapu-lantai",
    "ph-saya-lap-meja",
    "ph-sampah-itu-di-sini",
    "ph-saya-tutup-lampu",
    "ph-tingkap-ini-bersih",
    "ph-pakaian-ini-kotor"
  ]),
  lesson("lesson-60", "unit-home", "House Review", "Tie room words and chores together.", [
    "lx-rumah",
    "lx-bilik",
    "lx-dapur",
    "lx-pintu",
    "lx-tingkap",
    "lx-lampu"
  ]),
  lesson("lesson-61", "unit-money", "Money Words", "The basic nouns for prices and payment.", [
    "lx-duit",
    "lx-ringgit",
    "lx-sen",
    "lx-dompet",
    "lx-resit",
    "lx-diskaun"
  ]),
  lesson("lesson-62", "unit-money", "Store Actions", "What happens while buying, selling, and paying.", [
    "lx-jual",
    "lx-bayar",
    "lx-kira",
    "lx-cuba",
    "lx-tempah",
    "lx-cukup"
  ]),
  lesson("lesson-63", "unit-money", "Shopping Phrases 1", "The phrases that stop you from switching back to English.", [
    "ph-saya-ada-duit",
    "ph-boleh-saya-bayar-sekarang",
    "ph-saya-mahu-resit",
    "ph-harga-ini-dua-ringgit",
    "ph-dompet-saya-di-rumah",
    "ph-ada-diskaun"
  ]),
  lesson("lesson-64", "unit-money", "Shopping Phrases 2", "More concrete sentences for stores and stalls.", [
    "ph-saya-cuba-baju-ini",
    "ph-kedai-itu-jual-roti",
    "ph-saya-tempah-makanan",
    "ph-duit-itu-cukup",
    "ph-saya-bayar-di-sini",
    "ph-resit-itu-di-mana"
  ]),
  lesson("lesson-65", "unit-money", "Price Review", "Mix money, prices, and value judgments.", [
    "lx-duit",
    "lx-ringgit",
    "lx-resit",
    "lx-bayar",
    "lx-murah",
    "lx-mahal"
  ]),
  lesson("lesson-66", "unit-tech", "Device Basics", "Modern vocabulary you actually use every day.", [
    "lx-telefon",
    "lx-mesej",
    "lx-gambar",
    "lx-video",
    "lx-muzik",
    "lx-internet"
  ]),
  lesson("lesson-67", "unit-tech", "Phone Tools", "Words for screens, apps, and charging.", [
    "lx-skrin",
    "lx-cas",
    "lx-bateri",
    "lx-aplikasi",
    "lx-kata-laluan",
    "lx-muat-turun"
  ]),
  lesson("lesson-68", "unit-tech", "Tech Phrases 1", "Simple device sentences with immediate practical value.", [
    "ph-telefon-saya-di-rumah",
    "ph-saya-hantar-mesej",
    "ph-gambar-ini-cantik",
    "ph-video-itu-panjang",
    "ph-muzik-ini-bagus",
    "ph-internet-di-sini-lambat"
  ]),
  lesson("lesson-69", "unit-tech", "Tech Phrases 2", "Handle common digital problems and actions.", [
    "ph-saya-buka-aplikasi-ini",
    "ph-kata-laluan-saya-salah",
    "ph-saya-cas-telefon",
    "ph-saya-muat-turun-video",
    "ph-mesej-itu-penting",
    "ph-saya-lihat-gambar-itu"
  ]),
  lesson("lesson-70", "unit-tech", "Media Review", "Reinforce phone and media vocabulary in one block.", [
    "lx-telefon",
    "lx-internet",
    "lx-aplikasi",
    "lx-kata-laluan",
    "lx-gambar",
    "lx-video"
  ]),
  lesson("lesson-71", "unit-emotion", "Hard Feelings", "Name the emotions that disrupt your day.", [
    "lx-gembira",
    "lx-sedih",
    "lx-marah",
    "lx-takut",
    "lx-malu",
    "lx-risau"
  ]),
  lesson("lesson-72", "unit-emotion", "Mood & Character", "Describe mood, personality, and social state.", [
    "lx-seronok",
    "lx-tenang",
    "lx-bosan",
    "lx-ramah",
    "lx-sibuk",
    "lx-baik"
  ]),
  lesson("lesson-73", "unit-emotion", "Feeling Phrases 1", "Basic emotional sentences you can say without thinking.", [
    "ph-saya-gembira-hari-ini",
    "ph-dia-sedih-sekarang",
    "ph-saya-marah-kerana-lambat",
    "ph-saya-malu-di-kelas",
    "ph-saya-risau-hari-ini",
    "ph-saya-takut-sekarang"
  ]),
  lesson("lesson-74", "unit-emotion", "Feeling Phrases 2", "Describe people and how they come across.", [
    "ph-kawan-saya-ramah",
    "ph-cikgu-itu-baik",
    "ph-saya-bosan-di-rumah",
    "ph-dia-sibuk-hari-ini",
    "ph-saya-seronok-di-sekolah",
    "ph-saya-tenang-sekarang"
  ]),
  lesson("lesson-75", "unit-emotion", "Emotion Review", "Pull together feelings and social description.", [
    "lx-gembira",
    "lx-risau",
    "lx-ramah",
    "lx-baik",
    "lx-seronok",
    "lx-tenang"
  ]),
  lesson("lesson-76", "unit-nature", "Nature Places", "Outdoor vocabulary beyond roads and buildings.", [
    "lx-pokok",
    "lx-bunga",
    "lx-sungai",
    "lx-laut",
    "lx-gunung",
    "lx-pantai"
  ]),
  lesson("lesson-77", "unit-nature", "Animals & Walking", "Name animals and describe movement outdoors.", [
    "lx-taman",
    "lx-haiwan",
    "lx-burung",
    "lx-kucing",
    "lx-anjing",
    "lx-tinggi",
    "lx-jalan-kaki"
  ]),
  lesson("lesson-78", "unit-nature", "Nature Phrases 1", "Short sentences for parks, animals, and the outdoors.", [
    "ph-taman-itu-cantik",
    "ph-saya-suka-pantai",
    "ph-burung-itu-kecil",
    "ph-kucing-itu-di-rumah",
    "ph-anjing-itu-besar",
    "ph-saya-jalan-kaki-ke-sekolah"
  ]),
  lesson("lesson-79", "unit-nature", "Nature Phrases 2", "Use color, distance, and weather with outdoor words.", [
    "ph-pokok-itu-hijau",
    "ph-bunga-ini-merah",
    "ph-sungai-itu-jauh",
    "ph-laut-itu-biru",
    "ph-gunung-itu-tinggi",
    "ph-hari-ini-cerah-dan-panas"
  ]),
  lesson("lesson-80", "unit-nature", "Nature Review", "Reinforce outdoor nouns and foot travel.", [
    "lx-taman",
    "lx-pantai",
    "lx-burung",
    "lx-kucing",
    "lx-anjing",
    "lx-jalan-kaki"
  ]),
  lesson("lesson-81", "unit-city", "Wayfinding Words", "City navigation words you cannot fake around.", [
    "lx-stesen",
    "lx-tiket",
    "lx-peta",
    "lx-lorong",
    "lx-simpang",
    "lx-lampu-isyarat"
  ]),
  lesson("lesson-82", "unit-city", "Transport & Buildings", "Common public transport and vertical movement words.", [
    "lx-penumpang",
    "lx-teksi",
    "lx-motosikal",
    "lx-lif",
    "lx-tangga",
    "lx-tingkat"
  ]),
  lesson("lesson-83", "unit-city", "City Phrases 1", "Find places and read the road around you.", [
    "ph-stesen-itu-di-mana",
    "ph-saya-perlu-tiket",
    "ph-saya-lihat-peta-ini",
    "ph-lorong-itu-kecil",
    "ph-simpang-itu-di-depan",
    "ph-lampu-isyarat-itu-merah"
  ]),
  lesson("lesson-84", "unit-city", "City Phrases 2", "Move through the city without falling back to English.", [
    "ph-saya-naik-teksi",
    "ph-motosikal-itu-cepat",
    "ph-saya-guna-lif",
    "ph-tangga-itu-panjang",
    "ph-ini-tingkat-dua",
    "ph-penumpang-itu-di-sana"
  ]),
  lesson("lesson-85", "unit-city", "Transport Review", "Reinforce city nouns and transport choices.", [
    "lx-stesen",
    "lx-tiket",
    "lx-peta",
    "lx-teksi",
    "lx-lif",
    "lx-tangga"
  ]),
  lesson("lesson-86", "unit-advanced-school", "Project Words", "The vocabulary of structured school work.", [
    "lx-projek",
    "lx-kumpulan",
    "lx-markah",
    "lx-jadual",
    "lx-subjek",
    "lx-peraturan"
  ]),
  lesson("lesson-87", "unit-advanced-school", "School Tasks", "More nouns for formal school work and places.", [
    "lx-pembentangan",
    "lx-dewan",
    "lx-pejabat",
    "lx-rujukan",
    "lx-laporan",
    "lx-eksperimen",
    "lx-ikut"
  ]),
  lesson("lesson-88", "unit-advanced-school", "Project Phrases 1", "Talk about work quality and expectations.", [
    "ph-projek-ini-susah",
    "ph-kumpulan-saya-kecil",
    "ph-markah-saya-bagus",
    "ph-subjek-ini-penting",
    "ph-jadual-ini-panjang",
    "ph-kita-mesti-ikut-peraturan"
  ]),
  lesson("lesson-89", "unit-advanced-school", "Project Phrases 2", "Use school-task words in realistic sentences.", [
    "ph-pembentangan-itu-penting",
    "ph-dewan-itu-besar",
    "ph-pejabat-itu-di-depan",
    "ph-saya-perlu-rujukan",
    "ph-laporan-ini-panjang",
    "ph-eksperimen-ini-susah"
  ]),
  lesson("lesson-90", "unit-advanced-school", "Study Review", "Reinforce advanced school vocabulary.", [
    "lx-projek",
    "lx-kumpulan",
    "lx-markah",
    "lx-jadual",
    "lx-peraturan",
    "lx-laporan"
  ]),
  lesson("lesson-91", "unit-plans", "Frequency Words", "Describe how often something happens.", [
    "lx-selalu",
    "lx-kadang-kadang",
    "lx-jarang",
    "lx-setiap",
    "lx-sebelum",
    "lx-selepas"
  ]),
  lesson("lesson-92", "unit-plans", "Timing & Plans", "Talk about starts, endings, and schedule shape.", [
    "lx-awal",
    "lx-lewat",
    "lx-mula",
    "lx-habis",
    "lx-cuti",
    "lx-rancangan"
  ]),
  lesson("lesson-93", "unit-plans", "Habit Phrases 1", "Common daily-habit sentences that matter immediately.", [
    "ph-saya-selalu-bangun-awal",
    "ph-dia-kadang-kadang-lewat",
    "ph-kita-mula-sekarang",
    "ph-kelas-habis-petang",
    "ph-saya-ada-rancangan",
    "ph-esok-cuti"
  ]),
  lesson("lesson-94", "unit-plans", "Habit Phrases 2", "Add frequency and sequence to your daily Malay.", [
    "ph-saya-jarang-minum-kopi",
    "ph-setiap-hari-saya-belajar",
    "ph-sebelum-ujian-saya-baca",
    "ph-selepas-sekolah-saya-balik",
    "ph-rancangan-itu-penting",
    "ph-saya-mula-esok"
  ]),
  lesson("lesson-95", "unit-plans", "Time Review", "Reinforce frequency, timing, and schedule words.", [
    "lx-selalu",
    "lx-kadang-kadang",
    "lx-setiap",
    "lx-awal",
    "lx-lewat",
    "lx-cuti"
  ]),
  lesson("lesson-96", "unit-services", "Public Services", "Essential public institutions and emergency words.", [
    "lx-polis",
    "lx-bomba",
    "lx-hospital",
    "lx-bank",
    "lx-pejabat-post",
    "lx-kecemasan"
  ]),
  lesson("lesson-97", "unit-services", "Problems & Reporting", "Words for when something goes wrong.", [
    "lx-hilang",
    "lx-rosak",
    "lx-sesat",
    "lx-bahaya",
    "lx-panggil",
    "lx-lapor"
  ]),
  lesson("lesson-98", "unit-services", "Emergency Phrases 1", "The minimum viable sentences for problems and emergencies.", [
    "ph-saya-pergi-ke-hospital",
    "ph-telefon-saya-hilang",
    "ph-bas-itu-rosak",
    "ph-saya-sesat-di-sini",
    "ph-ini-kecemasan",
    "ph-panggil-polis"
  ]),
  lesson("lesson-99", "unit-services", "Emergency Phrases 2", "Describe danger, ask for help, and find services.", [
    "ph-bank-itu-di-sana",
    "ph-bomba-datang-sekarang",
    "ph-bahaya-di-jalan-ini",
    "ph-saya-perlu-bantuan-kecemasan",
    "ph-saya-lapor-sekarang",
    "ph-pejabat-post-itu-di-mana"
  ]),
  lesson("lesson-100", "unit-services", "Service Review", "Reinforce emergency and service vocabulary.", [
    "lx-polis",
    "lx-hospital",
    "lx-bank",
    "lx-hilang",
    "lx-rosak",
    "lx-bahaya"
  ]),
  lesson("lesson-101", "unit-listen", "Listening Basics", "Hear, volume, and clarity words.", [
    "lx-dengar",
    "lx-kuat",
    "lx-perlahan",
    "lx-jelas",
    "lx-bising",
    "lx-senyap"
  ]),
  lesson("lesson-102", "unit-listen", "Classroom Clarity", "Ask what something means and request explanation.", [
    "lx-cikgu",
    "lx-belum",
    "lx-sejarah",
    "lx-maksud",
    "lx-sebut",
    "lx-terangkan"
  ]),
  lesson("lesson-103", "unit-listen", "Sound Phrases", "Short phrases for hearing and classroom sound.", [
    "ph-saya-dengar-muzik-itu",
    "ph-boleh-cakap-perlahan",
    "ph-suara-itu-kuat",
    "ph-kelas-ini-bising",
    "ph-bilik-itu-senyap",
    "ph-apa-maksud-ini"
  ]),
  lesson("lesson-104", "unit-listen", "Explanation Phrases", "Ask for clearer spoken Malay.", [
    "ph-cikgu-saya-belum-faham",
    "ph-cikgu-terangkan-soalan-ini",
    "ph-dia-sebut-nama-saya",
    "ph-saya-suka-sejarah",
    "ph-boleh-cakap-dengan-jelas",
    "ph-kenapa-awak-di-sini"
  ]),
  lesson("lesson-105", "unit-listen", "Listening Review", "Reinforce hearing and explanation vocabulary.", [
    "lx-suara",
    "lx-dengan",
    "lx-dengar",
    "lx-maksud",
    "lx-sebut",
    "lx-terangkan"
  ]),
  lesson("lesson-106", "unit-clothes", "Clothing Basics", "Name common clothing items you actually wear.", [
    "lx-kasut",
    "lx-seluar",
    "lx-stokin",
    "lx-jaket",
    "lx-topi",
    "lx-uniform"
  ]),
  lesson("lesson-107", "unit-clothes", "Fit & Appearance", "Talk about size, fit, and tidiness.", [
    "lx-saiz",
    "lx-warna",
    "lx-kemas",
    "lx-longgar",
    "lx-ketat",
    "lx-sesuai"
  ]),
  lesson("lesson-108", "unit-clothes", "Clothing Phrases 1", "Describe what people are wearing.", [
    "ph-saya-pakai-kasut-hitam",
    "ph-dia-pakai-jaket-biru",
    "ph-topi-itu-baru",
    "ph-uniform-ini-putih",
    "ph-stokin-saya-basah",
    "ph-seluar-ini-hitam"
  ]),
  lesson("lesson-109", "unit-clothes", "Clothing Phrases 2", "Describe clothing fit and style.", [
    "ph-saiz-ini-sesuai",
    "ph-baju-itu-longgar",
    "ph-seluar-ini-ketat",
    "ph-uniform-saya-kemas",
    "ph-warna-ini-cantik",
    "ph-kasut-itu-mahal"
  ]),
  lesson("lesson-110", "unit-clothes", "Clothing Review", "Reinforce clothes, fit, and appearance words.", [
    "lx-kasut",
    "lx-uniform",
    "lx-saiz",
    "lx-warna",
    "lx-kemas",
    "lx-sesuai"
  ]),
  lesson("lesson-111", "unit-restaurant", "Restaurant Basics", "Core food nouns you meet at stalls or cafes.", [
    "lx-mee",
    "lx-sup",
    "lx-jus",
    "lx-susu",
    "lx-sambal",
    "lx-mangkuk"
  ]),
  lesson("lesson-112", "unit-restaurant", "Table & Ordering", "Tableware and ordering verbs.", [
    "lx-pinggan",
    "lx-sudu",
    "lx-garpu",
    "lx-pesan",
    "lx-hidang",
    "lx-tambah"
  ]),
  lesson("lesson-113", "unit-restaurant", "Ordering Phrases 1", "Say what you want clearly at the table.", [
    "ph-saya-pesan-mee-sup",
    "ph-saya-mahu-jus-epal",
    "ph-mee-ini-pedas",
    "ph-mee-ini-dalam-mangkuk",
    "ph-saya-guna-sudu",
    "ph-dia-hidang-makanan"
  ]),
  lesson("lesson-114", "unit-restaurant", "Ordering Phrases 2", "Ask for adjustments and describe table items.", [
    "ph-boleh-tambah-sambal",
    "ph-saya-mahu-susu-sejuk",
    "ph-saya-guna-garpu",
    "ph-pinggan-ini-bersih",
    "ph-saya-pesan-air-dan-roti",
    "ph-boleh-saya-beli-air"
  ]),
  lesson("lesson-115", "unit-restaurant", "Restaurant Review", "Reinforce ordering and table vocabulary.", [
    "lx-mee",
    "lx-jus",
    "lx-sambal",
    "lx-pinggan",
    "lx-pesan",
    "lx-tambah"
  ]),
  lesson("lesson-116", "unit-hobbies", "Sports & Hobbies", "Name your basic hobbies and sports.", [
    "lx-hobi",
    "lx-bola",
    "lx-badminton",
    "lx-berenang",
    "lx-berlari",
    "lx-bermain"
  ]),
  lesson("lesson-117", "unit-hobbies", "Arts & Media", "Talk about drawing, songs, movies, and instruments.", [
    "lx-lukis",
    "lx-menyanyi",
    "lx-menonton",
    "lx-gitar",
    "lx-filem",
    "lx-lagu"
  ]),
  lesson("lesson-118", "unit-hobbies", "Hobby Phrases 1", "Describe what you enjoy doing.", [
    "ph-hobi-saya-berenang",
    "ph-kami-bermain-bola",
    "ph-saya-suka-badminton",
    "ph-saya-suka-menonton-filem",
    "ph-dia-menyanyi-dengan-baik",
    "ph-saya-bermain-gitar"
  ]),
  lesson("lesson-119", "unit-hobbies", "Hobby Phrases 2", "Mix hobbies with places and media.", [
    "ph-saya-dengar-lagu-ini",
    "ph-dia-berlari-di-taman",
    "ph-saya-lukis-gambar",
    "ph-badminton-itu-seronok",
    "ph-kami-bermain-di-taman",
    "ph-saya-suka-menonton-filem"
  ]),
  lesson("lesson-120", "unit-hobbies", "Hobby Review", "Reinforce hobby and sports vocabulary.", [
    "lx-hobi",
    "lx-badminton",
    "lx-berenang",
    "lx-lukis",
    "lx-gitar",
    "lx-lagu"
  ]),
  lesson("lesson-121", "unit-body", "Body Parts", "Learn the most basic body words first.", [
    "lx-tangan",
    "lx-kaki",
    "lx-mata",
    "lx-mulut",
    "lx-hidung",
    "lx-telinga"
  ]),
  lesson("lesson-122", "unit-body", "Doctor Talk", "Common doctor and checkup words.", [
    "lx-doktor",
    "lx-janji-temu",
    "lx-ukur",
    "lx-suhu",
    "lx-gigi",
    "lx-muka"
  ]),
  lesson("lesson-123", "unit-body", "Body Phrases 1", "Say what hurts or feels wrong.", [
    "ph-tangan-saya-sakit",
    "ph-kaki-saya-penat",
    "ph-mata-saya-pedih",
    "ph-doktor-itu-baik",
    "ph-saya-ada-janji-temu",
    "ph-dia-ukur-suhu-saya"
  ]),
  lesson("lesson-124", "unit-body", "Body Phrases 2", "Use body words in daily health sentences.", [
    "ph-mulut-saya-kering",
    "ph-gigi-saya-sakit",
    "ph-muka-saya-panas",
    "ph-hidung-saya-sejuk",
    "ph-telinga-saya-sakit",
    "ph-saya-perlu-ubat"
  ]),
  lesson("lesson-125", "unit-body", "Body Review", "Reinforce body and doctor vocabulary.", [
    "lx-tangan",
    "lx-mata",
    "lx-doktor",
    "lx-suhu",
    "lx-gigi",
    "lx-muka"
  ]),
  lesson("lesson-126", "unit-dates", "Months 1", "The first half of the calendar year.", [
    "lx-januari",
    "lx-februari",
    "lx-mac",
    "lx-april",
    "lx-mei",
    "lx-jun"
  ]),
  lesson("lesson-127", "unit-dates", "Months 2", "The second half of the calendar year.", [
    "lx-julai",
    "lx-ogos",
    "lx-september",
    "lx-oktober",
    "lx-november",
    "lx-disember"
  ]),
  lesson("lesson-128", "unit-dates", "Dates & Weeks", "Date words that matter in school and life.", [
    "lx-tarikh",
    "lx-tahun",
    "lx-hari-jadi",
    "lx-pada",
    "lx-minggu-depan",
    "lx-minggu-lepas"
  ]),
  lesson("lesson-129", "unit-dates", "Date Phrases", "Use months and dates in simple real sentences.", [
    "ph-hari-jadi-saya-pada-disember",
    "ph-ujian-itu-pada-oktober",
    "ph-saya-balik-pada-hari-sabtu",
    "ph-minggu-depan-saya-ada-peperiksaan",
    "ph-minggu-lepas-saya-cuti",
    "ph-tarikh-itu-penting"
  ]),
  lesson("lesson-130", "unit-dates", "Calendar Review", "Reinforce dates, months, and year words.", [
    "lx-januari",
    "lx-oktober",
    "lx-disember",
    "lx-tarikh",
    "lx-tahun",
    "lx-hari-jadi"
  ]),
  lesson("lesson-131", "unit-family-events", "Family Relations", "Beyond parents and siblings.", [
    "lx-sepupu",
    "lx-nenek",
    "lx-datuk",
    "lx-jiran",
    "lx-tetamu",
    "lx-lawat"
  ]),
  lesson("lesson-132", "unit-family-events", "Events & Invitations", "Words for inviting and attending events.", [
    "lx-jemput",
    "lx-hadiah",
    "lx-majlis",
    "lx-kahwin",
    "lx-rumah-terbuka",
    "lx-kenduri"
  ]),
  lesson("lesson-133", "unit-family-events", "Family Phrases 1", "Talk about family and neighbors naturally.", [
    "ph-nenek-saya-di-rumah",
    "ph-jiran-itu-ramah",
    "ph-kami-jemput-kawan",
    "ph-saya-bawa-hadiah",
    "ph-majlis-itu-besar",
    "ph-kami-lawat-datuk"
  ]),
  lesson("lesson-134", "unit-family-events", "Family Phrases 2", "Use event and family vocabulary in real contexts.", [
    "ph-sepupu-saya-datang-esok",
    "ph-tetamu-itu-di-sana",
    "ph-majlis-kahwin-itu-cantik",
    "ph-rumah-terbuka-itu-seronok",
    "ph-kenduri-itu-di-rumah-nenek",
    "ph-kami-jemput-jiran"
  ]),
  lesson("lesson-135", "unit-family-events", "Family Review", "Reinforce family-event vocabulary.", [
    "lx-sepupu",
    "lx-nenek",
    "lx-jiran",
    "lx-jemput",
    "lx-majlis",
    "lx-hadiah"
  ]),
  lesson("lesson-136", "unit-travel-extended", "Travel Words", "Airport and luggage vocabulary.", [
    "lx-lapangan-terbang",
    "lx-kapal-terbang",
    "lx-pasport",
    "lx-bagasi",
    "lx-hotel",
    "lx-tempahan"
  ]),
  lesson("lesson-137", "unit-travel-extended", "Travel Movement", "Arrivals, departures, and travel roles.", [
    "lx-tiba",
    "lx-berlepas",
    "lx-pelancong",
    "lx-lawatan",
    "lx-kaunter",
    "lx-pemandu"
  ]),
  lesson("lesson-138", "unit-travel-extended", "Travel Phrases 1", "Simple travel sentences you can reuse.", [
    "ph-lapangan-terbang-itu-jauh",
    "ph-saya-ada-pasport",
    "ph-bagasi-saya-besar",
    "ph-kami-tiba-malam-ini",
    "ph-kapal-terbang-itu-lewat",
    "ph-saya-ada-tempahan-hotel"
  ]),
  lesson("lesson-139", "unit-travel-extended", "Travel Phrases 2", "Use transport and booking words together.", [
    "ph-pemandu-itu-ramah",
    "ph-pelancong-itu-di-sana",
    "ph-kami-berlepas-esok",
    "ph-saya-pergi-ke-hotel",
    "ph-kaunter-itu-di-depan",
    "ph-lawatan-ini-seronok"
  ]),
  lesson("lesson-140", "unit-travel-extended", "Travel Review", "Reinforce airport and trip vocabulary.", [
    "lx-lapangan-terbang",
    "lx-pasport",
    "lx-bagasi",
    "lx-hotel",
    "lx-tiba",
    "lx-berlepas"
  ]),
  lesson("lesson-141", "unit-language-extended", "Language Basics", "Words for talking about language itself.", [
    "lx-perkataan",
    "lx-ayat",
    "lx-terjemah",
    "lx-hafal",
    "lx-tatabahasa",
    "lx-kamus"
  ]),
  lesson("lesson-142", "unit-language-extended", "Language Accuracy", "Pronunciation, spelling, and revision language.", [
    "lx-sebutan",
    "lx-betulkan",
    "lx-ringkas",
    "lx-penuh",
    "lx-ejaan",
    "lx-ulangkaji"
  ]),
  lesson("lesson-143", "unit-language-extended", "Language Phrases 1", "Use language-learning words as real classroom talk.", [
    "ph-perkataan-ini-mudah",
    "ph-ayat-itu-panjang",
    "ph-saya-guna-kamus",
    "ph-boleh-betulkan-ayat-ini",
    "ph-sebutan-saya-salah",
    "ph-saya-ulangkaji-malam-ini"
  ]),
  lesson("lesson-144", "unit-language-extended", "Language Phrases 2", "Talk about revision and correctness clearly.", [
    "ph-tatabahasa-ini-susah",
    "ph-nota-ini-ringkas",
    "ph-jawapan-itu-penuh",
    "ph-saya-hafal-perkataan-ini",
    "ph-boleh-terjemah-ayat-ini",
    "ph-ejaan-itu-betul"
  ]),
  lesson("lesson-145", "unit-language-extended", "Language Review", "Reinforce translation and revision vocabulary.", [
    "lx-perkataan",
    "lx-ayat",
    "lx-hafal",
    "lx-kamus",
    "lx-ejaan",
    "lx-ulangkaji"
  ]),
  lesson("lesson-146", "unit-neighborhood-extended", "Neighborhood Places", "Practical local place names.", [
    "lx-restoran",
    "lx-kedai-buku",
    "lx-farmasi",
    "lx-surau",
    "lx-masjid",
    "lx-pusat-beli-belah"
  ]),
  lesson("lesson-147", "unit-neighborhood-extended", "Road & Area Words", "Neighborhood navigation beyond the basics.", [
    "lx-perhentian-bas",
    "lx-jambatan",
    "lx-lampu-jalan",
    "lx-lori",
    "lx-balai-polis",
    "lx-pasar-raya"
  ]),
  lesson("lesson-148", "unit-neighborhood-extended", "Neighborhood Phrases 1", "Ask where places are and how near they are.", [
    "ph-restoran-itu-di-depan",
    "ph-farmasi-itu-di-mana",
    "ph-saya-pergi-ke-kedai-buku",
    "ph-surau-itu-dekat",
    "ph-masjid-itu-besar",
    "ph-perhentian-bas-itu-di-sana"
  ]),
  lesson("lesson-149", "unit-neighborhood-extended", "Neighborhood Phrases 2", "Describe common urban places around you.", [
    "ph-pusat-beli-belah-itu-jauh",
    "ph-jambatan-itu-panjang",
    "ph-lori-itu-besar",
    "ph-balai-polis-itu-di-depan",
    "ph-pasar-raya-itu-dekat",
    "ph-lampu-jalan-itu-terang"
  ]),
  lesson("lesson-150", "unit-neighborhood-extended", "Neighborhood Review", "Reinforce everyday place vocabulary.", [
    "lx-restoran",
    "lx-farmasi",
    "lx-masjid",
    "lx-perhentian-bas",
    "lx-balai-polis",
    "lx-pasar-raya"
  ]),
  lesson("lesson-151", "unit-compare", "Compare More Precisely", "Push beyond basic comparison words.", [
    "lx-banding",
    "lx-serupa",
    "lx-bukti",
    "lx-sebab",
    "lx-lebih",
    "lx-kurang"
  ]),
  lesson("lesson-152", "unit-compare", "Evidence in Sentences", "Use evidence and comparison inside short responses.", [
    "ph-dua-jawapan-itu-serupa",
    "ph-boleh-beri-bukti-untuk-jawapan-ini",
    "lx-banding",
    "lx-serupa",
    "lx-lebih",
    "lx-jawapan"
  ]),
  lesson("lesson-153", "unit-compare", "Reasons & Choices", "Ask for reasons and justify choices.", [
    "ph-kita-perlu-banding-dua-jawapan-ini",
    "ph-apa-sebab-awak-pilih-ini",
    "lx-bukti",
    "lx-sebab",
    "lx-kurang",
    "lx-contoh"
  ]),
  lesson("lesson-154", "unit-compare", "Comparison Transfer", "Move comparison language into mixed review.", [
    "ph-dua-jawapan-itu-serupa",
    "ph-kita-perlu-banding-dua-jawapan-ini",
    "lx-serupa",
    "lx-sebab",
    "lx-jawapan",
    "lx-contoh"
  ]),
  lesson("lesson-155", "unit-compare", "Compare Review", "Reinforce comparison and proof vocabulary.", [
    "ph-boleh-beri-bukti-untuk-jawapan-ini",
    "ph-apa-sebab-awak-pilih-ini",
    "lx-banding",
    "lx-bukti",
    "lx-lebih",
    "lx-kurang"
  ]),
  lesson("lesson-156", "unit-rules-advanced", "Allowed or Not", "Learn permission language that shows up in school rules.", [
    "lx-dibenarkan",
    "lx-dilarang",
    "lx-izin",
    "lx-patut",
    "lx-peraturan",
    "lx-semak"
  ]),
  lesson("lesson-157", "unit-rules-advanced", "Permission Sentences", "State what is allowed and what needs permission.", [
    "ph-telefon-tidak-dibenarkan-di-sini",
    "ph-saya-perlu-izin-sebelum-masuk",
    "lx-dibenarkan",
    "lx-izin",
    "lx-peraturan",
    "lx-telefon"
  ]),
  lesson("lesson-158", "unit-rules-advanced", "Should and Forbidden", "Mix advice, prohibition, and classroom control.", [
    "ph-awak-patut-semak-jawapan-lagi",
    "ph-telefon-itu-dilarang-di-kelas",
    "lx-dilarang",
    "lx-patut",
    "lx-semak",
    "lx-kelas"
  ]),
  lesson("lesson-159", "unit-rules-advanced", "Rule Scenarios", "Reuse rules language in mixed situations.", [
    "ph-telefon-tidak-dibenarkan-di-sini",
    "ph-awak-patut-semak-jawapan-lagi",
    "lx-izin",
    "lx-patut",
    "lx-telefon",
    "lx-kelas"
  ]),
  lesson("lesson-160", "unit-rules-advanced", "Rules Review", "Reinforce permission and prohibition vocabulary.", [
    "ph-saya-perlu-izin-sebelum-masuk",
    "ph-telefon-itu-dilarang-di-kelas",
    "lx-dibenarkan",
    "lx-dilarang",
    "lx-peraturan",
    "lx-semak"
  ]),
  lesson("lesson-161", "unit-sequence-advanced", "Steps & Order", "Add step words and process language.", [
    "lx-langkah",
    "lx-kemudian",
    "lx-seterusnya",
    "lx-proses",
    "lx-soalan",
    "lx-jawapan"
  ]),
  lesson("lesson-162", "unit-sequence-advanced", "Sequence Sentences", "Talk through what comes next.", [
    "ph-langkah-ini-penting",
    "ph-kemudian-kami-tulis-jawapan",
    "lx-langkah",
    "lx-kemudian",
    "lx-soalan",
    "lx-baca"
  ]),
  lesson("lesson-163", "unit-sequence-advanced", "Process Talk", "Explain order and process more clearly.", [
    "ph-seterusnya-baca-soalan-itu",
    "ph-proses-ini-tidak-mudah",
    "lx-seterusnya",
    "lx-proses",
    "lx-jawapan",
    "lx-tulis"
  ]),
  lesson("lesson-164", "unit-sequence-advanced", "Explain the Order", "Blend process words into short instructions.", [
    "ph-langkah-ini-penting",
    "ph-seterusnya-baca-soalan-itu",
    "lx-kemudian",
    "lx-proses",
    "lx-baca",
    "lx-tulis"
  ]),
  lesson("lesson-165", "unit-sequence-advanced", "Process Review", "Reinforce sequence language and classroom order.", [
    "ph-kemudian-kami-tulis-jawapan",
    "ph-proses-ini-tidak-mudah",
    "lx-langkah",
    "lx-seterusnya",
    "lx-soalan",
    "lx-jawapan"
  ]),
  lesson("lesson-166", "unit-cause-advanced", "Results & Consequences", "Move from events into causes and results.", [
    "lx-kesan",
    "lx-menyebabkan",
    "lx-berjaya",
    "lx-gagal",
    "lx-hujan",
    "lx-lewat"
  ]),
  lesson("lesson-167", "unit-cause-advanced", "Success or Failure", "Describe success, failure, and what caused them.", [
    "ph-hujan-menyebabkan-kami-lewat",
    "ph-kumpulan-kami-berjaya-hari-ini",
    "lx-kesan",
    "lx-menyebabkan",
    "lx-hujan",
    "lx-ujian"
  ]),
  lesson("lesson-168", "unit-cause-advanced", "Cause Sentences", "Handle failure and impact in short sentences.", [
    "ph-dia-gagal-ujian-itu",
    "ph-kesan-keputusan-itu-besar",
    "lx-berjaya",
    "lx-gagal",
    "lx-lewat",
    "lx-kumpulan"
  ]),
  lesson("lesson-169", "unit-cause-advanced", "Outcome Transfer", "Reuse cause words in mixed study contexts.", [
    "ph-hujan-menyebabkan-kami-lewat",
    "ph-dia-gagal-ujian-itu",
    "lx-menyebabkan",
    "lx-gagal",
    "lx-ujian",
    "lx-kumpulan"
  ]),
  lesson("lesson-170", "unit-cause-advanced", "Cause Review", "Reinforce cause, impact, success, and failure.", [
    "ph-kumpulan-kami-berjaya-hari-ini",
    "ph-kesan-keputusan-itu-besar",
    "lx-kesan",
    "lx-berjaya",
    "lx-hujan",
    "lx-lewat"
  ]),
  lesson("lesson-171", "unit-office-advanced", "Forms & Signatures", "Handle school office language without switching back to English.", [
    "lx-borang",
    "lx-tandatangan",
    "lx-dokumen",
    "lx-serah",
    "lx-pejabat",
    "lx-hantar"
  ]),
  lesson("lesson-172", "unit-office-advanced", "Office Sentences", "State where forms are and what must be signed.", [
    "ph-tolong-serah-borang-itu-hari-ini",
    "ph-dokumen-ini-perlu-tandatangan-guru",
    "lx-borang",
    "lx-tandatangan",
    "lx-pejabat",
    "lx-makmal"
  ]),
  lesson("lesson-173", "unit-office-advanced", "Submit the Document", "Use office vocabulary in short task instructions.", [
    "ph-borang-itu-di-pejabat",
    "ph-saya-serah-dokumen-semalam",
    "lx-dokumen",
    "lx-serah",
    "lx-hantar",
    "lx-hari-ini"
  ]),
  lesson("lesson-174", "unit-office-advanced", "Admin Transfer", "Blend forms, submission, and place language.", [
    "ph-tolong-serah-borang-itu-hari-ini",
    "ph-borang-itu-di-pejabat",
    "lx-tandatangan",
    "lx-serah",
    "lx-makmal",
    "lx-hari-ini"
  ]),
  lesson("lesson-175", "unit-office-advanced", "Office Review", "Reinforce practical office and document vocabulary.", [
    "ph-dokumen-ini-perlu-tandatangan-guru",
    "ph-saya-serah-dokumen-semalam",
    "lx-borang",
    "lx-dokumen",
    "lx-pejabat",
    "lx-hantar"
  ]),
  lesson("lesson-176", "unit-discuss-advanced", "Setuju atau Bantah", "Gunakan bahasa setuju, bantah, dan cadang dengan lebih tepat.", [
    "lx-setuju",
    "lx-bantah",
    "lx-cadang",
    "lx-keputusan",
    "lx-pilih",
    "lx-jelas"
  ]),
  lesson("lesson-177", "unit-discuss-advanced", "Cadangan dalam Ayat", "Masukkan persetujuan dan bantahan ke dalam ayat pendek.", [
    "ph-saya-setuju-dengan-jawapan-itu",
    "ph-dia-bantah-keputusan-itu",
    "lx-setuju",
    "lx-bantah",
    "lx-pilih",
    "lx-jawapan"
  ]),
  lesson("lesson-178", "unit-discuss-advanced", "Keputusan Kumpulan", "Cadang tindakan dan nilai keputusan kumpulan.", [
    "ph-saya-cadang-kita-mula-sekarang",
    "ph-keputusan-itu-belum-jelas",
    "lx-cadang",
    "lx-keputusan",
    "lx-jelas",
    "lx-kumpulan"
  ]),
  lesson("lesson-179", "unit-discuss-advanced", "Bincang dengan Tepat", "Campurkan pilihan, keputusan, dan perbincangan.", [
    "ph-saya-setuju-dengan-jawapan-itu",
    "ph-saya-cadang-kita-mula-sekarang",
    "lx-bantah",
    "lx-keputusan",
    "lx-jawapan",
    "lx-kumpulan"
  ]),
  lesson("lesson-180", "unit-discuss-advanced", "Ulang Kaji Bincang", "Kuatkan bahasa perbincangan dan pendirian.", [
    "ph-dia-bantah-keputusan-itu",
    "ph-keputusan-itu-belum-jelas",
    "lx-setuju",
    "lx-cadang",
    "lx-pilih",
    "lx-jelas"
  ]),
  lesson("lesson-181", "unit-condition-advanced", "Jika Sesuatu Berlaku", "Mulakan bahasa syarat dan kemungkinan.", [
    "lx-jika",
    "lx-syarat",
    "lx-kecuali",
    "lx-peluang",
    "lx-boleh",
    "lx-masuk"
  ]),
  lesson("lesson-182", "unit-condition-advanced", "Syarat dalam Ayat", "Tanya syarat dan nyatakan keadaan yang berubah.", [
    "ph-jika-hujan-kami-tunggu-di-sini",
    "ph-apa-syarat-untuk-masuk",
    "lx-jika",
    "lx-syarat",
    "lx-boleh",
    "lx-hujan"
  ]),
  lesson("lesson-183", "unit-condition-advanced", "Peluang dan Pilihan", "Gunakan pengecualian dan peluang dengan lebih yakin.", [
    "ph-saya-datang-kecuali-hujan",
    "ph-dia-ada-peluang-besar",
    "lx-kecuali",
    "lx-peluang",
    "lx-masuk",
    "lx-pilih"
  ]),
  lesson("lesson-184", "unit-condition-advanced", "Syarat Lebih Sukar", "Gabungkan syarat dengan tindakan sebenar.", [
    "ph-jika-hujan-kami-tunggu-di-sini",
    "ph-saya-datang-kecuali-hujan",
    "lx-syarat",
    "lx-peluang",
    "lx-hujan",
    "lx-pilih"
  ]),
  lesson("lesson-185", "unit-condition-advanced", "Ulang Kaji Syarat", "Ulang semula syarat, peluang, dan pengecualian.", [
    "ph-apa-syarat-untuk-masuk",
    "ph-dia-ada-peluang-besar",
    "lx-jika",
    "lx-kecuali",
    "lx-boleh",
    "lx-masuk"
  ]),
  lesson("lesson-186", "unit-explain-advanced", "Isi Utama", "Kenal pasti isi penting dan mula menghuraikannya.", [
    "lx-huraikan",
    "lx-jelaskan",
    "lx-isi",
    "lx-utama",
    "lx-ringkas",
    "lx-jawapan"
  ]),
  lesson("lesson-187", "unit-explain-advanced", "Jelaskan Lagi", "Minta dan beri penjelasan tambahan.", [
    "ph-boleh-jelaskan-jawapan-ini-lagi",
    "ph-cikgu-minta-huraikan-isi-utama",
    "lx-huraikan",
    "lx-jelaskan",
    "lx-ringkas",
    "lx-jelas"
  ]),
  lesson("lesson-188", "unit-explain-advanced", "Huraian Ringkas", "Huraikan isi penting dengan lebih padat.", [
    "ph-isi-utama-itu-penting",
    "ph-huraikan-jawapan-ini-dengan-ringkas",
    "lx-isi",
    "lx-utama",
    "lx-jawapan",
    "lx-soalan"
  ]),
  lesson("lesson-189", "unit-explain-advanced", "Jawapan dengan Isi", "Campurkan isi utama dengan jawapan yang jelas.", [
    "ph-boleh-jelaskan-jawapan-ini-lagi",
    "ph-isi-utama-itu-penting",
    "lx-jelaskan",
    "lx-utama",
    "lx-jelas",
    "lx-soalan"
  ]),
  lesson("lesson-190", "unit-explain-advanced", "Ulang Kaji Huraian", "Kukuhkan bahasa huraian dan isi.", [
    "ph-cikgu-minta-huraikan-isi-utama",
    "ph-huraikan-jawapan-ini-dengan-ringkas",
    "lx-huraikan",
    "lx-isi",
    "lx-ringkas",
    "lx-jawapan"
  ]),
  lesson("lesson-191", "unit-notices-advanced", "Baca Notis", "Mulakan bahasa notis, pengumuman, dan gangguan.", [
    "lx-notis",
    "lx-pengumuman",
    "lx-gangguan",
    "lx-kelewatan",
    "lx-jalan",
    "lx-bas"
  ]),
  lesson("lesson-192", "unit-notices-advanced", "Pengumuman Ringkas", "Baca dan fahami pesanan awam yang pendek.", [
    "ph-tolong-baca-notis-itu",
    "ph-ada-pengumuman-baru-hari-ini",
    "lx-notis",
    "lx-pengumuman",
    "lx-jalan",
    "lx-hari-ini"
  ]),
  lesson("lesson-193", "unit-notices-advanced", "Gangguan dan Kelewatan", "Gunakan bahasa gangguan dan kelewatan harian.", [
    "ph-ada-gangguan-di-jalan-ini",
    "ph-bas-itu-ada-kelewatan",
    "lx-gangguan",
    "lx-kelewatan",
    "lx-bas",
    "lx-penting"
  ]),
  lesson("lesson-194", "unit-notices-advanced", "Makluman Harian", "Campurkan maklumat awam dengan situasi biasa.", [
    "ph-tolong-baca-notis-itu",
    "ph-ada-gangguan-di-jalan-ini",
    "lx-pengumuman",
    "lx-kelewatan",
    "lx-hari-ini",
    "lx-penting"
  ]),
  lesson("lesson-195", "unit-notices-advanced", "Ulang Kaji Notis", "Ulang semula notis, gangguan, dan kelewatan.", [
    "ph-ada-pengumuman-baru-hari-ini",
    "ph-bas-itu-ada-kelewatan",
    "lx-notis",
    "lx-gangguan",
    "lx-jalan",
    "lx-bas"
  ]),
  lesson("lesson-196", "unit-commit-advanced", "Sahkan atau Tangguh", "Masuk ke bahasa komitmen, pengesahan, dan penangguhan.", [
    "lx-komitmen",
    "lx-tangguh",
    "lx-teruskan",
    "lx-sahkan",
    "lx-tempahan",
    "lx-jadual"
  ]),
  lesson("lesson-197", "unit-commit-advanced", "Komitmen dalam Ayat", "Nyatakan apa yang perlu disahkan dan ditangguh.", [
    "ph-kita-perlu-sahkan-tempahan-itu",
    "ph-saya-tidak-boleh-tangguh-lagi",
    "lx-komitmen",
    "lx-sahkan",
    "lx-tempahan",
    "lx-esok"
  ]),
  lesson("lesson-198", "unit-commit-advanced", "Teruskan Rancangan", "Gunakan bahasa komitmen dalam perancangan sebenar.", [
    "ph-kami-teruskan-esok-pagi",
    "ph-komitmen-ini-penting",
    "lx-tangguh",
    "lx-teruskan",
    "lx-jadual",
    "lx-penting"
  ]),
  lesson("lesson-199", "unit-commit-advanced", "Jadual yang Berubah", "Gabungkan perubahan jadual dengan komitmen.", [
    "ph-kita-perlu-sahkan-tempahan-itu",
    "ph-kami-teruskan-esok-pagi",
    "lx-sahkan",
    "lx-teruskan",
    "lx-esok",
    "lx-penting"
  ]),
  lesson("lesson-200", "unit-commit-advanced", "Ulang Kaji Komitmen", "Ulang semula bahasa sahkan, tangguh, dan teruskan.", [
    "ph-saya-tidak-boleh-tangguh-lagi",
    "ph-komitmen-ini-penting",
    "lx-komitmen",
    "lx-tangguh",
    "lx-tempahan",
    "lx-jadual"
  ]),
  lesson("lesson-201", "unit-bahasa-kelas-advanced", "Petikan dan Tajuk", "Mulakan fasa imersi dengan bahasa kelas yang lebih khusus.", [
    "lx-petikan",
    "lx-perenggan",
    "lx-tajuk",
    "lx-format",
    "lx-baca",
    "lx-betul"
  ]),
  lesson("lesson-202", "unit-bahasa-kelas-advanced", "Perenggan dan Format", "Gunakan istilah kelas tanpa bantuan bahasa Inggeris.", [
    "ph-baca-petikan-itu-sekarang",
    "ph-perenggan-ini-panjang",
    "lx-petikan",
    "lx-perenggan",
    "lx-baca",
    "lx-jawapan"
  ]),
  lesson("lesson-203", "unit-bahasa-kelas-advanced", "Arahan Petikan", "Baca, kenal pasti, dan nilai tajuk serta format.", [
    "ph-tajuk-itu-jelas",
    "ph-ikut-format-yang-betul",
    "lx-tajuk",
    "lx-format",
    "lx-betul",
    "lx-markah"
  ]),
  lesson("lesson-204", "unit-bahasa-kelas-advanced", "Jawapan Ikut Format", "Campurkan arahan kelas dengan penilaian jawapan.", [
    "ph-baca-petikan-itu-sekarang",
    "ph-tajuk-itu-jelas",
    "lx-perenggan",
    "lx-format",
    "lx-jawapan",
    "lx-markah"
  ]),
  lesson("lesson-205", "unit-bahasa-kelas-advanced", "Ulang Kaji Bahasa Kelas", "Ulang semula istilah petikan, perenggan, tajuk, dan format.", [
    "ph-perenggan-ini-panjang",
    "ph-ikut-format-yang-betul",
    "lx-petikan",
    "lx-tajuk",
    "lx-baca",
    "lx-betul"
  ]),
  lesson("lesson-206", "unit-menilai-advanced", "Nilai dan Alasan", "Masuk lebih dalam ke bahasa penilaian dan sebab.", [
    "lx-nilai",
    "lx-alasan",
    "lx-munasabah",
    "lx-andaian",
    "lx-jawapan",
    "lx-kuat"
  ]),
  lesson("lesson-207", "unit-menilai-advanced", "Munasabah atau Tidak", "Nilai sama ada alasan benar-benar kuat.", [
    "ph-kita-perlu-nilai-jawapan-ini",
    "ph-alasan-itu-kurang-munasabah",
    "lx-nilai",
    "lx-alasan",
    "lx-jawapan",
    "lx-semak"
  ]),
  lesson("lesson-208", "unit-menilai-advanced", "Andaian Lemah", "Bezakan andaian daripada alasan yang betul-betul kukuh.", [
    "ph-andaian-itu-belum-kuat",
    "ph-apa-alasan-awak",
    "lx-munasabah",
    "lx-andaian",
    "lx-kuat",
    "lx-soalan"
  ]),
  lesson("lesson-209", "unit-menilai-advanced", "Semak Alasan", "Gunakan bahasa nilai untuk menyemak jawapan lain.", [
    "ph-kita-perlu-nilai-jawapan-ini",
    "ph-andaian-itu-belum-kuat",
    "lx-alasan",
    "lx-andaian",
    "lx-semak",
    "lx-soalan"
  ]),
  lesson("lesson-210", "unit-menilai-advanced", "Ulang Kaji Penilaian", "Kukuhkan bahasa alasan, andaian, dan penilaian.", [
    "ph-alasan-itu-kurang-munasabah",
    "ph-apa-alasan-awak",
    "lx-nilai",
    "lx-munasabah",
    "lx-jawapan",
    "lx-kuat"
  ]),
  lesson("lesson-211", "unit-connector-advanced", "Walaupun dan Namun", "Gunakan penyambung untuk mengawal aliran idea.", [
    "lx-walaupun",
    "lx-namun",
    "lx-sebaliknya",
    "lx-selain-itu",
    "lx-susah",
    "lx-soalan"
  ]),
  lesson("lesson-212", "unit-connector-advanced", "Sebaliknya", "Pilih dan lawankan idea dengan lebih tepat.", [
    "ph-walaupun-susah-saya-cuba",
    "ph-namun-jawapan-itu-tidak-jelas",
    "lx-walaupun",
    "lx-namun",
    "lx-soalan",
    "lx-pilih"
  ]),
  lesson("lesson-213", "unit-connector-advanced", "Selain Itu", "Tambah idea tanpa kehilangan arah ayat.", [
    "ph-sebaliknya-kami-pilih-ini",
    "ph-selain-itu-ada-satu-soalan",
    "lx-sebaliknya",
    "lx-selain-itu",
    "lx-pilih",
    "lx-jawapan"
  ]),
  lesson("lesson-214", "unit-connector-advanced", "Gabung Idea", "Campurkan pertentangan dan tambahan dalam satu aliran.", [
    "ph-walaupun-susah-saya-cuba",
    "ph-sebaliknya-kami-pilih-ini",
    "lx-namun",
    "lx-selain-itu",
    "lx-soalan",
    "lx-jawapan"
  ]),
  lesson("lesson-215", "unit-connector-advanced", "Ulang Kaji Penyambung", "Ulang semula penyambung utama untuk hujah dan penjelasan.", [
    "ph-namun-jawapan-itu-tidak-jelas",
    "ph-selain-itu-ada-satu-soalan",
    "lx-walaupun",
    "lx-sebaliknya",
    "lx-susah",
    "lx-soalan"
  ]),
  lesson("lesson-216", "unit-masa-advanced", "Sejak hingga Apabila", "Gerakkan masa dengan kata hubung yang lebih tepat.", [
    "lx-sejak",
    "lx-hingga",
    "lx-sepanjang",
    "lx-apabila",
    "lx-pagi",
    "lx-minggu"
  ]),
  lesson("lesson-217", "unit-masa-advanced", "Masa dalam Ayat", "Gunakan hubungan masa dalam ayat penuh.", [
    "ph-sejak-pagi-dia-belajar",
    "ph-perpustakaan-itu-buka-hingga-malam",
    "lx-sejak",
    "lx-hingga",
    "lx-pagi",
    "lx-malam"
  ]),
  lesson("lesson-218", "unit-masa-advanced", "Sepanjang Minggu", "Nyatakan tempoh dan perubahan masa dengan lebih lancar.", [
    "ph-sepanjang-minggu-ini-sibuk",
    "ph-apabila-hujan-kami-masuk-kelas",
    "lx-sepanjang",
    "lx-apabila",
    "lx-minggu",
    "lx-hujan"
  ]),
  lesson("lesson-219", "unit-masa-advanced", "Urutan Masa", "Campurkan tempoh, pencetus, dan masa penutup.", [
    "ph-sejak-pagi-dia-belajar",
    "ph-sepanjang-minggu-ini-sibuk",
    "lx-hingga",
    "lx-apabila",
    "lx-malam",
    "lx-hujan"
  ]),
  lesson("lesson-220", "unit-masa-advanced", "Ulang Kaji Masa", "Kukuhkan hubungan masa yang lebih halus.", [
    "ph-perpustakaan-itu-buka-hingga-malam",
    "ph-apabila-hujan-kami-masuk-kelas",
    "lx-sejak",
    "lx-sepanjang",
    "lx-pagi",
    "lx-minggu"
  ]),
  lesson("lesson-221", "unit-rumusan-advanced", "Rumusan Ringkas", "Mula menilai rumusan, dapatan, dan kesimpulan.", [
    "lx-rumusan",
    "lx-dapatan",
    "lx-kesimpulan",
    "lx-kaedah",
    "lx-laporan",
    "lx-jelas"
  ]),
  lesson("lesson-222", "unit-rumusan-advanced", "Dapatan dan Kaedah", "Gunakan istilah laporan secara lebih tepat.", [
    "ph-rumusan-itu-ringkas-dan-jelas",
    "ph-dapatan-itu-penting",
    "lx-rumusan",
    "lx-dapatan",
    "lx-laporan",
    "lx-ringkas"
  ]),
  lesson("lesson-223", "unit-rumusan-advanced", "Kesimpulan", "Tanya dan jawab bahagian akhir laporan dengan yakin.", [
    "ph-apa-kesimpulan-awak",
    "ph-kaedah-ini-lebih-sesuai",
    "lx-kesimpulan",
    "lx-kaedah",
    "lx-jelas",
    "lx-contoh"
  ]),
  lesson("lesson-224", "unit-rumusan-advanced", "Lapor dengan Jelas", "Campurkan dapatan, kaedah, dan rumusan dalam satu blok.", [
    "ph-rumusan-itu-ringkas-dan-jelas",
    "ph-apa-kesimpulan-awak",
    "lx-dapatan",
    "lx-kaedah",
    "lx-ringkas",
    "lx-contoh"
  ]),
  lesson("lesson-225", "unit-rumusan-advanced", "Ulang Kaji Rumusan", "Ulang semula bahasa laporan dan penutup hujah.", [
    "ph-dapatan-itu-penting",
    "ph-kaedah-ini-lebih-sesuai",
    "lx-rumusan",
    "lx-kesimpulan",
    "lx-laporan",
    "lx-jelas"
  ]),
  lesson("lesson-226", "unit-urusan-advanced", "Aduan dan Giliran", "Masuk ke bahasa kaunter, aduan, dan urusan rasmi.", [
    "lx-aduan",
    "lx-giliran",
    "lx-permohonan",
    "lx-pengesahan",
    "lx-hantar",
    "lx-tunggu"
  ]),
  lesson("lesson-227", "unit-urusan-advanced", "Permohonan", "Gunakan bahasa rasmi untuk urusan dan permintaan.", [
    "ph-saya-hantar-aduan-semalam",
    "ph-tunggu-giliran-di-sini",
    "lx-aduan",
    "lx-giliran",
    "lx-hantar",
    "lx-kaunter"
  ]),
  lesson("lesson-228", "unit-urusan-advanced", "Pengesahan", "Nyatakan apa yang masih perlu disahkan.", [
    "ph-permohonan-itu-perlu-pengesahan",
    "ph-giliran-saya-belum-tiba",
    "lx-permohonan",
    "lx-pengesahan",
    "lx-tunggu",
    "lx-pejabat"
  ]),
  lesson("lesson-229", "unit-urusan-advanced", "Urusan Kaunter", "Campurkan aduan, giliran, dan pengesahan.", [
    "ph-saya-hantar-aduan-semalam",
    "ph-permohonan-itu-perlu-pengesahan",
    "lx-giliran",
    "lx-pengesahan",
    "lx-kaunter",
    "lx-pejabat"
  ]),
  lesson("lesson-230", "unit-urusan-advanced", "Ulang Kaji Urusan", "Ulang semula bahasa urusan rasmi yang penting.", [
    "ph-tunggu-giliran-di-sini",
    "ph-giliran-saya-belum-tiba",
    "lx-aduan",
    "lx-permohonan",
    "lx-hantar",
    "lx-tunggu"
  ]),
  lesson("lesson-231", "unit-komuniti-advanced", "Gotong-Royong", "Gunakan bahasa komuniti dan tanggungjawab bersama.", [
    "lx-gotong-royong",
    "lx-kebersihan",
    "lx-keselamatan",
    "lx-tanggungjawab",
    "lx-kelas",
    "lx-jalan"
  ]),
  lesson("lesson-232", "unit-komuniti-advanced", "Kebersihan dan Keselamatan", "Sebut perkara penting untuk ruang bersama.", [
    "ph-gotong-royong-itu-pada-hari-ahad",
    "ph-kebersihan-kelas-itu-tanggungjawab-kami",
    "lx-gotong-royong",
    "lx-kebersihan",
    "lx-kelas",
    "lx-penting"
  ]),
  lesson("lesson-233", "unit-komuniti-advanced", "Tanggungjawab Kita", "Sambungkan keselamatan dengan tanggungjawab harian.", [
    "ph-keselamatan-di-jalan-itu-penting",
    "ph-tanggungjawab-anda-penting",
    "lx-keselamatan",
    "lx-tanggungjawab",
    "lx-jalan",
    "lx-kami"
  ]),
  lesson("lesson-234", "unit-komuniti-advanced", "Komuniti Harian", "Campurkan ruang bersama, tugas, dan keselamatan.", [
    "ph-gotong-royong-itu-pada-hari-ahad",
    "ph-keselamatan-di-jalan-itu-penting",
    "lx-kebersihan",
    "lx-tanggungjawab",
    "lx-penting",
    "lx-kami"
  ]),
  lesson("lesson-235", "unit-komuniti-advanced", "Ulang Kaji Komuniti", "Kukuhkan bahasa komuniti yang praktikal.", [
    "ph-kebersihan-kelas-itu-tanggungjawab-kami",
    "ph-tanggungjawab-anda-penting",
    "lx-gotong-royong",
    "lx-keselamatan",
    "lx-kelas",
    "lx-jalan"
  ]),
  lesson("lesson-236", "unit-media-advanced", "Fakta dan Rakaman", "Mulakan bahasa media, fakta, dan kebenaran maklumat.", [
    "lx-fakta",
    "lx-maklumat",
    "lx-palsu",
    "lx-rakaman",
    "lx-semak",
    "lx-kongsi"
  ]),
  lesson("lesson-237", "unit-media-advanced", "Maklumat Palsu", "Kenal pasti maklumat yang patut diragui.", [
    "ph-semak-fakta-sebelum-kongsi",
    "ph-maklumat-itu-mungkin-palsu",
    "lx-fakta",
    "lx-maklumat",
    "lx-semak",
    "lx-mungkin"
  ]),
  lesson("lesson-238", "unit-media-advanced", "Semak Sebelum Kongsi", "Gunakan media Melayu untuk menilai kebolehpercayaan.", [
    "ph-rakaman-itu-jelas",
    "ph-kami-tidak-kongsi-maklumat-palsu",
    "lx-palsu",
    "lx-rakaman",
    "lx-kongsi",
    "lx-jelas"
  ]),
  lesson("lesson-239", "unit-media-advanced", "Maklumat yang Jelas", "Campurkan fakta, rakaman, dan amaran media.", [
    "ph-semak-fakta-sebelum-kongsi",
    "ph-rakaman-itu-jelas",
    "lx-maklumat",
    "lx-rakaman",
    "lx-mungkin",
    "lx-jelas"
  ]),
  lesson("lesson-240", "unit-media-advanced", "Ulang Kaji Media", "Ulang semula cara bercakap tentang maklumat dan fakta.", [
    "ph-maklumat-itu-mungkin-palsu",
    "ph-kami-tidak-kongsi-maklumat-palsu",
    "lx-fakta",
    "lx-palsu",
    "lx-semak",
    "lx-kongsi"
  ]),
  lesson("lesson-241", "unit-hujah-advanced", "Sokong atau Sangkal", "Masuk ke bahasa sokongan, penegasan, dan penolakan.", [
    "lx-sokong",
    "lx-tegaskan",
    "lx-akui",
    "lx-sangkal",
    "lx-keputusan",
    "lx-jawapan"
  ]),
  lesson("lesson-242", "unit-hujah-advanced", "Tegaskan", "Gunakan kata kerja hujah dengan lebih tajam.", [
    "ph-saya-sokong-keputusan-itu",
    "ph-dia-tegaskan-jawapan-itu",
    "lx-sokong",
    "lx-tegaskan",
    "lx-keputusan",
    "lx-setuju"
  ]),
  lesson("lesson-243", "unit-hujah-advanced", "Akui Kesalahan", "Belajar mengaku dan menolak dengan tepat.", [
    "ph-saya-akui-saya-lewat",
    "ph-mereka-sangkal-jawapan-itu",
    "lx-akui",
    "lx-sangkal",
    "lx-jawapan",
    "lx-bantah"
  ]),
  lesson("lesson-244", "unit-hujah-advanced", "Balas Hujah", "Gabungkan sokongan, penegasan, dan sanggahan.", [
    "ph-saya-sokong-keputusan-itu",
    "ph-saya-akui-saya-lewat",
    "lx-tegaskan",
    "lx-sangkal",
    "lx-setuju",
    "lx-bantah"
  ]),
  lesson("lesson-245", "unit-hujah-advanced", "Ulang Kaji Hujah", "Kukuhkan bahasa berhujah dalam bentuk ringkas.", [
    "ph-dia-tegaskan-jawapan-itu",
    "ph-mereka-sangkal-jawapan-itu",
    "lx-sokong",
    "lx-akui",
    "lx-keputusan",
    "lx-jawapan"
  ]),
  lesson("lesson-246", "unit-imersi-final", "Kefahaman", "Nilai kemajuan anda sepenuhnya dalam bahasa Melayu.", [
    "lx-kefahaman",
    "lx-kefasihan",
    "lx-kesilapan",
    "lx-pembetulan",
    "lx-belajar",
    "lx-latihan"
  ]),
  lesson("lesson-247", "unit-imersi-final", "Kefasihan", "Gunakan kata abstrak tentang penguasaan bahasa.", [
    "ph-kefahaman-saya-lebih-baik",
    "ph-kefasihan-datang-dengan-latihan",
    "lx-kefahaman",
    "lx-kefasihan",
    "lx-belajar",
    "lx-jelas"
  ]),
  lesson("lesson-248", "unit-imersi-final", "Kesilapan dan Pembetulan", "Kenal pasti kesalahan dan terima pembetulan.", [
    "ph-kesilapan-itu-jelas",
    "ph-pembetulan-itu-baik-untuk-saya",
    "lx-kesilapan",
    "lx-pembetulan",
    "lx-latihan",
    "lx-betul"
  ]),
  lesson("lesson-249", "unit-imersi-final", "Latihan Harian", "Campurkan kefahaman, kefasihan, dan pembetulan.", [
    "ph-kefahaman-saya-lebih-baik",
    "ph-kesilapan-itu-jelas",
    "lx-kefasihan",
    "lx-pembetulan",
    "lx-jelas",
    "lx-betul"
  ]),
  lesson("lesson-250", "unit-imersi-final", "Penutup Imersi", "Tamatkan laluan dengan bahasa refleksi yang penuh dalam bahasa Melayu.", [
    "ph-kefasihan-datang-dengan-latihan",
    "ph-pembetulan-itu-baik-untuk-saya",
    "lx-kefahaman",
    "lx-kesilapan",
    "lx-belajar",
    "lx-latihan"
  ])
];

const units: Unit[] = [
  {
    id: "unit-core",
    title: "Core Survival",
    description: "Pronouns, replies, questions, and the first phrases you need.",
    color: "#102542",
    accent: "#f46f38",
    icon: "K",
    lessonIds: ["lesson-1", "lesson-2", "lesson-3", "lesson-4", "lesson-5"]
  },
  {
    id: "unit-time",
    title: "Time & Counting",
    description: "Numbers, days, and the time words you hear in school.",
    color: "#154c79",
    accent: "#ffb703",
    icon: "⏰",
    lessonIds: ["lesson-6", "lesson-7", "lesson-8", "lesson-9", "lesson-10"]
  },
  {
    id: "unit-school",
    title: "School Life",
    description: "Classroom objects, study verbs, and survival lines for lessons.",
    color: "#1d6f5f",
    accent: "#7bd389",
    icon: "📚",
    lessonIds: ["lesson-11", "lesson-12", "lesson-13", "lesson-14", "lesson-15"]
  },
  {
    id: "unit-food",
    title: "Food & Routine",
    description: "Canteen vocabulary, hunger states, and your daily routine.",
    color: "#7a2e1f",
    accent: "#ff8c42",
    icon: "🍜",
    lessonIds: ["lesson-16", "lesson-17", "lesson-18", "lesson-19", "lesson-20"]
  },
  {
    id: "unit-places",
    title: "Places & Motion",
    description: "Home, directions, movement, and location phrases.",
    color: "#4a1942",
    accent: "#f28482",
    icon: "🧭",
    lessonIds: ["lesson-21", "lesson-22", "lesson-23", "lesson-24", "lesson-25"]
  },
  {
    id: "unit-people",
    title: "People & Identity",
    description: "Family, group pronouns, school subjects, and introduction phrases.",
    color: "#2f4858",
    accent: "#5dd39e",
    icon: "👥",
    lessonIds: ["lesson-26", "lesson-27", "lesson-28", "lesson-29", "lesson-30"]
  },
  {
    id: "unit-describe",
    title: "Descriptions & Conditions",
    description: "Describe objects, difficulty, pace, weather, and color with more range.",
    color: "#5f0f40",
    accent: "#fcbf49",
    icon: "🎨",
    lessonIds: ["lesson-31", "lesson-32", "lesson-33", "lesson-34", "lesson-35"]
  },
  {
    id: "unit-routine",
    title: "Daily Expansion",
    description: "Home actions, meal words, schedule language, and cumulative daily phrases.",
    color: "#264653",
    accent: "#e76f51",
    icon: "🗓️",
    lessonIds: ["lesson-36", "lesson-37", "lesson-38", "lesson-39", "lesson-40"]
  },
  {
    id: "unit-thinking",
    title: "Thinking & Study Talk",
    description: "Opinions, choices, checking work, and practical classroom verbs.",
    color: "#1f3c88",
    accent: "#ffba08",
    icon: "🧠",
    lessonIds: ["lesson-41", "lesson-42", "lesson-43", "lesson-44", "lesson-45"]
  },
  {
    id: "unit-health",
    title: "Health & Weather",
    description: "Illness, body words, weather problems, and recovery phrases.",
    color: "#22577a",
    accent: "#80ed99",
    icon: "🌦️",
    lessonIds: ["lesson-46", "lesson-47", "lesson-48", "lesson-49", "lesson-50"]
  },
  {
    id: "unit-repair",
    title: "Conversation Repair",
    description: "Clarify, ask for help, and move through short real exchanges.",
    color: "#3a0ca3",
    accent: "#f72585",
    icon: "🗣️",
    lessonIds: ["lesson-51", "lesson-52", "lesson-53", "lesson-54", "lesson-55"]
  },
  {
    id: "unit-home",
    title: "Home & Chores",
    description: "Cleaning, organizing, and talking about the house in practical Malay.",
    color: "#6a4c93",
    accent: "#ffd166",
    icon: "🧹",
    lessonIds: ["lesson-56", "lesson-57", "lesson-58", "lesson-59", "lesson-60"]
  },
  {
    id: "unit-money",
    title: "Money & Shopping",
    description: "Prices, payment, trying things, and handling stalls or shops.",
    color: "#1b4332",
    accent: "#95d5b2",
    icon: "💸",
    lessonIds: ["lesson-61", "lesson-62", "lesson-63", "lesson-64", "lesson-65"]
  },
  {
    id: "unit-tech",
    title: "Technology & Media",
    description: "Phones, messages, apps, and common digital problems.",
    color: "#0f4c5c",
    accent: "#ffb703",
    icon: "📱",
    lessonIds: ["lesson-66", "lesson-67", "lesson-68", "lesson-69", "lesson-70"]
  },
  {
    id: "unit-emotion",
    title: "Feelings & Social",
    description: "Emotions, personality, and short social descriptions.",
    color: "#9d4edd",
    accent: "#ffcad4",
    icon: "🙂",
    lessonIds: ["lesson-71", "lesson-72", "lesson-73", "lesson-74", "lesson-75"]
  },
  {
    id: "unit-nature",
    title: "Nature & Animals",
    description: "Outdoor places, animals, and short nature descriptions.",
    color: "#386641",
    accent: "#f2e8cf",
    icon: "🌿",
    lessonIds: ["lesson-76", "lesson-77", "lesson-78", "lesson-79", "lesson-80"]
  },
  {
    id: "unit-city",
    title: "City & Transport",
    description: "Stations, maps, traffic, and moving through the city.",
    color: "#344e41",
    accent: "#dda15e",
    icon: "🚦",
    lessonIds: ["lesson-81", "lesson-82", "lesson-83", "lesson-84", "lesson-85"]
  },
  {
    id: "unit-advanced-school",
    title: "Projects & Presentations",
    description: "Advanced school vocabulary for groups, reports, and formal tasks.",
    color: "#2a2d34",
    accent: "#f4a261",
    icon: "🎓",
    lessonIds: ["lesson-86", "lesson-87", "lesson-88", "lesson-89", "lesson-90"]
  },
  {
    id: "unit-plans",
    title: "Frequency & Plans",
    description: "Habits, schedules, sequence, and what happens before or after.",
    color: "#003049",
    accent: "#f77f00",
    icon: "⏳",
    lessonIds: ["lesson-91", "lesson-92", "lesson-93", "lesson-94", "lesson-95"]
  },
  {
    id: "unit-services",
    title: "Public Services",
    description: "Hospitals, police, emergencies, and reporting problems.",
    color: "#6d071a",
    accent: "#faa307",
    icon: "🚨",
    lessonIds: ["lesson-96", "lesson-97", "lesson-98", "lesson-99", "lesson-100"]
  },
  {
    id: "unit-listen",
    title: "Listening & Clarity",
    description: "Hear more accurately, ask for clarity, and manage noisy classroom Malay.",
    color: "#577590",
    accent: "#f9c74f",
    icon: "👂",
    lessonIds: ["lesson-101", "lesson-102", "lesson-103", "lesson-104", "lesson-105"]
  },
  {
    id: "unit-clothes",
    title: "Clothes & Fit",
    description: "Clothing words, fit, tidiness, and appearance.",
    color: "#ad2831",
    accent: "#ffd6a5",
    icon: "👕",
    lessonIds: ["lesson-106", "lesson-107", "lesson-108", "lesson-109", "lesson-110"]
  },
  {
    id: "unit-restaurant",
    title: "Restaurant Malay",
    description: "Order food, ask for changes, and talk about bowls, plates, and utensils.",
    color: "#bc6c25",
    accent: "#fefae0",
    icon: "🍽️",
    lessonIds: ["lesson-111", "lesson-112", "lesson-113", "lesson-114", "lesson-115"]
  },
  {
    id: "unit-hobbies",
    title: "Hobbies & Sports",
    description: "Talk about play, music, movies, drawing, and sport in daily Malay.",
    color: "#4361ee",
    accent: "#bde0fe",
    icon: "⚽",
    lessonIds: ["lesson-116", "lesson-117", "lesson-118", "lesson-119", "lesson-120"]
  },
  {
    id: "unit-body",
    title: "Body & Checkups",
    description: "Body parts, appointments, and simple doctor-talk sentences.",
    color: "#e63946",
    accent: "#a8dadc",
    icon: "🩺",
    lessonIds: ["lesson-121", "lesson-122", "lesson-123", "lesson-124", "lesson-125"]
  },
  {
    id: "unit-dates",
    title: "Months & Dates",
    description: "Months, birthdays, date language, and next-week versus last-week talk.",
    color: "#355070",
    accent: "#eaac8b",
    icon: "📅",
    lessonIds: ["lesson-126", "lesson-127", "lesson-128", "lesson-129", "lesson-130"]
  },
  {
    id: "unit-family-events",
    title: "Family Events",
    description: "Cousins, grandparents, guests, gifts, weddings, and open houses.",
    color: "#8338ec",
    accent: "#ffafcc",
    icon: "🎁",
    lessonIds: ["lesson-131", "lesson-132", "lesson-133", "lesson-134", "lesson-135"]
  },
  {
    id: "unit-travel-extended",
    title: "Travel & Booking",
    description: "Airport, hotel, bookings, luggage, and leaving or arriving on time.",
    color: "#264653",
    accent: "#e9c46a",
    icon: "✈️",
    lessonIds: ["lesson-136", "lesson-137", "lesson-138", "lesson-139", "lesson-140"]
  },
  {
    id: "unit-language-extended",
    title: "Language Study",
    description: "Words for translation, grammar, pronunciation, spelling, and revision.",
    color: "#4a4e69",
    accent: "#c9ada7",
    icon: "📝",
    lessonIds: ["lesson-141", "lesson-142", "lesson-143", "lesson-144", "lesson-145"]
  },
  {
    id: "unit-neighborhood-extended",
    title: "Neighborhood Places",
    description: "Bookstores, pharmacies, mosques, bus stops, police stations, and more.",
    color: "#2d6a4f",
    accent: "#d9ed92",
    icon: "🏘️",
    lessonIds: ["lesson-146", "lesson-147", "lesson-148", "lesson-149", "lesson-150"]
  },
  {
    id: "unit-compare",
    title: "Comparison & Evidence",
    description: "Compare answers, ask for proof, and justify choices with more precision.",
    color: "#3c096c",
    accent: "#ffba08",
    icon: "⚖️",
    lessonIds: ["lesson-151", "lesson-152", "lesson-153", "lesson-154", "lesson-155"]
  },
  {
    id: "unit-rules-advanced",
    title: "Rules & Permission",
    description: "Permission, prohibition, and classroom rule language that actually gets used.",
    color: "#5c2a2a",
    accent: "#fcbf49",
    icon: "🚫",
    lessonIds: ["lesson-156", "lesson-157", "lesson-158", "lesson-159", "lesson-160"]
  },
  {
    id: "unit-sequence-advanced",
    title: "Sequence & Process",
    description: "Explain steps, order, and process instead of naming isolated actions.",
    color: "#2b2d42",
    accent: "#8ecae6",
    icon: "🪜",
    lessonIds: ["lesson-161", "lesson-162", "lesson-163", "lesson-164", "lesson-165"]
  },
  {
    id: "unit-cause-advanced",
    title: "Cause & Result",
    description: "Move into impact, success, failure, and what caused them.",
    color: "#7b2cbf",
    accent: "#ffd166",
    icon: "🎯",
    lessonIds: ["lesson-166", "lesson-167", "lesson-168", "lesson-169", "lesson-170"]
  },
  {
    id: "unit-office-advanced",
    title: "School Administration",
    description: "Forms, signatures, documents, and office interactions without English fallback.",
    color: "#1d3557",
    accent: "#a8dadc",
    icon: "🗂️",
    lessonIds: ["lesson-171", "lesson-172", "lesson-173", "lesson-174", "lesson-175"]
  },
  {
    id: "unit-discuss-advanced",
    title: "Bincang & Setuju",
    description: "Setuju, bantah, cadang, dan nilai keputusan dengan lebih matang.",
    color: "#582f0e",
    accent: "#dda15e",
    icon: "🗨️",
    lessonIds: ["lesson-176", "lesson-177", "lesson-178", "lesson-179", "lesson-180"]
  },
  {
    id: "unit-condition-advanced",
    title: "Jika & Syarat",
    description: "Bina ayat bersyarat, pengecualian, dan kemungkinan dengan lebih yakin.",
    color: "#006d77",
    accent: "#ffddd2",
    icon: "🔀",
    lessonIds: ["lesson-181", "lesson-182", "lesson-183", "lesson-184", "lesson-185"]
  },
  {
    id: "unit-explain-advanced",
    title: "Huraian & Isi",
    description: "Jelaskan jawapan, huraikan isi, dan kenal pasti perkara utama.",
    color: "#3a5a40",
    accent: "#dad7cd",
    icon: "🧾",
    lessonIds: ["lesson-186", "lesson-187", "lesson-188", "lesson-189", "lesson-190"]
  },
  {
    id: "unit-notices-advanced",
    title: "Notis & Makluman",
    description: "Baca notis, fahami pengumuman, dan urus gangguan atau kelewatan.",
    color: "#6f1d1b",
    accent: "#ffe6a7",
    icon: "📢",
    lessonIds: ["lesson-191", "lesson-192", "lesson-193", "lesson-194", "lesson-195"]
  },
  {
    id: "unit-commit-advanced",
    title: "Jadual & Komitmen",
    description: "Sahkan, tangguh, teruskan, dan kawal komitmen dalam bahasa Melayu.",
    color: "#14213d",
    accent: "#fca311",
    icon: "🗓️",
    lessonIds: ["lesson-196", "lesson-197", "lesson-198", "lesson-199", "lesson-200"]
  },
  {
    id: "unit-bahasa-kelas-advanced",
    title: "Bahasa Kelas Lanjutan",
    description: "Fahami petikan, perenggan, tajuk, dan format tanpa arahan bahasa Inggeris.",
    color: "#264653",
    accent: "#e9c46a",
    icon: "📘",
    lessonIds: ["lesson-201", "lesson-202", "lesson-203", "lesson-204", "lesson-205"]
  },
  {
    id: "unit-menilai-advanced",
    title: "Menilai Jawapan",
    description: "Nilai alasan, kesan andaian, dan kekuatan sesuatu jawapan.",
    color: "#4a1942",
    accent: "#f28482",
    icon: "🧠",
    lessonIds: ["lesson-206", "lesson-207", "lesson-208", "lesson-209", "lesson-210"]
  },
  {
    id: "unit-connector-advanced",
    title: "Penyambung Idea",
    description: "Sambungkan pertentangan, tambahan, dan pilihan dengan lebih lancar.",
    color: "#3d405b",
    accent: "#f2cc8f",
    icon: "🔗",
    lessonIds: ["lesson-211", "lesson-212", "lesson-213", "lesson-214", "lesson-215"]
  },
  {
    id: "unit-masa-advanced",
    title: "Hubungan Masa",
    description: "Gunakan sejak, hingga, sepanjang, dan apabila untuk ayat yang lebih tepat.",
    color: "#355070",
    accent: "#b56576",
    icon: "⏱️",
    lessonIds: ["lesson-216", "lesson-217", "lesson-218", "lesson-219", "lesson-220"]
  },
  {
    id: "unit-rumusan-advanced",
    title: "Rumusan dan Laporan",
    description: "Bina bahasa ringkas untuk rumusan, dapatan, kesimpulan, dan kaedah.",
    color: "#283618",
    accent: "#dda15e",
    icon: "📄",
    lessonIds: ["lesson-221", "lesson-222", "lesson-223", "lesson-224", "lesson-225"]
  },
  {
    id: "unit-urusan-advanced",
    title: "Urusan dan Aduan",
    description: "Hadapi kaunter, giliran, aduan, dan pengesahan dalam bahasa Melayu penuh.",
    color: "#6c584c",
    accent: "#adc178",
    icon: "🏢",
    lessonIds: ["lesson-226", "lesson-227", "lesson-228", "lesson-229", "lesson-230"]
  },
  {
    id: "unit-komuniti-advanced",
    title: "Komuniti dan Tanggungjawab",
    description: "Bercakap tentang kebersihan, keselamatan, dan tanggungjawab bersama.",
    color: "#2d6a4f",
    accent: "#95d5b2",
    icon: "🤝",
    lessonIds: ["lesson-231", "lesson-232", "lesson-233", "lesson-234", "lesson-235"]
  },
  {
    id: "unit-media-advanced",
    title: "Media dan Maklumat",
    description: "Semak fakta, nilai rakaman, dan elak maklumat palsu.",
    color: "#0f4c5c",
    accent: "#ffd166",
    icon: "📰",
    lessonIds: ["lesson-236", "lesson-237", "lesson-238", "lesson-239", "lesson-240"]
  },
  {
    id: "unit-hujah-advanced",
    title: "Hujah dan Balas",
    description: "Sokong, tegaskan, akui, dan sangkal dengan bahasa yang padat.",
    color: "#5a189a",
    accent: "#ffccd5",
    icon: "🧩",
    lessonIds: ["lesson-241", "lesson-242", "lesson-243", "lesson-244", "lesson-245"]
  },
  {
    id: "unit-imersi-final",
    title: "Imersi Akhir",
    description: "Nilai kefahaman, kefasihan, kesilapan, dan pembetulan sepenuhnya dalam bahasa Melayu.",
    color: "#081c15",
    accent: "#52b788",
    icon: "🏁",
    lessonIds: ["lesson-246", "lesson-247", "lesson-248", "lesson-249", "lesson-250"]
  }
];

export const courseData: CourseData = {
  items: [...items, ...expansionPackItems],
  lessons: [...lessons, ...expansionPackLessons],
  units: [...units, ...expansionPackUnits]
};
