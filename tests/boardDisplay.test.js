import * as gridDisplay from "../src/setupOfShip/boardDisplay";

test("Ammount of cells made", () => {
  const appendChild = jest.fn((x) => true);
  const mockObj = { appendChild, test: true };
  gridDisplay.fillGrid(10, mockObj);
  expect(appendChild.mock.calls).toHaveLength(100);
});
