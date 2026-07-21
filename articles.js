const { createArticleScore, questions } = window.Articles;

const prompt = document.querySelector("#articlePrompt");
const options = document.querySelector("#articleOptions");
const feedback = document.querySelector("#articleFeedback");
const correctCount = document.querySelector("#articleCorrect");
const wrongCount = document.querySelector("#articleWrong");
const resetButton = document.querySelector("#resetArticleScore");
const score = createArticleScore();

let currentQuestion;
let waitingForNext = false;
let nextTimer;

function updateScore() {
  const value = score.get();
  correctCount.textContent = value.correct;
  wrongCount.textContent = value.wrong;
}

function showNextQuestion() {
  const available = questions.filter((question) => question !== currentQuestion);
  currentQuestion = available[Math.floor(Math.random() * available.length)];
  waitingForNext = false;
  prompt.textContent = `___ ${currentQuestion.noun}`;
  feedback.textContent = "Wähle den passenden Artikel.";
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
  feedback.textContent = isCorrect ? "Richtig! Nächste Frage kommt gleich." : `Nicht ganz. Richtig ist: ${currentQuestion.answer} ${currentQuestion.noun}.`;
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
