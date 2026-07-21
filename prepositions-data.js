(function (global) {
const questions = [
  { prompt: "Die Kappe ist ___ dem Kopf.", answer: "auf", options: ["unter", "auf", "mit", "für"], vocabularyWords: ["die Kappe", "der Kopf"] },
  { prompt: "Die Socken sind ___ den Stiefeln.", answer: "in", options: ["bei", "in", "auf", "von"], vocabularyWords: ["die Socken", "die Stiefel"] },
  { prompt: "Der Hund ist ___ der Oma.", answer: "bei", options: ["mit", "auf", "bei", "durch"], vocabularyWords: ["der Hund", "die Oma"] },
  { prompt: "Die Maus ist ___ dem Kleid.", answer: "unter", options: ["in", "mit", "für", "unter"], vocabularyWords: ["die Maus", "das Kleid"] },
  { prompt: "Der Schal ist ___ dem Pullover.", answer: "auf", options: ["auf", "unter", "bei", "von"], vocabularyWords: ["der Schal", "der Pullover"] },
  { prompt: "Die Katze ist ___ der Jacke.", answer: "neben", options: ["für", "neben", "aus", "mit"], vocabularyWords: ["die Katze", "die Jacke"] },
  { prompt: "Der Ball ist ___ der Sporthose.", answer: "in", options: ["auf", "unter", "in", "bei"], vocabularyWords: ["der Ball", "die Sporthose"] },
  { prompt: "Das Kleid ist ___ der Jacke.", answer: "unter", options: ["mit", "auf", "bei", "unter"], vocabularyWords: ["das Kleid", "die Jacke"] },
  { prompt: "Der Vogel ist ___ dem Pferd.", answer: "auf", options: ["auf", "unter", "mit", "gegen"], vocabularyWords: ["der Vogel", "das Pferd"] },
  { prompt: "Die Bluse ist ___ dem T-Shirt.", answer: "über", options: ["unter", "über", "für", "von"], vocabularyWords: ["die Bluse", "das T-Shirt"] },
  { prompt: "Der Löwe ist ___ dem Elefanten.", answer: "vor", options: ["bei", "mit", "vor", "aus"], vocabularyWords: ["der Löwe", "der Elefant"] },
  { prompt: "Die Mütze ist ___ der Kappe.", answer: "neben", options: ["auf", "unter", "für", "neben"], vocabularyWords: ["die Mütze", "die Kappe"] }
];

function createPrepositionScore() {
  const value = { correct: 0, wrong: 0 };
  return {
    get() { return { ...value }; },
    record(isCorrect) { value[isCorrect ? "correct" : "wrong"] += 1; },
    reset() { value.correct = 0; value.wrong = 0; }
  };
}

global.Prepositions = { createPrepositionScore, questions };
})(typeof window !== "undefined" ? window : globalThis);
