const humanOutput = document.querySelector("#human");
const computerOutput = document.querySelector("#computer");
const resultOutput = document.querySelector("#result");
const keuzeButtons = document.querySelectorAll("button[data-keuze]");
const scoreJij = document.querySelector("#score-jij");
const scoreComputer = document.querySelector("#score-computer");
const winOverlay = document.getElementById("win-overlay");
const winAudio = document.getElementById("win-audio");

const keuzes = ["Steen", "Papier", "Schaar"];
let jijScore = 0;
let computerScore = 0;

function genereerComputerKeuze() {
  const index = Math.floor(Math.random() * keuzes.length);
  return keuzes[index];
}

function bepaalUitkomst(human, computer) {
  if (human === computer) return "Gelijkspel!";
  switch (human + computer) {
    case "SteenSchaar":
    case "PapierSteen":
    case "SchaarPapier":
      jijScore++;
      return "Jij wint!";
    default:
      computerScore++;
      return "Computer wint!";
  }
}

function verwerkKeuze(e) {
  const humanKeuze = e.target.dataset.keuze;
  const computerKeuze = genereerComputerKeuze();
  const uitslag = bepaalUitkomst(humanKeuze, computerKeuze);

  humanOutput.textContent = humanKeuze;
  computerOutput.textContent = computerKeuze;
  resultOutput.textContent = uitslag;
  scoreJij.textContent = jijScore;
  scoreComputer.textContent = computerScore;

  
  if (uitslag === "Jij wint!") {
    winOverlay.style.display = "flex";
    winAudio.currentTime = 0;
    winAudio.play();
    setTimeout(() => {
      winOverlay.style.display = "none";
      winAudio.pause();
    }, 1500);
  }

  resultOutput.style.opacity = 0;
  setTimeout(() => {
    resultOutput.style.opacity = 1;
  }, 100);
}

keuzeButtons.forEach(button => {
  button.addEventListener("click", verwerkKeuze);
});