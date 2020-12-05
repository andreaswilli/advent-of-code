// Day 5: Binary Boarding
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

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

  possibleSeats = Array(127 * 8 + 7)
    .fill(null)
    .map((_, i) => i);

  occupiedSeatIds = occupiedSeats.map((seat) => calcSeatId(seat));

  occupiedSeatIds.forEach((seatId) => {
    possibleSeats[seatId] = false;
  });

  output = possibleSeats
    .slice(Math.min(...occupiedSeatIds), Math.max(...occupiedSeatIds))
    .filter((isFree) => isFree !== false);

  return { output /*, operations */ };
};

// output: 599
run(func);
