// Day 11: Cosmic Expansion
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n");
  const emptyRows = countEmpty(grid);
  const rotatedGrid = grid.map((_, i) => grid.map((row) => row[i]).join(""));
  const emptyCols = countEmpty(rotatedGrid);
  const galaxies = grid
    .map((row, y) => row.split("").map((cell, x) => [cell, y, x]))
    .flat()
    .filter(([cell]) => cell === "#")
    .map(([_, y, x]) => [y, x]);

  function countEmpty(grid) {
    return grid
      .map((row, i) => [!row.includes("#"), i])
      .filter(([empty]) => empty)
      .map(([_, i]) => i);
  }

  function getExpanded(empty, a, b) {
    return (
      empty.filter((row) => (a < row && row < b) || (b < row && row < a))
        .length *
      (1_000_000 - 1)
    );
  }

  function expandedManhattenDistance([a_y, a_x], [b_y, b_x]) {
    return (
      Math.abs(a_x - b_x) +
      Math.abs(a_y - b_y) +
      getExpanded(emptyRows, a_y, b_y) +
      getExpanded(emptyCols, a_x, b_x)
    );
  }

  let totalDistance = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      totalDistance += expandedManhattenDistance(galaxies[i], galaxies[j]);
    }
  }

  return { output: totalDistance, expected: 593821230983 };
});
