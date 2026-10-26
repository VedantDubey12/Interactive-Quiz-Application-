const questions = [
  { q: "Which language is used to style web pages?", options: ["HTML", "CSS", "Python", "SQL"], answer: 1 },
  { q: "Which keyword defines a function in Python?", options: ["function", "func", "def", "define"], answer: 2 },
  { q: "Which command saves your changes in Git history?", options: ["git push", "git add", "git commit", "git clone"], answer: 2 },
  { q: "Which method selects an element by its id in JavaScript?", options: ["getElementById", "querySelectorAll", "getElementsByTag", "selectId"], answer: 0 },
  { q: "What does len([1, 2, 3]) return in Python?", options: ["2", "3", "4", "Error"], answer: 1 }
];

let current = 0;
let score = 0;
let answered = false;

const $ = (id) => document.getElementById(id);

function showQuestion() {
  answered = false;
  const item = questions[current];
  $("progressText").textContent = `Question ${current + 1} of ${questions.length}`;
  $("scoreText").textContent = `Score: ${score}`;
  $("question").textContent = item.q;
  $("feedback").textContent = "";
  $("nextBtn").hidden = true;
  $("nextBtn").textContent = current === questions.length - 1 ? "See result" : "Next";

  const box = $("options");
  box.textContent = "";
  item.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(index));
    box.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;
  const correctIndex = questions[current].answer;
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
  });
  if (index === correctIndex) {
    score++;
    $("feedback").textContent = "Correct!";
  } else {
    buttons[index].classList.add("wrong");
    $("feedback").textContent = "Wrong. The correct answer is highlighted.";
  }
  $("scoreText").textContent = `Score: ${score}`;
  $("nextBtn").hidden = false;
}

function showResult() {
  $("quizBox").hidden = true;
  $("resultBox").hidden = false;
  $("finalScore").textContent = `${score} / ${questions.length}`;
  const ratio = score / questions.length;
  $("message").textContent =
    ratio === 1 ? "Perfect score!" : ratio >= 0.6 ? "Good job!" : "Keep practising and try again.";
}

$("nextBtn").addEventListener("click", () => {
  current++;
  if (current < questions.length) showQuestion();
  else showResult();
});

$("restartBtn").addEventListener("click", () => {
  current = 0;
  score = 0;
  $("resultBox").hidden = true;
  $("quizBox").hidden = false;
  showQuestion();
});

showQuestion();
