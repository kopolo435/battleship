import extractCoordinates from "./extractCoordinates";

export default class Ship {
  constructor(initialCoordinate, length, orientation) {
    this.positions = this.#addPositions(initialCoordinate, length, orientation);
    this.hits = 0;
  }

  #addPositions(coordinate, length, orientation) {
    const [xPosition, yPosition] = extractCoordinates(coordinate);
    const positions = new Map();
    if (orientation === "vertical") {
      for (let i = 0; i < length; i += 1) {
        positions.set(`[${xPosition},${yPosition + i}]`, false);
      }
    } else if (orientation === "horizontal") {
      for (let i = 0; i < length; i += 1) {
        positions.set(`[${xPosition + i},${yPosition}]`, false);
      }
    }
    return positions;
  }

  getPositions() {
    const array = [];
    this.positions.forEach((position, coordinate) => {
      array.push(coordinate);
    });
    return array;
  }

  getLength() {
    return this.getPositions().length;
  }

  hit(coordinate) {
    if (this.positions.get(coordinate) !== undefined) {
      const [xPosition, yPosition] = extractCoordinates(coordinate);
      this.positions.set(`[${xPosition},${yPosition}]`, true);
      this.hits += 1;
      return true;
    }
    return false;
  }

  isSunk() {
    return this.hits >= this.getLength();
  }
}
