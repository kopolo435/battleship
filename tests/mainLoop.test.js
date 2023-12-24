import * as mainLoop from "../src/board";
import Player from "../src/player";

test("Player creation", () => {
  const mockGetName = jest.fn(() => ({ value: "samir" }));
  const mockGetIsComputer = jest.fn(() => ({ value: "false" }));
  expect(
    mainLoop.createPlayer(mockGetName(), mockGetIsComputer())
  ).toStrictEqual(new Player("samir", false));
});

test("Turn loop with computer, human win", () => {
  const player1 = new Player("samir", false);
  player1.getGameboard().addShip("[0,0]", 1, "horizontal");
  const player2 = new Player("computer", true);
  player2.getGameboard().addShip("[3,4]", 1, "horizontal");
  const mockAttack = jest.fn();
  mockAttack.mockReturnValueOnce("[3,4]");
  expect(mainLoop.turnLoops(player2, player1, mockAttack)).toBe("samir");
});

test("Turn loop with computer, computer win", () => {
  const player1 = new Player("samir", false);
  player1.getGameboard().addShip("[0,0]", 3, "horizontal");
  const player2 = new Player("computer", true);
  player2.getGameboard().addShip("[3,4]", 2, "horizontal");
  const mockAttack = jest.fn(() => "[3,4]");
  expect(mainLoop.turnLoops(player2, player1, mockAttack)).toBe("computer");
});
