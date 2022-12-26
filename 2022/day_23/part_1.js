// Day 23: Unstable Diffusion
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const elves = new Set();
  const proposedMoves = new Map();
  const ROUNDS = 10;
  const checkDir = [
    (x, y) =>
      !elves.has(`${x - 1}/${y - 1}`) &&
      !elves.has(`${x}/${y - 1}`) &&
      !elves.has(`${x + 1}/${y - 1}`) &&
      `${x}/${y - 1}`,
    (x, y) =>
      !elves.has(`${x - 1}/${y + 1}`) &&
      !elves.has(`${x}/${y + 1}`) &&
      !elves.has(`${x + 1}/${y + 1}`) &&
      `${x}/${y + 1}`,
    (x, y) =>
      !elves.has(`${x - 1}/${y - 1}`) &&
      !elves.has(`${x - 1}/${y}`) &&
      !elves.has(`${x - 1}/${y + 1}`) &&
      `${x - 1}/${y}`,
    (x, y) =>
      !elves.has(`${x + 1}/${y - 1}`) &&
      !elves.has(`${x + 1}/${y}`) &&
      !elves.has(`${x + 1}/${y + 1}`) &&
      `${x + 1}/${y}`,
  ];
  let dir = 0;

  const shouldMove = (x, y) => {
    for (let row = y - 1; row <= y + 1; row++) {
      for (let col = x - 1; col <= x + 1; col++) {
        if (row === y && col === x) continue;
        if (elves.has(`${col}/${row}`)) return true;
      }
    }
    return false;
  };

  for (const [y, row] of input.split("\n").entries()) {
    for (const [x, spot] of row.split("").entries()) {
      if (spot === "#") elves.add(`${x}/${y}`);
    }
  }

  for (let i = 0; i < ROUNDS; i++) {
    for (const elve of elves) {
      const [x, y] = elve.split("/").map(Number);
      if (shouldMove(x, y)) {
        let nextDir;
        for (let i = 0; i < checkDir.length && !nextDir; i++) {
          nextDir = checkDir[(dir + i) % checkDir.length](x, y);
        }
        if (nextDir) {
          proposedMoves.set(
            nextDir,
            (proposedMoves.get(nextDir) ?? []).concat(elve)
          );
        }
      }
    }
    for (const [dest, movingElves] of proposedMoves) {
      if (movingElves.length === 1) {
        elves.delete(movingElves[0]);
        elves.add(dest);
      }
    }
    proposedMoves.clear();
    dir = (dir + 1) % checkDir.length;
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const elve of elves) {
    const [x, y] = elve.split("/").map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return {
    output: (maxX - minX + 1) * (maxY - minY + 1) - elves.size,
    expected: 3987,
  };
});
