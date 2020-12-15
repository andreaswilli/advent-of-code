// Day 13: Shuttle Search
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  let [ts, busses] = input.split("\n");
  ts = Number(ts);
  busses = busses
    .split(",")
    .filter((f) => f !== "x")
    .map((id) => Number(id))
    .map((id) => ({ id, timeToWait: id - (ts % id) }));

  const timeTillNextBus = Math.min(...busses.map((b) => b.timeToWait));

  output =
    timeTillNextBus * busses.find((b) => b.timeToWait === timeTillNextBus).id;

  return { output /*, operations */ };
};

// output: 259
run(func);
