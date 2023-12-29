import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.cells = this.#createCells();
    this.ships = [];
  }

  #createCells() {
    const newCells = new Map();
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        newCells.set(`[${x},${y}]`, "empty");
      }
    }
    return newCells;
  }

  #checkIfCellsEmpty(position) {
    return this.cells.get(position) === "empty";
  }

  checkIfPositionsAvailable(ship) {
    return ship.getPositions().every(this.#checkIfCellsEmpty.bind(this));
  }

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

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

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
