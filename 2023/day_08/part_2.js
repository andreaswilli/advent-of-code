// Day 8: Haunted Wasteland
// Part Two
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

function lcm(numbers) {
  const maxPrimeFactors = new Map();

  for (let n of numbers) {
    const primeFactors = new Map();
    let divisor = 2;

    while (divisor <= n) {
      if (n % divisor === 0) {
        primeFactors.set(divisor, (primeFactors.get(divisor) ?? 0) + 1);
        n /= divisor;
        divisor = 2;
      } else {
        divisor += 1;
      }
    }

    for (const [factor, count] of primeFactors.entries()) {
      maxPrimeFactors.set(
        factor,
        Math.max(maxPrimeFactors.get(factor) ?? 0, count)
      );
    }
  }

  let stepCount = 1;

  for (const [factor, exponent] of maxPrimeFactors.entries()) {
    stepCount *= factor ** exponent;
  }

  return stepCount;
}
