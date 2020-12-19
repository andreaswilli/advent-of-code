// Day 18: Operation Order
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations

  const expressions = input.split("\n");

  const evaluate = (expr) => {
    // operations += 1;

    if (expr.indexOf(" ") === -1) {
      return Number(expr);
    }

    if (expr.indexOf("(") !== -1) {
      return evaluate(
        expr.replace(/\(([\d\s+*]*)\)/g, (_, paranExpr) => evaluate(paranExpr))
      );
    }

    if (expr.indexOf("*") !== -1) {
      const operands = expr.split(" * ");
      return operands.reduce((res, op) => res * evaluate(op), 1);
    }

    const operands = expr.split(" + ");
    return operands.reduce((res, op) => res + evaluate(op), 0);
  };

  for (expression of expressions) {
    output += evaluate(expression);
  }

  return { output /*, operations */ };
};

// output: 158183007916215
run(func);
