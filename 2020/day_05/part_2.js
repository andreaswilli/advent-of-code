// Day 5: Binary Boarding
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const sortDesc = (seatA, seatB) => {
    const rowA = seatA.slice(0, 7);
    const rowB = seatB.slice(0, 7);
    if (rowA > rowB) {
      return 1;
    }
    if (rowA < rowB) {
      return -1;
    }
    const colA = seatA.slice(7);
    const colB = seatB.slice(7);
    return colA < colB ? 1 : -1;
  };

  const calcNum = (str, lower) => {
    let nums = Array(2 ** str.length)
      .fill(null)
      .map((_, i) => i);

    for (char of str.split("")) {
      if (char === lower) {
        nums = nums.slice(0, nums.length / 2);
      } else {
        nums = nums.slice(nums.length / 2);
      }
    }
    return nums[0];
  };

  const calcSeatId = (seat) => {
    const rowNr = calcNum(seat.slice(0, 7), "F");
    const colNr = calcNum(seat.slice(7), "L");
    return rowNr * 8 + colNr;
  };

  let occupiedSeats = input.split("\n");
  occupiedSeats = occupiedSeats.sort(sortDesc);
  maxSeatId = calcSeatId(occupiedSeats[0]);
  minSeatId = calcSeatId(occupiedSeats[occupiedSeats.length - 1]);

  possibleSeats = Array(127 * 8 + 7)
    .fill(null)
    .map((_, i) => i);

  occupiedSeats.forEach((seat) => {
    possibleSeats[calcSeatId(seat)] = false;
  });

  output = possibleSeats
    .slice(minSeatId, maxSeatId)
    .filter((isFree) => isFree !== false);

  return { output /*, operations */ };
};

// output: 599
run(func);
