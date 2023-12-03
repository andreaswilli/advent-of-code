// Day 3: Gear Ratios
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  function getAdjacentGear(row, col, len) {
    for (let x = col - 1; x < col + len + 1; x++) {
      const upperNeighbor = grid[row - 1]?.[x];
      if (upperNeighbor && upperNeighbor === "*") return `${row - 1},${x}`;

      const lowerNeighbor = grid[row + 1]?.[x];
      if (lowerNeighbor && lowerNeighbor === "*") return `${row + 1},${x}`;
    }

    const leftNeighbor = grid[row][col - 1];
    if (leftNeighbor && leftNeighbor === "*") return `${row},${col - 1}`;

    const rightNeighbor = grid[row][col + len];
    if (rightNeighbor && rightNeighbor === "*") return `${row},${col + len}`;

    return null;
  }

  let sum = 0;
  const grid = input.split("\n");

  const gears = new Map();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "*") {
        gears.set(`${row},${col}`, new Set());
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    let numStart = null;
    for (let col = 0; col <= grid[row].length; col++) {
      const isDigit = !isNaN(Number(grid[row][col]));
      if (isDigit && numStart === null) {
        numStart = col;
      } else if (!isDigit && numStart !== null) {
        const adjGear = getAdjacentGear(row, numStart, col - numStart);
        if (adjGear) {
          gears.get(adjGear).add(Number(grid[row].slice(numStart, col)));
        }
        numStart = null;
      }
    }
  }

  for (const [_, nums] of gears) {
    if (nums.size === 2) {
      sum += [...nums].reduce((acc, cur) => acc * cur, 1);
    }
  }

  return { output: sum, expected: 75805607 };
});
