// Day 3: Rucksack Reorganization
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const itemsInCompartments = input
    .split("\n")
    .map((items) => [
      items.slice(0, items.length / 2),
      items.slice(items.length / 2),
    ]);

  const wrongItems = itemsInCompartments.map(([comp1, comp2]) =>
    [...new Set(comp1)].find((item) => new Set(comp2).has(item))
  );

  const priority = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return {
    output: wrongItems
      .map((item) => priority.indexOf(item))
      .reduce((sum, priority) => sum + priority),
    expected: 7821,
  };
});
