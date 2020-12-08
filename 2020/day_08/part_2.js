// Day 8: Handheld Halting
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations
  let pos;
  let accumulator;

  const instructions = input.split("\n");
  const executed = Array(instructions.length).fill(false);

  const execute = (_instructions) => {
    pos = 0;
    accumulator = 0;
    executed.fill(false);

    while (pos < _instructions.length && !executed[pos]) {
      // operations += 1;
      let [op, arg] = _instructions[pos].split(" ");
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
    return pos === _instructions.length ? 0 : 1;
  };

  let returnCode;
  let indexToModify = 0;

  while (returnCode !== 0) {
    const newInstructions = [...instructions];
    const index = newInstructions
      .slice(indexToModify)
      .findIndex((ins) => ins.startsWith("jmp") || ins.startsWith("nop"));

    if (index === -1) {
      console.error('No more "jmp" or "nop" operations.');
      return;
    }

    indexToModify += index;
    newInstructions[indexToModify] = newInstructions[indexToModify].replace(
      /^(jmp|nop)(.*)/,
      (_, op, arg) => `${op === "jmp" ? "nop" : "jmp"} ${arg}`
    );

    returnCode = execute(newInstructions);
    indexToModify += 1;
  }

  output = accumulator;

  return { output /*, operations */ };
};

// output: 2188
run(func);
