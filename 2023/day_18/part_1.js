// Day 18: Lavaduct Lagoon
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const dirMapping = {
    R: [1, 0],
    L: [-1, 0],
    D: [0, 1],
    U: [0, -1],
  };
  const steps = input.split("\n").map((line) => {
    const [dir, dist] = line.split(" ");
    return [dirMapping[dir], Number(dist)];
  });

  let pos = [0, 0];
  const trench = new Set();
  const interior = new Set();
  trench.add(pos.join("/"));

  for (const [[dx, dy], dist] of steps) {
    for (let i = 1; i <= dist; i++) {
      pos[0] += dx;
      pos[1] += dy;
      trench.add(pos.join("/"));
    }
  }

  const getNeighbors = ([x, y]) =>
    [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]
      .filter((pos) => !trench.has(pos.join("/")))
      .filter((pos) => !interior.has(pos.join("/")));

  let neighbors = getNeighbors([1, 1]);

  while (neighbors.length) {
    const n = neighbors.pop();
    interior.add(n.join("/"));
    neighbors.push(...getNeighbors(n));
  }

  const volume = trench.size + interior.size;

  return { output: volume, expected: 49578 };
});
