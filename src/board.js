import Player from "./player";
import extractCoordinates from "./extractCoordinates";
import { reviver } from "./jsonConversion";
import * as display from "./setupOfShip/boardDom";
import style from "./styles/board.css";

let enemyMap = new Map();
function updateEnemyMap(gameboard) {
  const replaceMap = new Map();
  gameboard.forEach((value, index) => {
    replaceMap.set(index, value);
  });
  enemyMap = replaceMap;
}

function hoverEvent(event) {
  const cell = event.target;
  if (
    enemyMap.get(cell.dataset.id) !== "hit" &&
    enemyMap.get(cell.dataset.id) !== "miss"
  ) {
    cell.classList.add("hover", "valid");
  } else {
    cell.classList.remove("valid");
    cell.classList.add("hover", "invalid");
  }
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
        console.log("elija otra casilla");
      } else {
        resolve(coordinate);
      }
    });

    cell.addEventListener("mouseover", hoverEvent);
    cell.addEventListener("mouseout", () => {
      cell.classList.remove("hover", "invalid", "valid");
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
  while (!enemy.getGameboard().allShipsSunk()) {
    if (!currentPlayer.getIsComputer() && !enemy.getIsComputer()) {
      display.showCurtain();
    }
    display.fillBoard(currentPlayer.getGameboard().getCells(), true);
    display.fillBoard(enemy.getGameboard().getCells(), false);
    updateEnemyMap(enemy.getGameboard().getCells());
    let attack;
    if (currentPlayer.getIsComputer()) {
      // const a = await new Promise(getUserAttack); // Cambiar por cambiando compu
      attack = currentPlayer.getComputerPlay(enemy.getGameboard().getCells());
    } else {
      attack = await new Promise(getUserAttack);
      console.log(attack);
    }
    enemy.getGameboard().receiveAttack(attack);
    display.fillBoard(enemy.getGameboard().getCells(), false);
    if (enemy.getGameboard().allShipsSunk()) {
      return currentPlayer.getName();
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
  console.log(nameChoosen);
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

const player1Data = JSON.parse(sessionStorage.getItem("player1"));
const player2Data = JSON.parse(sessionStorage.getItem("player2"));

const player1Gameboard = parsePlayersGameboard("player1");
const player2Gameboard = parsePlayersGameboard("player2");

const player1 = new Player(player1Data.name, player1Data.isComputer);
const player2 = new Player(player2Data.name, true); // Change when tests over
player1.gameboard = player1Gameboard;
player2.gameboard = player2Gameboard;

const hideCurtainBtn = document.getElementById("ready");
hideCurtainBtn.addEventListener("click", display.hideCurtain);
const { initialPlayer, secondPlayer } = chooseInitialPlayer(player1, player2);
if (initialPlayer.getIsComputer() || secondPlayer.getIsComputer()) {
  const clickEvent = new Event("click");
  hideCurtainBtn.dispatchEvent(clickEvent);
}
const winner = await turnLoops(initialPlayer, secondPlayer);

console.log(winner);
