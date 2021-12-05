// Day 5: Hydrothermal Venture
// Part One
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
    if (x1 === x2) {
      // horizontal
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        processPoint([x1, i]);
      }
    } else if (y1 === y2) {
      // vertical
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        processPoint([i, y1]);
      }
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
});
