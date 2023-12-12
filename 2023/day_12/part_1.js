// Day 12: Hot Springs
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const rows = input.split("\n").map((row) => {
    const [springs, nums] = row.split(" ");
    return [springs, nums.split(",").map(Number)];
  });

  let sum = 0;

  for (const [springs, nums] of rows) {
    const unknown = springs.replace(/[^?]/g, "").length;
    for (let i = 0; i < 2 ** unknown; i++) {
      const pattern = i.toString(2).padStart(unknown, "0");
      let candidate = [];
      let pos = 0;
      for (const s of springs) {
        if (s === "?") {
          candidate.push(pattern[pos] === "1" ? "#" : ".");
          pos += 1;
        } else {
          candidate.push(s);
        }
      }
      if (
        candidate
          .join("")
          .split(/\.+/)
          .map((group) => group.length)
          .filter((len) => len)
          .toString() === nums.toString()
      ) {
        sum += 1;
      }
    }
  }

  return { output: sum, expected: 7379 };
});
