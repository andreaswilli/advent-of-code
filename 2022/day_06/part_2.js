// Day 6: Tuning Trouble
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let i = 0;
  const window = [];
  const SEQ_LEN = 14;

  while (new Set(window).size < SEQ_LEN) {
    window[i % SEQ_LEN] = input[i];
    i++;
  }

  return { output: i, expected: 3444 };
});
