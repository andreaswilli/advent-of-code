// Day 13: Transparent Origami
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = [];
  let [points, folds] = input
    .split("\n\n")
    .map((section) => section.split("\n"));

  points.forEach((p) => addToGrid(...p.split(",").map(Number)));
  let gridHeight = grid.length;
  let gridWidth = grid.reduce((max, row) => Math.max(max, row.length), 0);

  folds = folds.map((f) => {
    const [axis, position] = f.split(" ")[2].split("=");
    return [axis, Number(position)];
  });

  for (const [axis, position] of folds) {
    fold(axis, position);
  }

  printGrid(grid);
  return { output: null };

  // helpers
  function fold(axis, foldPosition) {
    if (axis === "x") {
      for (let row = 0; row < gridHeight; row++) {
        if (!grid[row]) continue;

        for (let col = foldPosition + 1; col < gridWidth; col++) {
          if (!grid[row][col]) continue;

          const distanceFromFold = col - foldPosition;
          addToGrid(foldPosition - distanceFromFold, row);
        }
      }
      gridWidth = foldPosition;
    } else if (axis === "y") {
      for (let row = foldPosition + 1; row < gridHeight; row++) {
        if (!grid[row]) continue;

        for (let col = 0; col < gridWidth; col++) {
          if (!grid[row][col]) continue;

          const distanceFromFold = row - foldPosition;
          addToGrid(col, foldPosition - distanceFromFold);
        }
      }
      gridHeight = foldPosition;
    }
  }

  function addToGrid(col, row) {
    if (grid[row] == null) {
      grid[row] = [];
    }
    grid[row][col] = true;
  }

  function countPoints(grid) {
    let count = 0;

    for (let row = 0; row < gridHeight; row++) {
      if (!grid[row]) continue;

      for (let col = 0; col < gridWidth; col++) {
        if (grid[row][col]) {
          count++;
        }
      }
    }
    return count;
  }

  function printGrid(grid) {
    for (let i = 0; i < gridHeight; i++) {
      if (!grid[i]) continue;

      let row = "";
      for (let j = 0; j < gridWidth; j++) {
        row += grid[i][j] ? "#" : " ";
      }
      console.log(row);
    }
  }
});
