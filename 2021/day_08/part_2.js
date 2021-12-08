// Day 8: Seven Segment Search
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const lines = input
    .split("\n")
    .map((line) => line.split(" | ").map((s) => s.split(" ")));
  let sum = 0;

  for (const [inputPatterns, patterns] of lines) {
    const one = inputPatterns.find((p) => p.length === 2);
    const four = inputPatterns.find((p) => p.length === 4);
    let decoded = "";

    for (const pattern of patterns) {
      decoded += decode(pattern, one, four);
    }
    sum += parseInt(decoded, 10);
  }

  return { output: sum };

  // helpers
  function decode(pattern, one, four) {
    if (pattern.length === 2) return 1;
    if (pattern.length === 3) return 7;
    if (pattern.length === 4) return 4;
    if (pattern.length === 7) return 8;

    if (pattern.length === 5 && countCommon(pattern, one) === 2) return 3;
    if (pattern.length === 5 && countCommon(pattern, four) === 2) return 2;
    if (pattern.length === 5) return 5;

    if (countCommon(pattern, one) === 1) return 6;
    if (countCommon(pattern, four) === 3) return 0;
    return 9;
  }

  function countCommon(patternA, patternB) {
    return patternA.split("").filter((a) => patternB.includes(a)).length;
  }
});
