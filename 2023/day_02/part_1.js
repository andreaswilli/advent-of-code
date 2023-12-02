// Day 2: Cube Conundrum
// Part One
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

    const possible = cubes.every(
      ({ count, color }) =>
        (color === "red" && count <= 12) ||
        (color === "green" && count <= 13) ||
        (color === "blue" && count <= 14)
    );

    if (possible) {
      sum += Number(id);
    }
  }

  return { output: sum, expected: 2617 };
});
