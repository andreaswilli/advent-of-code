// Day 8: Treetop Tree House
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const forrest = input
    .split("\n")
    .map((row) => row.split("").map((height) => ({ hgt: Number(height) })));
  let maxScore = 0;
  const H = forrest.length;
  const W = forrest[0].length;

  for (let row = 1; row < H - 1; row++) {
    for (let col = 1; col < W - 1; col++) {
      const tree = forrest[row][col];

      let viewDist = 1;
      for (let i = col - 1; i > 0 && forrest[row][i].hgt < tree.hgt; i--) {
        viewDist++;
      }
      tree.l = viewDist;

      viewDist = 1;
      for (let i = col + 1; i < W - 1 && forrest[row][i].hgt < tree.hgt; i++) {
        viewDist++;
      }
      tree.r = viewDist;

      viewDist = 1;
      for (let i = row - 1; i > 0 && forrest[i][col].hgt < tree.hgt; i--) {
        viewDist++;
      }
      tree.t = viewDist;

      viewDist = 1;
      for (let i = row + 1; i < H - 1 && forrest[i][col].hgt < tree.hgt; i++) {
        viewDist++;
      }
      tree.b = viewDist;
    }
  }

  for (let row = 1; row < H - 1; row++) {
    for (let col = 1; col < forrest[row].length - 1; col++) {
      const tree = forrest[row][col];
      const score = tree.t * tree.b * tree.l * tree.r;
      maxScore = Math.max(score, maxScore);
    }
  }

  return { output: maxScore, expected: 268800 };
});
