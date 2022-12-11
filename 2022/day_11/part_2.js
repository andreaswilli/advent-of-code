// Day 11: Monkey in the Middle
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let div_prod = 1;
  const monkeys = input.split("\n\n").map((monkey) => {
    const [, items, operation, test, trueMonkey, falseMonkey] =
      monkey.split("\n");
    const divisor = test.split(" ").slice(-1)[0];
    div_prod *= divisor;
    return {
      items: items
        .split("Starting items: ")
        .slice(-1)[0]
        .split(", ")
        .map(Number),
      operation: new Function(
        "old",
        "return " + operation.split("new = ").slice(-1)[0]
      ),
      next: (val) =>
        Number(
          val % divisor === 0
            ? trueMonkey.split(" ").slice(-1)[0]
            : falseMonkey.split(" ").slice(-1)[0]
        ),
      inspected: 0,
    };
  });

  const ROUNDS = 10_000;

  for (let i = 0; i < ROUNDS; i++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        const newItem = monkey.operation(item) % div_prod;
        monkeys[monkey.next(newItem)].items.push(newItem);
        monkey.inspected++;
      }
      monkey.items = [];
    }
  }

  const inspections = monkeys
    .map((monkey) => monkey.inspected)
    .sort((a, b) => b - a);

  return { output: inspections[0] * inspections[1], expected: 21553910156 };
});
