import Gameboard from "./gameboard";
import extractCoordinates from "./extractCoordinates";

export default class Player {
  constructor(name, isComputer) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  getName() {
    return this.name;
  }

  getIsComputer() {
    return this.isComputer;
  }

  getGameboard() {
    return this.gameboard;
  }

  #getPosibilities(enemyBoard) {
    const possibleCells = [];
    const hitCells = [];
    enemyBoard.forEach((content, index) => {
      if (content !== "miss") {
        if (content === "hit") {
          hitCells.push(index);
        } else {
          possibleCells.push(index);
        }
      }
    });
    return { possibleCells, hitCells };
  }

  #chooseNearHit(currentHits, enemyBoard) {
    const possibleAttacks = [];
    currentHits.forEach((hit) => {
      const [x, y] = extractCoordinates(hit);
      const nearHit = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
      nearHit.forEach((possition) => {
        if (
          possition[0] > -1 &&
          possition[0] < 10 &&
          possition[1] > -1 &&
          possition[1] < 10
        ) {
          if (
            enemyBoard.get(`[${possition[0]},${possition[1]}]`) === "empty" ||
            enemyBoard.get(`[${possition[0]},${possition[1]}]`) === "ship"
          ) {
            possibleAttacks.push(`[${possition[0]},${possition[1]}]`);
          }
        }
      });
    });
    return possibleAttacks;
  }

  #chooseRandom(possibleAttacks) {
    return possibleAttacks[
      Math.floor(Math.random() * (possibleAttacks.length - 1))
    ];
  }

  getComputerPlay(enemyBoard) {
    const possibleAttacks = this.#getPosibilities(enemyBoard);
    if (possibleAttacks.hitCells.length > 0) {
      const nearHitCells = this.#chooseNearHit(
        possibleAttacks.hitCells,
        enemyBoard
      );
      if (nearHitCells.length != 0) {
        return this.#chooseRandom(nearHitCells);
      }
      return this.#chooseRandom(possibleAttacks.possibleCells);
    }
    return this.#chooseRandom(possibleAttacks.possibleCells);
  }
}
