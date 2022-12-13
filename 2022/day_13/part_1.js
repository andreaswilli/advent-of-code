// Day 13: Distress Signal
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const packets = input.split("\n\n").map((pair, i) => {
    const [l, r] = pair.split("\n").map(eval);
    return { i: i + 1, l, r };
  });

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

  return {
    output: packets
      .filter((packet) => compare(packet.l, packet.r) === -1)
      .reduce((sum, { i }) => sum + i, 0),
    expected: 5330,
  };
});
