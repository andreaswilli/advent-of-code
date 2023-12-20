// Day 20: Pulse Propagation
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

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

  let lowSignals = 0;
  let highSignals = 0;

  for (let i = 0; i < 1000; i++) {
    const q = getSignals("broadcaster", "low");
    lowSignals += 1;

    while (q.length) {
      const [sourceName, name, signalType] = q.shift();

      signalType === "high" ? (highSignals += 1) : (lowSignals += 1);

      if (!(name in modules)) continue;

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

  return { output: lowSignals * highSignals, expected: 791120136 };
});
