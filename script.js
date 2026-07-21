const { categories, createScoreboard, getCategoryName, getMixedWords, getTranslation, getWords } = window.Vocabulary;

const colors = ["#ef5b37", "#f4b942", "#1d8b87", "#f9d9a6", "#4c6c8c"];
const canvas = document.querySelector("#wheel");
const wheelStage = document.querySelector("#wheelStage");
const ctx = canvas.getContext("2d");
const spinButton = document.querySelector("#spinButton");
const resetButton = document.querySelector("#resetButton");
const correctButton = document.querySelector("#correctButton");
const wrongButton = document.querySelector("#wrongButton");
const resultWord = document.querySelector("#resultWord");
const resultHint = document.querySelector("#resultHint");
const spinCount = document.querySelector("#spinCount");
const categoryButtons = document.querySelector("#categoryButtons");
const scoreTable = document.querySelector("#scoreTable");
const resetScoresButton = document.querySelector("#resetScoresButton");
const languageSwitch = document.querySelector(".language-switch");
const mixButton = document.querySelector("#mixButton");
const answerButton = document.querySelector("#answerButton");
const answerModal = document.querySelector("#answerModal");
const closeAnswerModal = document.querySelector("#closeAnswerModal");
const scores = createScoreboard(categories);

let selectedCategory = categories[0];
let language = "sr";
let angle = 0;
let spinning = false;
let hasUnscoredAnswer = false;
let count = 0;
let mixWords = getMixedWords(categories, language);
let currentWord = "";
let modalTimer;
let answerWasShown = false;

const text = {
  de: { eyebrow: "Deutsch lernen · spielerisch", headline: "Uros’ <em>Glücksrad</em>", intro: "Dreh das Rad und entdecke dein nächstes deutsches Wort.", category: "Kategorie auswählen", word: "Dein Wort", spin: "Rad drehen", mix: "Neue Mischung", reveal: "Lösung zeigen", answerTitle: "Die richtige Antwort", correct: "Richtig", wrong: "Falsch", reset: "Neu beginnen", spins: "Drehungen", progress: "Lernfortschritt", scores: "Deine Punkte", scoreReset: "Punkte zurücksetzen", ready: "Bereit?", choose: "Wähle eine Kategorie und drücke auf „Drehen“.", selected: "ausgewählt. Dreh das Rad!", spinning: "Das Rad dreht sich…", answer: "Wusstest du die Antwort?", right: "Super gemacht!", incorrect: "Weiter üben – du schaffst das." },
  sr: { eyebrow: "Учење немачког · кроз игру", headline: "Урошев <em>точак среће</em>", intro: "Заврти точак и откриј следећу немачку реч.", category: "Изабери категорију", word: "Твоја реч", spin: "Заврти точак", mix: "Нова мешавина", reveal: "Прикажи одговор", answerTitle: "Тачан одговор", correct: "Тачно", wrong: "Нетачно", reset: "Почни поново", spins: "окретања", progress: "Напредак у учењу", scores: "Твоји поени", scoreReset: "Обриши поене", ready: "Спремни?", choose: "Изабери категорију и притисни „Заврти точак“.", selected: "изабрано. Заврти точак!", spinning: "Точак се врти…", answer: "Да ли си знао/ла одговор?", right: "Одлично!", incorrect: "Вежбај даље – успећеш." }
};

function words() { return selectedCategory.isMix ? mixWords : getWords(selectedCategory, language); }
function sectorSize() { return (Math.PI * 2) / words().length; }

function drawWheel() {
  const size = canvas.width, center = size / 2, radius = center - 24, sector = sectorSize();
  ctx.clearRect(0, 0, size, size);
  ctx.save(); ctx.translate(center, center); ctx.rotate(angle);
  words().forEach((word, index) => {
    const start = -Math.PI / 2 + index * sector, end = start + sector, middle = start + sector / 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, radius, start, end); ctx.closePath();
    ctx.fillStyle = colors[index % colors.length]; ctx.fill();
    ctx.strokeStyle = "#fff9ed"; ctx.lineWidth = 3; ctx.stroke();
    let textAngle = middle + Math.PI / 2;
    if (textAngle > Math.PI / 2 && textAngle < Math.PI * 1.5) textAngle += Math.PI;
    const darkText = [true, true, false, true, false][index % colors.length];
    ctx.save(); ctx.rotate(middle); ctx.translate(radius * 0.69, 0); ctx.rotate(textAngle - middle);
    ctx.fillStyle = darkText ? "#172727" : "#fff9ed";
    ctx.strokeStyle = darkText ? "rgba(255,249,237,.8)" : "rgba(23,39,39,.65)"; ctx.lineWidth = 3;
    ctx.font = `600 ${word.length > 11 ? 20 : 26}px Georgia`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.strokeText(word, 0, 0); ctx.fillText(word, 0, 0); ctx.restore();
  });
  ctx.beginPath(); ctx.arc(0, 0, radius + 10, 0, Math.PI * 2); ctx.strokeStyle = "#172727"; ctx.lineWidth = 14; ctx.stroke(); ctx.restore();
}

function renderCategories() {
  categoryButtons.innerHTML = categories.map((category) => `<button type="button" data-category="${category.id}" class="${category.id === selectedCategory.id ? "is-active" : ""}">${getCategoryName(category, language)}</button>`).join("");
}

function renderScores() {
  scoreTable.innerHTML = categories.map((category) => {
    const { id } = category;
    const score = scores.get(id);
    return `<div class="score-row"><strong>${getCategoryName(category, language)}</strong><span>✓ ${score.correct}</span><span>✕ ${score.wrong}</span></div>`;
  }).join("");
}

function renderLanguage() {
  const copy = text[language];
  document.documentElement.lang = language === "de" ? "de" : "sr";
  document.querySelector("#eyebrow").textContent = copy.eyebrow;
  document.querySelector("#headline").innerHTML = copy.headline;
  document.querySelector("#intro").textContent = copy.intro;
  document.querySelector("#categoryLabel").textContent = copy.category;
  document.querySelector("#wordLabel").textContent = copy.word;
  document.querySelector("#spinText").textContent = copy.spin;
  mixButton.textContent = copy.mix;
  document.querySelector("#answerText").textContent = copy.reveal;
  document.querySelector("#answerModalLabel").textContent = copy.answerTitle;
  document.querySelector("#correctText").textContent = copy.correct;
  document.querySelector("#wrongText").textContent = copy.wrong;
  resetButton.textContent = copy.reset;
  document.querySelector("#spinsText").textContent = copy.spins;
  document.querySelector("#progressLabel").textContent = copy.progress;
  document.querySelector("#scoreTitle").textContent = copy.scores;
  resetScoresButton.textContent = copy.scoreReset;
  languageSwitch.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button.dataset.language === language));
  renderCategories(); renderScores();
}

function setAnswerButtons(enabled) { correctButton.disabled = !enabled; wrongButton.disabled = !enabled; }
function setRevealButton(enabled) { answerButton.disabled = !enabled; }
function closeModal(enableScoring = false) {
  const wasOpen = !answerModal.hidden;
  clearTimeout(modalTimer); answerModal.hidden = true;
  if (enableScoring && wasOpen && answerWasShown && currentWord && hasUnscoredAnswer) setAnswerButtons(true);
}
function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

function spin() {
  if (spinning) return;
  spinning = true; answerWasShown = false; spinButton.disabled = true; setAnswerButtons(false); setRevealButton(false); closeModal();
  resultWord.textContent = "…"; resultHint.textContent = text[language].spinning;
  const winner = Math.floor(Math.random() * words().length);
  const sector = sectorSize(), targetBase = -(winner * sector + sector / 2);
  const startAngle = angle, endAngle = targetBase + (7 + Math.floor(Math.random() * 4)) * Math.PI * 2;
  const startTime = performance.now(), duration = 4700;
  function animate(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    angle = startAngle + (endAngle - startAngle) * easeOutQuint(progress); drawWheel();
    if (progress < 1) return requestAnimationFrame(animate);
    angle = ((endAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); drawWheel();
    spinning = false; spinButton.disabled = false; hasUnscoredAnswer = true; setAnswerButtons(false);
    currentWord = words()[winner]; setRevealButton(true);
    count += 1; spinCount.textContent = count; resultWord.textContent = currentWord; resultHint.textContent = text[language].answer;
  }
  requestAnimationFrame(animate);
}

function selectCategory(id) {
  if (spinning) return;
  selectedCategory = categories.find((category) => category.id === id);
  if (selectedCategory.isMix) mixWords = getMixedWords(categories, language);
  angle = 0; currentWord = ""; answerWasShown = false; hasUnscoredAnswer = false; setAnswerButtons(false); setRevealButton(false); closeModal(); resultWord.textContent = text[language].ready;
  mixButton.hidden = !selectedCategory.isMix;
  resultHint.textContent = `${getCategoryName(selectedCategory, language)} ${text[language].selected}`; renderCategories(); drawWheel();
}

function refreshMix() {
  if (spinning || !selectedCategory.isMix) return;
  mixWords = getMixedWords(categories, language);
  angle = 0; currentWord = ""; answerWasShown = false; hasUnscoredAnswer = false; setAnswerButtons(false); setRevealButton(false); closeModal();
  resultWord.textContent = text[language].ready;
  resultHint.textContent = `${getCategoryName(selectedCategory, language)} ${text[language].selected}`;
  drawWheel();
}

function recordAnswer(isCorrect) {
  if (!hasUnscoredAnswer) return;
  scores.record(selectedCategory.id, isCorrect); hasUnscoredAnswer = false; setAnswerButtons(false); renderScores();
  resultHint.textContent = isCorrect ? text[language].right : text[language].incorrect;
}

function revealAnswer() {
  if (!currentWord) return;
  answerWasShown = true;
  document.querySelector("#answerModalTitle").textContent = getTranslation(categories, currentWord, language) || currentWord;
  answerModal.hidden = false;
  clearTimeout(modalTimer);
  modalTimer = window.setTimeout(() => closeModal(true), 3000);
}

function resetWheel() { if (!spinning) { angle = 0; count = 0; currentWord = ""; answerWasShown = false; spinCount.textContent = "0"; resultWord.textContent = text[language].ready; resultHint.textContent = text[language].choose; hasUnscoredAnswer = false; setAnswerButtons(false); setRevealButton(false); closeModal(); drawWheel(); } }

categoryButtons.addEventListener("click", (event) => { const id = event.target.dataset.category; if (id) selectCategory(id); });
wheelStage.addEventListener("click", spin);
spinButton.addEventListener("click", spin); resetButton.addEventListener("click", resetWheel);
mixButton.addEventListener("click", refreshMix);
answerButton.addEventListener("click", revealAnswer); closeAnswerModal.addEventListener("click", () => closeModal(true));
correctButton.addEventListener("click", () => recordAnswer(true)); wrongButton.addEventListener("click", () => recordAnswer(false));
resetScoresButton.addEventListener("click", () => { scores.reset(); renderScores(); });
languageSwitch.addEventListener("click", (event) => {
  const nextLanguage = event.target.dataset.language;
  if (!nextLanguage || spinning || nextLanguage === language) return;
  language = nextLanguage; angle = 0; currentWord = ""; answerWasShown = false; hasUnscoredAnswer = false; setAnswerButtons(false); setRevealButton(false); closeModal();
  if (selectedCategory.isMix) mixWords = getMixedWords(categories, language);
  resultWord.textContent = text[language].ready; resultHint.textContent = text[language].choose;
  renderLanguage(); drawWheel();
});
renderLanguage(); resetWheel();
