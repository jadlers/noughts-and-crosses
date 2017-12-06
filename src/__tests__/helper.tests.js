import { calculateWinner } from "../helper";

describe("Winner (3x3 seq=3)", () => {
  const settings = {
    rows: 3,
    columns: 3,
    seq_len: 3
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

describe("With (5x5 seq=3)", () => {
  const settings = {
    rows: 5,
    columns: 5,
    seq_len: 3
  };

  it("has no winner", () => {
    // prettier-ignore
    const noWinner = [
      "X","O","X","O","X",
      "O","X","O","X","O",
      "O","X","O","X","O",
      "X","O","X","O","X",
      "X","O","X","O","X"
    ];
    expect(calculateWinner(noWinner, settings)).toEqual(null);
  });

  it("finds horizontal wins correctly", () => {
    // prettier-ignore
    const topRowWinner = [
      null, null, null, null, null,
      "X", "X", "X", null, null,
      null, "O", null, null, null,
      null, null, null, "O", null,
      null, null, null, null, null
    ];
    // prettier-ignore
    const middleRowWinner = [
      null, null, null, "X", null,
      null, "X", null, null, null,
      null, "O", "O", "O", null,
      null, null, null, null, null,
      null, "X", null, null, null
    ];
    // prettier-ignore
    const bottomRowWinner = [
      null, null, null, null, null,
      null, "O", null, null, null,
      null, null, null, null, null,
      null, null, "X", "X", "X",
      null, "O", null, null, null
    ];
    expect(calculateWinner(topRowWinner, settings)).toEqual([5, 6, 7]);
    expect(calculateWinner(middleRowWinner, settings)).toEqual([11, 12, 13]);
    expect(calculateWinner(bottomRowWinner, settings)).toEqual([17, 18, 19]);
  });

  it("finds vertical wins correctly", () => {
    // prettier-ignore
    const leftColWinner = [
      null, null, null, null, null,
      "X", null, null, "O", null,
      "X", null, "O", null, null,
      "X", null, null, null, null,
      null, null, null, null, null
    ];
    // prettier-ignore
    const middleColWinner = [
      null, null, null, "O", null,
      null, null, null, null, null,
      null, "O", "X", null, null,
      null, null, "X", null, null,
      null, null, "X", null, null
    ];
    // prettier-ignore
    const rightColWinner = [
      null, null, null, null, null,
      null, null, null, null, "O",
      "X", null, "X", null, "O",
      null, null, null, "X", "O",
      null, null, null, null, null
    ];
    expect(calculateWinner(leftColWinner, settings)).toEqual([5, 10, 15]);
    expect(calculateWinner(middleColWinner, settings)).toEqual([12, 17, 22]);
    expect(calculateWinner(rightColWinner, settings)).toEqual([9, 14, 19]);
  });

  it("finds diagonal wins correctly", () => {
    // prettier-ignore
    const upLeft2downRight = [
      "X", null, null, null, null,
      null, "X", null, null, "O",
      null, null, "X", null, null,
      null, null, null, null, null,
      "O", null, null, null, null
    ];
    // prettier-ignore
    const downLeft2upRight = [
      null, null, null, null, null,
      null, "X", null, "X", null,
      null, null, "X", "O", "O",
      null, "X", null, "O", null,
      null, null, "O", null, null
    ];
    expect(calculateWinner(upLeft2downRight, settings)).toEqual([0, 6, 12]);
    expect(calculateWinner(downLeft2upRight, settings)).toEqual([14, 18, 22]);
  });
});
