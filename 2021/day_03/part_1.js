// Day 3: Binary Diagnostic
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const lines = input.split("\n");

  const calculate = (elements, bit, majority) => {
    if (bit >= elements[0].length) return "";

    const ones = elements.filter((el) => el[bit] === "1").length;
    const zeros = elements.length - ones;

    if ((majority && zeros > ones) || (!majority && zeros <= ones)) {
      return "0" + calculate(elements, bit + 1, majority);
    }
    return "1" + calculate(elements, bit + 1, majority);
  };

  const gamma = parseInt(calculate(lines, 0, true), 2);
  const epsilon = parseInt(calculate(lines, 0, false), 2);

  return { output: gamma * epsilon };
});
