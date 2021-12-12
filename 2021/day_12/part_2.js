// Day 12: Passage Pathing
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const graph = new Map();
  input.split("\n").forEach((line) => addEdges(...line.split("-")));

  return { output: countPaths("start", new Set()) };

  // helpers
  function countPaths(currentNode, visited, visitedTwice = false) {
    visited = new Set(visited).add(currentNode);

    const nextNodes = graph
      .get(currentNode)
      .filter((n) => isAllowedToVisit(n, visited, visitedTwice));

    if (nextNodes.length < 1) return 0;

    let paths = 0;
    for (const node of nextNodes) {
      if (node === "end") {
        paths++;
      } else {
        paths += countPaths(
          node,
          visited,
          visitedTwice || (isSmall(node) && visited.has(node))
        );
      }
    }
    return paths;
  }

  function isAllowedToVisit(node, visited, visitedTwice) {
    if (!visitedTwice) return true;
    if (!isSmall(node)) return true;
    return !visited.has(node);
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
