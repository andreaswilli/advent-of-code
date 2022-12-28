// Day 25: Full of Hot Air
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const numbers = input.split("\n");

  const digit = { 2: 2, 1: 1, 0: 0, "-": -1, "-1": "-", "=": -2, "-2": "=" };

  const snafuToDec = (snafu) => {
    let res = 0;
    for (let i = 0; i < snafu.length; i++) {
      res += digit[snafu[i]] * 5 ** (snafu.length - 1 - i);
    }
    return res;
  };

  const decToSnafu = (dec) => {
    let value = [0];
    let exp = -1;
    while (dec > 5 ** (exp + 1) / 2) exp++;

    while (exp >= 0) {
      const STEP = 5 ** exp;

      while (dec >= STEP) {
        let i = exp;
        while (value[i] == 2) i++;

        value[i] = (value[i] ?? 0) + 1;
        while (--i >= exp) value[i] = -2;
        dec -= STEP;
      }
      exp--;
    }

    let res = "";
    for (let i = value.length - 1; i >= 0; i--) {
      res += digit[value[i] ?? 0];
    }
    return res;
  };

  const sum = numbers.map(snafuToDec).reduce((acc, cur) => acc + cur, 0);

  return { output: decToSnafu(sum), expected: "20===-20-020=0001-02" };
});
