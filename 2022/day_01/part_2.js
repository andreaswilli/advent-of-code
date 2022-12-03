// Day 1: Calorie Counting
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const elfCals = input
    .split("\n\n")
    .map((paragraph) =>
      paragraph.split("\n").reduce((cals, line) => cals + Number(line), 0)
    );

  return {
    output: elfCals
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((sum, cur) => sum + cur),
    expected: 213958,
  };
});
