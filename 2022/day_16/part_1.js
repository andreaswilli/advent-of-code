// Day 16: Proboscidea Volcanium
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const valves = {};

  for (const line of input.split("\n")) {
    let [, name, flowRate, neighbors] =
      /^Valve (\w{2}) has flow rate=(\d+); tunnels? leads? to valves? ((?:\w{2}\W*)*)$/.exec(
        line
      );
    valves[name] = {
      flowRate: Number(flowRate),
      neighbors: neighbors.split(", "),
    };
  }

  const cache = {};
  const key = (currentValve, remainingTime, openedValves) =>
    `${currentValve}-${remainingTime}-${Array.from(openedValves).reduce(
      (acc, cur) => acc + valves[cur].flowRate,
      0
    )}`;

  const maxPressure = (currentValve, remainingTime, openedValves) => {
    const fromCache = cache[key(currentValve, remainingTime, openedValves)];
    if (fromCache != null) return fromCache;
    if (remainingTime < 2) {
      return 0;
    }
    let pressure = 0;
    if (!openedValves.has(currentValve) && valves[currentValve].flowRate > 0) {
      pressure = Math.max(
        pressure,
        valves[currentValve].flowRate * (remainingTime - 1) +
          maxPressure(
            currentValve,
            remainingTime - 1,
            new Set([...openedValves, currentValve])
          )
      );
    }
    pressure = Math.max(
      pressure,
      ...valves[currentValve].neighbors.map((n) =>
        maxPressure(n, remainingTime - 1, openedValves)
      )
    );
    cache[key(currentValve, remainingTime, openedValves)] = pressure;
    return pressure;
  };

  return { output: maxPressure("AA", 30, new Set()), expected: 2119 };
});
