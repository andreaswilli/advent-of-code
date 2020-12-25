// Day 25: Combo Breaker
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const [cardPublicKey, doorPublicKey] = input
    .split("\n")
    .map((n) => Number(n));

  const transform = (subjectNumber, loopSize) => {
    let publicKey = 1;

    for (let i = 0; i < loopSize; i++) {
      publicKey *= subjectNumber;
      publicKey %= 20201227;
    }
    return publicKey;
  };

  const bruteForceLoopSize = (publicKey) => {
    let calculatedPK = 1;
    let loopSize;
    for (loopSize = 0; calculatedPK !== publicKey; loopSize++) {
      calculatedPK *= 7;
      calculatedPK %= 20201227;
    }
    return loopSize;
  };

  const cardLoopSize = bruteForceLoopSize(cardPublicKey);

  output = transform(doorPublicKey, cardLoopSize);

  return { output /*, operations */ };
};

// output: 4126980
run(func);
