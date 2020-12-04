// Day 4: Passport Processing
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const passports = input.split("\n\n").map((line) =>
    line.split(/[\n\s]/).reduce((passport, field) => {
      const [key, val] = field.split(":");
      return { ...passport, [key]: val };
    }, {})
  );

  const reqFields = [
    { name: "byr", rules: [{ pattern: /^(\d{4})$/, min: 1920, max: 2002 }] },
    { name: "iyr", rules: [{ pattern: /^(\d{4})$/, min: 2010, max: 2020 }] },
    { name: "eyr", rules: [{ pattern: /^(\d{4})$/, min: 2020, max: 2030 }] },
    {
      name: "hgt",
      rules: [
        { pattern: /^(\d*)cm$/, min: 150, max: 193 },
        { pattern: /^(\d*)in$/, min: 59, max: 76 },
      ],
    },
    { name: "hcl", rules: [{ pattern: /^(#[0-9a-f]{6})$/ }] },
    { name: "ecl", rules: [{ pattern: /^(amb|blu|brn|gry|grn|hzl|oth)$/ }] },
    { name: "pid", rules: [{ pattern: /^(\d{9})$/ }] },
  ];

  const isValid = (passport) => {
    for (reqField of reqFields) {
      const value = passport[reqField.name];
      if (value == null) return false;

      let valid = true;

      for (rule of reqField.rules) {
        // operations += 1;
        const [_, cptGroup] = value.match(rule.pattern) || [];

        if (cptGroup == null) {
          valid = false;
          continue;
        }

        if (rule.min != null) {
          const num = Number(cptGroup);
          if (num < rule.min || num > rule.max) {
            valid = false;
            continue;
          }
        }
        valid = true;
        break;
      }
      if (!valid) return false;
    }
    return true;
  };

  output = passports.filter(isValid).length;

  return { output /*, operations */ };
};

// output: 175
run(func);
