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

function setPageLink(link) {
  const nextPage = document.getElementById("next");
  nextPage.addEventListener("click", () => {
    window.location.href = link;
  });
}

export { fillGrid, addShipSelection, displayChangeOnReady, setPageLink };
