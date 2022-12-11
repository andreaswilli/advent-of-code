// Day 11: Monkey in the Middle
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const monkeys = input.split("\n\n").map((monkey) => {
    const [, items, operation, test, trueMonkey, falseMonkey] =
      monkey.split("\n");
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
          val % test.split(" ").slice(-1)[0] === 0
            ? trueMonkey.split(" ").slice(-1)[0]
            : falseMonkey.split(" ").slice(-1)[0]
        ),
      inspected: 0,
    };
  });

  const ROUNDS = 20;

  for (let i = 0; i < ROUNDS; i++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        const newItem = Math.floor(monkey.operation(item) / 3);
        monkeys[monkey.next(newItem)].items.push(newItem);
        monkey.inspected++;
      }
      monkey.items = [];
    }
  }

  const inspections = monkeys
    .map((monkey) => monkey.inspected)
    .sort((a, b) => b - a);

  return { output: inspections[0] * inspections[1], expected: 76728 };
});
