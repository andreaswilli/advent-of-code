// Day 14: Parabolic Reflector Dish
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let grid = input.split("\n").map((row) => row.split(""));

  function tilt() {
    for (let i = 0; i < 4; i++) {
      for (let row = 1; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          if (grid[row][col] !== "O") continue;
          let j = 1;
          while (grid[row - j]?.[col] === ".") {
            grid[row - j][col] = "O";
            grid[row - j + 1][col] = ".";
            j += 1;
          }
        }
      }
      grid = grid.map((_, i) => grid.map((row) => row[i]).reverse());
    }
  }

  function calculateLoad(grid) {
    let totalLoad = 0;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] !== "O") continue;
        totalLoad += grid.length - row;
      }
    }
    return totalLoad;
  }

  const visited = [];
  let cycleStart, cycleLength;

  for (let i = 0; i < 1_000_000_000; i++) {
    const state = grid.map((row) => row.join("")).join("\n");
    const index = visited.indexOf(state);
    if (index >= 0) {
      cycleStart = index;
      cycleLength = i - index;
      break;
    }
    visited.push(state);
    tilt();
  }

  const endState =
    visited[((1_000_000_000 - cycleStart) % cycleLength) + cycleStart].split(
      "\n"
    );

  const load = calculateLoad(endState);

  return { output: load, expected: 100876 };
});
