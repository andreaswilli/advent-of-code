// Day 4: Camp Cleanup
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const assignments = input
    .split("\n")
    .map((line) =>
      line.split(",").map((range) => range.split("-").map(Number))
    );

  const containedAssignments = assignments.filter(([r1, r2]) => {
    const firstContainsSecond = r1[0] <= r2[0] && r1[1] >= r2[1];
    const secondContainsFirst = r2[0] <= r1[0] && r2[1] >= r1[1];
    return firstContainsSecond || secondContainsFirst;
  });

  return { output: containedAssignments.length, expected: 496 };
});
