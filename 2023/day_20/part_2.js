// Day 20: Pulse Propagation
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");
const { lcm } = require("../../lib/lcm.js");

run(() => {
  const modules = input
    .split("\n")
    .map((line) => {
      let [name, dest] = line.split(" -> ");
      dest = dest.split(", ");
      let type = null;
      if (name !== "broadcaster") {
        type = name[0];
        name = name.slice(1);
      }
      return { name, type, dest };
    })
    .reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {});

  const flipFlops = Object.values(modules)
    .filter(({ type }) => type === "%")
    .map(({ name }) => name)
    .reduce((acc, cur) => ({ ...acc, [cur]: false }), {});

  const conInputs = Object.values(modules)
    .filter(({ type }) => type === "&")
    .map(({ name }) => name)
    .reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: Object.values(modules)
          .filter(({ dest }) => dest.includes(cur))
          .map(({ name }) => ({ name, lastSignal: false })),
      }),
      {}
    );

  const getSignals = (name, signalType) =>
    modules[name].dest.map((destName) => [name, destName, signalType]);

  const lastStep = Object.values(modules).find(({ dest }) =>
    dest.includes("rx")
  ).name;

  const cycles = Object.values(modules).filter(({ dest }) =>
    dest.includes(lastStep)
  ).length;

  const cycleLengths = {};

  let presses = 0;
  while (Object.values(cycleLengths).length < cycles) {
    presses += 1;
    const q = getSignals("broadcaster", "low");

    while (q.length) {
      const [sourceName, name, signalType] = q.shift();

      if (!(name in modules)) continue;

      if (name === lastStep && signalType === "high") {
        if (cycleLengths[sourceName] == null) {
          cycleLengths[sourceName] = presses;
        }
      }

      if (modules[name].type === "%") {
        if (signalType === "high") continue;
        flipFlops[name] = !flipFlops[name];
        q.push(...getSignals(name, flipFlops[name] ? "high" : "low"));
      } else {
        conInputs[name].find(({ name }) => name === sourceName).lastSignal =
          signalType === "high";
        const allInputsOn = conInputs[name].every(
          ({ lastSignal }) => lastSignal
        );
        q.push(...getSignals(name, allInputsOn ? "low" : "high"));
      }
    }
  }

  const result = lcm(Object.values(cycleLengths));

  return { output: result, expected: 215252378794009 };
});
