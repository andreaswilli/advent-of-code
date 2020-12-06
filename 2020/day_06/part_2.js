// Day 6: Custom Customs
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  output = input
    .split("\n\n")
    .map((group) => {
      const people = group.split("\n");
      return people[0]
        .split("")
        .filter((answer) => people.slice(1).every((a) => a.includes(answer)))
        .length;
    })
    .reduce((sum, count) => sum + count);

  return { output /*, operations */ };
};

// output: 3466
run(func);
