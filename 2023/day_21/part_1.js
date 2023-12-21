// Day 21: Step Counter
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const STEPS = 500;
  const grid = input.split("\n");

  const startRow = grid.findIndex((row) => row.includes("S"));
  const startCol = grid[startRow].indexOf("S");
  const start = [startRow, startCol];

  const key = (pos) => pos.join("/");
  const parseKey = (key) => key.split("/").map(Number);

  const getNeighbors = ([row, col]) =>
    [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ].filter(([row, col]) => grid[row]?.[col] && grid[row][col] !== "#");

  const getAllNeighbors = (positions) =>
    [
      ...new Set(
        positions
          .reduce((acc, cur) => acc.concat(getNeighbors(cur)), [])
          .map(key)
      ),
    ].map(parseKey);

  let gardenPlots = [start];

  for (let i = 0; i < STEPS; i++) {
    gardenPlots = getAllNeighbors(gardenPlots);
  }

  return { output: gardenPlots.length, expected: 3737 };
});
