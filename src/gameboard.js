/* Gameboard almacena el estado del board de un player, asi como sus barcos */
import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.cells = this.#createCells();
    this.ships = [];
  }

  // Crea el Map que almacena las coordenadas asi como su contenido
  // Si se cambia el tamaño del tablero hay que modificar los loops
  #createCells() {
    const newCells = new Map();
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        newCells.set(`[${x},${y}]`, "empty");
      }
    }
    return newCells;
  }

  // Comprueba si una posicion especifica esta empty
  #checkIfCellsEmpty(position) {
    return this.cells.get(position) === "empty";
  }

  // Comprueba si todas las posiciones de un barco se encuentran empty
  // en cells
  checkIfPositionsAvailable(ship) {
    return ship.getPositions().every(this.#checkIfCellsEmpty.bind(this));
  }

  // Agrega un barco si cumple con las condiciones
  addShip(coordinate, length, orientation) {
    if (this.cells.get(coordinate) === "empty") {
      const ship = new Ship(coordinate, length, orientation);
      if (this.checkIfPositionsAvailable(ship)) {
        this.ships.push(ship);
        ship.getPositions().forEach((position) => {
          this.cells.set(position, "ship");
        });
        return true;
      }
    }
    return false;
  }

  getCells() {
    return this.cells;
  }

  /**
   * Registra un ataque recibido en cells
   * y retorna un boolean indicando si el ataque le dio
   * a un barco
   * @param {string} coordinate "[2,4]"
   * @returns boolean
   */
  receiveAttack(coordinate) {
    let hitStatus = false;
    this.ships.forEach((ship) => {
      if (ship.hit(coordinate)) {
        hitStatus = true;
      }
    });
    if (hitStatus) {
      this.cells.set(coordinate, "hit");
      return true;
    }
    this.cells.set(coordinate, "miss");
    return false;
  }

  /* Comprueba si todos los barcos del gameboard fueron hundidos */
  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  /**
   * Agrega las ships del parametro al gameboard
   * @param {Array} shipsMap [Ship,Ship]
   */
  setShips(shipsMap) {
    const shipArray = [];
    shipsMap.forEach((shipObj) => {
      shipArray.push(shipObj);
      shipObj.getPositions().forEach((cell) => {
        this.cells.set(cell, "ship");
      });
    });
    this.ships = shipArray;
  }
}
