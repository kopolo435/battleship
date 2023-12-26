import style from "./shipSetup.css";
import { fillGrid, addShipSelection } from "./setupOfShip/boardDisplay";

const readyBtn = document.getElementById("ready");
const board = document.getElementById("board");

function displayChangeOnReady() {
  const curtain = document.getElementById("curtain");
  curtain.classList.add("closed");
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
fillGrid(10, board);
addShipSelection();
readyBtn.addEventListener("click", () => {
  displayChangeOnReady();
  setNextPage(sessionStorage.getItem("setup"));
});
console.log("pagina de setup");
