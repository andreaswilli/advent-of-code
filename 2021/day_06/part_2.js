// Day 6: Lanternfish
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const fish = input.split(",").map(Number);
  let fishOfAge = initializeFish();

  for (const f of fish) {
    fishOfAge.set(f, fishOfAge.get(f) + 1);
  }

  for (let i = 0; i < 256; i++) {
    fishOfAge = simulateDay(fishOfAge);
  }

  return { output: countFish(fishOfAge) };

  // helpers
  function simulateDay(fish) {
    const newFish = initializeFish();
    for (let i = 0; i < 9; i++) {
      if (i === 6) {
        newFish.set(i, fish.get(i + 1) + fish.get(0));
      } else if (i === 8) {
        newFish.set(i, fish.get(0));
      } else {
        newFish.set(i, fish.get(i + 1));
      }
    }
    return newFish;
  }

  function countFish(fish) {
    let numberOfFish = 0;
    for (let i = 0; i < 9; i++) {
      numberOfFish += fish.get(i);
    }
    return numberOfFish;
  }

  function initializeFish() {
    const fish = new Map();
    for (let i = 0; i < 9; i++) {
      fish.set(i, 0);
    }
    return fish;
  }
});
