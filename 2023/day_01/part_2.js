// Day 1: Trebuchet?!
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const numberMapping = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };

  const sum = input
    .split("\n")
    .map((line) => {
      let firstDigit, lastDigit;
      for (let i = 0; i < line.length; i++) {
        for (const l of [1,3,4,5]) {
          if (i+l > line.length) break;
          const match = numberMapping[line.slice(i, i+l)]
          if (match) {
            if (!firstDigit) firstDigit = match
            lastDigit = match
            break;
          }
        }
      }
      return firstDigit * 10 + lastDigit;
    })
    .reduce((acc, cur) => acc + cur);

  return { output: sum, expected: 56324 };
});
