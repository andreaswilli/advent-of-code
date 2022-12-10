// Day 10: Cathode-Ray Tube
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const instructions = input.split("\n");
  let register = 1;
  let cycle = 0;
  const litPixels = new Set();

  const processCycle = () => {
    cycle++;
    if (register - 1 <= (cycle - 1) % 40 && register + 1 >= (cycle - 1) % 40) {
      litPixels.add(cycle);
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

  let line = "";
  for (let i = 1; i <= cycle; i++) {
    line += litPixels.has(i) ? "#" : ".";
    if (i % 40 === 0) {
      console.log(line);
      line = "";
    }
  }

  return { output: "(see console.log)", expected: "EFGERURE" };
});
