import Ship from "../src/ship";
import extractCoordinates from "../src/extractCoordinates";

test("Coodinates Extraction", () => {
  expect(extractCoordinates("[2,3]")).toStrictEqual([2, 3]);
});

test("Ship creation vertical", () => {
  const ship = new Ship("[2,3]", 5, "vertical");
  expect(ship.getPositions()).toStrictEqual([
    "[2,3]",
    "[2,4]",
    "[2,5]",
    "[2,6]",
    "[2,7]",
  ]);
});

test("Ship creation horizontal", () => {
  const ship = new Ship("[2,3]", 5, "horizontal");
  expect(ship.getPositions()).toStrictEqual([
    "[2,3]",
    "[3,3]",
    "[4,3]",
    "[5,3]",
    "[6,3]",
  ]);
});

test("Ship length", () => {
  const ship = new Ship("[2,3]", 5, "horizontal");
  expect(ship.getLength()).toBe(5);
});

test("Hit  increase", () => {
  const ship = new Ship("[2,3]", 5, "horizontal");
  ship.hit("[4,3]");
  expect(ship.hits).toBe(1);
  expect(ship.positions.get("[4,3]")).toBe(true);
});

test("Was hit successful True", () => {
  const ship = new Ship("[2,3]", 5, "horizontal");
  expect(ship.hit("[4,3]")).toBe(true);
});

test("Was hit successful False", () => {
  const ship = new Ship("[2,3]", 5, "horizontal");
  ship.hit("[10,3]");
  expect(ship.hit("[10,3]")).toBe(false);
});

test("IsSunk ship False", () => {
  const ship = new Ship("[2,3]", 4, "horizontal");
  ship.hit("[2,3]");
  expect(ship.isSunk()).toBe(false);
});

test("IsSunk ship True", () => {
  const ship = new Ship("[2,3]", 1, "horizontal");
  ship.hit("[2,3]");
  expect(ship.isSunk()).toBe(true);
});
