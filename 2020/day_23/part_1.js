// Day 23: Crab Cups
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  let cups = input.split("").map((n) => Number(n));
  let curCupIndex = 0;
  let curCup;

  const index = (i) => (i + cups.length) % cups.length;

  const pickUpCups = () => {
    const start = index(curCupIndex + 1);
    const pickedUp = cups.concat(cups).slice(start, start + 3);
    cups = cups.filter((c) => pickedUp.indexOf(c) === -1);
    return pickedUp;
  };

  const shiftBy = (amount, arr) =>
    arr.slice(arr.length - amount).concat(arr.slice(0, arr.length - amount));

  for (let i = 0; i < 100; i++) {
    curCup = cups[curCupIndex];
    let insCupLabel = curCup - 1;
    const pickedUpCups = pickUpCups();
    const minLabel = Math.min(...cups);
    const maxLabel = Math.max(...cups);

    while (true) {
      if (insCupLabel < minLabel) {
        insCupLabel = maxLabel;
      }
      if (cups.indexOf(insCupLabel) !== -1) break;
      insCupLabel -= 1;
    }

    cups.splice(cups.indexOf(insCupLabel) + 1, 0, ...pickedUpCups);
    const shiftAmount = cups.length - (cups.indexOf(curCup) - curCupIndex);
    cups = shiftBy(shiftAmount, cups);
    curCupIndex = index(curCupIndex + 1);
  }

  output = cups.join("").split("1").reverse().join("");

  return { output /*, operations */ };
};

// output: 28946753
run(func);
