import type {
  CourseData,
  CourseItem,
  ExerciseType,
  Lesson,
  Lexeme,
  Phrase,
  Unit
} from "../types";

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
  }
];

export const courseData: CourseData = {
  items,
  lessons,
  units
};
