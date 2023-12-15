// Day 14: Parabolic Reflector Dish
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n").map((row) => row.split(""));

  for (let i = 0; i < grid.length - 1; i++) {
    for (let row = 1; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== "O") continue;
        if (grid[row - 1][col] === ".") {
          grid[row - 1][col] = "O";
          grid[row][col] = ".";
        }
      }
    }
  }

  let totalLoad = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== "O") continue;
      totalLoad += grid.length - row;
    }
  }

  return { output: totalLoad, expected: 108935 };
});
