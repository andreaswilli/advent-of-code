// Day 13: Point of Incidence
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const patterns = input.split("\n\n").map((pattern) => pattern.split("\n"));

  function findSymmetry(pattern) {
    for (let i = 1; i < pattern[0].length; i++) {
      const totalDiff = pattern.reduce((diff, row) => {
        const len = Math.min(i, row.length - i);
        const left = row.slice(i - len, i);
        const right = row
          .slice(i, i + len)
          .split("")
          .reverse()
          .join("");
        const localDiff = left
          .split("")
          .reduce((acc, l, i) => (acc + (l === right[i] ? 0 : 1)), 0);
        return diff + localDiff;
      }, 0);
      if (totalDiff === 1) {
        return i;
      }
    }
  }

  function rotatePattern(pattern) {
    return pattern[0]
      .split("")
      .map((_, i) => pattern.map((row) => row[row.length - 1 - i]).join(""));
  }

  let sum = 0;

  for (const pattern of patterns) {
    const vertical = findSymmetry(pattern);
    if (vertical != null) {
      sum += vertical;
    } else {
      const horizontal = findSymmetry(rotatePattern(pattern));
      sum += horizontal * 100;
    }
  }

  return { output: sum, expected: 28235 };
});
