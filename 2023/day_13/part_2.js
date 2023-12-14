// Day 13: Point of Incidence
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const patterns = input.split("\n\n").map((pattern) => pattern.split("\n"));

  function findSymmetries(pattern) {
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
    return Array.from(candidates);
  }

  function rotatePattern(pattern) {
    return pattern[0]
      .split("")
      .map((_, i) => pattern.map((row) => row[row.length - 1 - i]).join(""));
  }

  function fixSmudge(pattern, smudgeRow, smudgeCol) {
    return pattern.map((row, i) =>
      i !== smudgeRow
        ? row
        : row
            .split("")
            .map((spot, j) =>
              j !== smudgeCol ? spot : spot === "#" ? "." : "#"
            )
            .join("")
    );
  }

  let sum = 0;

  for (const pattern of patterns) {
    let vertical = [];
    let horizontal = [];
    const excludeVertical = findSymmetries(pattern)[0];
    const excludeHorizontal = findSymmetries(rotatePattern(pattern))[0];

    for (
      let row = 0;
      row < pattern.length && !vertical.length && !horizontal.length;
      row++
    ) {
      for (
        let col = 0;
        col < pattern[row].length && !vertical.length && !horizontal.length;
        col++
      ) {
        const fixedPattern = fixSmudge(pattern, row, col);
        vertical = findSymmetries(fixedPattern).filter(
          (v) => v !== excludeVertical
        );

        if (vertical.length) {
          sum += vertical[0];
        } else {
          horizontal = findSymmetries(rotatePattern(fixedPattern)).filter(
            (h) => h !== excludeHorizontal
          );
          if (horizontal.length) {
            sum += horizontal[0] * 100;
          }
        }
      }
    }
  }

  return { output: sum, expected: 28235 };
});
