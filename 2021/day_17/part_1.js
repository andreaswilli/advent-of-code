// Day 17: Trick Shot
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const target = input
    .slice(13)
    .split(", ")
    .map((range) => range.split("="))
    .map(([dir, range]) => [dir, range.split("..").map(Number)])
    .reduce((obj, [dir, [min, max]]) => ({ ...obj, [dir]: { min, max } }), {});

  const velocity = Math.abs(target.y.min) - 1;

  return { output: (velocity * (velocity + 1)) / 2, expected: 4278 };
});
