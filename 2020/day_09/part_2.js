// Day 9: Encoding Error
// Part Two
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

  const findWeakness = (number, numbers) => {
    for (let i = 0; i < numbers.length - 1; i++) {
      let sum = numbers[i];
      let j;
      for (j = i + 1; j < numbers.length && sum < number; j++) {
        // operations += 1;
        sum += numbers[j];
      }
      if (sum === number) return numbers.slice(i, j);
    }
  };

  const numbers = input.split("\n").map((n) => Number(n));
  let invalidNumber;

  for (let i = preambleLength; i < numbers.length; i++) {
    if (!isValid(numbers[i], numbers.slice(i - preambleLength, i))) {
      invalidNumber = numbers[i];
      break;
    }
  }

  const weakness = findWeakness(invalidNumber, numbers);
  output = Math.min(...weakness) + Math.max(...weakness);

  return { output /*, operations */ };
};

// output: 245848639
run(func);
