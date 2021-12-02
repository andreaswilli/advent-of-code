// Day 2: Dive!
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const steps = input.split("\n").map((step) => {
    const [direction, amount] = step.split(" ");
    return { direction, amount: Number(amount) };
  });

  const sumForDirection = (dir) =>
    steps
      .filter(({ direction }) => direction === dir)
      .reduce((sum, { amount }) => sum + amount, 0);

  let horizontalPos = sumForDirection("forward");
  let depth = sumForDirection("down") - sumForDirection("up");

  return { output: horizontalPos * depth };
});
