// Day 21: Monkey Math
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const monkeys = {};

  for (const line of input.split("\n")) {
    const [name, value] = line.split(": ");

    let res = null;
    let calc = null;
    if (["+", "-", "*", "/"].some((operator) => value.includes(operator))) {
      const [, a, op, b] = /^(\w+) ([+\-*/]) (\w+)$/.exec(value);
      calc = { a, op, b };
    } else {
      res = Number(value);
    }
    monkeys[name] = { calc, res };
  }

  const calculate = (monkey) => {
    const { res, calc } = monkey;
    if (res != null) return res;

    let { a, op, b } = calc;
    if (typeof a === "string") {
      a = calculate(monkeys[a]);
    }
    if (typeof b === "string") {
      b = calculate(monkeys[b]);
    }
    return eval(a + op + b);
  };

  return { output: calculate(monkeys["root"]), expected: 168502451381566 };
});
