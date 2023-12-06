// Day 6: Wait For It
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const [time, distance] = input
    .split("\n")
    .map((line) => line.split(/: +/)[1].replace(/ /g, '')).map(Number);

  let waysToBeat = 0;
    for (let waitTime = 1; waitTime < time; waitTime++) {
      if (waitTime * (time - waitTime) > distance) {
        waysToBeat += 1;
      }
    }

  return { output: waysToBeat, expected: 26499773 };
});
