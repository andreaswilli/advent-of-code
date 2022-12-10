// Day 8: Treetop Tree House
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const forrest = input.split("\n").map((row) => row.split("").map(Number));
  const visibleTrees = new Set();

  for (let row = 0; row < forrest.length; row++) {
    // left
    let maxHeight = -1;
    for (let col = 0; col < forrest[row].length; col++) {
      if (forrest[row][col] > maxHeight) {
        visibleTrees.add(row + "," + col);
        maxHeight = forrest[row][col];
      }
    }
    // right
    maxHeight = -1;
    for (let col = forrest[row].length - 1; col >= 0; col--) {
      if (forrest[row][col] > maxHeight) {
        visibleTrees.add(row + "," + col);
        maxHeight = forrest[row][col];
      }
    }
    // top
    maxHeight = -1;
    for (let col = 0; col < forrest[row].length; col++) {
      if (forrest[col][row] > maxHeight) {
        visibleTrees.add(col + "," + row);
        maxHeight = forrest[col][row];
      }
    }
    // bottom
    maxHeight = -1;
    for (let col = forrest[row].length - 1; col >= 0; col--) {
      if (forrest[col][row] > maxHeight) {
        visibleTrees.add(col + "," + row);
        maxHeight = forrest[col][row];
      }
    }
  }

  return { output: visibleTrees.size, expected: 1736 };
});
