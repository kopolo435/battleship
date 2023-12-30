/**
 * Crea helper functions que seran usadas para convertir objetos en JSOn
 * asi como transformalos de vuelta a objetos de javascript
 */

import Ship from "./ship";
import Gameboard from "./gameboard";

/**
 *
 * @param {Map} positions ship Positions
 * @returns array de objetos mapeados como las posiciones del map
 */
function mapReplacer(positions) {
  const positionsArray = [];
  positions.forEach((value, key) => {
    positionsArray.push({ cell: key, value });
  });
  return positionsArray;
}

/**
 * Se encarga de revivir un ship almacenado en el JSON
 */
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

/**
 * Se encarga de revivir un Gameboard object
 * @param {JSON} jsonValue json object
 * @returns
 */
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

/**
 * Se encarga de reemplazar los objetos especiales, por objetos que json
 * pueda manejar
 * @param {*} key
 * @param {*} value Ship | Gameboard | Map
 * @returns
 */
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

/**
 * Se encarga de revivir los diversos objetos que se le pasen
 * @param {*} key
 * @param {*} value
 * @returns
 */
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
