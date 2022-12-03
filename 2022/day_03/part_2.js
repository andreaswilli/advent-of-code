// Day 3: Rucksack Reorganization
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const rucksacks = input.split("\n");

  const groups = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push(rucksacks.slice(i, i + 3));
  }

  const badges = groups.map(([i1, i2, i3]) =>
    [...new Set(i1)].find(
      (item) => new Set(i2).has(item) && new Set(i3).has(item)
    )
  );

  const priority = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return {
    output: badges
      .map((item) => priority.indexOf(item))
      .reduce((sum, priority) => sum + priority),
    expected: 2752,
  };
});
