// Day 8: Haunted Wasteland
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");
const { lcm } = require("../../lib/lcm.js");

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

  function getStepCount(start) {
    let stepCount = 0;

    for (let cur = start; !cur.endsWith("Z"); stepCount++) {
      const direction = steps[stepCount % steps.length];
      cur = nodes[cur][direction === "L" ? 0 : 1];
    }
    return stepCount;
  }

  const stepCounts = new Set();

  for (const node of Object.keys(nodes)) {
    if (node.endsWith("A")) {
      stepCounts.add(getStepCount(node));
    }
  }

  const requiredSteps = lcm(stepCounts);

  return { output: requiredSteps, expected: 10921547990923 };
});
