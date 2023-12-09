// Day 9: Mirage Maintenance
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const series = input.split("\n").map((line) => line.split(" ").map(Number));

  let sum = 0;

  for (const s of series) {
    const stack = [s];
    while (new Set(stack.slice(-1)[0]).size > 1) {
      const diff = [];
      const last = stack.slice(-1)[0];
      for (let i = 1; i < last.length; i++) {
        diff.push(last[i] - last[i - 1]);
      }
      stack.push(diff);
    }

    for (let i = stack.length - 2; i >= 0; i--) {
      stack[i].unshift(stack[i][0] - stack[i + 1][0]);
    }
    sum += stack[0][0];
  }

  return { output: sum, expected: 933 };
});
