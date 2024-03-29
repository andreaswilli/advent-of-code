// Day 1: The Tyranny of the Rocket Equation
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  output = input.reduce((sum, inp) => sum + (Math.floor(inp / 3) - 2), 0);

  return { output /*, operations */ };
};

// output: 3270338
run(func);
