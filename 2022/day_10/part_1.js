// Day 10: Cathode-Ray Tube
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const instructions = input.split("\n");
  let signal = 0;
  let register = 1;
  let cycle = 0;

  const processCycle = () => {
    cycle++;
    if (cycle % 40 === 20) {
      signal += cycle * register;
    }
  };

  for (const instruction of instructions) {
    processCycle();
    if (instruction !== "noop") {
      const [, val] = instruction.split(" ").map(Number);
      processCycle();
      register += val;
    }
  }

  return { output: signal, expected: 14760 };
});
