// Day 15: Beacon Exclusion Zone
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const TARGET_ROW = 2_000_000;
  const blocked = new Set();

  const manhattan = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

  for (const line of input.split("\n")) {
    const [, sensorX, sensorY, beaconX, beaconY] =
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
        .exec(line)
        .map(Number);
    const dist = manhattan(sensorX, sensorY, beaconX, beaconY);
    const yDist = Math.abs(TARGET_ROW - sensorY);
    const xDist = dist - yDist;
    for (let x = sensorX - xDist; x < sensorX + xDist; x++) {
      blocked.add(x);
    }
  }

  return { output: blocked.size, expected: 5367037 };
});
