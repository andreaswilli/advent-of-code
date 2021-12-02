// Day 2: Dive!
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const steps = input.split("\n").map((step) => {
    const [direction, amount] = step.split(" ");
    return { direction, amount: Number(amount) };
  });
  let aim = 0;
  let depth = 0;
  let horizontalPos = 0;

  for ({ direction, amount } of steps) {
    if (direction === "down") aim += amount;
    else if (direction === "up") aim -= amount;
    else {
      horizontalPos += amount;
      depth += amount * aim;
    }
  }

  return { output: horizontalPos * depth };
});
