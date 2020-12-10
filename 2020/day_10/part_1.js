// Day 10: Adapter Array
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const adapters = input.split("\n").map((a) => Number(a));

  const steps = adapters.length + 1;

  const diff3 = (Math.max(...adapters) + 3 - steps) / 2;
  const diff1 = steps - diff3;

  output = diff1 * diff3;

  return { output /*, operations */ };
};

// output: 1876
run(func);
