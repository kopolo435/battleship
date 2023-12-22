import Ship from "./src/ship";

test("Ship creation", () => {
  const ship = new Ship("[2,3]", 5, "vertical");
  expect(ship.getPositions()).toBe([
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
  ]);
});
