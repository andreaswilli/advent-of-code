// Day 9: Smoke Basin
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n").map((line) => line.split("").map(Number));
  let sum = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (isLowPoint(x, y)) {
        sum += grid[y][x] + 1;
        x++;
      }
    }
  }

  return { output: sum };

  // helpers
  function isLowPoint(x, y) {
    return getNeighbors(x, y).every((n) => n == null || n > grid[y][x]);
  }

  function getNeighbors(x, y) {
    return [
      grid[y]?.[x - 1],
      grid[y - 1]?.[x],
      grid[y + 1]?.[x],
      grid[y]?.[x + 1],
    ];
  }
});
