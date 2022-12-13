// Day 13: Distress Signal
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const divider1 = [[2]];
  const divider2 = [[6]];

  const packets = input
    .split("\n\n")
    .map((pair) => pair.split("\n").map(JSON.parse))
    .reduce((acc, cur) => acc.concat(cur), []);

  const compare = (l, r) => {
    if (l == null && r == null) return 0;
    if (l == null) return -1;
    if (r == null) return 1;

    if (!Array.isArray(l) && !Array.isArray(r)) {
      if (l === r) return 0;
      return l < r ? -1 : 1;
    }

    if (!Array.isArray(l)) {
      l = [l];
    }
    if (!Array.isArray(r)) {
      r = [r];
    }

    for (let i = 0; i < l.length || i < r.length; i++) {
      const result = compare(l[i], r[i]);
      if (result !== 0) return result;
    }
    return 0;
  };

  let div1Idx = 1;
  let div2Idx = 2;

  for (const packet of packets) {
    if (compare(divider1, packet) === 1) {
      div1Idx++;
      div2Idx++;
    } else if (compare(divider2, packet) === 1) {
      div2Idx++;
    }
  }

  return { output: div1Idx * div2Idx, expected: 27648 };
});
