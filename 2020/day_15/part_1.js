// Day 15: Rambunctious Recitation
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const numbers = input.split(",").map((n) => Number(n));

  for (let i = numbers.length; i < 2020; i++) {
    const previous = numbers.slice(0, -1).lastIndexOf(numbers[i - 1]);

    if (previous === -1) {
      numbers.push(0);
    } else {
      numbers.push(i - 1 - previous);
    }
  }

  output = numbers[numbers.length - 1];

  return { output /*, operations */ };
};

// output: 203
run(func);
