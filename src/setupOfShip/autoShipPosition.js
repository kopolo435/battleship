import Gameboard from "../gameboard.js";
import Ship from "../ship.js";

function selectCoordinates(map) {
  const validPositions = [];
  map.forEach((value, coordinate) => {
    if (value === "empty") {
      validPositions.push(coordinate);
    }
  });
  return validPositions[Math.floor(Math.random() * validPositions.length)];
}

function shuffle(ships) {
  const array = ships;
  let currentIndex = array.length;
  let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function addShip(lenght, gameboard) {
  const stop = false;
  while (!stop) {
    const coordinate = selectCoordinates(gameboard.getCells());
    const verticalShip = new Ship(coordinate, lenght, "vertical");
    const horizontalShip = new Ship(coordinate, lenght, "horizontal");
    if (gameboard.checkIfPositionsAvailable(verticalShip)) {
      return { coordinate, orientation: "vertical", lenght };
    }
    if (gameboard.checkIfPositionsAvailable(horizontalShip)) {
      return { coordinate, orientation: "horizontal", lenght };
    }
  }
}

function createGameboard(ships) {
  const gameboard = new Gameboard();
  const shuffledShips = shuffle(ships);
  shuffledShips.forEach((length) => {
    const shipData = addShip(length, gameboard);
    gameboard.addShip(
      shipData.coordinate,
      shipData.lenght,
      shipData.orientation
    );
  });
  return gameboard;
}

function computerPositions(buttonsNode) {
  const shipsLengths = [];
  Array.from(buttonsNode).forEach((button) => {
    const lenght = button.dataset.length;
    shipsLengths.push(lenght);
  });
  return createGameboard(shipsLengths);
}

export default computerPositions;
