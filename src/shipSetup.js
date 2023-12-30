import style from "./styles/shipSetup.css";
import * as display from "./setupOfShip/boardDisplay";
import Gameboard from "./gameboard";
import Ship from "./ship";
import { replacer } from "./jsonConversion";
import computerPositions from "./setupOfShip/autoShipPosition";

let gameboard = new Gameboard(); // Se almacena en sessionStorage al avanzar de pagina
let ships = new Map(); // Almacena las ships agregadas, es una variable innecesaria
// debido a que los ships se almacenan en gameboard y este se reinicial al hacer un reset

let nextPageLink = ""; // Cambia dependiendo de si currentPlayer es player1 o player2
const cellMap = new Map(); // Map que almacena las cells del html. "[2,4]"=> divElement

/**
 * Almacena en setup "player2" indicando que la proxima ves que se
 * cargue la pagina al avanzar, la colocacion de ships sera para player2
 * En caso de player ser player2 entonces al avanzar se ira a la pagina de juego
 * @param {string} player Indica si es player1 o player2
 */
function setNextPage(player) {
  if (player === "player1") {
    sessionStorage.setItem("setup", "player2");
    nextPageLink = "shipSetup.html";
  } else {
    nextPageLink = "board.html";
  }
}

/**
 * Crea un ship en el gameboard, en caso de
 * @param {string} coordinate formato "[2,4]"
 * @returns Ship obj si fue agregada exitosamente al gameboard, null en caso contrario
 */
function createShip(coordinate) {
  const length = sessionStorage.getItem("shipLength");
  const orientation = sessionStorage.getItem("shipOrientation");
  const result = gameboard.addShip(coordinate, length, orientation);
  if (result) {
    return gameboard.ships[gameboard.ships.length - 1];
  }
  return null;
}

/**
 * Define el evento que ocurre despues de que se hace click a una celda
 * para añadir un barco
 * @param {Event} event evento click de la celda donde se coloco el barco
 */
function onCellClick(event) {
  const coordinate = event.target.dataset.id;
  if (sessionStorage.getItem("shipLength") !== null) {
    const ship = createShip(coordinate);
    if (ship) {
      const shipId = sessionStorage.getItem("shipId");
      ships.set(shipId, ship);
      display.onShipAdded(shipId);
      display.changeCellToShip(ship.getPositions(), cellMap);
      sessionStorage.removeItem("shipLength");
    } else {
      display.showError("Elija otra posicion para el barco");
    }
  } else if (!display.validateAllShipsReady) {
    display.showError("Debe escoger un barco primero");
  }
}

/**
 * Comprueba si en la coordenada indicada se puede colocar el
 * barco seleccionado
 * @param {string} coordinate formato "[2,4]"
 * @returns objeto {possibleShip: Ship obj , status: boolean}
 */
function checkPosition(coordinate) {
  const length = sessionStorage.getItem("shipLength");
  const orientation = sessionStorage.getItem("shipOrientation");
  const possibleShip = new Ship(coordinate, length, orientation);
  if (gameboard.checkIfPositionsAvailable(possibleShip)) {
    return { possibleShip, status: true };
  }
  return { possibleShip, status: false };
}

/**
 * Elimina cualquier clase de hover activa en las cells, luego agrega
 * las clases de hover correspondiente a las posiciones que tenga la ship
 * conseguida al comprobar la posicion
 * @param {Event} event evento que indica en que cell se hizo hover
 */
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

/**
 * Elimina el hover de todas las cells
 */
function removeHover() {
  cellMap.forEach((cell) => {
    cell.classList.remove("hover", "valid", "invalid");
  });
}

/**
 * Comprueba si el current player es la computadora, en cuyo caso
 * el gameboard se crea automaticamente
 */
function checkIfComputer() {
  const current = sessionStorage.getItem("current");
  const { isComputer } = JSON.parse(sessionStorage.getItem(current));
  const shipBtnContainer = document.getElementById("shipList");
  const shipButtons = shipBtnContainer.querySelectorAll("button");
  if (isComputer) {
    gameboard = computerPositions(shipButtons);
    const jsonText = JSON.stringify(gameboard, replacer);
    const currentPlayer = sessionStorage.getItem("current");
    sessionStorage.setItem(`${currentPlayer}Gameboard`, jsonText);
    window.location.href = nextPageLink;
  }
}

/**
 * Se encarga de hacer un reset a la pagina para poder volver a colocar
 * los barcos desde cero
 */
function resetBoard() {
  ships = new Map();
  gameboard = new Gameboard();
  cellMap.forEach((cell) => {
    cell.classList.remove("ship");
  });
  display.resetButtonsStatus();
}

const readyBtn = document.getElementById("ready");
const board = document.getElementById("board");
const restBtn = document.getElementById("reset");
const nextBtn = document.getElementById("next");
display.fillGrid(10, board);
const cellList = board.querySelectorAll(".cell");

const verticalRadio = document.getElementById("vertical");
const horizontalRadio = document.getElementById("horizontal");
const horizontalRadioMobile = document.getElementById("horizontalM");
const verticalRadioMobile = document.getElementById("verticalM");
const carrierBtn = document.getElementById("carrier");
const clickEvent = new Event("click");

horizontalRadio.addEventListener("change", () => {
  sessionStorage.setItem("shipOrientation", "horizontal");
});

verticalRadio.addEventListener("change", () => {
  sessionStorage.setItem("shipOrientation", "vertical");
});

horizontalRadioMobile.addEventListener("change", () => {
  sessionStorage.setItem("shipOrientation", "horizontal");
});

verticalRadioMobile.addEventListener("change", () => {
  sessionStorage.setItem("shipOrientation", "vertical");
});

Array.from(cellList).forEach((cell) => {
  cell.addEventListener("click", onCellClick);
  cell.addEventListener("mouseover", onCellHover);
  cell.addEventListener("touchstart", onCellHover);
  cellMap.set(cell.dataset.id, cell);
});

readyBtn.addEventListener("click", () => {
  display.displayChangeOnReady();
});

restBtn.addEventListener("click", resetBoard);
board.addEventListener("mouseout", removeHover);

nextBtn.addEventListener("click", () => {
  gameboard.setShips(ships);
  const jsonText = JSON.stringify(gameboard, replacer);
  const currentPlayer = sessionStorage.getItem("current");
  sessionStorage.setItem(`${currentPlayer}Gameboard`, jsonText);
  window.location.href = nextPageLink;
});
display.addShipSelection();
sessionStorage.setItem("current", sessionStorage.getItem("setup"));
display.setCurtainName();
setNextPage(sessionStorage.getItem("current"));
sessionStorage.setItem("shipOrientation", "horizontal");
sessionStorage.removeItem("shipLength");
checkIfComputer();
carrierBtn.dispatchEvent(clickEvent);
