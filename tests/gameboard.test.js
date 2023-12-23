import Gameboard from "../src/gameboard";

test("Add ship vertical Position", () => {
  const board = new Gameboard();
  board.addShip("[2,3]", 2, "vertical");
  const cells = board.getCells();
  expect(cells.get("[2,3]")).toBe("ship");
  expect(cells.get("[2,4]")).toBe("ship");
});

test("Add ship horizontal Position", () => {
  const board = new Gameboard();
  board.addShip("[2,3]", 2, "horizontal");
  const cells = board.getCells();
  expect(cells.get("[2,3]")).toBe("ship");
  expect(cells.get("[3,3]")).toBe("ship");
});

test("Successful attack", () => {
  const board = new Gameboard();
  board.addShip("[2,3]", 2, "horizontal");
  board.receiveAttack("[2,3]");
  const cells = board.getCells();
  expect(cells.get("[2,3]")).toBe("hit");
});

test("Missed attack", () => {
  const board = new Gameboard();
  board.addShip("[2,3]", 2, "horizontal");
  board.receiveAttack("[4,3]");
  const cells = board.getCells();
  expect(cells.get("[4,3]")).toBe("miss");
});

test("All ships Sunk", () => {
  const board = new Gameboard();
  board.addShip("[2,3]", 2, "horizontal");
  board.receiveAttack("[2,3]");
  board.receiveAttack("[3,3]");
  board.addShip("[4,3]", 2, "horizontal");
  board.receiveAttack("[4,3]");
  board.receiveAttack("[5,3]");
  expect(board.allShipsSunk()).toBe(true);
});

test("Some ships Sunk", () => {
  const board = new Gameboard();
  board.addShip("[2,3]", 2, "horizontal");
  board.receiveAttack("[2,3]");
  board.receiveAttack("[3,3]");
  board.addShip("[4,3]", 2, "horizontal");
  expect(board.allShipsSunk()).toBe(false);
});

test("None ships Sunk", () => {
  const board = new Gameboard();
  board.addShip("[2,3]", 2, "horizontal");
  board.receiveAttack("[2,3]");
  board.receiveAttack("[3,3]");
  board.addShip("[4,3]", 2, "horizontal");
  expect(board.allShipsSunk()).toBe(false);
});
