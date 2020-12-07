// Day 7: Handy Haversacks
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations

  const bags = new Map();
  const entries = input.split("\n");
  entries.forEach((entry) => {
    let [parentColor, childColors] = entry.split(" bags contain ");
    childColors = childColors
      .substr(0, childColors.length - 1)
      .split(", ")
      .filter((c) => c !== "no other bags")
      .map((colorAndAmount) =>
        colorAndAmount.replace(/^\d+\s(.*)\sbags?$/, "$1")
      );
    childColors.forEach((childColor) => {
      const parentColors = bags.get(childColor) || [];
      bags.set(childColor, [...parentColors, parentColor]);
    });
  });

  const removeDuplicates = (arr) => [...new Set(arr)];

  const getAncestors = (color) => {
    const parents = bags.get(color);
    if (!parents) return [];

    return parents.concat(
      parents.reduce((a, c) => a.concat(getAncestors(c)), [])
    );
  };

  output = removeDuplicates(getAncestors("shiny gold")).length;

  return { output /*, operations */ };
};

// output: 254
run(func);
