// Day 9: Encoding Error
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations
  const preambleLength = 25;

  const isValid = (number, preamble) => {
    for (let i = 0; i < preamble.length; i++) {
      // operations += 1;
      if (preamble.slice(i).includes(number - preamble[i])) {
        return true;
      }
    }
    return false;
  };

  const numbers = input.split("\n").map((n) => Number(n));

  for (let i = preambleLength; i < numbers.length; i++) {
    if (!isValid(numbers[i], numbers.slice(i - preambleLength, i))) {
      output = numbers[i];
      break;
    }
  }

  return { output /*, operations */ };
};

// output: 2089807806
run(func);
