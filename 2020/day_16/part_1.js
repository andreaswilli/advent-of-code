// Day 16: Ticket Translation
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations

  let [rules, , nearbyTickets] = input.split("\n\n");

  rules = rules.split("\n").map((rule) => {
    let [field, ranges] = rule.split(": ");
    ranges = ranges.split(" or ").map((range) => {
      const [min, max] = range.split("-").map((n) => Number(n));
      return { min, max };
    });
    return { field, ranges };
  });

  nearbyTickets = nearbyTickets
    .split("\n")
    .slice(1)
    .map((ticket) => ticket.split(",").map((n) => Number(n)));

  const valid = new Map();

  for (rule of rules) {
    for (range of rule.ranges) {
      for (let i = range.min; i <= range.max; i++) {
        valid.set(i, true);
      }
    }
  }

  for (ticket of nearbyTickets) {
    for (value of ticket) {
      if (!valid.has(value)) {
        output += value;
      }
    }
  }

  return { output /*, operations */ };
};

// output: 25972
run(func);
