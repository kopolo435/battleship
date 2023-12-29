function createCell(x, y) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("data-id", `[${x},${y}]`);
  return cell;
}

// Utiliza loops para crear las celdas en orden decresiente vertical
// y incremental horizontal, para colocar ids correctos
// RowSize indica el tamaño de la cantidad de rows y columnas
// documentObj es el objeto del cual se usa appendChild, no colocarlo
// a menos que sea un test. Queda en default a document
function fillGrid(rowSize, documentObj) {
  for (let y = rowSize - 1; y >= 0; y -= 1) {
    for (let x = 0; x < rowSize; x += 1) {
      if (documentObj.test === true) {
        // Si se hace un test
        documentObj.appendChild();
      } else {
        documentObj.appendChild(createCell(x, y));
      }
    }
  }
}

function shipSelect(event) {
  const { length } = event.target.closest("[data-length]").dataset;
  const { id } = event.target.closest("[data-length]");
  sessionStorage.setItem("shipLength", `${length}`);
  sessionStorage.setItem("shipId", `${id}`);
}

function removeSelected() {
  const buttons = Array.from(document.querySelectorAll(".shipButton"));
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });
}

function changeSelectedButton(button) {
  removeSelected();
  button.classList.add("selected");
}

function addShipSelection() {
  const buttons = Array.from(document.querySelectorAll(".shipButton"));
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      shipSelect(e);
      changeSelectedButton(button);
    });
  });
}

function displayChangeOnReady() {
  const curtain = document.getElementById("curtain");
  curtain.classList.add("closed");
}

function changeCellToShip(coordinates, cellMap) {
  coordinates.forEach((coordinate) => {
    const cell = cellMap.get(coordinate);
    cell.classList.add("ship");
  });
}

function disableClassButtons(shipClass) {
  const nodeList = document.querySelectorAll(`.${shipClass}`);
  const buttons = Array.from(nodeList);
  buttons[1].disabled = true;
  buttons[0].disabled = true;
}

function disableShipBtn(id) {
  const button = document.getElementById(id);
  if (button.classList.contains("carrier")) {
    disableClassButtons("carrier");
  } else if (button.classList.contains("battleship")) {
    disableClassButtons("battleship");
  } else if (button.classList.contains("submarine")) {
    disableClassButtons("submarine");
  } else if (button.classList.contains("lightCruiser")) {
    disableClassButtons("lightCruiser");
  } else if (button.classList.contains("heavyCruiser")) {
    disableClassButtons("heavyCruiser");
  }
}

function validateAllShipsReady() {
  const shipButtons = document.querySelectorAll("shipButton");
  if (Array.from(shipButtons).every((button) => button.disabled)) {
    const nextBtn = document.getElementById("next");
    nextBtn.disabled = false;
  }
}

function changeButtonStatus() {
  const shipButtons = document.querySelectorAll(".shipButton");
  const nextBtn = document.getElementById("next");
  nextBtn.disabled = true;
  Array.from(shipButtons).forEach((button) => {
    button.disabled = false;
  });
}

function setCurtainName() {
  const playerName = document.getElementById("playerName");
  const pageName = document.getElementById("name");
  const player = JSON.parse(
    sessionStorage.getItem(sessionStorage.getItem("current"))
  );
  playerName.textContent = player.name;
  pageName.textContent = player.name;
}

function showError(text) {
  const error = document.getElementById("errorMessage");
  error.textContent = text;
  error.classList.add("showError");
}

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
  changeButtonStatus,
  setCurtainName,
  removeSelected,
  showError,
  hideError,
};
