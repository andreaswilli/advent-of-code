// Day 6: Lanternfish
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const fish = input.split(",").map(Number);
  let fishOfAge = Array(9).fill(0);

  fish.forEach((f) => fishOfAge[f]++);

  for (let i = 0; i < 80; i++) {
    fishOfAge = simulateDay(fishOfAge);
  }

  return { output: countFish(fishOfAge) };

  // helpers
  function simulateDay(fish) {
    const newFish = [];
    for (let i = 0; i < 9; i++) {
      if (i === 6) {
        newFish[i] = fish[i + 1] + fish[0];
      } else if (i === 8) {
        newFish[i] = fish[0];
      } else {
        newFish[i] = fish[i + 1];
      }
    }
    return newFish;
  }

  function countFish(fish) {
    return fish.reduce((sum, cur) => sum + cur, 0);
  }
});
