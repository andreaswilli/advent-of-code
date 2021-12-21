// Day 21: Dirac Dice
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [p1Pos, p2Pos] = input.split("\n").map((line) => Number(line.slice(28)));
  let p1Score = 0;
  let p2Score = 0;
  let moves = 0;
  const die = createDeterministicDie();

  while (p1Score < 1000 && p2Score < 1000) {
    move(rollDice());
  }

  return { output: Math.min(p1Score, p2Score) * moves * 3, expected: 551901 };

  // helpers
  function move(by) {
    if (moves % 2 === 0) {
      p1Pos = ((p1Pos + by - 1) % 10) + 1;
      p1Score += p1Pos;
    } else {
      p2Pos = ((p2Pos + by - 1) % 10) + 1;
      p2Score += p2Pos;
    }
    moves++;
  }

  function rollDice() {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += die.next().value;
    }
    return sum;
  }

  function* createDeterministicDie() {
    let i = 0;
    while (true) {
      yield (i % 100) + 1;
      i++;
    }
  }
});
