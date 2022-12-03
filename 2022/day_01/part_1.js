// Day 1: Calorie Counting
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const elfCals = input
    .split("\n\n")
    .map((paragraph) =>
      paragraph.split("\n").reduce((cals, line) => cals + Number(line), 0)
    );

  let maxCals = -Infinity;

  for (const cals of elfCals) {
    if (cals > maxCals) {
      maxCals = cals;
    }
  }

  return { output: maxCals, expected: 73211 };
});
