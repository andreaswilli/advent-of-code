// Day 4: Scratchcards
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let sum = 0;
  const cards = input.split("\n").map((line) =>
    line
      .split(/: +/)[1]
      .split(/ \| +/)
      .map((group) => new Set(group.split(/ +/).map(Number)))
  );

  for (const [winning, numbers] of cards) {
    let value = 0;
    for (const w of winning) {
      if (numbers.has(w)) {
        value = value ? value * 2 : 1;
      }
    }
    sum += value;
  }

  return { output: sum, expected: 19135 };
});
