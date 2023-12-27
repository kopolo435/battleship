import Player from "./player";
import extractCoordinates from "./extractCoordinates";
import { reviver } from "./jsonConversion";
import * as display from "./setupOfShip/boardDom";
import style from "./styles/board.css";

function createCellAttackEvent(resolve) {
  const button = document.getElementById("test");
  const chooseAttack = () => "[4,0]";
  button.addEventListener("click", () => {
    const chosenAttack = chooseAttack();
    setTimeout(() => resolve(chosenAttack), 5000);
  });
}

async function getUserAttack(resolve) {
  const attackCoordinates = await createCellAttackEvent(resolve);
  return attackCoordinates;
}

async function turnLoops(initialPlayer, secondPlayer, chooseAttack) {
  let currentPlayer = initialPlayer;
  let enemy = secondPlayer;
  while (!enemy.getGameboard().allShipsSunk()) {
    display.showCurtain();
    let attack;
    if (currentPlayer.getIsComputer()) {
      attack = currentPlayer.getComputerPlay(enemy.getGameboard().getCells());
    } else {
      console.log("start");
      attack = await new Promise(getUserAttack);
    }
    console.log("end");
    enemy.getGameboard().receiveAttack(attack);
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
  const nameChoosen = names[Math.floor(Math.random() * (names.length - 1))];
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
const chooseAttack = () => "[4,0]";
const { initialPlayer, secondPlayer } = chooseInitialPlayer(player1, player2);
const winner = await turnLoops(initialPlayer, secondPlayer, chooseAttack);

console.log(winner);
