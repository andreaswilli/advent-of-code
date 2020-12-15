// Day 14: Docking Data
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations

  const instructions = input.split("\n");
  const memory = new Map();
  let mask;

  const applySubMask = (num, subMask) => {
    const setTo1Mask = parseInt(subMask.replace(/X/g, "0"), 2);
    const setTo0Mask = parseInt(subMask.replace(/X/g, "1"), 2);
    return (num | setTo1Mask) & setTo0Mask;
  };

  const applyMask = (num) => {
    const base2 = num.toString(2).padStart(36, "0");
    const lowerHalfNum = parseInt(base2.substr(18), 2);
    const upperHalfNum = parseInt(base2.substr(0, 18), 2);
    return (
      applySubMask(lowerHalfNum, mask.substr(18)) +
      applySubMask(upperHalfNum, mask.substr(0, 18)) * 2 ** 18
    );
  };

  for (ins of instructions) {
    const [, newMask] = /^mask = ([01X]{36})$/.exec(ins) || [];

    if (newMask) {
      mask = newMask;
      continue;
    }

    const [, addr, value] = /^mem\[(\d*)\] = (\d*)$/.exec(ins);
    memory.set(Number(addr), applyMask(Number(value)));
  }

  for (val of memory.values()) {
    output += val;
  }

  return { output /*, operations */ };
};

// output: 11926135976176
run(func);
