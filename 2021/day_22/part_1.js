// Day 22: title
// Part One
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
  const on = new Set();

  for (const [state, coords] of instructions) {
    if (
      coords
        .reduce((flat, cur) => flat.concat(cur), [])
        .some((coord) => Math.abs(coord) > 50)
    ) {
      continue;
    }
    setCuboid(state, coords);
  }

  return { output: on.size, expected: 596598 };

  // helpers
  function setCuboid(state, [[minX, maxX], [minY, maxY], [minZ, maxZ]]) {
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          setSingleCube(state, [x, y, z]);
        }
      }
    }
  }

  function setSingleCube(state, [x, y, z]) {
    const key = `${x},${y},${z}`;
    if (state === "on") on.add(key);
    else on.delete(key);
  }
});
