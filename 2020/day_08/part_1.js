// Day 8: Handheld Halting
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const instructions = input.split("\n");
  const executed = Array(instructions).fill(false);
  let pos = 0;
  let accumulator = 0;

  while (!executed[pos]) {
    let [op, arg] = instructions[pos].split(" ");
    arg = Number(arg);

    executed[pos] = true;

    switch (op) {
      case "acc":
        accumulator += arg;
        pos += 1;
        break;
      case "jmp":
        pos += arg;
        break;
      case "nop":
        pos += 1;
        break;
      default:
        console.error("unknown operation", op);
        return;
    }
  }

  output = accumulator;

  return { output /*, operations */ };
};

// output: 1684
run(func);
