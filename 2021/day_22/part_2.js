// Day 22: title
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const instructions = input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([state, coords]) => [
      state,
      coords
        .split(",")
        .map((coord) => coord.split("="))
        .map(([_, values]) => values.split("..").map(Number)),
    ]);
  let posCuboids = [];
  let negCuboids = [];

  for (const [state, cuboid] of instructions) {
    const newNegCuboids = [];

    for (const c of posCuboids) {
      const intersection = intersect(cuboid, c);
      if (intersection != null) {
        newNegCuboids.push(intersection);
      }
    }

    for (const c of negCuboids) {
      const intersection = intersect(cuboid, c);
      if (intersection != null) {
        posCuboids.push(intersection);
      }
    }

    if (state === "on") {
      posCuboids.push(cuboid);
    }

    negCuboids.splice(negCuboids.length, 0, ...newNegCuboids);
  }

  let onCubes = 0;

  for (const c of posCuboids) {
    onCubes += volume(c);
  }
  for (const c of negCuboids) {
    onCubes -= volume(c);
  }

  return { output: onCubes, expected: 1199121349148621 };

  // helpers
  function intersect(cuboidA, cuboidB) {
    const [[minXA, maxXA], [minYA, maxYA], [minZA, maxZA]] = cuboidA;
    const [[minXB, maxXB], [minYB, maxYB], [minZB, maxZB]] = cuboidB;

    if (minXA > maxXB || minYA > maxYB || minZA > maxZB) return null;
    if (minXB > maxXA || minYB > maxYA || minZB > maxZA) return null;

    return [
      [Math.max(minXA, minXB), Math.min(maxXA, maxXB)],
      [Math.max(minYA, minYB), Math.min(maxYA, maxYB)],
      [Math.max(minZA, minZB), Math.min(maxZA, maxZB)],
    ];
  }

  function volume([[minX, maxX], [minY, maxY], [minZ, maxZ]]) {
    return (maxX - minX + 1) * (maxY - minY + 1) * (maxZ - minZ + 1);
  }
});
