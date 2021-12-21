// Day 21: Dirac Dice
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [p1Pos, p2Pos] = input.split("\n").map((line) => Number(line.slice(28)));
  const TARGET = 21;
  const rolls = computeDiceRolls();
  const cache = new Map();

  const [p1Wins, p2Wins] = playRound(p1Pos, 0, p2Pos, 0);

  return { output: Math.max(p1Wins, p2Wins), expected: 272847859601291 };

  // helpers
  function playRound(curPos, curScore, otherPos, otherScore) {
    if (otherScore >= TARGET) return [0, 1];

    const key = `${curPos},${curScore},${otherPos},${otherScore}`;
    if (cache.has(key)) return cache.get(key);

    let curWins = 0;
    let otherWins = 0;

    for (const roll of rolls) {
      const newPos = ((curPos + roll - 1) % 10) + 1;
      const newScore = curScore + newPos;
      const [otherW, curW] = playRound(otherPos, otherScore, newPos, newScore);
      curWins += curW;
      otherWins += otherW;
    }
    cache.set(key, [curWins, otherWins]);
    return [curWins, otherWins];
  }

  function computeDiceRolls() {
    const rolls = [];
    for (let d1 = 1; d1 <= 3; d1++) {
      for (let d2 = 1; d2 <= 3; d2++) {
        for (let d3 = 1; d3 <= 3; d3++) {
          rolls.push(d1 + d2 + d3);
        }
      }
    }
    return rolls;
  }
});
