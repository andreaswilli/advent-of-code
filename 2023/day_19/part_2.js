// Day 19: Aplenty
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [workflows] = input.split("\n\n").map((part) => part.split("\n"));
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

  const checkCondition = (cond, curRanges, nextRanges) => {
    if (!cond) return;
    if (cond.op === "<") {
      curRanges[cond.attr].max = cond.val - 1;
      nextRanges[cond.attr].min = cond.val;
    } else {
      curRanges[cond.attr].min = cond.val + 1;
      nextRanges[cond.attr].max = cond.val;
    }
  };

  const rangeSize = ({ min, max }) => Math.max(0, max - min + 1);

  let acceptedCombinations = 0;

  const stack = [
    {
      workflow: "in",
      ranges: {
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 },
      },
    },
  ];

  while (stack.length) {
    const { workflow, ranges } = stack.pop();
    let curRanges;
    let nextRanges = ranges;
    for (const step of workflows[workflow]) {
      curRanges = JSON.parse(JSON.stringify(nextRanges));
      checkCondition(step.cond, curRanges, nextRanges);
      if (step.dest === "R") continue;
      if (step.dest === "A") {
        acceptedCombinations +=
          rangeSize(curRanges.x) *
          rangeSize(curRanges.m) *
          rangeSize(curRanges.a) *
          rangeSize(curRanges.s);
        continue;
      }
      stack.push({ workflow: step.dest, ranges: curRanges });
    }
  }

  return { output: acceptedCombinations, expected: 124078207789312 };
});
