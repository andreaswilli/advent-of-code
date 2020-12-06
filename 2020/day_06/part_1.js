// Day 6: Custom Customs
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  output = input
    .split("\n\n")
    .map((group) =>
      group
        .split("\n")
        .reduce((allAnswers, answers) => allAnswers.concat(answers))
    )
    .map((answers) => new Set(answers.split("")).size)
    .reduce((sum, count) => sum + count);

  return { output /*, operations */ };
};

// output: 6549
run(func);
