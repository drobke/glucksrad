(function (global) {
const vocabulary = (de, sr) => ({ de, sr });

const categories = [
  { id: "farben", name: "Farben", names: { de: "Farben", sr: "Boje" }, words: vocabulary(["rot", "orange", "gelb", "grün", "blau", "lila", "rosa", "braun", "weiß", "schwarz", "grau"], ["crvena", "narandžasta", "žuta", "zelena", "plava", "ljubičasta", "roze", "braon", "bela", "crna", "siva"]) },
  { id: "zahlen-1-10", name: "Zahlen 1–10", names: { de: "Zahlen 1–10", sr: "Brojevi 1–10" }, words: vocabulary(["eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"], ["jedan", "dva", "tri", "četiri", "pet", "šest", "sedam", "osam", "devet", "deset"]) },
  { id: "zahlen-11-21", name: "Zahlen 11–21", names: { de: "Zahlen 11–21", sr: "Brojevi 11–21" }, words: vocabulary(["elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig", "einundzwanzig"], ["jedanaest", "dvanaest", "trinaest", "četrnaest", "petnaest", "šesnaest", "sedamnaest", "osamnaest", "devetnaest", "dvadeset", "dvadeset jedan"]) },
  { id: "zahlen-22-32", name: "Zahlen 22–32", names: { de: "Zahlen 22–32", sr: "Brojevi 22–32" }, words: vocabulary(["zweiundzwanzig", "dreiundzwanzig", "vierundzwanzig", "fünfundzwanzig", "sechsundzwanzig", "siebenundzwanzig", "achtundzwanzig", "neunundzwanzig", "dreißig", "einunddreißig", "zweiunddreißig"], ["dvadeset dva", "dvadeset tri", "dvadeset četiri", "dvadeset pet", "dvadeset šest", "dvadeset sedam", "dvadeset osam", "dvadeset devet", "trideset", "trideset jedan", "trideset dva"]) },
  { id: "begrussungen", name: "Begrüßungen", names: { de: "Begrüßungen", sr: "Pozdravi" }, words: vocabulary(["Hallo", "Tschüss", "Guten Morgen", "Guten Tag", "Gute Nacht", "Guten Abend", "Auf Wiedersehen", "Bis Morgen", "Bis Bald"], ["Zdravo", "Ćao", "Dobro jutro", "Dobar dan", "Laku noć", "Dobro veče", "Doviđenja", "Vidimo se sutra", "Vidimo se uskoro"]) },
  { id: "familie", name: "Familie", names: { de: "Familie", sr: "Porodica" }, words: vocabulary(["der Vater", "die Mutter", "der Bruder", "die Schwester", "der Opa", "die Oma", "der Sohn", "die Tochter", "das Baby", "der Hund"], ["otac", "majka", "brat", "sestra", "deda", "baka", "sin", "ćerka", "beba", "pas"]) },
  { id: "tiere", name: "Tiere", names: { de: "Tiere", sr: "Životinje" }, words: vocabulary(["der Hund", "die Katze", "der Vogel", "die Kuh", "das Pferd", "das Schaf", "das Kaninchen", "der Fisch", "die Schildkröte", "der Igel"], ["pas", "mačka", "ptica", "krava", "konj", "ovca", "zec", "riba", "kornjača", "jež"]) },
  { id: "tiere-2", name: "Tiere 2", names: { de: "Tiere 2", sr: "Životinje 2" }, words: vocabulary(["der Löwe", "der Tiger", "der Elefant", "die Giraffe", "der Affe", "der Bär", "die Ente", "der Frosch", "die Maus", "das Schwein"], ["lav", "tigar", "slon", "žirafa", "majmun", "medved", "patka", "žaba", "miš", "svinja"]) },
  { id: "koerper", name: "Körper", names: { de: "Körper", sr: "Telo" }, words: vocabulary(["der Kopf", "die Haare", "die Augen", "die Ohren", "die Nase", "der Mund", "die Hand", "der Arm", "das Bein", "der Fuß"], ["glava", "kosa", "oči", "uši", "nos", "usta", "šaka", "ruka", "noga", "stopalo"]) },
  { id: "kleidung-1", name: "Kleidung 1", names: { de: "Kleidung 1", sr: "Odeća 1" }, words: vocabulary(["das T-Shirt", "die Bluse", "das Hemd", "der Pullover", "der Hoodie", "die Jacke", "die Jeans", "die Sporthose", "der Rock"], ["majica", "bluza", "košulja", "džemper", "dukserica", "jakna", "farmerke", "trenerka", "suknja"]) },
  { id: "kleidung-2", name: "Kleidung 2", names: { de: "Kleidung 2", sr: "Odeća 2" }, words: vocabulary(["das Kleid", "die Shorts", "der Gürtel", "die Socken", "die Kappe", "die Mütze", "der Schal", "die Handschuhe", "die Stiefel"], ["haljina", "šorts", "kaiš", "čarape", "kapa", "zimska kapa", "šal", "rukavice", "čizme"]) },
  { id: "wochentage", name: "Wochentage", names: { de: "Wochentage", sr: "Dani u nedelji" }, words: vocabulary(["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"], ["ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota", "nedelja"]) },
  { id: "wetter", name: "Wetter", names: { de: "Wetter", sr: "Vreme" }, words: vocabulary(["sonnig", "bewölkt", "regnerisch", "windig", "die Sonne scheint", "der Regenbogen"], ["sunčano", "oblačno", "kišovito", "vetrovito", "sunce sija", "duga"]) },
  { id: "jahreszeiten", name: "Jahreszeiten", names: { de: "Jahreszeiten", sr: "Godišnja doba" }, words: vocabulary(["der Frühling", "der Sommer", "der Herbst", "der Winter"], ["proleće", "leto", "jesen", "zima"]) },
  { id: "monate", name: "Monate", names: { de: "Monate", sr: "Meseci u godini" }, words: vocabulary(["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"]) },
  { id: "sport-1", name: "Sport 1", names: { de: "Sport 1", sr: "Sport 1" }, words: vocabulary(["der Fußball", "der Basketball", "der Volleyball", "das Tennis", "das Schwimmen", "das Radfahren", "das Laufen", "der Sport"], ["fudbal", "košarka", "odbojka", "tenis", "plivanje", "vožnja bicikla", "trčanje", "sport"]) },
  { id: "sport-2", name: "Sport 2", names: { de: "Sport 2", sr: "Sport 2" }, words: vocabulary(["das Spiel", "die Mannschaft", "der Ball", "das Tor", "der Spieler", "der Trainer", "das Stadion"], ["igra", "tim", "lopta", "gol", "igrač", "trener", "stadion"]) },
  { id: "laender", name: "Länder", names: { de: "Länder", sr: "Države" }, words: vocabulary(["Deutschland", "Serbien", "Spanien", "Frankreich", "Italien", "Brasilien", "England", "Argentinien"], ["Nemačka", "Srbija", "Španija", "Francuska", "Italija", "Brazil", "Engleska", "Argentina"]) },
  { id: "sprachen", name: "Sprachen", names: { de: "Sprachen", sr: "Jezici" }, words: vocabulary(["Deutsch", "Serbisch", "Englisch", "Spanisch", "Französisch"], ["nemački", "srpski", "engleski", "španski", "francuski"]) },
  { id: "mix", name: "Mix", names: { de: "Mix", sr: "Mešano" }, words: vocabulary([], []), isMix: true }
];

const cyrillicLetters = {
  DŽ: "Џ", Dž: "Џ", dž: "џ", LJ: "Љ", Lj: "Љ", lj: "љ", NJ: "Њ", Nj: "Њ", nj: "њ",
  A: "А", B: "Б", C: "Ц", Č: "Ч", Ć: "Ћ", D: "Д", Đ: "Ђ", E: "Е", F: "Ф", G: "Г", H: "Х", I: "И", J: "Ј", K: "К", L: "Л", M: "М", N: "Н", O: "О", P: "П", R: "Р", S: "С", Š: "Ш", T: "Т", U: "У", V: "В", Z: "З", Ž: "Ж",
  a: "а", b: "б", c: "ц", č: "ч", ć: "ћ", d: "д", đ: "ђ", e: "е", f: "ф", g: "г", h: "х", i: "и", j: "ј", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", r: "р", s: "с", š: "ш", t: "т", u: "у", v: "в", z: "з", ž: "ж"
};
const cyrillicPattern = /DŽ|Dž|dž|LJ|Lj|lj|NJ|Nj|nj|[ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽabcčćdđefghijklmnoprstuvzžš]/g;
const toCyrillic = (value) => value.replace(cyrillicPattern, (letter) => cyrillicLetters[letter]);

categories.forEach((category) => {
  category.names.sr = toCyrillic(category.names.sr);
  category.words.sr = category.words.sr.map(toCyrillic);
});

const getWords = (category, language) => category.words[language];
const getCategoryName = (category, language) => category.names[language];

function getTranslation(categoryList, word, language) {
  const otherLanguage = language === "de" ? "sr" : "de";
  for (const category of categoryList) {
    if (category.isMix) continue;
    const wordIndex = getWords(category, language).indexOf(word);
    if (wordIndex !== -1) return getWords(category, otherLanguage)[wordIndex];
  }
  return "";
}

function getMixedWords(categoryList, language, random = Math.random) {
  const uniqueWords = [...new Set(categoryList.filter((category) => !category.isMix).flatMap((category) => getWords(category, language)))];
  const pool = [...uniqueWords];
  const count = Math.min(10, pool.length);
  const mixed = [];
  for (let index = 0; index < count; index += 1) {
    mixed.push(pool.splice(Math.floor(random() * pool.length), 1)[0]);
  }
  return mixed;
}

function createScoreboard(categoryList) {
  const values = Object.fromEntries(categoryList.map(({ id }) => [id, { correct: 0, wrong: 0 }]));
  return {
    get(id) { return { ...values[id] }; },
    record(id, isCorrect) { values[id][isCorrect ? "correct" : "wrong"] += 1; },
    reset() { Object.values(values).forEach((score) => { score.correct = 0; score.wrong = 0; }); }
  };
}

function createAnswerLog() {
  const values = [];
  return {
    entries() { return values.map((entry) => ({ ...entry })); },
    record(entry) { values.push({ ...entry }); },
    reset() { values.length = 0; }
  };
}

global.Vocabulary = { categories, createAnswerLog, createScoreboard, getCategoryName, getMixedWords, getTranslation, getWords, toCyrillic };
})(typeof window !== "undefined" ? window : globalThis);
