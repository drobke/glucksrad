const { createPrepositionScore, questions } = window.Prepositions;

const prompt = document.querySelector("#prepositionPrompt");
const options = document.querySelector("#prepositionOptions");
const feedback = document.querySelector("#prepositionFeedback");
const correctCount = document.querySelector("#prepositionCorrect");
const wrongCount = document.querySelector("#prepositionWrong");
const resetButton = document.querySelector("#resetPrepositionScore");
const score = createPrepositionScore();

let currentQuestion;
let waitingForNext = false;
let nextTimer;

function updateScore() {
  const value = score.get();
  correctCount.textContent = value.correct;
  wrongCount.textContent = value.wrong;
}

function selectQuestion() {
  const available = questions.filter((question) => question !== currentQuestion);
  return available[Math.floor(Math.random() * available.length)];
}

function showNextQuestion() {
  currentQuestion = selectQuestion();
  waitingForNext = false;
  prompt.textContent = currentQuestion.prompt;
  feedback.textContent = "Wähle die passende Präposition.";
  options.innerHTML = currentQuestion.options.map((option) => `<button type="button" data-option="${option}">${option}</button>`).join("");
}

function answer(option, button) {
  if (waitingForNext) return;
  waitingForNext = true;
  const isCorrect = option === currentQuestion.answer;
  score.record(isCorrect); updateScore();
  options.querySelectorAll("button").forEach((item) => {
    item.disabled = true;
    if (item.dataset.option === currentQuestion.answer) item.classList.add("is-correct");
  });
  button.classList.add(isCorrect ? "is-correct" : "is-wrong");
  feedback.textContent = isCorrect ? "Richtig! Nächste Frage kommt gleich." : `Nicht ganz. Richtig ist: ${currentQuestion.answer}.`;
  clearTimeout(nextTimer);
  nextTimer = window.setTimeout(showNextQuestion, 5000);
}

options.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-option]");
  if (button) answer(button.dataset.option, button);
});
resetButton.addEventListener("click", () => { score.reset(); updateScore(); });

updateScore();
showNextQuestion();
