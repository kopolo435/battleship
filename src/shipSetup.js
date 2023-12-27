import style from "./shipSetup.css";
import {
  fillGrid,
  addShipSelection,
  displayChangeOnReady,
  setPageLink,
  changeCellToShip,
  disableShipBtn,
  validateAllShipsReady,
  changeButtonStatus,
} from "./setupOfShip/boardDisplay";
import Gameboard from "./gameboard";
import Ship from "./ship";
import replacer from "./jsonConversion";

let gameboard = new Gameboard();
let ships = new Map();
let nextPageLink = "";
const cellMap = new Map();

function setNextPage(player) {
  if (player === "player1") {
    sessionStorage.setItem("setup", "player2");
    nextPageLink = "shipSetup.html";
  } else {
    nextPageLink = "board.html";
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
      disableShipBtn(shipId);
      validateAllShipsReady();
      changeCellToShip(ship.getPositions(), cellMap);
      sessionStorage.removeItem("shipLength");
    } else {
      console.log("Elija otra posicion para el barco");
    }
  } else {
    console.log("Debe escoger un barco primero");
  }
}
function checkPosition(coordinate) {
  const length = sessionStorage.getItem("shipLength");
  const orientation = sessionStorage.getItem("shipOrientation");
  const possibleShip = new Ship(coordinate, length, orientation);
  if (gameboard.checkIfPositionsAvailable(possibleShip)) {
    return { possibleShip, status: true };
  }
  return { possibleShip, status: false };
}

function onCellHover(event) {
  const coordinate = event.target.dataset.id;
  const possibleShip = checkPosition(coordinate);

  cellMap.forEach((cell) => {
    cell.classList.remove("hover", "valid", "invalid");
  });

  if (possibleShip.status) {
    possibleShip.possibleShip.getPositions().forEach((position) => {
      const cell = cellMap.get(position);
      cell.classList.add("hover", "valid");
    });
  } else {
    possibleShip.possibleShip.getPositions().forEach((position) => {
      const cell = cellMap.get(position);
      if (cell !== undefined) {
        cell.classList.add("hover", "invalid");
      }
    });
  }
}

function resetBoard() {
  ships = new Map();
  gameboard = new Gameboard();
  cellMap.forEach((cell) => {
    cell.classList.remove("ship");
  });
  changeButtonStatus();
}

const readyBtn = document.getElementById("ready");
const board = document.getElementById("board");
const orientation = document.getElementById("orientation");
const restBtn = document.getElementById("reset");
const nextBtn = document.getElementById("next");
fillGrid(10, board);
const cellList = board.querySelectorAll(".cell");

Array.from(cellList).forEach((cell) => {
  cell.addEventListener("click", onCellClick);
  cell.addEventListener("mouseover", onCellHover);
  cellMap.set(cell.dataset.id, cell);
});

orientation.addEventListener("change", () => {
  sessionStorage.setItem("shipOrientation", orientation.value);
});

readyBtn.addEventListener("click", () => {
  displayChangeOnReady();
});

restBtn.addEventListener("click", resetBoard);

nextBtn.addEventListener("click", () => {
  gameboard.setShips(ships);
  const jsonText = JSON.stringify(gameboard, replacer);
  const currentPlayer = sessionStorage.getItem("setup");
  sessionStorage.setItem(`${currentPlayer}Gameboard`, jsonText);
  window.location.href = nextPageLink;
});

addShipSelection();
setNextPage(sessionStorage.getItem("setup"));
sessionStorage.setItem("shipOrientation", orientation.value);
sessionStorage.removeItem("shipLength");
