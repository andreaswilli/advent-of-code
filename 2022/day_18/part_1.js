// Day 18: Boiling Boulders
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let surfaceArea = 0;
  const cubes = input.split("\n");
  const cubeSet = new Set(cubes);

  for (const cube of cubes) {
    const [x, y, z] = cube.split(",").map(Number);
    const neighbors = [
      `${x + 1},${y},${z}`,
      `${x - 1},${y},${z}`,
      `${x},${y + 1},${z}`,
      `${x},${y - 1},${z}`,
      `${x},${y},${z + 1}`,
      `${x},${y},${z - 1}`,
    ];
    surfaceArea += neighbors.filter((n) => !cubeSet.has(n)).length;
  }

  return { output: surfaceArea, expected: 3564 };
});
