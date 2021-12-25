// Day 24: Arithmetic Logic Unit
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

// did not solve on my own
// explanation: https://github.com/mrphlip/aoc/blob/master/2021/24.md
run(() => {
  const instructions = input.split("\n").map((line) => Number(line.slice(6)));

  const inputLength = 14;
  const sequenceSteps = 18;
  const params = [];

  for (let i = 0; i < inputLength; i++) {
    params.push([
      instructions[i * sequenceSteps + 4],
      instructions[i * sequenceSteps + 5],
      instructions[i * sequenceSteps + 15],
    ]);
  }

  const stack = [];
  const pairs = [];

  for (let i = 0; i < params.length; i++) {
    const [a, b, c] = params[i];
    if (a === 1) {
      stack.push([i, c]);
    } else {
      const [prev_i, prev_c] = stack.pop();
      pairs.push([prev_i, i, prev_c + b]);
    }
  }
  return { output: calculateMinModelNo(pairs), expected: 11815671117121 };

  // helpers
  function calculateMinModelNo(pairs) {
    const modelNo = Array(inputLength).fill("");

    for (const [i, j, diff] of pairs) {
      modelNo[i] = diff >= 0 ? "1" : `${1 - diff}`;
      modelNo[j] = diff >= 0 ? `${1 + diff}` : "1";
    }

    return Number(modelNo.join(""));
  }
});
