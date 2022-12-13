// Day 12: Hill Climbing Algorithm
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");
const { PriorityQueue } = require("../../2021/day_15/part_2.js");

run(() => {
  let pos = {};
  const elevation = input.split("\n").map((line, row) =>
    line.split("").map((spot, col) => {
      if (spot === "E") {
        pos.x = col;
        pos.y = row;
        spot = "z";
      }
      return spot.charCodeAt(0) - "a".charCodeAt(0);
    })
  );
  const distance = Array(elevation.length)
    .fill(null)
    .map(() => Array(elevation[0].length).fill(Infinity));
  distance[pos.y][pos.x] = 0;

  const getKey = ({ x, y }) => `${x},${y}`;
  const parseKey = (key) => {
    const [x, y] = key.split(",").map(Number);
    return { x, y };
  };

  const unvisited = new PriorityQueue();
  for (let y = 0; y < elevation.length; y++) {
    for (let x = 0; x < elevation[y].length; x++) {
      unvisited.insert(getKey({ x, y }), Infinity);
    }
  }
  unvisited.increasePrio(getKey(pos), 0);

  while (unvisited.size() > 0) {
    const { x, y } = parseKey(unvisited.extractMin());
    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 },
    ].filter(
      ({ x: nX, y: nY }) =>
        elevation[nY]?.[nX] != null && elevation[nY][nX] >= elevation[y][x] - 1
    );

    for (const neighbor of neighbors) {
      if (distance[neighbor.y][neighbor.x] > distance[y][x] + 1) {
        distance[neighbor.y][neighbor.x] = distance[y][x] + 1;
        unvisited.increasePrio(getKey(neighbor), distance[y][x] + 1);
      }
    }
  }

  let shortest = Infinity;
  for (let row = 0; row < elevation.length; row++) {
    for (let col = 0; col < elevation[row].length; col++) {
      if (elevation[row][col] === 0) {
        shortest = Math.min(shortest, distance[row][col]);
      }
    }
  }

  return { output: shortest, expected: 465 };
});
