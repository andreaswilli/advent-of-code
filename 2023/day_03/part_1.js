// Day 3: Gear Ratios
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  function isAdjacentToSymbol(row, col, len) {
    for (let x = col - 1; x < col + len + 1; x++) {
      const upperNeighbor = grid[row - 1]?.[x];
      if (upperNeighbor && upperNeighbor !== ".") return true;

      const lowerNeighbor = grid[row + 1]?.[x];
      if (lowerNeighbor && lowerNeighbor !== ".") return true;
    }

    const leftNeighbor = grid[row][col - 1];
    if (leftNeighbor && leftNeighbor !== ".") return true;

    const rightNeighbor = grid[row][col + len];
    if (rightNeighbor && rightNeighbor !== ".") return true;

    return false;
  }

  let sum = 0;
  const grid = input.split("\n");

  for (let row = 0; row < grid.length; row++) {
    let numStart = null;
    for (let col = 0; col <= grid[row].length; col++) {
      const isDigit = !isNaN(Number(grid[row][col]));
      if (isDigit && numStart === null) {
        numStart = col;
      } else if (!isDigit && numStart !== null) {
        if (isAdjacentToSymbol(row, numStart, col - numStart)) {
          sum += Number(grid[row].slice(numStart, col));
        }
        numStart = null;
      }
    }
  }

  return { output: sum, expected: 525911 };
});
