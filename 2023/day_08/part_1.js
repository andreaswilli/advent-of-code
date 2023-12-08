// Day 8: Haunted Wasteland
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [steps, nodes] = input.split("\n\n");
  nodes = nodes
    .split("\n")
    .map((line) => {
      let [label, directions] = line.split(" = (");
      directions = directions.slice(0, -1).split(", ");
      return [label, directions];
    })
    .reduce(
      (acc, [label, directions]) => ({ ...acc, [label]: directions }),
      {}
    );

  let stepCount = 0;

  for (let cur = 'AAA'; cur != 'ZZZ'; stepCount++) {
    const direction = steps[stepCount % steps.length];
    cur = nodes[cur][direction === 'L' ? 0 : 1];
  }

  return { output: stepCount, expected: 14429 };
});
