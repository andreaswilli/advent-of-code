// Day 23: Unstable Diffusion
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const elves = new Set();
  const proposedMoves = new Map();
  let rounds = 0;
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

  while (true) {
    rounds++;
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
    if (proposedMoves.size === 0) break;
    for (const [dest, movingElves] of proposedMoves) {
      if (movingElves.length === 1) {
        elves.delete(movingElves[0]);
        elves.add(dest);
      }
    }
    proposedMoves.clear();
    dir = (dir + 1) % checkDir.length;
  }

  return { output: rounds, expected: 938 };
});
