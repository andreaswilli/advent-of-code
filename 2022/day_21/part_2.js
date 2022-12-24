// Day 21: Monkey Math
// Part Two
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

  const invert = { "+": "-", "-": "+", "*": "/", "/": "*" };

  const calculate = (monkey) => {
    const { res, calc } = monkey;
    if (res != null) return res;

    let { a, op, b } = calc;
    if (typeof a === "string") {
      a = a === "humn" ? null : calculate(monkeys[a]);
    }
    if (typeof b === "string") {
      b = b === "humn" ? null : calculate(monkeys[b]);
    }
    if (a == null || b == null) return null;
    return eval(a + op + b);
  };

  const solve = (monkey, expectedRes) => {
    const {
      calc: { a, op, b },
    } = monkey;

    const resA = a === "humn" ? null : calculate(monkeys[a]);
    const resB = b === "humn" ? null : calculate(monkeys[b]);

    if (resA == null || ["+", "*"].includes(op)) {
      expectedRes = eval(expectedRes + invert[op] + (resA ?? resB));
    } else if (op === "-") {
      expectedRes = eval(`(${expectedRes}-${resA})*-1`);
    } else {
      expectedRes = eval(`1/(${expectedRes}/${resA})`);
    }
    if (a === "humn" || b === "humn") return expectedRes;
    return solve(monkeys[resA == null ? a : b], expectedRes);
  };

  const { a, b } = monkeys["root"].calc;
  const resA = calculate(monkeys[a]);
  const resB = calculate(monkeys[b]);

  return {
    output: resA == null ? solve(monkeys[a], resB) : solve(monkeys[b], resA),
    expected: 3343167719435,
  };
});
