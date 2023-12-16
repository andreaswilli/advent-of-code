// Day 16: The Floor Will Be Lava
// Part Two
const { readFileSync } = require("fs");
const { run } = require("../../util/run.js");

run(() => {
  const file = readFileSync(`${__dirname}/input.txt`, "utf8");
  const grid = file.split("\n").filter(Boolean);

  const turnLeft = ([dx, dy]) => (dx === 0 ? [dy, dx] : [dy, -dx]);
  const turnRight = ([dx, dy]) => (dy === 0 ? [dy, dx] : [-dy, dx]);

  const dirMapping = {
    ".": (dir) => [dir],
    "/": (dir) => [dir[1] === 0 ? turnLeft(dir) : turnRight(dir)],
    "\\": (dir) => [dir[1] === 0 ? turnRight(dir) : turnLeft(dir)],
    "-": (dir) => (dir[1] === 0 ? [dir] : [turnLeft(dir), turnRight(dir)]),
    "|": (dir) => (dir[0] === 0 ? [dir] : [turnLeft(dir), turnRight(dir)]),
  };

  const simulateStep = ([x, y], [dx, dy]) => {
    const key = `${x},${y},${dx},${dy}`;
    if (visitedStates.has(key)) return;
    visitedStates.add(key);

    const [nx, ny] = [x + dx, y + dy];
    const nextSpot = grid[ny]?.[nx];
    if (!nextSpot) return;
    visitedSpots.add(`${nx},${ny}`);

    const newDirs = dirMapping[nextSpot]([dx, dy]);
    for (const dir of newDirs) {
      simulateStep([nx, ny], dir);
    }
  };

  let max = -Infinity;
  let visitedStates;
  let visitedSpots;

  for (let row = 0; row < grid.length; row++) {
    visitedStates = new Set();
    visitedSpots = new Set();
    simulateStep([-1, row], [1, 0]);
    max = Math.max(max, visitedSpots.size);

    visitedStates = new Set();
    visitedSpots = new Set();
    simulateStep([grid.length, row], [-1, 0]);
    max = Math.max(max, visitedSpots.size);
  }

  for (let col = 0; col < grid[0].length; col++) {
    visitedStates = new Set();
    visitedSpots = new Set();
    simulateStep([col, -1], [0, 1]);
    max = Math.max(max, visitedSpots.size);

    visitedStates = new Set();
    visitedSpots = new Set();
    simulateStep([col, grid[0].length], [0, -1]);
    max = Math.max(max, visitedSpots.size);
  }

  return { output: max, expected: 7315 };
});
