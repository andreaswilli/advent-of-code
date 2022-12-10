// Day 9: Rope Bridge
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const visited = new Set(["0,0"]);
  const knots = Array(10)
    .fill(null)
    .map(() => ({ x: 0, y: 0 }));
  const steps = input.split("\n");
  const movement = {
    R: { axis: "x", amount: 1 },
    L: { axis: "x", amount: -1 },
    D: { axis: "y", amount: 1 },
    U: { axis: "y", amount: -1 },
  };

  for (const step of steps) {
    let [dir, dist] = step.split(" ");
    for (let i = 0; i < Number(dist); i++) {
      knots[0][movement[dir].axis] += movement[dir].amount;

      for (let i = 1; i < knots.length; i++) {
        const xOff = knots[i - 1].x - knots[i].x;
        const yOff = knots[i - 1].y - knots[i].y;
        if (Math.max(Math.abs(xOff), Math.abs(yOff)) <= 1) break;

        if (xOff === 0) {
          knots[i].y += yOff > 0 ? 1 : -1;
        } else if (yOff === 0) {
          knots[i].x += xOff > 0 ? 1 : -1;
        } else {
          knots[i].x += xOff > 0 ? 1 : -1;
          knots[i].y += yOff > 0 ? 1 : -1;
        }
        visited.add(
          `${knots[knots.length - 1].x},${knots[knots.length - 1].y}`
        );
      }
    }
  }

  return { output: visited.size, expected: 2724 };
});
