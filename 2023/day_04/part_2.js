// Day 4: Scratchcards
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const cards = input.split("\n").map((line) =>
    line
      .split(/: +/)[1]
      .split(/ \| +/)
      .map((group) => new Set(group.split(/ +/).map(Number)))
  );

  const copies = new Map(
    Array.from({ length: cards.length }, (_, i) => [i + 1, 1])
  );

  for (let i = 0; i < cards.length; i++) {
    const currentCardNum = i + 1;
    const [winning, numbers] = cards[i];

    let matches = 0;
    for (const w of winning) {
      if (numbers.has(w)) {
        matches += 1;
      }
    }

    for (let j = 1; j <= matches; j++) {
      copies.set(
        currentCardNum + j,
        copies.get(currentCardNum + j) + copies.get(currentCardNum)
      );
    }
  }

  const numCards = [...copies.values()].reduce((acc, cur) => acc + cur, 0);

  return { output: numCards, expected: 5704953 };
});
