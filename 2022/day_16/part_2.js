// Day 16: Proboscidea Volcanium
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const graph = {};
  const flowRate = {};

  for (const line of input.split("\n")) {
    let [, name, rate, neighbors] =
      /^Valve (\w{2}) has flow rate=(\d+); tunnels? leads? to valves? ((?:\w{2}\W*)*)$/.exec(
        line
      );
    graph[name] = neighbors.split(", ");
    flowRate[name] = Number(rate);
  }

  const floyd_warshal = (g) => {
    const distance = {};
    for (const [node, neighbors] of Object.entries(g)) {
      distance[node] = {};
      distance[node][node] = 0;
      for (const node2 of Object.keys(g)) {
        distance[node][node2] = Infinity;
      }
      for (const neighbor of neighbors) {
        distance[node][neighbor] = 1;
      }
    }
    for (const k of Object.keys(g)) {
      for (const i of Object.keys(g)) {
        for (const j of Object.keys(g)) {
          const ik = distance[i][k];
          const kj = distance[k][j];
          if (distance[i][j] > ik + kj) {
            distance[i][j] = ik + kj;
          }
        }
      }
    }
    return distance;
  };

  const distance = floyd_warshal(graph);

  const solutions = (
    currentValve,
    closedValves,
    remainingTime,
    chosen = {}
  ) => {
    let allSolutions = [chosen];

    for (const nextValve of closedValves) {
      const newRemainingTime =
        remainingTime - distance[currentValve][nextValve] - 1;
      if (newRemainingTime >= 2) {
        allSolutions = allSolutions.concat(
          solutions(
            nextValve,
            closedValves.filter((v) => v !== nextValve),
            newRemainingTime,
            { ...chosen, [nextValve]: newRemainingTime }
          )
        );
      }
    }

    return allSolutions;
  };

  const releasedPressure = (solution) =>
    Object.entries(solution).reduce(
      (acc, [valve, time]) => acc + flowRate[valve] * time,
      0
    );

  const key = (valves) =>
    valves.reduce((acc, cur) => acc + relevantValveKeys[cur], 0);

  const relevantValves = Object.keys(flowRate).filter((v) => flowRate[v]);
  const relevantValveKeys = relevantValves.reduce(
    (acc, cur, i) => ({ ...acc, [cur]: 1 << i }),
    {}
  );
  const allSolutions = solutions("AA", relevantValves, 26);
  const maxSolutions = {};
  for (const [path, score] of allSolutions.map((s) => [
    key(Object.keys(s)),
    releasedPressure(s),
  ])) {
    if (score > (maxSolutions[path] ?? 0)) {
      maxSolutions[path] = score;
    }
  }

  let maxScore = 0;

  for (const [path1, score1] of Object.entries(maxSolutions)) {
    for (const [path2, score2] of Object.entries(maxSolutions)) {
      if (!(Number(path1) & Number(path2))) {
        if (maxScore < score1 + score2) {
          maxScore = score1 + score2;
        }
      }
    }
  }

  return { output: maxScore, expected: 2615 };
});
