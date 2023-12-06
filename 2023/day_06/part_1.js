// Day 6: Wait For It
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const [times, distances] = input
    .split("\n")
    .map((line) => line.split(/: +/)[1].split(/ +/).map(Number));

  const waysToBeat = [];
  for (let i = 0; i < times.length; i++) {
    let ways = 0;
    for (let j = 1; j < times[i]; j++) {
      if (j * (times[i] - j) > distances[i]) {
        ways += 1;
      }
    }
    waysToBeat.push(ways);
  }
  const product = waysToBeat.reduce((acc, cur) => acc * cur, 1);

  return { output: product, expected: 1660968 };
});
