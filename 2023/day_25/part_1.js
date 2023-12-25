// Day 25: Snowverload
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");
const { exec } = require("child_process");

run(() => {
  const connections = input
    .split("\n")
    .map((line) => line.replace(":", "").split(" "));
  const graph = {};

  let neatoInput = "graph{";

  for (const [from, ...destinations] of connections) {
    let forwardSet = graph[from] ?? new Set();
    neatoInput += from + "--" + destinations + ";";

    for (const dest of destinations) {
      forwardSet.add(dest);

      let backwardSet = graph[dest] ?? new Set();
      backwardSet.add(from);
      graph[dest] = backwardSet;
    }
    graph[from] = forwardSet;
  }

  neatoInput += "}"

  // graphviz has to be installed
  exec(`cd ${__dirname} && echo "${neatoInput}" | neato -Tsvg > graph.svg`);

  // visually identify the three edges in generated svg
  const edgesToRemove = [
    ["tmt", "pnz"],
    ["mvv", "xkz"],
    ["gbc", "hxr"],
  ];

  for (const [from, dest] of edgesToRemove) {
    graph[from].delete(dest);
    graph[dest].delete(from);
  }

  const seen = new Set();
  const q = [Object.keys(graph)[0]];

  while (q.length) {
    const node = q.shift();
    if (seen.has(node)) continue;
    seen.add(node);
    q.push(...graph[node]);
  }

  const result = seen.size * (Object.keys(graph).length - seen.size);

  return { output: result, expected: 569904 };
});
