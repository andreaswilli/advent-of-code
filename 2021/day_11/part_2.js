// Day 11: Dumbo Octopus
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n").map((line) => line.split("").map(Number));
  const size = grid.length;
  const flashedOctopuses = new Set();
  let step;

  for (let i = 0; i < Infinity; i++) {
    applyToEach((row, col) => {
      grid[row][col]++;
    });

    while (canFlash()) {
      applyToEach((row, col) => {
        if (grid[row][col] > 9) {
          simulateFlash(row, col);
        }
      });
    }

    if (flashedOctopuses.size === size * size) {
      step = i + 1;
      break;
    }

    for (const octopus of flashedOctopuses) {
      const [row, col] = octopus.split(",").map(Number);
      grid[row][col] = 0;
    }
    flashedOctopuses.clear();
  }

  return { output: step };

  // helpers
  function applyToEach(func) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        func(row, col);
      }
    }
  }

  function canFlash() {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (grid[row][col] > 9 && !flashedOctopuses.has(`${row},${col}`)) {
          return true;
        }
      }
    }
    return false;
  }

  function simulateFlash(row, col) {
    if (flashedOctopuses.has(`${row},${col}`)) return;

    flashedOctopuses.add(`${row},${col}`);
    incrementNeighbors(row, col);
  }

  function incrementNeighbors(row, col) {
    for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
      if (currentRow < 0 || currentRow >= size) continue;

      for (let currentCol = col - 1; currentCol <= col + 1; currentCol++) {
        if (currentCol < 0 || currentCol >= size) continue;
        if (currentRow === row && currentCol === col) continue;

        grid[currentRow][currentCol]++;
      }
    }
  }
});
