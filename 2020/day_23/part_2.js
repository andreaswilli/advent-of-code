// Day 23: Crab Cups
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations
  const MIN_CUP = 1;
  const MAX_CUP = 1_000_000;
  const MOVES = 10_000_000;

  const cups = input.split("").map((n) => Number(n));

  const findDestinationLabel = (currentLabel, pickedUp) => {
    let destinationLabel = currentLabel;

    do {
      destinationLabel -= 1;
      if (destinationLabel < MIN_CUP) {
        destinationLabel = MAX_CUP;
      }
    } while (
      destinationLabel === pickedUp.label ||
      destinationLabel === pickedUp.next.label ||
      destinationLabel === pickedUp.next.next.label
    );
    return destinationLabel;
  };

  const firstCup = { label: cups[0], next: null };
  const cupsMap = new Map();
  cupsMap.set(firstCup.label, firstCup);
  let prevCup = firstCup;

  for (let i = 1; i < MAX_CUP; i++) {
    const cup = { label: cups[i] || i + 1, next: null };
    prevCup.next = cup;
    prevCup = cup;
    cupsMap.set(cup.label, cup);
  }
  prevCup.next = firstCup;

  let currentCup = firstCup;
  for (let i = 0; i < MOVES; i++) {
    const pickedUp = currentCup.next;
    currentCup.next = pickedUp.next.next.next;

    const destination = cupsMap.get(
      findDestinationLabel(currentCup.label, pickedUp)
    );
    pickedUp.next.next.next = destination.next;
    destination.next = pickedUp;

    currentCup = currentCup.next;
  }

  const cup1 = cupsMap.get(1);
  output = cup1.next.label * cup1.next.next.label;

  return { output /*, operations */ };
};

// output: 519044017360
run(func);
