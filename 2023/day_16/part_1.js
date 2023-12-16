// Day 16: The Floor Will Be Lava
// Part One
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

  const visitedStates = new Set();
  const visitedSpots = new Set();

  simulateStep([-1, 0], [1, 0]);

  return { output: visitedSpots.size, expected: 6978 };
});
