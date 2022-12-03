// Day 2: Rock Paper Scissors
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const scoreTable = {
    AZ: 0,
    BX: 0,
    CY: 0,
    AX: 3,
    BY: 3,
    CZ: 3,
    AY: 6,
    BZ: 6,
    CX: 6,
  };
  const value = { X: 1, Y: 2, Z: 3 };

  const scores = input
    .split("\n")
    .map((line) => line.split(" "))
    .map(
      ([opponentChoice, myChoice]) =>
        scoreTable[opponentChoice + myChoice] + value[myChoice]
    );

  return {
    output: scores.reduce((sum, score) => sum + score),
    expected: 11666,
  };
});
