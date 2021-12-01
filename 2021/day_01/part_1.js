// Day 1: Sonar Sweep
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let noOfIncreases = 0;
  const measurements = input.split("\n").map(Number);

  for (let i = 0; i < measurements.length - 1; i++) {
    if (measurements[i] < measurements[i + 1]) {
      noOfIncreases++;
    }
  }
  return { output: noOfIncreases };
});
