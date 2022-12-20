// Day 18: Boiling Boulders
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let surfaceArea = 0;
  const cubes = input.split("\n");
  const solid = new Set(cubes);
  const outside = new Set();

  const parseCoords = (cube) => cube.split(",").map(Number);

  const getNeighbors = (cube) => {
    const [x, y, z] = cube.split(",").map(Number);
    return [
      `${x + 1},${y},${z}`,
      `${x - 1},${y},${z}`,
      `${x},${y + 1},${z}`,
      `${x},${y - 1},${z}`,
      `${x},${y},${z + 1}`,
      `${x},${y},${z - 1}`,
    ];
  };

  const getNonSolidNeighbors = (cube) => {
    return getNeighbors(cube).filter((n) => !solid.has(n));
  };

  const touchesBorder = (cube) => {
    const [x, y, z] = parseCoords(cube);
    return (
      x === minX ||
      x === maxX ||
      y === minY ||
      y === maxY ||
      z === minZ ||
      z === maxZ
    );
  };

  const isOutside = (cube) => {
    if (solid.has(cube)) return false;
    const visited = new Set();
    const stack = [cube];
    while (stack.length > 0) {
      const current = stack.pop();
      visited.add(current);
      if (outside.has(current) || touchesBorder(current)) return true;
      stack.push(
        ...getNonSolidNeighbors(current).filter((n) => !visited.has(n))
      );
    }
  };

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  for (const cube of cubes) {
    const [x, y, z] = parseCoords(cube);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
  }

  minX--;
  maxX++;
  minY--;
  maxY++;
  minZ--;
  maxZ++;

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        const cube = `${x},${y},${z}`;
        if (isOutside(cube)) {
          outside.add(cube);
        }
      }
    }
  }

  for (const cube of cubes) {
    for (const neighbor of getNonSolidNeighbors(cube)) {
      if (outside.has(neighbor)) {
        surfaceArea++;
      }
    }
  }

  return { output: surfaceArea, expected: 2106 };
});
