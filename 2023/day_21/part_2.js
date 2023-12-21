// Day 21: Step Counter
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n");

  const startRow = grid.findIndex((row) => row.includes("S"));
  const startCol = grid[startRow].indexOf("S");
  const start = [startRow, startCol];

  const key = (pos) => pos.join("/");
  const parseKey = (key) => key.split("/").map(Number);

  const posRem = (dividend, divisor) =>
    ((dividend % divisor) + divisor) % divisor;

  const solve = (STEPS) => {
    const getNeighbors = ([row, col]) =>
      [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ].filter(
        ([row, col]) =>
          grid[posRem(row, grid.length)][posRem(col, grid[0].length)] !== "#"
      );

    const seen = new Set();
    let gardenPlots = [start];
    let finalPlots = 0;

    for (let remSteps = STEPS; remSteps >= 0; remSteps--) {
      const newPlots = [];
      for (const plot of gardenPlots) {
        const seenKey = plot.join("/");
        if (seen.has(seenKey)) continue;
        seen.add(seenKey);
        if (remSteps % 2 === 0) {
          finalPlots += 1;
        }

        newPlots.push(...getNeighbors(plot, remSteps));
      }
      gardenPlots = [...new Set(newPlots.map(key))].map(parseKey);
    }
    return finalPlots;
  };

  // calculate values for 0.5, 1.5, 2.5 and 3.5 grid lengths
  let solutions = Array.from({ length: 4 }).map((_, i) =>
    solve(Math.floor((i + 0.5) * grid.length))
  );
  console.log(solutions);

  // create a system of 3 equations by pluggin in the first 3 results into
  // f(x) = ax^2 + bx + c and solve the system to get the quadratic formula

  // or put solutions into WolframAlpha...
  // https://www.wolframalpha.com/input?i=%7B3896%2C+34617%2C+95900%2C+187745%7D

  // ...and let it find this quadratic formula to calculate our final solution
  const formula = (x) => 15281 * x ** 2 - 15122 * x + 3737;

  // plug in total number of times the grid needs to be repeated in each
  // direction to cover 26501365 steps
  const result = formula(Math.ceil(26501365 / grid.length));

  return { output: result, expected: 625382480005896 };
});
