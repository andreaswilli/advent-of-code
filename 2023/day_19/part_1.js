// Day 19: Aplenty
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [workflows, parts] = input.split("\n\n").map((part) => part.split("\n"));
  workflows = workflows
    .map((workflow) => {
      let [name, steps] = workflow.split("{");
      steps = steps
        .slice(0, -1)
        .split(",")
        .map((step) => {
          step = step.split(":");
          const s = {};
          if (step.length > 1) {
            s.cond = {
              attr: step[0][0],
              op: step[0][1],
              val: Number(step[0].slice(2)),
            };
          }
          s.dest = step.slice(-1)[0];
          return s;
        });
      return [name, steps];
    })
    .reduce((acc, [name, steps]) => ({ ...acc, [name]: steps }), {});
  parts = parts.map((part) =>
    part
      .slice(1, -1)
      .split(",")
      .map((attr) => attr.split("="))
      .reduce((acc, [key, val]) => ({ ...acc, [key]: Number(val) }), {})
  );

  const checkCondition = (part, cond) => {
    if (!cond) return true;

    const { attr, op, val } = cond;
    if (op === "<") return part[attr] < val;
    return part[attr] > val;
  };

  const executeStep = (part, step) => {
    for (const { cond, dest } of step) {
      if (checkCondition(part, cond)) {
        return dest;
      }
    }
  };

  let total = 0;

  for (const part of parts) {
    let nextStep = "in";
    while (!["A", "R"].includes(nextStep)) {
      nextStep = executeStep(part, workflows[nextStep]);
    }
    if (nextStep === 'A') {
      total += part.x + part.m + part.a + part.s
    }
  }

  return { output: total, expected: 376008 };
});
