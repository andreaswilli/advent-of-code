// Day 22: Monkey Map
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [grid, lastLine] = input.split("\n\n");
  grid = grid.split("\n");
  const steps = [];

  for (const part of lastLine.split("R")) {
    for (const amount of part.split("L")) {
      steps.push(Number(amount));
      steps.push("L");
    }
    steps.pop();
    steps.push("R");
  }
  steps.pop();

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  let row = 0;
  let col = 0;
  let dir = 0;

  let width = 0;
  for (const row of grid) {
    width = Math.max(width, row.length);
  }
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].padEnd(width, " ");
  }
  while (grid[0][col] !== ".") col++;

  for (const step of steps) {
    if (typeof step === "string") {
      dir = (dir + (step === "R" ? 1 : -1) + 4) % 4;
      continue;
    }

    for (let i = 0; i < step; i++) {
      let newRow = row;
      let newCol = col;

      do {
        newRow = (newRow + directions[dir][1] + grid.length) % grid.length;
        newCol = (newCol + directions[dir][0] + width) % width;
      } while (grid[newRow][newCol] === " ");

      if (grid[newRow][newCol] === "#") break;

      row = newRow;
      col = newCol;
    }
  }

  return { output: 1000 * (row + 1) + 4 * (col + 1) + dir, expected: 117054 };
});
