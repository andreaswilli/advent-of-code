// Day 8: Seven Segment Search
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const outputValues = input
    .split("\n")
    .map((line) => line.split(" | ")[1].split(" "))
    .reduce((acc, cur) => acc.concat(cur), []);

  return {
    output: outputValues.filter((v) => [2, 3, 4, 7].includes(v.length)).length,
  };
});
