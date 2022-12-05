// Day 5: Supply Stacks
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [cargo, steps] = input
    .split("\n\n")
    .map((paragraph) => paragraph.split("\n"));
  let cols = cargo[cargo.length - 1];
  cargo.splice(-1, 1);
  const stacks = Array(cols.split("   ").length)
    .fill(null)
    .map(() => []);

  for (let i = cargo.length - 1; i >= 0; i--) {
    for (let j = 0; 4 * j + 1 < cargo[i].length; j++) {
      const crate = cargo[i][4 * j + 1];
      if (crate !== " ") {
        stacks[j].push(crate);
      }
    }
  }

  const stepPattern = new RegExp(/^move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)$/);

  for (const step of steps) {
    const [, count, fromStack, toStack] = stepPattern.exec(step);
    for (let i = 0; i < count; i++) {
      stacks[toStack - 1].push(stacks[fromStack - 1].pop());
    }
  }

  return {
    output: stacks.reduce((res, stack) => res + stack[stack.length - 1], ""),
    expected: "ZBDRNPMVH",
  };
});
