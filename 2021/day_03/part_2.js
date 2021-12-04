// Day 3: Binary Diagnostic
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const lines = input.split("\n");

  const filter = (elements, bit, majority) => {
    if (elements.length < 2) return elements[0] ?? null;
    if (bit >= elements[0].length) return null;

    const ones = elements.filter((el) => el[bit] === "1");
    const zeros = elements.filter((el) => el[bit] === "0");

    if (
      (majority && zeros.length > ones.length) ||
      (!majority && zeros.length <= ones.length)
    ) {
      return filter(zeros, bit + 1, majority);
    }
    return filter(ones, bit + 1, majority);
  };

  const oxygen = parseInt(filter(lines, 0, true), 2);
  const co2 = parseInt(filter(lines, 0, false), 2);

  return { output: oxygen * co2 };
});
