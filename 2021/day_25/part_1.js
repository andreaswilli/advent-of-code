// Day 25: Sea Cucumber
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const lines = input.split("\n");
  const height = lines.length;
  const width = lines[0].length;

  const southFacing = new Set();
  const eastFacing = new Set();

  lines
    .map((line) => line.split(""))
    .forEach((line, row) => {
      line.forEach((spot, col) => {
        if (spot === ">") {
          eastFacing.add(getKey(col, row));
        } else if (spot === "v") {
          southFacing.add(getKey(col, row));
        }
      });
    });

  let keepGoing = true;
  let step = 0;

  while (keepGoing) {
    keepGoing = false;
    step++;

    [...eastFacing]
      .map((key) => [key, getNextEast(key)])
      .filter(([_, next]) => isEmpty(next))
      .forEach(([prev, next]) => {
        eastFacing.delete(prev);
        eastFacing.add(next);
        keepGoing = true;
      });

    [...southFacing]
      .map((key) => [key, getNextSouth(key)])
      .filter(([_, next]) => isEmpty(next))
      .forEach(([prev, next]) => {
        southFacing.delete(prev);
        southFacing.add(next);
        keepGoing = true;
      });
  }

  return { output: step, expected: 528 };

  // helpers
  function getNextEast(key) {
    const [x, y] = getCoords(key);
    return getKey((x + 1) % width, y);
  }

  function getNextSouth(key) {
    const [x, y] = getCoords(key);
    return getKey(x, (y + 1) % height);
  }

  function isEmpty(key) {
    return !eastFacing.has(key) && !southFacing.has(key);
  }

  function getKey(x, y) {
    return `${x},${y}`;
  }

  function getCoords(key) {
    return key.split(",").map(Number);
  }
});
