import Player from "../src/player";
import Gameboard from "../src/gameboard";

test("Create Human player", () => {
  const player = new Player("samir", false);
  expect(player.getName()).toBe("samir");
  expect(player.getIsComputer()).toBe(false);
});

test("Create computer player", () => {
  const player = new Player("computer", true);
  expect(player.getName()).toBe("computer");
  expect(player.getIsComputer()).toBe(true);
});

test("Get player Gameboard", () => {
  const player = new Player("computer", true);
  const gameboard = player.getGameboard();
  const testBoard = new Gameboard();
  expect(gameboard).toEqual(testBoard);
});

test("Computer chooses possible Position", () => {
  const player = new Player("computer", true);
  const enemyBoard = new Map();
  enemyBoard.set("[0,0]", "empty");
  enemyBoard.set("[1,0]", "empty");
  enemyBoard.set("[2,0]", "empty");
  expect(["[0,0]", "[1,0]", "[2,0]"]).toContain(
    player.getComputerPlay(enemyBoard)
  );
});

test("Computer choose new position", () => {
  const player = new Player("computer", true);
  const enemyBoard = new Map();
  enemyBoard.set("[0,0]", "empty");
  enemyBoard.set("[1,0]", "empty");
  enemyBoard.set("[2,0]", "empty");
  const firstAttack = player.getComputerPlay(enemyBoard);
  enemyBoard.set(firstAttack, "miss");
  expect(player.getComputerPlay(enemyBoard)).not.toBe(firstAttack);
  expect(player.getComputerPlay(enemyBoard)).not.toBe(firstAttack);
});

test("Computer choose near hit position", () => {
  const player = new Player("computer", true);
  const enemyBoard = new Map();
  enemyBoard.set("[0,0]", "hit");
  enemyBoard.set("[1,0]", "empty");
  enemyBoard.set("[4,0]", "empty");
  enemyBoard.set("[4,2]", "empty");
  enemyBoard.set("[4,4]", "empty");
  expect(["[0,1]", "[1,0]"]).toContain(player.getComputerPlay(enemyBoard));
});

test("Choose random when near hit impossible", () => {
  const player = new Player("computer", true);
  const enemyBoard = new Map();
  enemyBoard.set("[0,0]", "hit");
  enemyBoard.set("[4,0]", "empty");
  enemyBoard.set("[4,3]", "empty");
  enemyBoard.set("[4,2]", "empty");
  enemyBoard.set("[4,4]", "empty");
  expect(["[4,0]", "[4,3]", "[4,2]", "[4,4]"]).toContain(
    player.getComputerPlay(enemyBoard)
  );
});
