// Day 10: Pipe Maze
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n").map((row) => row.split(""));
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
    pipeLoop.add(key(pos));
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

  function key(pos) {
    return `${pos.row},${pos.col}`;
  }

  function isEnclosed(pos) {
    if (pipeLoop.has(key(pos))) return false;

    let numPipes = 0;
    let i = 0;
    while (i < pos.col) {
      if (pipeLoop.has(key({ row: pos.row, col: i }))) {
        if (["L", "F"].includes(grid[pos.row][i])) {
          const horizontalStart = grid[pos.row][i];
          do {
            i += 1;
          } while (grid[pos.row][i] === "-");
          if (
            (horizontalStart === "L" && grid[pos.row][i] === "7") ||
            (horizontalStart === "F" && grid[pos.row][i] === "J")
          ) {
            numPipes += 1;
          }
        } else {
          numPipes += 1;
        }
      }
      i += 1;
    }
    return numPipes % 2 === 1;
  }

  const pos = { ...start };
  let prevDir = null;
  let loopSize = 0;

  const pipeLoop = new Set(key(pos));

  const topNeighbor = grid[start.row - 1]?.[start.col];
  const leftNeighbor = grid[start.row]?.[start.col - 1];
  if (["7", "F"].includes(topNeighbor)) {
    grid[start.row][start.col] = ["F", "L"].includes(leftNeighbor) ? "J" : "L";
    move("U");
  } else {
    grid[start.row][start.col] = ["F", "L"].includes(leftNeighbor) ? "7" : "F";
    move("D");
  }

  while (pos.row !== start.row || pos.col !== start.col) {
    move(getNextDir(grid[pos.row][pos.col], prevDir));
  }

  let enclosedTiles = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isEnclosed({ row, col })) {
        enclosedTiles += 1;
      }
    }
  }

  return { output: enclosedTiles, expected: 383 };
});
