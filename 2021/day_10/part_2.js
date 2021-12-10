// Day 10: Syntax Scoring
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const lines = input.split("\n").map((line) => line.split(""));
  const openingBrackets = ["(", "[", "{", "<"];
  const closingBrackets = [")", "]", "}", ">"];
  let scores = [];

  for (const line of lines) {
    const stack = [];
    let isCorrupted = false;

    for (const character of line) {
      if (openingBrackets.includes(character)) {
        stack.push(character);
      } else if (stack[stack.length - 1] === getMatchingBracket(character)) {
        stack.pop();
      } else {
        isCorrupted = true;
        break;
      }
    }
    if (!isCorrupted) {
      const closingBrackets = stack.map(getMatchingBracket).reverse();
      scores.push(getScore(closingBrackets));
    }
  }
  scores.sort((a, b) => a - b);

  return { output: scores[Math.floor(scores.length / 2)] };

  // helpers
  function getScore(brackets) {
    let score = 0;

    for (const bracket of brackets) {
      score *= 5;
      score += getBracketValue(bracket);
    }
    return score;
  }

  function getBracketValue(bracket) {
    return closingBrackets.indexOf(bracket) + 1;
  }

  function getMatchingBracket(bracket) {
    if (openingBrackets.includes(bracket)) {
      return closingBrackets[openingBrackets.indexOf(bracket)];
    }
    return openingBrackets[closingBrackets.indexOf(bracket)];
  }
});
