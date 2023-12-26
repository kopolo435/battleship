import Ship from "./ship";
import Gameboard from "./gameboard";

function mapReplacer(positions) {
  const positionsArray = [];
  positions.forEach((value, key) => {
    positionsArray.push({ cell: key, value });
  });
  return positionsArray;
}

function parseShip(jsonValue) {
  const { hits } = jsonValue;
  const { positions } = jsonValue;
  const replacerMap = new Map();
  positions.forEach((cell) => {
    replacerMap.set(cell.cell, cell.value);
  });
  const convertedShip = new Ship("[0,0]", 0, "vertical");
  convertedShip.positions = replacerMap;
  convertedShip.hits = hits;
  return convertedShip;
}

function parseGameboard(jsonValue) {
  const { cells } = jsonValue;
  const { ships } = jsonValue;
  const replacerMap = new Map();
  cells.forEach((cell) => {
    replacerMap.set(cell.cell, cell.value);
  });
  const replacerGameboard = new Gameboard();
  replacerGameboard.cells = replacerMap;
  replacerGameboard.ships = ships;
  return replacerGameboard;
}

function replacer(key, value) {
  if (value instanceof Ship) {
    return {
      datatype: "Ship",
      hits: value.hits,
      positions: mapReplacer(value.positions),
    };
  }
  if (value instanceof Map) {
    return mapReplacer(value);
  }
  return value;
}

function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.datatype === "Ship") {
      return parseShip(value);
    }
    if (value.ships) {
      return parseGameboard(value);
    }
  }
  return value;
}

export { replacer, reviver };
