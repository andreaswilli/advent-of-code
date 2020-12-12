// Day 10: Adapter Array
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations

  const adapters = input
    .split("\n")
    .map((a) => Number(a))
    .sort((a, b) => a - b);

  adapters.unshift(0);
  adapters.push(adapters[adapters.length - 1] + 3);

  const get = (adp) => arrangements.get(adp) || 0;

  const arrangements = new Map();
  arrangements.set(0, 1);

  for (let adp of adapters.slice(1)) {
    // operations += 1;
    arrangements.set(adp, get(adp - 1) + get(adp - 2) + get(adp - 3));
  }

  output = get(adapters[adapters.length - 1]);

  return { output /*, operations */ };
};

// output: 14173478093824
run(func);
