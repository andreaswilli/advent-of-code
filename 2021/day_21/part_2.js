// Day 21: Dirac Dice
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [p1Pos, p2Pos] = input.split("\n").map((line) => Number(line.slice(28)));
  let p1Wins = 0;
  let p2Wins = 0;
  let TARGET = 21;

  const rolls = computeDiceRolls();

  split(1, 0, p1Pos, 0, p2Pos, 0);

  return { output: Math.max(p1Wins, p2Wins), expected: 272847859601291 };

  // helpers
  function playRound(roll, identical, moves, p1Pos, p1Score, p2Pos, p2Score) {
    if (moves % 2 === 0) {
      p1Pos = ((p1Pos + roll - 1) % 10) + 1;
      p1Score += p1Pos;
    } else {
      p2Pos = ((p2Pos + roll - 1) % 10) + 1;
      p2Score += p2Pos;
    }

    if (p1Score >= TARGET) {
      p1Wins += identical;
      return;
    }
    if (p2Score >= TARGET) {
      p2Wins += identical;
      return;
    }
    split(identical, moves + 1, p1Pos, p1Score, p2Pos, p2Score);
  }

  function split(identical, moves, p1Pos, p1Score, p2Pos, p2Score) {
    for (const [roll, times] of rolls.entries()) {
      playRound(roll, identical * times, moves, p1Pos, p1Score, p2Pos, p2Score);
    }
  }

  function computeDiceRolls() {
    const rolls = new Map();
    for (let d1 = 1; d1 <= 3; d1++) {
      for (let d2 = 1; d2 <= 3; d2++) {
        for (let d3 = 1; d3 <= 3; d3++) {
          const sum = d1 + d2 + d3;
          rolls.set(sum, (rolls.get(sum) ?? 0) + 1);
        }
      }
    }
    return rolls;
  }
});
