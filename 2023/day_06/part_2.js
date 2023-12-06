// Day 6: Wait For It
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const [time, distance] = input
    .split("\n")
    .map((line) => line.split(/: +/)[1].replace(/ /g, '')).map(Number);

  let waysToBeat = 0;
    for (let i = 1; i < time; i++) {
      if (i * (time - i) > distance) {
        waysToBeat += 1;
      }
    }

  return { output: waysToBeat, expected: 26499773 };
});
