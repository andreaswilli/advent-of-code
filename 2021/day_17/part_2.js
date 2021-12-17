// Day 17: Trick Shot
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const target = input
    .slice(13)
    .split(", ")
    .map((range) => range.split("="))
    .map(([dir, range]) => [dir, range.split("..").map(Number)])
    .reduce((obj, [dir, [min, max]]) => ({ ...obj, [dir]: { min, max } }), {});

  let count = 0;
  const xLowerBound = 1;
  const xUpperBound = target.x.max;
  const yLowerBound = target.y.min;
  const yUpperBound = Math.abs(target.y.min) - 1;

  for (let x = xLowerBound; x <= xUpperBound; x++) {
    for (let y = yLowerBound; y <= yUpperBound; y++) {
      if (isHit(x, y)) count++;
    }
  }

  return { output: count, expected: 1994 };

  //helpers
  function isHit(vX, vY) {
    let x = 0;
    let y = 0;

    while (x <= target.x.max && y >= target.y.min) {
      if (isOnTarget(x, y)) return true;
      x += vX;
      y += vY;
      if (vX > 0) vX -= 1;
      vY -= 1;
    }
    return false;
  }

  function isOnTarget(x, y) {
    return (
      x >= target.x.min &&
      x <= target.x.max &&
      y >= target.y.min &&
      y <= target.y.max
    );
  }
});
