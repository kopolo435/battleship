import style from "./shipSetup.css";

const readyBtn = document.getElementById("ready");

function displayChangeOnReady() {
  const curtain = document.getElementById("curtain");
  const main = document.getElementById("board");
  curtain.classList.add("closed");
  main.style.display = "flex";
}

function setPageLink(link) {
  const nextPage = document.getElementById("next");
  nextPage.addEventListener("click", () => {
    window.location.href = link;
  });
}

function setNextPage(player) {
  if (player === "player1") {
    sessionStorage.setItem("setup", "player2");
    setPageLink("shipSetup.html");
  } else {
    setPageLink("board.html");
  }
}

readyBtn.addEventListener("click", () => {
  displayChangeOnReady();
  setNextPage(sessionStorage.getItem("setup"));
});
console.log("pagina de setup");
