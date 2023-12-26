import style from "./shipSetup.css";
import {
  fillGrid,
  addShipSelection,
  displayChangeOnReady,
  setPageLink,
} from "./setupOfShip/boardDisplay";
import Gameboard from "./gameboard";

const gameboard = new Gameboard();
const ships = new Map();

function setNextPage(player) {
  if (player === "player1") {
    sessionStorage.setItem("setup", "player2");
    setPageLink("shipSetup.html");
  } else {
    setPageLink("board.html");
  }
}

function createShip(coordinate) {
  const length = sessionStorage.getItem("shipLength");
  const orientation = sessionStorage.getItem("shipOrientation");
  const result = gameboard.addShip(coordinate, length, orientation);
  if (result) {
    return gameboard.ships[gameboard.ships.length - 1];
  }
  return null;
}

function onCellClick(event) {
  const coordinate = event.target.dataset.id;
  if (sessionStorage.getItem("shipLength") !== null) {
    const ship = createShip(coordinate);
    if (ship) {
      const shipId = sessionStorage.getItem("shipId");
      ships.set(shipId, ship);
    } else {
      console.log("Elija otra posicion para el barco");
    }
  } else {
    console.log("Debe escoger un barco primero");
  }
}

const readyBtn = document.getElementById("ready");
const board = document.getElementById("board");
const orientation = document.getElementById("orientation");
fillGrid(10, board);
const cellList = board.querySelectorAll(".cell");

Array.from(cellList).forEach((cell) => {
  cell.addEventListener("click", onCellClick);
});

orientation.addEventListener("change", () => {
  sessionStorage.setItem("shipOrientation", orientation.value);
});

readyBtn.addEventListener("click", () => {
  displayChangeOnReady();
  setNextPage(sessionStorage.getItem("setup"));
});

addShipSelection();
sessionStorage.setItem("orientation", orientation.value);
