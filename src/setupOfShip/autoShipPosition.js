/* Modulo encargado de escoger las posiciones para los barcos de la computadora */

import Gameboard from "../gameboard.js";
import Ship from "../ship.js";

/*
Escoge una posicion aleatoria, de las posiciones validas que se le dan
Parametros:
map: type Map, coleecion de posiciones de un gameboard
Retorno: string de una coordenada valida
*/
function selectCoordinates(map) {
  const validPositions = [];
  map.forEach((value, coordinate) => {
    if (value === "empty") {
      validPositions.push(coordinate);
    }
  });
  return validPositions[Math.floor(Math.random() * validPositions.length)];
}

/*
Desordena aleatoriamente los elementos de un array
Parametros:
ships: type array, coleccion de ints
Retorno: array desordenado
*/
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

/* Obtiene una posicion valida en el gameboard indicado para la length especificada
Parametros:
lenght: string, pero se usa como un int
gameboard: Gameboard, se usa para validar las posiciones posibles
Retorno: retorna un objeto con la informacion de una posicion valida
si retorna null, hay un error grave
*/

function getValidPosition(lenght, gameboard) {
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
  return null;
}

/* Crea un Gameboard object con posiciones validas
Parametros:
ships: Array con coleccion de ints, o string, pero son numeros (1 o ",2")
cada uno indica la length de un barco
Retorno: Gameboard object con barcos colocados en posiciones validas
 */
function createGameboard(ships) {
  const gameboard = new Gameboard();
  const shuffledShips = shuffle(ships);
  shuffledShips.forEach((length) => {
    const shipData = getValidPosition(length, gameboard);
    gameboard.addShip(
      shipData.coordinate,
      shipData.lenght,
      shipData.orientation
    );
  });
  return gameboard;
}

/* Toma una nodeList de botones y crea un gameboard con posiciones
validas de las length especificada por los botones
Parametros: buttonsNode, nodeList de elementos button
Retorna: Gameboard object con posiciones validas de ships */

function computerPositions(buttonsNode) {
  const shipsLengths = [];
  Array.from(buttonsNode).forEach((button) => {
    const lenght = button.dataset.length;
    shipsLengths.push(lenght);
  });
  return createGameboard(shipsLengths);
}

export default computerPositions;
