// Day 23: A Long Walk
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n");

  const maxDist = {};
  const q = [[[1, 0]]];

  const getNext = ([col, row], path) => {
    const roadBlock = ["v", "^", ">", "<"];

    return [
      [col, row - 1],
      [col, row + 1],
      [col - 1, row],
      [col + 1, row],
    ].filter(
      ([c, r], i) =>
        !["#", roadBlock[i]].includes(grid[r]?.[c]) &&
        grid[r]?.[c] &&
        !path.find(([pc, pr]) => c === pc && r === pr)
    );
  };

  while (q.length) {
    const path = q.shift();
    const key = path[path.length - 1].join("/");
    maxDist[key] = Math.max(maxDist[key] ?? 0, path.length - 1);

    for (const next of getNext(path[path.length - 1], path)) {
      q.push(path.concat([next]));
    }
  }

  const maxPath = maxDist[[grid[0].length - 2, grid.length - 1].join("/")];

  return { output: maxPath, expected: 2162 };
});
