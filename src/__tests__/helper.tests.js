import { calculateWinner } from "../helper";

describe("Winner (3x3 seq=3)", () => {
  const settings = {
    ROWS: 3,
    COLUMNS: 3,
    SEQ_LEN: 3
  };

  it("has no winner", () => {
    const noWinner = ["X", "X", "O", "O", "X", "X", "X", "O", "O"];
    expect(calculateWinner(noWinner, settings)).toEqual(null);
  });

  it("finds horizontal wins correctly", () => {
    const topRowWinner = ["X", "X", "X", "O", null, "O", null, null, null];
    const middleRowWinner = ["X", "O", "X", "O", "O", "O", "X", "X", "X"];
    const bottomRowWinner = ["X", null, null, "X", "X", null, "O", "O", "O"];
    expect(calculateWinner(topRowWinner, settings)).toEqual([0, 1, 2]);
    expect(calculateWinner(middleRowWinner, settings)).toEqual([3, 4, 5]);
    expect(calculateWinner(bottomRowWinner, settings)).toEqual([6, 7, 8]);
  });

  it("finds vertical wins correctly", () => {
    const leftColWinner = ["O", "O", "X", "O", "X", "X", "O", "X", null];
    const middleColWinner = [null, "X", null, "O", "X", "O", null, "X", null];
    const rightColWinner = ["O", "O", "X", null, null, "X", null, null, "X"];
    expect(calculateWinner(leftColWinner, settings)).toEqual([0, 3, 6]);
    expect(calculateWinner(middleColWinner, settings)).toEqual([1, 4, 7]);
    expect(calculateWinner(rightColWinner, settings)).toEqual([2, 5, 8]);
  });

  it("finds diagonal wins correctly", () => {
    const upLeft2downRight = ["X", null, "O", null, "X", "O", null, null, "X"];
    const downLeft2upRight = ["X", "X", "O", null, "O", null, "O", null, "X"];
    expect(calculateWinner(upLeft2downRight, settings)).toEqual([0, 4, 8]);
    expect(calculateWinner(downLeft2upRight, settings)).toEqual([2, 4, 6]);
  });
});
