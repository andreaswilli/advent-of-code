// Day 15: Beacon Exclusion Zone
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const MAX = 4_000_000;
  const distressSignal = {};

  const manhattan = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);
  const isBlocked = (x, y) =>
    sensorDists.some(
      ({ sensor, dist }) => manhattan(x, y, sensor.x, sensor.y) <= dist
    );

  const sensorDists = input.split("\n").map((line) => {
    const [, sensorX, sensorY, beaconX, beaconY] =
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
        .exec(line)
        .map(Number);
    return {
      sensor: { x: sensorX, y: sensorY },
      dist: manhattan(sensorX, sensorY, beaconX, beaconY),
    };
  });

  for (const { sensor, dist } of sensorDists) {
    let x = sensor.x;
    let y = Math.max(0, sensor.y - dist - 1);

    for (const [xDir, yDir] of [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ]) {
      for (let i = 0; i <= dist && distressSignal.x == null; i++) {
        if (x >= 0 && x <= MAX && y >= 0 && y <= MAX && !isBlocked(x, y)) {
          distressSignal.x = x;
          distressSignal.y = y;
        }
        x += xDir;
        y += yDir;
      }
      if (distressSignal.x != null) break;
    }
    if (distressSignal.x != null) break;
  }

  return {
    output: distressSignal.x * 4_000_000 + distressSignal.y,
    expected: 11914583249288,
  };
});
