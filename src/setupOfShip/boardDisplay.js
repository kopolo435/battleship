/* Modulo que maneja las funciones del DOM de shipSetup */

/** createCell
 * Crea una cell que ira dentro del board, con un id especificado
 * por sus parametros
 * @param {int} x ;
 * @param {int} y ;
 * @returns {divElement};
 */
function createCell(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-id", `[${x},${y}]`);
  return cell;
}

// Utiliza loops para crear las celdas en orden decreciente vertical
// e incremental horizontal, para colocar ids correctos
// RowSize indica el tamaño de la cantidad de rows y columnas
function fillGrid(rowSize, documentObj) {
  for (let y = rowSize - 1; y >= 0; y -= 1) {
    for (let x = 0; x < rowSize; x += 1) {
      documentObj.appendChild(createCell(x, y));
    }
  }
}

/** Almacena en sessionStorage los datos del boton escogod
 *
 * @param {Event} event Evento disparado al hace click en el boton
 * correspondiente a un barco
 * Efectos: modifica el valor de shipLength y shipId en sessionStorage
 */
function shipSelect(event) {
  const { length } = event.target.closest("[data-length]").dataset;
  const { id } = event.target.closest("[data-length]");
  sessionStorage.setItem("shipLength", `${length}`);
  sessionStorage.setItem("shipId", `${id}`);
}

/**
 * Se encarga de remover el efecto de selected en todos los botones de seleccion de barcos
 */
function removeSelected() {
  const buttons = Array.from(document.querySelectorAll(".shipButton"));
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
}

/** Se encarga de obtener la clase de barco del boton seleccionado
 *
 * @param {button} button
 * @returns string conteniendo la clase de barco del boton seleccionado
 */
function getShipClass(button) {
  if (button.classList.contains("carrier")) {
    return "carrier";
  }
  if (button.classList.contains("battleship")) {
    return "battleship";
  }
  if (button.classList.contains("submarine")) {
    return "submarine";
  }
  if (button.classList.contains("lightCruiser")) {
    return "lightCruiser";
  }
  if (button.classList.contains("heavyCruiser")) {
    return "heavyCruiser";
  }
  return null;
}

/** Se encarga de agregar una clase a los botones especificados
 * @param {buttonElement} button
 * Efectos: modifica DOM
 */
function addSelectedToButtons(button) {
  const shipClass = getShipClass(button);
  const nodeList = document.querySelectorAll(`.${shipClass}`);
  const buttons = Array.from(nodeList);
  buttons[1].classList.add("selected");
  buttons[0].classList.add("selected");
}

/**
 * Se encarga de añadir el aspecto de selected a los botones necesarios
 * @param {buttonElement} button
 */
function changeSelectedButton(button) {
  removeSelected();
  addSelectedToButtons(button);
}

/**
 * Agrega evento de click a los botones de seleccion de ship
 */
function addShipSelection() {
  const buttons = Array.from(document.querySelectorAll(".shipButton"));
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      shipSelect(e);
      changeSelectedButton(button);
    });
  });
}

/**
 * Oculta la cortina que oculta el board
 */
function displayChangeOnReady() {
  const curtain = document.getElementById("curtain");
  curtain.classList.add("closed");
}

/** Se encarga de agregar una clase a la coleccion de coordenadas de el array
 * @param {Array} coordinates formato ["[2,4]","[3,4]"]
 * @param {Map} cellMap formato "[2,4]"=> divElement
 */
function changeCellToShip(coordinates, cellMap) {
  coordinates.forEach((coordinate) => {
    const cell = cellMap.get(coordinate);
    cell.classList.add("ship");
  });
}

/**
 * Se encarga de deshabilitar los botones de la clase de ship especificada
 * @param {string} shipClass clase de ships a la cual deshabilitar sus botones
 */
function disableClassButtons(shipClass) {
  const nodeList = document.querySelectorAll(`.${shipClass}`);
  const buttons = Array.from(nodeList);
  buttons[1].disabled = true;
  buttons[0].disabled = true;
}

/**
 * Se encarga de deshabilitar los botones del ship que fue colocado en el board
 * @param {string} id id del boton del ship que va a ser añadido
 */

function disableShipBtn(id) {
  const button = document.getElementById(id);
  const shipClass = getShipClass(button);
  disableClassButtons(shipClass);
}

/** Comprueba si todos los botones de barcos fueron deshabilitados
 * en caso de ser así habilita el boton que permite pasar de pagina
 * @returns boolean
 */
function validateAllShipsReady() {
  const shipButtons = document.querySelectorAll(".shipButton");
  if (Array.from(shipButtons).every((button) => button.disabled)) {
    const nextBtn = document.getElementById("next");
    nextBtn.disabled = false;
    return true;
  }
  return false;
}

/**
 * Se encarga de resetear el disabled status de todos los botones
 */
function resetButtonsStatus() {
  const shipButtons = document.querySelectorAll(".shipButton");
  const nextBtn = document.getElementById("next");
  nextBtn.disabled = true;
  Array.from(shipButtons).forEach((button) => {
    button.disabled = false;
  });
}

/**
 * Coloca en el elemento correspondiente dentro de curtain el nombre del jugador actual
 * que colocara sus naves en el tablero
 */

function setCurtainName() {
  const playerName = document.getElementById("playerName");
  const pageName = document.getElementById("name");
  const player = JSON.parse(
    sessionStorage.getItem(sessionStorage.getItem("current"))
  );
  playerName.textContent = player.name;
  pageName.textContent = player.name;
}

/**
 * Se encarga de especificar el texto a mostrar en el mensaje de error
 * @param {string} text texto a mostrar en el mensaje de error
 */
function showError(text) {
  const error = document.getElementById("errorMessage");
  error.textContent = text;
  error.classList.add("showError");
}

/**
 * Se encarga de remover el texto del mensaje de error
 */
function hideError() {
  const error = document.getElementById("errorMessage");
  error.classList.remove("showError");
}

export {
  fillGrid,
  addShipSelection,
  displayChangeOnReady,
  changeCellToShip,
  disableShipBtn,
  validateAllShipsReady,
  resetButtonsStatus,
  setCurtainName,
  removeSelected,
  showError,
  hideError,
};
