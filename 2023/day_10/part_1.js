// Day 10: Pipe Maze
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n");
  const start = { row: null, col: null };
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "S") {
        start.row = row;
        start.col = col;
        break;
      }
    }
  }

  function move(dir) {
    prevDir = dir;
    loopSize += 1;
    switch (dir) {
      case "U":
        pos.row -= 1;
        break;
      case "D":
        pos.row += 1;
        break;
      case "L":
        pos.col -= 1;
        break;
      case "R":
        pos.col += 1;
        break;
    }
  }

  function getNextDir(pipe, prevDir) {
    switch (pipe) {
      case "F":
        return prevDir === "U" ? "R" : "D";
      case "7":
        return prevDir === "U" ? "L" : "D";
      case "J":
        return prevDir === "D" ? "L" : "U";
      case "L":
        return prevDir === "D" ? "R" : "U";
      case "|":
      case "-":
        return prevDir;
    }
  }

  const pos = { ...start };
  let prevDir = null;
  let loopSize = 0;

  if (["7", "F"].includes(grid[start.row - 1]?.[start.col])) {
    move("U");
  } else {
    move("D");
  }

  while (pos.row !== start.row || pos.col !== start.col) {
    move(getNextDir(grid[pos.row][pos.col], prevDir));
  }

  return { output: loopSize / 2, expected: 6725 };
});
