// Day 17: Clumsy Crucible
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");
const { PriorityQueue } = require("../../lib/priority-queue.js");

run(() => {
  const grid = input.split("\n").map((row) => row.split("").map(Number));
  const seen = new Set();

  const q = new PriorityQueue();
  q.insert({ cost: 0, pos: [0, 0], dir: [0, 0], straight: 0 }, 0);

  const inBounds = (x, y) =>
    x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;

  let result;

  while (q.size()) {
    const entry = q.extractMin();
    const {
      cost,
      pos: [x, y],
      dir: [dx, dy],
      straight,
    } = entry;

    if (x === grid[0].length - 1 && y === grid.length - 1 && straight >= 4) {
      result = cost;
      break;
    }

    const key = `${x}/${y}/${dx}/${dy}/${straight}`;
    if (seen.has(key)) continue;
    seen.add(key);

    if (straight < 10 && (dx !== 0 || dy !== 0)) {
      const nx = x + dx;
      const ny = y + dy;
      if (inBounds(nx, ny)) {
        const newCost = cost + grid[ny][nx];
        q.insert(
          {
            cost: newCost,
            pos: [nx, ny],
            dir: [dx, dy],
            straight: straight + 1,
          },
          newCost
        );
      }
    }

    if (straight >= 4 || dx === 0 && dy === 0) {
      for (const [ndx, ndy] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        if ((ndx !== dx || ndy !== dy) && (ndx !== -dx || ndy !== -dy)) {
          const nx = x + ndx;
          const ny = y + ndy;
          if (inBounds(nx, ny)) {
            const newCost = cost + grid[ny][nx];
            q.insert(
              {
                cost: newCost,
                pos: [nx, ny],
                dir: [ndx, ndy],
                straight: 1,
              },
              newCost
            );
          }
        }
      }
    }
  }

  return { output: result, expected: 1268 };
});
