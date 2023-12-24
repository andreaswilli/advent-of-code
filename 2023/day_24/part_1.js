// Day 24: Never Tell Me The Odds
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const LOWER_BOUND = 200000000000000;
  const UPPER_BOUND = 400000000000000;

  const hailstones = input
    .split("\n")
    .map((line) =>
      line.split(" @ ").map((part) => part.split(", ").map(Number))
    )
    .map(([[x, y], [vx, vy]]) => ({
      x,
      y,
      vx,
      vy,
      a: vy / vx,
      b: y - (vy * x) / vx,
    }));

  const outOfBounds = (val) => LOWER_BOUND > val || val > UPPER_BOUND;

  const past = (x, hailstone) => (x - hailstone.x) * hailstone.vx < 0;

  let intersectionsInBounds = 0;

  for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      const h1 = hailstones[i];
      const h2 = hailstones[j];

      if (h1.a === h2.a) continue; // parallel -> no intersection

      const xIntersection = (h2.b - h1.b) / (h1.a - h2.a);
      const yIntercestion = (h1.a * h2.b - h2.a * h1.b) / (h1.a - h2.a);

      if (past(xIntersection, h1) || past(xIntersection, h2)) continue;

      if (outOfBounds(xIntersection) || outOfBounds(yIntercestion)) continue;

      intersectionsInBounds += 1;
    }
  }

  return { output: intersectionsInBounds, expected: 15593 };
});
