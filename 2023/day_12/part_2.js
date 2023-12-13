// Day 12: Hot Springs
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const rows = input.split("\n").map((row) => {
    const [springs, nums] = row.split(" ");
    const newSprings = Array.from({ length: 5 }, () => springs).join("?");
    const newNums = Array.from({ length: 5 }, () => nums).join(",");
    return [newSprings, newNums.split(",").map(Number)];
  });

  const memo = {};

  function count(springs, nums) {
    if (springs.length === 0) {
      return nums.length === 0 ? 1 : 0;
    }

    if (nums.length === 0) {
      return springs.includes("#") ? 0 : 1;
    }

    const key = `${springs}/${nums}`;
    if (key in memo) return memo[key];

    let result = 0;

    if (".?".includes(springs[0])) {
      result += count(springs.slice(1), nums);
    }

    if ("#?".includes(springs[0])) {
      if (
        nums[0] <= springs.length &&
        !springs.slice(0, nums[0]).includes(".") &&
        (nums[0] === springs.length || springs[nums[0]] !== "#")
      ) {
        result += count(springs.slice(nums[0] + 1), nums.slice(1));
      }
    }

    memo[key] = result;
    return result;
  }

  let sum = 0;

  for (const [springs, nums] of rows) {
    sum += count(springs, nums);
  }

  return { output: sum, expected: 7732028747925 };
});
