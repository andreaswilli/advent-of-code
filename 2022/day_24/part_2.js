// Day 24: Blizzard Basin
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const wBlizzards = new Map();
  const eBlizzards = new Map();
  const nBlizzards = new Map();
  const sBlizzards = new Map();

  const grid = input.split("\n");

  const height = grid.length - 2;
  const width = grid[0].length - 2;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      switch (grid[row + 1][col + 1]) {
        case "<":
          wBlizzards.set(row, (wBlizzards.get(row) ?? new Set()).add(col));
          break;
        case ">":
          eBlizzards.set(row, (eBlizzards.get(row) ?? new Set()).add(col));
          break;
        case "^":
          nBlizzards.set(col, (nBlizzards.get(col) ?? new Set()).add(row));
          break;
        case "v":
          sBlizzards.set(col, (sBlizzards.get(col) ?? new Set()).add(row));
          break;
      }
    }
  }

  const getNeighbors = (row, col) => {
    const neighbors = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ];
    return neighbors.filter(
      ({ row, col }) => row >= 0 && row < height && col >= 0 && col < width
    );
  };

  const canVisit = (row, col, t) =>
    !wBlizzards.get(row)?.has((col + t) % width) &&
    !eBlizzards.get(row)?.has((col - (t % width) + width) % width) &&
    !nBlizzards.get(col)?.has((row + t) % height) &&
    !sBlizzards.get(col)?.has((row - (t % height) + height) % height);

  const findShortestPath = (time, start, end) => {
    let neighbors = new Set([start]);

    while (!neighbors.has(end)) {
      time++;
      let newNeighbors = new Set();
      for (const n of neighbors) {
        const [row, col] = n.split("/").map(Number);
        if (canVisit(row, col, time)) {
          newNeighbors.add(n);
        }
        for (const { row: nRow, col: nCol } of getNeighbors(row, col)) {
          if (canVisit(nRow, nCol, time)) {
            newNeighbors.add(`${nRow}/${nCol}`);
          }
        }
      }
      neighbors = newNeighbors;
    }
    return time + 1;
  };

  let time = 0;
  time = findShortestPath(time, `-1/0`, `${height - 1}/${width - 1}`);
  time = findShortestPath(time, `${height}/${width - 1}`, `0/0`);
  time = findShortestPath(time, `-1/0`, `${height - 1}/${width - 1}`);

  return { output: time, expected: 842 };
});
