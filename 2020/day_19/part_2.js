// Day 19: Monster Messages
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 0;
  // let operations = 0; // count the number of operations
  const MAX_DEPTH = 5;

  const [rules, messages] = input.split("\n\n").map((part) => part.split("\n"));

  rules[rules.findIndex((r) => r.startsWith("8:"))] = "8: 42 | 42 8";
  rules[rules.findIndex((r) => r.startsWith("11:"))] = "11: 42 31 | 42 11 31";

  const getRule = (id) => {
    const rule = rules.find((r) => r.startsWith(`${id}:`));
    return rule.substr(rule.indexOf(":") + 2);
  };

  const evalRule = (id, depth = 0) => {
    // operations += 1;
    if (depth > MAX_DEPTH && [8, 11].includes(+id)) return "";

    const rule = getRule(id);

    if (rule === '"a"') return "a";
    if (rule === '"b"') return "b";

    return `(${rule
      .replace(/\d+/g, (nestedRule) => `${evalRule(nestedRule, depth + 1)}`)
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

// output: 384
run(func);
