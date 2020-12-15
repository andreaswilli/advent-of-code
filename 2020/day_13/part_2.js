// Day 13: Shuttle Search
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  let [, busses] = input.split("\n");
  busses = busses
    .split(",")
    .map((nr, i) => (nr === "x" ? null : { id: Number(nr), offset: i }))
    .filter((f) => f);

  let stepSize = 1;
  let ts = 0;

  for (bus of busses) {
    while ((ts + bus.offset) % bus.id !== 0) {
      // operations += 1;
      ts += stepSize;
    }
    stepSize *= bus.id;
  }

  output = ts;

  return { output /*, operations */ };
};

// output: 210612924879242
run(func);
