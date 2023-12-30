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

  /**
   *Comprueba que cells del enemigo pueden ser atacadas
   * @param {Map} enemyCells
   * @returns Objeto con las cells disponibles para atacar y aquellas
   * ya atacadas exitosamente
   */
  #getPosibilities(enemyCells) {
    const possibleCells = [];
    const hitCells = [];
    enemyCells.forEach((content, index) => {
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

  /**
   * Agrega las posiciones adyacentes a cada curremtHit, a un array
   * y de esas posiciones aquellas las cuales sean validas las agrega
   * a un array de possibleAttacks
   * @param {Array} currentHits posiciones con value de hit "[2,4]"
   * @param {Map} enemyCells Map con cells del enemigo a atacar
   * @returns possibleAttacks array con las posiciones posibles ["[2,4]","[3,4]"]
   */
  #chooseNearHit(currentHits, enemyCells) {
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
            enemyCells.get(`[${possition[0]},${possition[1]}]`) === "empty" ||
            enemyCells.get(`[${possition[0]},${possition[1]}]`) === "ship"
          ) {
            possibleAttacks.push(`[${possition[0]},${possition[1]}]`);
          }
        }
      });
    });
    return possibleAttacks;
  }

  /**
   * Escoge una posicion aleatoria del array y la retorna
   * @param {Array} possibleAttacks
   * @returns string con coordenada de ataque formato: "[2,4]"
   */
  #chooseRandom(possibleAttacks) {
    return possibleAttacks[
      Math.floor(Math.random() * (possibleAttacks.length - 1))
    ];
  }

  /**
   * Se encarga de escoger un ataque aleatorio de los posibles
   * Primero verifica si hay ataques posibles cerca de posiciones donde hubo hit
   * y escoge una posicion aleatoria de esas, en caso de no haber alguna posicion alli
   * escoge una posicion aleatoria de todas las posiciones validas del board enemigo
   * @param {Map} enemyCells cells del enemy
   * @returns
   */
  getComputerPlay(enemyCells) {
    const possibleAttacks = this.#getPosibilities(enemyCells);
    if (possibleAttacks.hitCells.length > 0) {
      const nearHitCells = this.#chooseNearHit(
        possibleAttacks.hitCells,
        enemyCells
      );
      if (nearHitCells.length !== 0) {
        return this.#chooseRandom(nearHitCells);
      }
      return this.#chooseRandom(possibleAttacks.possibleCells);
    }
    return this.#chooseRandom(possibleAttacks.possibleCells);
  }
}
