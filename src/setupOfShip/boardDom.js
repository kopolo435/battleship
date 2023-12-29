const typingEffect = null; // Global variable to hold the interval

function showCurtain() {
  const curtain = document.getElementById("curtain");
  curtain.classList.remove("closed");
}

function hideCurtain() {
  const curtain = document.getElementById("curtain");
  curtain.classList.add("closed");
}

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

function fillBoard(gameboard, showShips) {
  if (showShips) {
    const currentBoard = document.getElementById("currentBoard");
    currentBoard.replaceChildren();
    for (let y = 10 - 1; y >= 0; y -= 1) {
      for (let x = 0; x < 10; x += 1) {
        const coordinate = `[${x},${y}]`;
        currentBoard.appendChild(
          createCell(coordinate, gameboard.get(coordinate))
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

function finalBoard(gameboard, isWinner) {
  if (isWinner) {
    const board = document.getElementById("currentBoard");
    board.replaceChildren();
    for (let y = 10 - 1; y >= 0; y -= 1) {
      for (let x = 0; x < 10; x += 1) {
        const coordinate = `[${x},${y}]`;
        board.appendChild(createCell(coordinate, gameboard.get(coordinate)));
      }
    }
  } else {
    const board = document.getElementById("enemyBoard");
    board.replaceChildren();
    for (let y = 10 - 1; y >= 0; y -= 1) {
      for (let x = 0; x < 10; x += 1) {
        const coordinate = `[${x},${y}]`;
        board.appendChild(createCell(coordinate, gameboard.get(coordinate)));
      }
    }
  }
}

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
