// Day 5: Hydrothermal Venture
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const lines = input
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((point) => point.split(",").map(Number))
    );

  const coveredOnce = new Set();
  const overlapping = new Set();

  for (const [[x1, y1], [x2, y2]] of lines) {
    const distance = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    const xDir = getDirection(x1, x2);
    const yDir = getDirection(y1, y2);

    for (let moved = 0; moved <= distance; moved++) {
      processPoint([x1 + moved * xDir, y1 + moved * yDir]);
    }
  }

  return { output: overlapping.size };

  // helpers
  function processPoint(point) {
    const key = point.toString();
    if (!coveredOnce.has(key)) {
      coveredOnce.add(key);
    } else {
      overlapping.add(key);
    }
  }

  function getDirection(x, y) {
    if (x < y) return 1; // right or down
    if (x > y) return -1; // left or up
    return 0; // no change
  }
});
