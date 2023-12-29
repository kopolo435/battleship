import Player from "./player";
import extractCoordinates from "./extractCoordinates";
import { reviver } from "./jsonConversion";
import * as display from "./setupOfShip/boardDom";
import style from "./styles/board.css";
import textLines from "./textLines.json";

let enemyMap = new Map();
let typingEffect = null; // Global variable to hold the intervals
function updateEnemyMap(gameboard) {
  const replaceMap = new Map();
  gameboard.forEach((value, index) => {
    replaceMap.set(index, value);
  });
  enemyMap = replaceMap;
}

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

function createCellAttackEvent(resolve) {
  const enemyBoard = document.getElementById("enemyBoard");
  const cells = enemyBoard.querySelectorAll(".cell");
  Array.from(cells).forEach((cell) => {
    cell.addEventListener("click", () => {
      const coordinate = cell.dataset.id;
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

async function getUserAttack(resolve) {
  const attackCoordinates = await createCellAttackEvent(resolve);
  return attackCoordinates;
}

async function turnLoops(initialPlayer, secondPlayer) {
  let currentPlayer = initialPlayer;
  let enemy = secondPlayer;
  let status;
  while (!enemy.getGameboard().allShipsSunk()) {
    if (status) {
      showMessage(textLines.atckExitosoNext);
    } else if (status === false) {
      showMessage(textLines.atckFallidoNext);
    }
    if (!currentPlayer.getIsComputer() && !enemy.getIsComputer()) {
      display.setCurtainName(currentPlayer.name);
      display.showCurtain();
    }
    display.fillBoard(currentPlayer.getGameboard().getCells(), true);
    display.fillBoard(enemy.getGameboard().getCells(), false);
    updateEnemyMap(enemy.getGameboard().getCells());
    display.addCellsHoverEvent(enemyMap);
    let attack;
    if (currentPlayer.getIsComputer()) {
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
    display.fillBoard(enemy.getGameboard().getCells(), false);
    updateEnemyMap(enemy.getGameboard().getCells());
    display.addCellsHoverEvent(enemyMap);
    if (enemy.getGameboard().allShipsSunk()) {
      return currentPlayer.getName();
    }
    if (!currentPlayer.getIsComputer()) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else if (currentPlayer.getIsComputer() && enemy.getIsComputer()) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    const temp = currentPlayer;
    currentPlayer = enemy;
    enemy = temp;
  }
  return null;
}

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

function parsePlayersGameboard(player) {
  const gameboard = JSON.parse(
    sessionStorage.getItem(`${player}Gameboard`),
    reviver
  );
  return gameboard;
}

function checkIfShowCurtain(initialPlayer, secondPlayer) {
  if (initialPlayer.getIsComputer() || secondPlayer.getIsComputer()) {
    const clickEvent = new Event("click");
    hideCurtainBtn.dispatchEvent(clickEvent);
  }
}

function startNewGame() {
  window.location.href = "index.html";
}

function setWinner(winner, player1, player2) {
  if (winner === player1.name) {
    showMessage(`${player1.name} ${textLines.winner} ${player2}`);
    if (player1.getIsComputer()) {
      display.finalBoard(player2.getGameboard().getCells(), true);
      display.finalBoard(player1.getGameboard().getCells(), false);
    } else {
      display.finalBoard(player1.getGameboard().getCells(), true);
      display.finalBoard(player2.getGameboard().getCells(), false);
    }
  } else {
    showMessage(`${player2.name} ${textLines.winner} ${player1}`);
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
const player2 = new Player(player2Data.name, player2Data.isComputer); // Change when tests over
player1.gameboard = player1Gameboard;
player2.gameboard = player2Gameboard;

const hideCurtainBtn = document.getElementById("ready");
const newGameBtn = document.getElementById("newGame");
hideCurtainBtn.addEventListener("click", display.hideCurtain);
const { initialPlayer, secondPlayer } = chooseInitialPlayer(player1, player2);
checkIfShowCurtain(initialPlayer, secondPlayer);
const winner = await turnLoops(initialPlayer, secondPlayer);
setWinner(winner, player1, player2);
newGameBtn.disabled = false;
newGameBtn.addEventListener("click", startNewGame);
console.log(winner);
