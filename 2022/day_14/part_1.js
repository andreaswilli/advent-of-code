// Day 14: Regolith Reservoir
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const walls = new Set();
  const sand = new Set();
  let maxWall = 0;

  const addWall = ({ x, y }) => {
    maxWall = Math.max(maxWall, y);
    walls.add(`${x},${y}`);
  };

  const isFree = ({ x, y }) =>
    !walls.has(`${x},${y}`) && !sand.has(`${x},${y}`);

  for (const line of input.split("\n")) {
    const corners = line.split(" -> ").map((coords) => {
      const [x, y] = coords.split(",").map(Number);
      return { x, y };
    });
    let pos = corners[0];
    addWall(pos);
    for (const corner of corners.slice(1)) {
      while (pos.x !== corner.x) {
        pos.x += pos.x < corner.x ? 1 : -1;
        addWall(pos);
      }
      while (pos.y !== corner.y) {
        pos.y += pos.y < corner.y ? 1 : -1;
        addWall(pos);
      }
    }
  }

  let isFull = false;

  while (!isFull) {
    let sandPos = { x: 500, y: 0 };
    while (!isFull) {
      if (sandPos.y >= maxWall) {
        isFull = true;
      }
      if (isFree({ x: sandPos.x, y: sandPos.y + 1 })) {
        sandPos.y++;
      } else if (isFree({ x: sandPos.x - 1, y: sandPos.y + 1 })) {
        sandPos.x--;
        sandPos.y++;
      } else if (isFree({ x: sandPos.x + 1, y: sandPos.y + 1 })) {
        sandPos.x++;
        sandPos.y++;
      } else {
        sand.add(`${sandPos.x},${sandPos.y}`);
        break;
      }
    }
  }

  return { output: sand.size, expected: 1016 };
});
