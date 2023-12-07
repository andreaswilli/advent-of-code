// Day 7: Camel Cards
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  function getType(cards) {
    const cardCounts = new Map();
    let numJokers = 0;
    for (const card of cards) {
      if (card === "J") {
        numJokers += 1;
        continue;
      }
      cardCounts.set(card, (cardCounts.get(card) ?? 0) + 1);
    }
    const maxOfAKind = Math.max(0, Math.max(...cardCounts.values()));
    const differentCards = cardCounts.size;

    if (differentCards <= 1) return 7; // Five of a kind
    if (maxOfAKind + numJokers === 4) return 6; // Four of a kind
    if (differentCards <= 2) return 5; // Full house
    if (maxOfAKind + numJokers === 3) return 4; // Three of a kind
    if (differentCards <= 3) return 3; // Two pair
    if (differentCards <= 4) return 2; // One pair
    return 1; // High card
  }

  const order = "J23456789TQKA";

  const sortedHands = input
    .split("\n")
    .map((line) => {
      const [cards, bid] = line.split(" ");
      return [
        getType(cards),
        cards
          .split("")
          // convert to different base to make sure it can be represented with
          // a single digit (for lexicographical sorting)
          .map((c) => order.indexOf(c).toString(order.length))
          .join(""),
        Number(bid),
      ];
    })
    .sort();

  const winnings = sortedHands.reduce(
    (total, hand, i) => total + hand.slice(-1)[0] * (i + 1),
    0
  );

  return { output: winnings, expected: 249776650 };
});
