// Day 9: Rope Bridge
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const visited = new Set(["0,0"]);
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };
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
      head[movement[dir].axis] += movement[dir].amount;

      const xOff = head.x - tail.x;
      const yOff = head.y - tail.y;
      if (Math.max(Math.abs(xOff), Math.abs(yOff)) > 1) {
        if (xOff === 0) {
          tail.y += yOff > 0 ? 1 : -1;
        } else if (yOff === 0) {
          tail.x += xOff > 0 ? 1 : -1;
        } else {
          tail.x += xOff > 0 ? 1 : -1;
          tail.y += yOff > 0 ? 1 : -1;
        }
        visited.add(`${tail.x},${tail.y}`);
      }
    }
  }

  return { output: visited.size, expected: 6503 };
});
