// Day 9: Smoke Basin
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n").map((line) => line.split("").map(Number));
  const basinSizes = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (isLowPoint(x, y)) {
        basinSizes.push(calculateBasinSize(x, y));
        x++;
      }
    }
  }
  basinSizes.sort((a, b) => b - a);

  return { output: basinSizes[0] * basinSizes[1] * basinSizes[2] };

  // helpers
  function calculateBasinSize(x, y, basin = new Set()) {
    if (grid[y]?.[x] == null || grid[y][x] === 9 || basin.has(key(x, y))) {
      return 0;
    }

    basin.add(key(x, y));
    let count = 1;

    for (const [nX, nY] of getNeighborCoords(x, y)) {
      count += calculateBasinSize(nX, nY, basin);
    }
    return count;
  }

  function isLowPoint(x, y) {
    return getNeighbors(x, y).every((n) => n == null || n > grid[y][x]);
  }

  function getNeighbors(x, y) {
    return getNeighborCoords(x, y).map(([nX, nY]) => grid[nY]?.[nX]);
  }

  function getNeighborCoords(x, y) {
    return [
      [x, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x, y + 1],
    ];
  }

  function key(x, y) {
    return `${x},${y}`;
  }
});
