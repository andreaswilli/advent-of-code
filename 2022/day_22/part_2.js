// Day 22: Monkey Map
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [grid, lastLine] = input.split("\n\n");
  grid = grid.split("\n");
  const steps = [];

  for (const part of lastLine.split("R")) {
    for (const amount of part.split("L")) {
      steps.push(Number(amount));
      steps.push("L");
    }
    steps.pop();
    steps.push("R");
  }
  steps.pop();

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const corners = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ];

  const edgeDir = ([x, y], emptySpot) => {
    if (x === emptySpot.dx) return x === 0 ? 2 : 0;
    return y === 0 ? 3 : 1;
  };

  const edgeRot = ([x, y], emptySpot) => {
    if (x === emptySpot.dx && x !== y) {
      return 1;
    }
    if (y === emptySpot.dy && x === y) {
      return 1;
    }
    return 3;
  };

  const nextEdge = (spot) => {
    spot.x -= directions[spot.dir][0];
    spot.y -= directions[spot.dir][1];
    let newDir = (spot.dir + 1) % 4;
    let newX = spot.x + directions[newDir][0];
    let newY = spot.y + directions[newDir][1];
    if (grid[newY]?.[newX]?.trim()) {
      spot.dir = newDir;
      return true;
    } else {
      let newDir = (spot.dir + 3) % 4;
      let newX = spot.x + directions[newDir][0];
      let newY = spot.y + directions[newDir][1];
      if (grid[newY]?.[newX]?.trim()) {
        spot.dir = newDir;
        return true;
      }
    }
    return false;
  };

  let row = 0;
  let col = 0;
  let dir = 0;

  while (grid[0][col] !== ".") col++;

  let width = 0;
  for (const row of grid) {
    width = Math.max(width, row.length);
  }
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].padEnd(width, " ");
  }

  let cubeSpots = 0;
  const completeCorners = [];

  for (const [y, row] of grid.entries()) {
    for (const [x, spot] of row.split("").entries()) {
      if (spot !== " ") cubeSpots++;
      let emptySpot = null;
      for (let dy = 0; dy < 2 && emptySpot !== false; dy++) {
        for (let dx = 0; dx < 2 && emptySpot !== false; dx++) {
          if (grid[y + dy]?.[x + dx] == null) {
            emptySpot = false;
            break;
          }
          if (grid[y + dy]?.[x + dx] === " ") {
            if (emptySpot == null) {
              emptySpot = { dx, dy };
            } else {
              emptySpot = false;
              break;
            }
          }
        }
      }
      if (emptySpot) {
        const corner = corners.findIndex(
          ([x, y]) => x === emptySpot.dx && y === emptySpot.dy
        );
        completeCorners.push({
          asc: {
            x: x + corners[(corner + 1) % 4][0],
            y: y + corners[(corner + 1) % 4][1],
            dir: edgeDir(corners[(corner + 1) % 4], emptySpot),
            rot: edgeRot(corners[(corner + 1) % 4], emptySpot),
          },
          desc: {
            x: x + corners[(corner + 3) % 4][0],
            y: y + corners[(corner + 3) % 4][1],
            dir: edgeDir(corners[(corner + 3) % 4], emptySpot),
            rot: edgeRot(corners[(corner + 3) % 4], emptySpot),
          },
        });
      }
    }
  }
  const edgeLength = Math.sqrt(cubeSpots / 6);

  const wrap = {};

  for (const { asc, desc } of completeCorners) {
    while (true) {
      for (let i = 0; i < edgeLength; i++) {
        wrap[`${asc.x}/${asc.y}/${(asc.dir + 1) % 4}`] = {
          x: desc.x,
          y: desc.y,
          dir: (asc.dir + 1 + asc.rot) % 4,
        };
        wrap[`${desc.x}/${desc.y}/${(desc.dir + 3) % 4}`] = {
          x: asc.x,
          y: asc.y,
          dir: (desc.dir + 3 + desc.rot) % 4,
        };
        asc.x += directions[asc.dir][0];
        asc.y += directions[asc.dir][1];
        desc.x += directions[desc.dir][0];
        desc.y += directions[desc.dir][1];
      }
      if (!grid[asc.y]?.[asc.x]?.trim() && !grid[desc.y]?.[desc.x]?.trim()) {
        break;
      }
      if (!grid[asc.y]?.[asc.x]?.trim()) {
        nextEdge(asc);
      }
      if (!grid[desc.y]?.[desc.x]?.trim()) {
        nextEdge(desc);
      }
      asc.rot = (asc.rot + 1) % 4;
      desc.rot = (desc.rot + 3) % 4;
    }
  }

  for (const step of steps) {
    if (typeof step === "string") {
      dir = (dir + (step === "R" ? 1 : 3)) % 4;
      continue;
    }

    for (let i = 0; i < step; i++) {
      let newRow = row + directions[dir][1];
      let newCol = col + directions[dir][0];
      let newDir = dir;

      if (!grid[newRow]?.[newCol]?.trim()) {
        let { x, y, dir: dirAfterWrap } = wrap[`${col}/${row}/${dir}`];
        newCol = x;
        newRow = y;
        newDir = dirAfterWrap;
      }

      if (grid[newRow][newCol] === "#") {
        break;
      }

      row = newRow;
      col = newCol;
      dir = newDir;
    }
  }

  return { output: 1000 * (row + 1) + 4 * (col + 1) + dir, expected: 162096 };
});
