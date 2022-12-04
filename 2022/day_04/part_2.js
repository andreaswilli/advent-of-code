// Day 4: Camp Cleanup
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const assignments = input
    .split("\n")
    .map((line) =>
      line.split(",").map((range) => range.split("-").map(Number))
    );

  const overlappingAssignments = assignments.filter(
    ([r1, r2]) => !(r1[1] < r2[0] || r2[1] < r1[0])
  );

  return { output: overlappingAssignments.length, expected: 847 };
});
