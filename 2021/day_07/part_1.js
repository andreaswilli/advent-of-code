// Day 7: The Treachery of Whales
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const positions = input.split(",").map(Number);

  let min = 0;
  let max = positions.length;

  while (max - min > 3) {
    const mid = Math.floor((min + max) / 2);
    if (calculateDistance(mid) < calculateDistance(mid + 1)) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }

  let minDist = Infinity;
  for (let i = min; i <= max; i++) {
    const dist = calculateDistance(i);
    if (dist < minDist) {
      minDist = dist;
    }
  }

  return { output: minDist };

  // helpers
  function calculateDistance(targetPos) {
    return positions
      .map((pos) => Math.abs(pos - targetPos))
      .reduce((sum, pos) => sum + pos, 0);
  }
});
