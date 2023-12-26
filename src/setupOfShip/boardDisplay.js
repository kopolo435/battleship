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
  const { id } = event.target;
  sessionStorage.setItem("shipLength", `${length}`);
  sessionStorage.setItem("shipId", `${id}`);
}

function addShipSelection() {
  const buttons = Array.from(
    document.getElementById("shipList").querySelectorAll("button")
  );
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      shipSelect(e);
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

function disableShipBtn(id) {
  const button = document.getElementById(id);
  button.disabled = true;
}

function validateAllShipsReady() {
  const shipBtnContainer = document.getElementById("shipList");
  const shipButtons = shipBtnContainer.querySelectorAll("button");
  if (Array.from(shipButtons).every((button) => button.disabled)) {
    const nextBtn = document.getElementById("next");
    nextBtn.disabled = false;
  }
}

function changeButtonStatus() {
  const shipBtnContainer = document.getElementById("shipList");
  const shipButtons = shipBtnContainer.querySelectorAll("button");
  const nextBtn = document.getElementById("next");
  nextBtn.disabled = true;
  Array.from(shipButtons).forEach((button) => {
    button.disabled = false;
  });
}

export {
  fillGrid,
  addShipSelection,
  displayChangeOnReady,
  changeCellToShip,
  disableShipBtn,
  validateAllShipsReady,
  changeButtonStatus,
};
