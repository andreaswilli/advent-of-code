// Day 2: Rock Paper Scissors
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const value = {
    AY: 1,
    BX: 1,
    CZ: 1,
    AZ: 2,
    BY: 2,
    CX: 2,
    AX: 3,
    BZ: 3,
    CY: 3,
  };
  const scoreTable = { X: 0, Y: 3, Z: 6 };

  const scores = input
    .split("\n")
    .map((line) => line.split(" "))
    .map(
      ([opponentChoice, result]) =>
        value[opponentChoice + result] + scoreTable[result]
    );

  return {
    output: scores.reduce((sum, score) => sum + score),
    expected: 12767,
  };
});
