// Day 13: Transparent Origami
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [points, folds] = input
    .split("\n\n")
    .map((section) => section.split("\n"));

  points = new Set(points);

  folds = folds.map((f) => {
    const [axis, position] = f.split(" ")[2].split("=");
    return [axis, Number(position)];
  });

  for (const [axis, position] of folds) {
    fold(axis, position);
  }

  printPoints(points);
  return { output: null };

  // helpers
  function fold(axis, foldPos) {
    const newPoints = new Set();

    for (const point of points) {
      const [x, y] = point.split(",");

      if (axis === "x") {
        newPoints.add(x > foldPos ? `${2 * foldPos - x},${y}` : point);
      } else {
        newPoints.add(y > foldPos ? `${x},${2 * foldPos - y}` : point);
      }
      points = newPoints;
    }
  }

  function printPoints(points) {
    for (let row = 0; row < 6; row++) {
      let line = "";
      for (let col = 0; col < 40; col++) {
        line += points.has(`${col},${row}`) ? "#" : " ";
      }
      console.log(line);
    }
  }
});
