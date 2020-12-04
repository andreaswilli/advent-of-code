// Day 4: Passport Processing
// Part One
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

  const reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const isValid = (passport) => {
    for (reqField of reqFields) {
      // operations += 1;
      if (passport[reqField] == null) {
        return false;
      }
    }
    return true;
  };

  output = passports.filter(isValid).length;

  return { output /*, operations */ };
};

// output: 228
run(func);
