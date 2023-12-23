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

  addShip(coordinate, length, orientation) {
    const ship = new Ship(coordinate, length, orientation);
    this.ships.push(ship);
    ship.getPositions().forEach((position) => {
      this.cells.set(position, "ship");
    });
  }

  getCells() {
    return this.cells;
  }

  receiveAttack(coordinate) {
    this.ships.forEach((ship) => {
      if (ship.hit(coordinate)) {
        this.cells.set(coordinate, "hit");
      } else {
        this.cells.set(coordinate, "miss");
      }
    });
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
