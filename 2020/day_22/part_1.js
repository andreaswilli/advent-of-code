// Day 22: Crab Combat
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const [p1, p2] = input.split("\n\n").map((p) =>
    p
      .split("\n")
      .slice(1)
      .map((n) => Number(n))
  );

  while (p1.length > 0 && p2.length > 0) {
    const card1 = p1.shift();
    const card2 = p2.shift();

    if (card1 > card2) {
      p1.push(card1);
      p1.push(card2);
    } else {
      p2.push(card2);
      p2.push(card1);
    }
  }

  output = (p1.length > 0 ? p1 : p2).reduce(
    (score, card, i, cards) => score + card * (cards.length - i),
    0
  );

  return { output /*, operations */ };
};

// output: 30197
run(func);
