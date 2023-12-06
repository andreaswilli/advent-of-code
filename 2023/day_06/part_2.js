// Day 6: Wait For It
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const [time, distance] = input
    .split("\n")
    .map((line) => line.split(/: +/)[1].replace(/ /g, ""))
    .map(Number);

  // initial brute-force approach (good enough)
  // let waysToBeat = 0;
  //   for (let waitTime = 1; waitTime < time; waitTime++) {
  //     if (waitTime * (time - waitTime) > distance) {
  //       waysToBeat += 1;
  //     }
  //   }

  // alternative approach using quadratic formula
  // -waitTime^2 + time * waitTime - distance = 0
  const a = -1;
  const b = time;
  const c = -distance;

  const x1 = Math.ceil((-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a));
  const x2 = Math.floor((-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a));
  const waysToBeat = Math.abs(x1 - x2) + 1;

  return { output: waysToBeat, expected: 26499773 };
});
