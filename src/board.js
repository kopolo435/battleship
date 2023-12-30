import Player from "./player";
import extractCoordinates from "./extractCoordinates";
import { reviver } from "./jsonConversion";
import * as display from "./setupOfShip/boardDom";
import style from "./styles/board.css";
import textLines from "./textLines.json";

let enemyMap = new Map(); // Variable global que almacena el gameboardCells de enemy
let typingEffect = null; // Global variable to hold the intervals

/**
 * Crea un depp copy de gameboardCells
 * @param {Map} gameboardCells mapa de enemy actual
 */
function updateEnemyMap(gameboardCells) {
  const replaceMap = new Map();
  gameboardCells.forEach((value, index) => {
    replaceMap.set(index, value);
  });
  enemyMap = replaceMap;
}

/**
 * Se encarga de mostrar el mensaje con efecto de escritura
 * utiliza variable global para reinicial la funcion si se llama
 * mientras ya esta corriendo
 * @param {string} message mensaje a mostrar
 */
function showMessage(message) {
  const gameStatus = document.getElementById("gameStatus");
  if (typingEffect) {
    clearInterval(typingEffect); // Clear the interval if already running
  }
  gameStatus.textContent = "";
  let index = 0;
  typingEffect = setInterval(() => {
    // Check if all characters have been displayed
    if (index <= message.length) {
      gameStatus.textContent = message.substring(0, index);
      index += 1;
    } else {
      clearInterval(typingEffect); // Stop the interval when done
      typingEffect = null; // Reset the typingEffect variable
    }
  }, 50); // Adjust the delay (in milliseconds) between each character
}

/**
 * Se encarga de crear el evento que permite atacar las cell en el board
 * de enemy
 * @param {Function} resolve funcion que resuelve la promesa
 * Resuelve una promesa con las coordenadas como valor
 */
function createCellAttackEvent(resolve) {
  const enemyBoard = document.getElementById("enemyBoard");
  const cells = enemyBoard.querySelectorAll(".cell");

  Array.from(cells).forEach((cell) => {
    cell.addEventListener("click", () => {
      const coordinate = cell.dataset.id;
      // prohibe atacar casillas atacadas anteriormente
      if (
        enemyMap.get(coordinate) === "hit" ||
        enemyMap.get(coordinate) === "miss"
      ) {
        showMessage(textLines.wrongCell);
      } else {
        resolve(coordinate);
      }
    });
  });
}

/**
 * Se encarga de esperar las coordenas
 * @param {function} resolve funcion que resuelve la promesa
 * @returns coordenadas de ataque como string "[2,4]"
 */
async function getUserAttack(resolve) {
  const attackCoordinates = await createCellAttackEvent(resolve);
  return attackCoordinates;
}

/**
 * Funcion principal que maneja del loop del juego
 * @param {Player} initialPlayer jugador que tiene el primer turno
 * @param {Player} secondPlayer jugador que tiene el segundo turno
 * @returns string con nombre de jugador ganador
 */
async function turnLoops(initialPlayer, secondPlayer) {
  let currentPlayer = initialPlayer; // jugador que ataca en el turno actual. Player
  let enemy = secondPlayer; // jugador al cual se ataca su board en el turno actual. Player
  let status; // indica si el ataque fue exitoso. true | false

  while (!enemy.getGameboard().allShipsSunk()) {
    // Comprueba si el ataque del turno anterio fue exitoso
    if (status) {
      showMessage(textLines.atckExitosoNext);
    } else if (status === false) {
      showMessage(textLines.atckFallidoNext);
    }

    // Mostrado de curtain
    if (!currentPlayer.getIsComputer() && !enemy.getIsComputer()) {
      display.setCurtainName(currentPlayer.name);
      display.showCurtain();
    }

    // Actualizacion de tablero
    display.fillBoard(currentPlayer.getGameboard().getCells(), true);
    display.fillBoard(enemy.getGameboard().getCells(), false);
    updateEnemyMap(enemy.getGameboard().getCells());
    display.addCellsHoverEvent(enemyMap);

    let attack; // almacena coordenadas del ataque. string "[2,4]"

    if (currentPlayer.getIsComputer()) {
      // Crea delay artificial en el ataque de la computadora
      if (currentPlayer.getIsComputer() && enemy.getIsComputer()) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      attack = currentPlayer.getComputerPlay(enemy.getGameboard().getCells());
    } else {
      attack = await new Promise(getUserAttack);
    }

    status = enemy.getGameboard().receiveAttack(attack);
    if (status) {
      showMessage(textLines.atckExitoso);
    } else {
      showMessage(textLines.atckFallido);
    }

    // Actualizacion de board enemigo despues de ataque
    display.fillBoard(enemy.getGameboard().getCells(), false);
    updateEnemyMap(enemy.getGameboard().getCells());
    display.addCellsHoverEvent(enemyMap);

    // Comprueba si el juego se acabo
    if (enemy.getGameboard().allShipsSunk()) {
      return currentPlayer.getName();
    }

    // Delay artificial entre ataques de computadora
    if (!currentPlayer.getIsComputer()) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else if (currentPlayer.getIsComputer() && enemy.getIsComputer()) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Intercambia players para el nuevo turno
    const temp = currentPlayer;
    currentPlayer = enemy;
    enemy = temp;
  }
  return null;
}

/**
 * Escoge aleatoriamente el jugador inicial
 * @param {Player} player1
 * @param {Player} player2
 * @returns objeto con intialPlayer y secondPlayer
 */
function chooseInitialPlayer(player1, player2) {
  const names = [player1.name, player2.name];
  const nameChoosen = names[Math.floor(Math.random() * 2)];
  let initialPlayer;
  let secondPlayer;
  if (nameChoosen === player1.name) {
    initialPlayer = player1;
    secondPlayer = player2;
  } else {
    initialPlayer = player2;
    secondPlayer = player1;
  }
  return { initialPlayer, secondPlayer };
}

/**
 * Se encarga de obtener el Gameboard del player especificado
 * @param {string} player nombre del player. player1 | player2
 * @returns
 */
function parsePlayersGameboard(player) {
  const gameboard = JSON.parse(
    sessionStorage.getItem(`${player}Gameboard`),
    reviver
  );
  return gameboard;
}

/**
 * Comprueba si alguno de los jugadores es controlado por la
 * computadora oculta la curtain
 * @param {Player} initialPlayer
 * @param {Player} secondPlayer
 */
function checkIfShowCurtain(initialPlayer, secondPlayer) {
  if (initialPlayer.getIsComputer() || secondPlayer.getIsComputer()) {
    const clickEvent = new Event("click");
    hideCurtainBtn.dispatchEvent(clickEvent);
  }
}

/* LLeva al usuario a la pagina inicial */
function startNewGame() {
  window.location.href = "index.html";
}

/**
 * Realiza cambios necesarios para mostrar jugador ganador
 * @param {strin} winner nombre de jugador ganador
 * @param {Player} player1
 * @param {Player} player2
 */
function setWinner(winner, player1, player2) {
  if (winner === player1.name) {
    showMessage(`${player1.name} ${textLines.winner} ${player2.name}`);
    if (player1.getIsComputer()) {
      display.finalBoard(player2.getGameboard().getCells(), true);
      display.finalBoard(player1.getGameboard().getCells(), false);
    } else {
      display.finalBoard(player1.getGameboard().getCells(), true);
      display.finalBoard(player2.getGameboard().getCells(), false);
    }
  } else {
    showMessage(`${player2.name} ${textLines.winner} ${player1.name}`);
    if (player2.getIsComputer()) {
      display.finalBoard(player1.getGameboard().getCells(), true);
      display.finalBoard(player2.getGameboard().getCells(), false);
    } else {
      display.finalBoard(player2.getGameboard().getCells(), true);
      display.finalBoard(player1.getGameboard().getCells(), false);
    }
  }
}

const player1Data = JSON.parse(sessionStorage.getItem("player1"));
const player2Data = JSON.parse(sessionStorage.getItem("player2"));

const player1Gameboard = parsePlayersGameboard("player1");
const player2Gameboard = parsePlayersGameboard("player2");

const player1 = new Player(player1Data.name, player1Data.isComputer);
const player2 = new Player(player2Data.name, player2Data.isComputer);
player1.gameboard = player1Gameboard;
player2.gameboard = player2Gameboard;

const hideCurtainBtn = document.getElementById("ready");
const newGameBtn = document.getElementById("newGame");
newGameBtn.addEventListener("click", startNewGame);
hideCurtainBtn.addEventListener("click", display.hideCurtain);

const { initialPlayer, secondPlayer } = chooseInitialPlayer(player1, player2);
checkIfShowCurtain(initialPlayer, secondPlayer);

const winner = await turnLoops(initialPlayer, secondPlayer);
setWinner(winner, player1, player2);
newGameBtn.disabled = false;
