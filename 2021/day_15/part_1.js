// Day 15: Chiton
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n").map((line) => line.split("").map(Number));
  const cost = Array(grid.length)
    .fill(null)
    .map(() => Array(grid.length).fill(null));

  cost[0][0] = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (row === 0 && col === 0) continue;

      cost[row][col] =
        grid[row][col] +
        Math.min(
          cost[row - 1]?.[col] ?? Infinity,
          cost[row][col - 1] ?? Infinity
        );
    }
  }

  return { output: cost[cost.length - 1][cost.length - 1], expected: 410 };
});
