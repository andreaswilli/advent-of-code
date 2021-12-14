// Day 14: Extended Polymerization
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [template, insertions] = input.split("\n\n");
  template = template.split("");
  insertions = insertions.split("\n");
  const insertionRules = new Map();
  insertions
    .map((ins) => ins.split(" -> "))
    .forEach(([pair, newElement]) => insertionRules.set(pair, newElement));

  const STEPS = 10;

  for (let i = 0; i < STEPS; i++) {
    applyStep();
  }

  return { output: calculateScore(), expected: 2447 };

  // helpers
  function applyStep() {
    const insertions = [];

    for (let i = 0; i < template.length - 1; i++) {
      const newElement = insertionRules.get(template[i] + template[i + 1]);
      insertions.unshift([newElement, i + 1]);
    }

    for (const [newElement, i] of insertions) {
      template.splice(i, 0, newElement);
    }
  }

  function calculateScore() {
    const counts = new Map();
    for (const element of template) {
      counts.set(element, (counts.get(element) ?? 0) + 1);
    }
    const sortedCounts = [...counts]
      .sort((a, b) => a[1] - b[1])
      .map((count) => count[1]);
    return sortedCounts.pop() - sortedCounts[0];
  }
});
