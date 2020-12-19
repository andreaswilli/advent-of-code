// Day 18: Operation Order
// Part One
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

    const [, operand1, operator, operand2] = expr.match(/^(.*) (\+|\*) (\d*)$/);
    if (operator === "+") {
      return evaluate(operand1) + evaluate(operand2);
    }

    return evaluate(operand1) * evaluate(operand2);
  };

  for (expression of expressions) {
    output += evaluate(expression);
  }

  return { output /*, operations */ };
};

// output: 24650385570008
run(func);
