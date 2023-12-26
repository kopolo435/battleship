import style from "./shipSetup.css";
import {
  fillGrid,
  addShipSelection,
  displayChangeOnReady,
  setPageLink,
  changeCellToShip,
  disableShipBtn,
  validateAllShipsReady,
} from "./setupOfShip/boardDisplay";
import Gameboard from "./gameboard";
import Ship from "./ship";

const gameboard = new Gameboard();
const ships = new Map();
const cellMap = new Map();

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

const readyBtn = document.getElementById("ready");
const board = document.getElementById("board");
const orientation = document.getElementById("orientation");
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
  setNextPage(sessionStorage.getItem("setup"));
});

addShipSelection();
sessionStorage.setItem("shipOrientation", orientation.value);
sessionStorage.removeItem("shipLength");
