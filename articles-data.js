(function (global) {
const questions = [
  { source: "der Vater", noun: "Vater", answer: "der", options: ["die", "der", "das"] },
  { source: "die Mutter", noun: "Mutter", answer: "die", options: ["das", "der", "die"] },
  { source: "das Baby", noun: "Baby", answer: "das", options: ["das", "die", "der"] },
  { source: "der Hund", noun: "Hund", answer: "der", options: ["der", "das", "die"] },
  { source: "die Katze", noun: "Katze", answer: "die", options: ["der", "die", "das"] },
  { source: "das Pferd", noun: "Pferd", answer: "das", options: ["die", "der", "das"] },
  { source: "der Kopf", noun: "Kopf", answer: "der", options: ["das", "der", "die"] },
  { source: "die Hand", noun: "Hand", answer: "die", options: ["die", "das", "der"] },
  { source: "das Bein", noun: "Bein", answer: "das", options: ["der", "die", "das"] },
  { source: "das T-Shirt", noun: "T-Shirt", answer: "das", options: ["das", "der", "die"] },
  { source: "die Bluse", noun: "Bluse", answer: "die", options: ["der", "die", "das"] },
  { source: "das Hemd", noun: "Hemd", answer: "das", options: ["die", "das", "der"] },
  { source: "der Pullover", noun: "Pullover", answer: "der", options: ["der", "die", "das"] },
  { source: "die Jacke", noun: "Jacke", answer: "die", options: ["das", "die", "der"] },
  { source: "die Jeans", noun: "Jeans", answer: "die", options: ["die", "der", "das"] },
  { source: "das Kleid", noun: "Kleid", answer: "das", options: ["der", "das", "die"] },
  { source: "der Löwe", noun: "Löwe", answer: "der", options: ["die", "der", "das"] },
  { source: "die Maus", noun: "Maus", answer: "die", options: ["das", "der", "die"] }
];

function createArticleScore() {
  const value = { correct: 0, wrong: 0 };
  return {
    get() { return { ...value }; },
    record(isCorrect) { value[isCorrect ? "correct" : "wrong"] += 1; },
    reset() { value.correct = 0; value.wrong = 0; }
  };
}

global.Articles = { createArticleScore, questions };
})(typeof window !== "undefined" ? window : globalThis);
