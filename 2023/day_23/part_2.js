// Day 23: A Long Walk
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const grid = input.split("\n");

  const getNeighbors = ([col, row], prev = null) =>
    [
      [col, row - 1],
      [col, row + 1],
      [col - 1, row],
      [col + 1, row],
    ].filter(
      ([c, r]) => grid[r]?.[c] && grid[r][c] !== "#" && String([c, r]) !== prev
    );

  const start = String([grid[0].indexOf("."), 0]);
  const end = String([grid[grid.length - 1].indexOf("."), grid.length - 1]);
  const graph = { [start]: {}, [end]: {} };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if (cell === "#") continue;
      if (getNeighbors([col, row]).length >= 3) {
        graph[[col, row]] = {};
      }
    }
  }

  for (const node of Object.keys(graph)) {
    const q = [[node, null, 0]];
    while (q.length) {
      const [cur, prev, distance] = q.shift();
      if (distance > 0 && cur in graph) {
        graph[node][cur] = distance;
        continue;
      }
      const [col, row] = cur.split(",").map(Number);
      for (const n of getNeighbors([col, row], prev).map(String)) {
        q.push([n, cur, distance + 1]);
      }
    }
  }

  const seen = new Set();

  const dfs = (node) => {
    if (node === end) return 0;

    seen.add(node);
    const max = Math.max(
      ...Object.keys(graph[node])
        .filter((n) => !seen.has(n))
        .map(n => [n, graph[node][n]])
        .map(([n, dist]) => dist + dfs(n))
    );
    seen.delete(node);

    return max;
  };

  return { output: dfs(start), expected: 6334 };
});
