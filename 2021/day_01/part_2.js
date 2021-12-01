// Day 1: Sonar Sweep
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let noOfIncreases = 0;
  const windowSize = 3;
  const measurements = input.split("\n").map(Number);

  const calcWindowSum = (start) =>
    measurements[start] + measurements[start + 1] + measurements[start + 2];

  for (let i = 0; i < measurements.length - windowSize; i++) {
    if (calcWindowSum(i) < calcWindowSum(i + 1)) {
      noOfIncreases++;
    }
  }
  return { output: noOfIncreases };
});
