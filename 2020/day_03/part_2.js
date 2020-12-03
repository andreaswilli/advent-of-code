// Day 3: Toboggan Trajectory
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 1;
  // let operations = 0; // count the number of operations

  const lines = input.split("\n");

  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  for (let i = 0; i < slopes.length; i++) {
    let trees = 0;
    const { right, down } = slopes[i];

    for (let j = 0; j < lines.length; j += down) {
      if (lines[j][((j / down) * right) % lines[j].length] === "#") {
        trees += 1;
      }
    }
    output *= trees;
  }

  return { output /*, operations */ };
};

// output: 2224913600
run(func);
