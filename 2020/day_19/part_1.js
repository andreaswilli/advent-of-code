// Day 19: Monster Messages
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations

  const [rules, messages] = input.split("\n\n").map((part) => part.split("\n"));

  const getRule = (id) => {
    const rule = rules.find((r) => r.startsWith(`${id}:`));
    return rule.substr(rule.indexOf(":") + 2);
  };

  const evalRule = (id) => {
    // operations += 1;
    const rule = getRule(id);

    if (rule === '"a"') return "a";
    if (rule === '"b"') return "b";

    return `(${rule
      .replace(/\d+/g, (nestedRule) => `${evalRule(nestedRule)}`)
      .replace(/ /g, "")})`;
  };

  const pattern = new RegExp(`^${evalRule(0)}$`);

  for (message of messages) {
    if (pattern.test(message)) {
      output += 1;
    }
  }

  return { output /*, operations */ };
};

// output: 279
run(func);
