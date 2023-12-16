// Day 15: Lens Library
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const steps = input.split(",");

  function hash(str) {
    let currentValue = 0;
    for (const char of str) {
      currentValue += char.charCodeAt(0);
      currentValue *= 17;
      currentValue %= 256;
    }
    return currentValue;
  }

  const sum = steps.reduce((acc, cur) => acc + hash(cur), 0);

  return { output: sum, expected: 498538 };
});
