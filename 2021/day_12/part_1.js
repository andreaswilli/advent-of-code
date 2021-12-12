// Day 12: Passage Pathing
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const graph = new Map();
  input.split("\n").forEach((line) => addEdges(...line.split("-")));

  return { output: countPaths("start", new Set()) };

  // helpers
  function countPaths(currentNode, visited) {
    visited = new Set(visited).add(currentNode);

    const nextNodes = graph
      .get(currentNode)
      .filter((n) => !isSmall(n) || !visited.has(n));

    if (nextNodes.length < 1) return 0;

    let paths = 0;
    for (const node of nextNodes) {
      if (node === "end") {
        paths++;
      } else {
        paths += countPaths(node, visited);
      }
    }
    return paths;
  }

  function isSmall(name) {
    return name === name.toLowerCase();
  }

  function addEdges(a, b) {
    if (a !== "end" && b !== "start") addEdge(a, b);
    if (a !== "start" && b !== "end") addEdge(b, a);
  }

  function addEdge(a, b) {
    if (graph.get(a) == null) {
      graph.set(a, []);
    }
    graph.get(a).push(b);
  }
});
