// Day 5: If You Give A Seed A Fertilizer
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [seeds, ...mappings] = input.split("\n\n");
  seeds = seeds.split(": ")[1].split(" ").map(Number);
  mappings = mappings.map((mapping) =>
    mapping
      .split("\n")
      .slice(1)
      .map((range) => range.split(" ").map(Number))
      .map(([destStart, srcStart, length]) => ({
        min: srcStart,
        max: srcStart + length - 1,
        shiftBy: destStart - srcStart,
      }))
  );

  function map(num, mapping) {
    for (const range of mapping) {
      if (range.min <= num && num <= range.max) {
        return num + range.shiftBy;
      }
    }
    return num;
  }

  let min = Math.min(
    ...seeds.map((seed) =>
      mappings.reduce((result, mapping) => map(result, mapping), seed)
    )
  );

  return { output: min, expected: 175622908 };
});
