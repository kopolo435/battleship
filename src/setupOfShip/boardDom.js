/* Modulo que se encarga de modifica el DOM del board.html */

const typingEffect = null; // Global variable to hold the interval

/**
 * Remueve la clase que oculta el curtain, que bloquee la vista del board
 */
function showCurtain() {
  const curtain = document.getElementById("curtain");
  curtain.classList.remove("closed");
}

/**
 * Agrega la clase que muestra el curtain para que bloquee la vista del board
 */
function hideCurtain() {
  const curtain = document.getElementById("curtain");
  curtain.classList.add("closed");
}

/**
 * Crea div element con una clase dependiendo del type pasado
 * @param {string} coordinate formato "[2,3]"
 * @param {string} type formtato "ship","empty","hit","miss"
 * @returns
 */
function createCell(coordinate, type) {
  const div = document.createElement("div");
  div.classList.add("cell");
  div.setAttribute("data-id", coordinate);
  switch (type) {
    case "empty":
      div.classList.add("empty");
      break;
    case "ship":
      div.classList.add("ship");
      break;
    case "hit":
      div.classList.add("hit");
      break;
    case "miss":
      div.classList.add("miss");
      break;
    default:
  }
  return div;
}

/**
 * Agrega clases dependiendo del tipo de celda en el mapa enemigo
 * @param {divElement} cell
 * @param {Map} enemyMap formato "[2,4]"=> "hit" | "miss" | "empty" | "ship"
 */
function hoverEvent(cell, enemyMap) {
  if (
    enemyMap.get(cell.dataset.id) !== "hit" &&
    enemyMap.get(cell.dataset.id) !== "miss"
  ) {
    cell.classList.add("hover", "valid");
  } else {
    cell.classList.remove("valid");
    cell.classList.add("hover", "invalid");
  }
}

/**
 * Se encarga de agregar eventos de hover a cada cell
 * @param {Map} enemyMap formato "[2,4]"=> "hit" | "miss" | "empty" | "ship"
 */
function addCellsHoverEvent(enemyMap) {
  const enemyBoard = document.getElementById("enemyBoard");
  const cells = enemyBoard.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      hoverEvent(cell, enemyMap);
    });
    cell.addEventListener("mouseout", () => {
      cell.classList.remove("hover", "invalid", "valid");
    });
  });
}

/**
 * Llena el board mostrando o no las celdas con barcos en base al parametro
 * @param {Map} gameboardCells formato "[2,4]"=> "hit" | "miss" | "empty" | "ship"
 * @param {boolean} showShips
 */
function fillBoard(gameboardCells, showShips) {
  if (showShips) {
    const currentBoard = document.getElementById("currentBoard");
    currentBoard.replaceChildren();
    for (let y = 10 - 1; y >= 0; y -= 1) {
      for (let x = 0; x < 10; x += 1) {
        const coordinate = `[${x},${y}]`;
        currentBoard.appendChild(
          createCell(coordinate, gameboardCells.get(coordinate))
        );
      }
    }
  } else {
    const enemyBoard = document.getElementById("enemyBoard");
    enemyBoard.replaceChildren();
    for (let y = 10 - 1; y >= 0; y -= 1) {
      for (let x = 0; x < 10; x += 1) {
        const coordinate = `[${x},${y}]`;
        const value = gameboard.get(coordinate);
        if (value === "ship") {
          enemyBoard.appendChild(createCell(coordinate, "empty"));
        } else {
          enemyBoard.appendChild(createCell(coordinate, value));
        }
      }
    }
  }
}

/**
 * Llena los tableros al finalizar el juego, colocando el tablero del ganador en el board
 * de currentBoard
 * @param {Map} gameboardCells formato "[2,4]"=> "hit" | "miss" | "empty" | "ship"
 * @param {boolean} isWinner
 */
function finalBoard(gameboardCells, isWinner) {
  if (isWinner) {
    const board = document.getElementById("currentBoard");
    board.replaceChildren();
    for (let y = 10 - 1; y >= 0; y -= 1) {
      for (let x = 0; x < 10; x += 1) {
        const coordinate = `[${x},${y}]`;
        board.appendChild(
          createCell(coordinate, gameboardCells.get(coordinate))
        );
      }
    }
  } else {
    const board = document.getElementById("enemyBoard");
    board.replaceChildren();
    for (let y = 10 - 1; y >= 0; y -= 1) {
      for (let x = 0; x < 10; x += 1) {
        const coordinate = `[${x},${y}]`;
        board.appendChild(
          createCell(coordinate, gameboardCells.get(coordinate))
        );
      }
    }
  }
}

/**
 * Coloca el nombre del jugador especificado en el curtain
 * @param {string} name
 */
function setCurtainName(name) {
  const curtainName = document.getElementById("playerName");
  curtainName.textContent = name;
}

export {
  showCurtain,
  hideCurtain,
  fillBoard,
  finalBoard,
  addCellsHoverEvent,
  setCurtainName,
};
