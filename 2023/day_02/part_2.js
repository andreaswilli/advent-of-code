// Day 2: Cube Conundrum
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let sum = 0;

  for (const game of input.split("\n")) {
    let [id, cubes] = game.split(": ");
    [_, id] = id.split(" ");

    cubes = cubes
      .split("; ")
      .map((draw) => draw.split(", "))
      .flat()
      .map((cube) => {
        const [count, color] = cube.split(" ");
        return { count: Number(count), color };
      });

    const counts = { red: 0, green: 0, blue: 0 };

    for (const { count, color } of cubes) {
      if (count > counts[color]) {
        counts[color] = count;
      }
    }

    sum += counts.red * counts.green * counts.blue;
  }

  return { output: sum, expected: 59795 };
});
