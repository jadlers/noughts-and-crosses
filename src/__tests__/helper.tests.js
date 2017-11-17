import { calculateWinner } from "../helper";

describe("Calculate winner", () => {
  it("no winner", () => {
    const noWinner = ["X", "X", "O", "O", "X", "X", "X", "O", "O"];
    expect(calculateWinner(noWinner)).toEqual(null);
  });

  it("correct horizontal wins", () => {
    const topRowWinner = ["X", "X", "X", "O", null, "O", null, null, null];
    const middleRowWinner = ["X", "O", "X", "O", "O", "O", "X", "X", "X"];
    const bottomRowWinner = ["X", null, null, "X", "X", null, "O", "O", "O"];
    expect(calculateWinner(topRowWinner)).toEqual([0, 1, 2]);
    expect(calculateWinner(middleRowWinner)).toEqual([3, 4, 5]);
    expect(calculateWinner(bottomRowWinner)).toEqual([6, 7, 8]);
  });

  it("correct vertical wins", () => {
    const leftColWinner = ["O", "O", "X", "O", "X", "X", "O", "X", null];
    const middleColWinner = [null, "X", null, "O", "X", "O", null, "X", null];
    const rightColWinner = ["O", "O", "X", null, null, "X", null, null, "X"];
    expect(calculateWinner(leftColWinner)).toEqual([0, 3, 6]);
    expect(calculateWinner(middleColWinner)).toEqual([1, 4, 7]);
    expect(calculateWinner(rightColWinner)).toEqual([2, 5, 8]);
  });

  it("diagonal wins", () => {
    const upLeft2downRight = ["X", null, "O", null, "X", "O", null, null, "X"];
    const downLeft2upRight = ["X", "X", "O", null, "O", null, "O", null, "X"];
    expect(calculateWinner(upLeft2downRight)).toEqual([0, 4, 8]);
    expect(calculateWinner(downLeft2upRight)).toEqual([2, 4, 6]);
  });

  /**
   * [
   *   "O", "X", "O",
   *   "O", "X", "X",
   *   "O", "O", "O"
   * ];
   *
   */
});
