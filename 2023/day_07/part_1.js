// Day 7: Camel Cards
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  function getType(cards) {
    const cardCounts = new Map();
    for (const card of cards) {
      cardCounts.set(card, (cardCounts.get(card) ?? 0) + 1);
    }
    const maxOfAKind = Math.max(...cardCounts.values());
    const differentCards = cardCounts.size;

    if (maxOfAKind === 5) return 7; // Five of a kind
    if (maxOfAKind === 4) return 6; // Four of a kind
    if (differentCards === 2) return 5; // Full house
    if (maxOfAKind === 3) return 4; // Three of a kind
    if (differentCards === 3) return 3; // Two pair
    if (differentCards === 4) return 2; // One pair
    return 1; // High card
  }

  const order = "23456789TJQKA";

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

  return { output: winnings, expected: 249638405 };
});
