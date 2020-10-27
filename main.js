const btnStart = document.getElementById("buttonStart");
const btnRestart = document.getElementById("buttonRestart");
const startTime = new Date().getTime() / 1000;
const colors = [
  "red",
  "red",
  "green",
  "green",
  "blue",
  "blue",
  "yellow",
  "yellow",
  "orange",
  "orange",
  "violet",
  "violet",
  "cyan",
  "cyan",
  "pink",
  "pink",
  "sienna",
  "sienna",
];
const activeCards = [];
let activeCard = "";
const cards = [...document.querySelectorAll("div.card")];
let wins = 0;
const maxWins = colors.length / 2;
const title = document.querySelector("h2");
let flag = true;

const drawColors = function () {
  cards.forEach((card) => {
    const i = Math.floor(Math.random() * colors.length);
    const drawedColor = colors[i];
    card.classList.add(drawedColor);
    colors.splice(i, 1);
  });
};

const playGame = function () {
  if (activeCards.length === 0 || activeCards.length === 1) {
    activeCard = this;
    activeCard.classList.remove("hidden");

    activeCards.push(activeCard);
    activeCard.removeEventListener("click", playGame);
  }

  if (activeCards.length === 2) {
    const hiddenCards = cards.filter((card) =>
      card.classList.contains("hidden")
    );

    hiddenCards.forEach((card) => card.removeEventListener("click", playGame));

    if (activeCards[0].className === activeCards[1].className) {
      activeCards.length = 0;
      wins++;

      if (wins === maxWins) {
        const endTime = new Date().getTime() / 1000;
        const gameTime = Math.floor(endTime - startTime);
        title.textContent = `Wygrałeś! Twój czas to ${gameTime}s.`;
      }
    } else {
      setTimeout(function () {
        activeCards.forEach((card) => {
          card.classList.add("hidden");
          card.addEventListener("click", playGame);
        });
        activeCards.length = 0;
      }, 300);
    }

    hiddenCards.forEach((card) => card.addEventListener("click", playGame));
  }
};

const hideCards = function () {
  cards.forEach((card) => {
    card.classList.add("hidden");
    card.addEventListener("click", playGame);
  });
};

const hideInfo = () => (document.querySelector(".info").style.display = "none");

const changeButton = function () {
  btnStart.style.display = "none";
  btnRestart.style.display = "block";
};
const rotateBrain = function () {
  document.querySelector("i").classList.add("start");
};

const start = function () {
  hideInfo();
  changeButton();
  drawColors();
  rotateBrain();
  setTimeout(hideCards, 2000);
};

btnStart.addEventListener("click", start);

btnRestart.addEventListener("click", function () {
  location.reload();
});

// start()
