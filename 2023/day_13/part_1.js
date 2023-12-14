// Day 13: Point of Incidence
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const patterns = input.split("\n\n").map((pattern) => pattern.split("\n"));

  function findSymmetry(pattern) {
    const candidates = new Set(
      Array.from({ length: pattern[0].length - 1 }, (_, i) => i + 1)
    );

    for (const row of pattern) {
      for (const c of candidates) {
        const len = Math.min(c, row.length - c);
        const left = row.slice(c - len, c);
        const right = row
          .slice(c, c + len)
          .split("")
          .reverse()
          .join("");
        if (left !== right) {
          candidates.delete(c);
        }
      }
    }
    return Array.from(candidates)[0];
  }

  function rotatePattern(pattern) {
    return pattern[0].split("").map((_, i) =>
      pattern
        .map((row) => row[row.length - 1 - i])
        .join("")
    );
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

  return { output: sum, expected: 33728 };
});
