// Day 16: Ticket Translation
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 1;
  // let operations = 0; // count the number of operations

  let [rules, myTicket, nearbyTickets] = input.split("\n\n");

  rules = rules.split("\n").map((rule) => {
    let [field, ranges] = rule.split(": ");
    ranges = ranges.split(" or ").map((range) => {
      const [min, max] = range.split("-").map((n) => Number(n));
      return { min, max };
    });
    return { field, ranges };
  });

  const parseTickets = (tickets) =>
    tickets
      .split("\n")
      .slice(1)
      .map((ticket) => ticket.split(",").map((n) => Number(n)));

  myTicket = parseTickets(myTicket)[0];
  nearbyTickets = parseTickets(nearbyTickets);

  const valid = new Map();

  for (rule of rules) {
    for (range of rule.ranges) {
      for (let i = range.min; i <= range.max; i++) {
        valid.set(i, true);
      }
    }
  }

  const isValid = (ticket) => {
    for (value of ticket) {
      if (!valid.has(value)) {
        return false;
      }
    }
    return true;
  };

  const validTickets = nearbyTickets.filter(isValid);

  const possibleMatches = new Map(
    Array(rules.length)
      .fill(null)
      .map((_, i) => [i, []])
  );

  const haveCommonElements = (arr1, arr2) => {
    i_arr1 = 0;
    i_arr2 = 0;
    arr1 = arr1.slice().sort((a, b) => a - b);
    arr2 = arr2.slice().sort((a, b) => a - b);

    while (i_arr1 < arr1.length && i_arr2 < arr2.length) {
      if (arr1[i_arr1] === arr2[i_arr2]) return true;

      if (arr1[i_arr1] < arr2[i_arr2]) {
        i_arr1 += 1;
      } else {
        i_arr2 += 1;
      }
    }
    return false;
  };

  const isPossibleMatch = (field, rule) => {
    const values = validTickets.map((t) => t[field]);

    if (Math.min(...values) < rule.ranges[0].min) return false;
    if (Math.max(...values) > rule.ranges[1].max) return false;

    const betweenRanges = new Array(rule.ranges[1].min - rule.ranges[0].max - 1)
      .fill(null)
      .map((_, i) => i + 1 + rule.ranges[0].max);

    return !haveCommonElements(values, betweenRanges);
  };

  for (let i = 0; i < rules.length; i++) {
    for (let j = 0; j < myTicket.length; j++) {
      if (isPossibleMatch(j, rules[i])) {
        possibleMatches.get(i).push(j);
      }
    }
  }

  const order = Array(rules.length).fill(null);

  while (order.indexOf(null) !== -1) {
    for ([i, val] of possibleMatches.entries()) {
      if (val.length === 1) {
        order[i] = val[0];
      }
    }
    for ([i, val] of possibleMatches.entries()) {
      possibleMatches.set(
        i,
        possibleMatches.get(i).filter((f) => order.indexOf(f) === -1)
      );
    }
  }

  rules.forEach((rule, i) => {
    if (rule.field.startsWith("departure")) {
      output *= myTicket[order[i]];
    }
  });

  return { output /*, operations */ };
};

// output: 622670335901
run(func);
