// Day 15: Rambunctious Recitation
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const numbers = input.split(",").map((n) => Number(n));
  const lastOccurrence = new Map();

  numbers.slice(0, -1).forEach((n, i) => {
    lastOccurrence.set(n, i);
  });

  let number = numbers.slice(-1)[0];

  for (let i = numbers.length; i < 30000000; i++) {
    const previous = lastOccurrence.get(number);
    lastOccurrence.set(number, i - 1);
    number = previous == null ? 0 : i - 1 - previous;
  }

  output = number;

  return { output /*, operations */ };
};

// output: 9007186
run(func);
