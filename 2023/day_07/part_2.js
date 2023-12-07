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

  function getCardValue(card) {
    return [
      "J",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "Q",
      "K",
      "A",
    ].indexOf(card);
  }

  const hands = input.split("\n").map((line) => {
    const [cards, bid] = line.split(" ");
    return { cards, bid: Number(bid), type: getType(cards) };
  });

  hands.sort(
    (a, b) =>
      a.type - b.type ||
      getCardValue(a.cards[0]) - getCardValue(b.cards[0]) ||
      getCardValue(a.cards[1]) - getCardValue(b.cards[1]) ||
      getCardValue(a.cards[2]) - getCardValue(b.cards[2]) ||
      getCardValue(a.cards[3]) - getCardValue(b.cards[3]) ||
      getCardValue(a.cards[4]) - getCardValue(b.cards[4])
  );

  const winnings = hands.reduce(
    (total, hand, i) => total + hand.bid * (i + 1),
    0
  );

  return { output: winnings, expected: 249776650 };
});
