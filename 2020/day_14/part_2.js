// Day 14: Docking Data
// Part Two
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
    return num | setTo1Mask;
  };

  const binaryOfLength = (len, num) => num.toString(2).padStart(len, "0");

  const applyMask = (num) => {
    const base2 = binaryOfLength(36, num);
    const lowerHalfNum = parseInt(base2.substr(18), 2);
    const upperHalfNum = parseInt(base2.substr(0, 18), 2);
    const maskedBase2 =
      binaryOfLength(18, applySubMask(upperHalfNum, mask.substr(0, 18))) +
      binaryOfLength(18, applySubMask(lowerHalfNum, mask.substr(18)));
    return maskedBase2
      .split("")
      .map((c, i) => (mask[i] === "X" ? "X" : c))
      .join("");
  };

  const writeToAddresses = (val, addr) => {
    const floatingBits = (addr.match(/X/g) || []).length;
    if (floatingBits === 0) return;

    for (let i = 0; i < 2 ** floatingBits; i++) {
      const base2 = binaryOfLength(floatingBits, i);
      let address = addr;
      for (j in base2) {
        // operations += 1;
        address = address.replace(/X/, base2[j]);
      }
      memory.set(parseInt(address, 2), val);
    }
  };

  for (ins of instructions) {
    const [, newMask] = /^mask = ([01X]{36})$/.exec(ins) || [];

    if (newMask) {
      mask = newMask;
      continue;
    }

    const [, addr, value] = /^mem\[(\d*)\] = (\d*)$/.exec(ins);
    const addrWithFloatingBits = applyMask(Number(addr));
    writeToAddresses(Number(value), addrWithFloatingBits);
  }

  for (val of memory.values()) {
    output += val;
  }

  return { output /*, operations */ };
};

// output: 4330547254348
run(func);
