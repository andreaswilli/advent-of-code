// Day 5: Binary Boarding
// Part One
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

  const calcSeatID = (seat) => {
    const rowNr = calcNum(seat.slice(0, 7), "F");
    const colNr = calcNum(seat.slice(7), "L");
    return rowNr * 8 + colNr;
  };

  let seats = input.split("\n");
  seats = seats.sort(sortDesc);
  output = calcSeatID(seats[0]);

  return { output /*, operations */ };
};

// output: 850
run(func);
