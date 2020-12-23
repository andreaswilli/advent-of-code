// Day 22: Crab Combat
// Part Two
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

  const playGame = (p1, p2) => {
    const p1Hist = [];
    const p2Hist = [];

    while (p1.length > 0 && p2.length > 0) {
      // operations += 1;
      if (p1Hist.includes(p1.toString())) return 1;
      if (p2Hist.includes(p2.toString())) return 1;

      p1Hist.push(p1.toString());
      p2Hist.push(p2.toString());

      const card1 = p1.shift();
      const card2 = p2.shift();

      if (card1 <= p1.length && card2 <= p2.length) {
        if (playGame(p1.slice(0, card1), p2.slice(0, card2)) === 1) {
          p1.push(card1);
          p1.push(card2);
        } else {
          p2.push(card2);
          p2.push(card1);
        }
      } else {
        if (card1 > card2) {
          p1.push(card1);
          p1.push(card2);
        } else {
          p2.push(card2);
          p2.push(card1);
        }
      }
    }
    return p1.length > 0 ? 1 : 2;
  };

  const winner = playGame(p1, p2);

  output = (winner === 1 ? p1 : p2).reduce(
    (score, card, i, cards) => score + card * (cards.length - i),
    0
  );

  return { output /*, operations */ };
};

// output: 34031
run(func);
