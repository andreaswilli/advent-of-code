// Day 3: Toboggan Trajectory
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const lines = input.split("\n");
  let trees = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i][(i * 3) % lines[i].length] === "#") {
      trees += 1;
    }
  }

  output = trees;

  return { output /*, operations */ };
};

// output: 259
run(func);
