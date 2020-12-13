// Day 11: Seating System
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  let grid = input.split("\n").map((row) => row.split(""));

  const getAdjPos = (row, col) => {
    const adj = [];

    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        // operations += 1;
        if (i === row && j === col) continue;
        const pos = (grid[i] || [])[j];
        if (!pos) continue;
        adj.push(pos);
      }
    }
    return adj;
  };

  const hasNoOccupiedAdjSeats = (row, col) => {
    return !getAdjPos(row, col).some((pos) => pos === "#");
  };

  const hasFourOccupiedAdjSeats = (row, col) => {
    return getAdjPos(row, col).filter((pos) => pos === "#").length >= 4;
  };

  let hasChanged;
  do {
    hasChanged = false;
    let newGrid = [...grid].map((row) => [...row]);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        switch (grid[i][j]) {
          case ".":
            break;
          case "L":
            if (hasNoOccupiedAdjSeats(i, j)) {
              hasChanged = true;
              newGrid[i][j] = "#";
            }
            break;
          case "#":
            if (hasFourOccupiedAdjSeats(i, j)) {
              hasChanged = true;
              newGrid[i][j] = "L";
            }
            break;
        }
      }
    }

    grid = [...newGrid].map((row) => [...row]);
  } while (hasChanged);

  output = grid.flat().join("").match(/#/g).length;

  return { output /*, operations */ };
};

// output: 2299
run(func);
