// Day 1: Trebuchet?!
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const sum = input
    .split("\n")
    .map((line) => {
      const onlyDigits = line.replace(/[^\d]/g, "");
      return Number(onlyDigits[0] + onlyDigits[onlyDigits.length - 1]);
    })
    .reduce((acc, cur) => acc + cur);

  return { output: sum, expected: 55108 };
});
