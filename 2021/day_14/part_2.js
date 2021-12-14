// Day 14: Extended Polymerization
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [templateStr, insertions] = input.split("\n\n");

  insertions = insertions.split("\n");
  const insertionRules = new Map();
  insertions
    .map((ins) => ins.split(" -> "))
    .forEach(([pair, newEl]) => insertionRules.set(pair, newEl));

  let elCounts = new Map();
  let pairCounts = new Map();

  for (let i = 0; i < templateStr.length; i++) {
    const el = templateStr[i];
    addToCount(elCounts, el, 1);

    const nextEl = templateStr[i + 1];
    if (nextEl) {
      addToCount(pairCounts, el + nextEl, 1);
    }
  }

  const STEPS = 40;

  for (let i = 0; i < STEPS; i++) {
    applyStep();
  }

  return { output: calculateScore(), expected: 3018019237563 };

  // helpers
  function applyStep() {
    const newElCounts = new Map(elCounts);
    const newPairCounts = new Map(pairCounts);

    for (const [pair, newEl] of insertionRules) {
      const insertions = pairCounts.get(pair);
      if (!insertions) continue;

      addToCount(newElCounts, newEl, insertions);
      addToCount(newPairCounts, pair, -insertions);
      addToCount(newPairCounts, pair[0] + newEl, insertions);
      addToCount(newPairCounts, newEl + pair[1], insertions);
    }

    elCounts = newElCounts;
    pairCounts = newPairCounts;
  }

  function addToCount(map, key, n) {
    map.set(key, (map.get(key) ?? 0) + n);
  }

  function calculateScore() {
    const sortedCounts = [...elCounts.values()].sort((a, b) => a - b);
    return sortedCounts.pop() - sortedCounts[0];
  }
});
