// Day 11: Seating System
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  let grid = input.split("\n").map((row) => row.split(""));

  const findSeatInDirection = (row, col, y, x) => {
    while (
      row >= 0 &&
      row < grid.length &&
      col >= 0 &&
      col < grid[row].length
    ) {
      // operations += 1;
      row += y;
      col += x;
      const pos = (grid[row] || [])[col];
      if (pos && pos !== ".") {
        return pos;
      }
    }
    return null;
  };

  const getVisibleSeats = (row, col) => {
    const adj = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const pos = findSeatInDirection(row, col, i, j);
        if (!pos) continue;
        adj.push(pos);
      }
    }
    return adj;
  };

  const hasNoOccupiedVisibleSeats = (row, col) => {
    return !getVisibleSeats(row, col).some((pos) => pos === "#");
  };

  const hasFiveOccupiedVisibleSeats = (row, col) => {
    return getVisibleSeats(row, col).filter((pos) => pos === "#").length >= 5;
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
            if (hasNoOccupiedVisibleSeats(i, j)) {
              hasChanged = true;
              newGrid[i][j] = "#";
            }
            break;
          case "#":
            if (hasFiveOccupiedVisibleSeats(i, j)) {
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

// output: 2047
run(func);
