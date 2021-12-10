// Day 10: Syntax Scoring
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const lines = input.split("\n").map((line) => line.split(""));
  const bracketMap = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };
  let score = 0;

  for (const line of lines) {
    const stack = [];

    for (const character of line) {
      if (Object.values(bracketMap).includes(character)) {
        stack.push(character);
      } else if (stack[stack.length - 1] === bracketMap[character]) {
        stack.pop();
      } else {
        score += getScore(character);
        break;
      }
    }
  }

  return { output: score };

  // helpers
  function getScore(character) {
    switch (character) {
      case ")":
        return 3;
      case "]":
        return 57;
      case "}":
        return 1197;
      case ">":
        return 25137;
    }
  }
});
