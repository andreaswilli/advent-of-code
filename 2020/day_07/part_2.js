// Day 7: Handy Haversacks
// Part Two
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
      .map((colorAndAmount) => {
        const [amount, color] = colorAndAmount
          .replace(/^(\d+)\s(.*)\sbags?$/, "$1,$2")
          .split(",");
        return { amount: Number(amount), color };
      });
    bags.set(parentColor, childColors);
  });

  const countContainedBags = (color) => {
    const children = bags.get(color);
    if (!children) return 0;

    return children.reduce(
      (sum, child) =>
        sum + child.amount * (1 + countContainedBags(child.color)),
      0
    );
  };

  output = countContainedBags("shiny gold");

  return { output /*, operations */ };
};

// output: 6006
run(func);
