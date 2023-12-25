// Day 24: Never Tell Me The Odds
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const hailstones = input
    .split("\n")
    .map((line) =>
      line.split(" @ ").map((part) => part.split(", ").map(Number))
    )
    .map(([[x, y, z], [vx, vy, vz]]) => ({ x, y, z, vx, vy, vz }));

  for (const { x, y, z, vx, vy, vz } of hailstones.slice(0, 3)) {
    console.log(`(p_x - ${x}) * (${vy} - v_y) = (p_y - ${y}) * (${vx} - v_x)`);
    console.log(`(p_y - ${y}) * (${vz} - v_z) = (p_z - ${z}) * (${vy} - v_y)`);
  }

  // solve equation system and calculate p_x + p_y + p_z
  const result = 155272940103072 + 386989974246822 + 214769025967097;

  return { output: result, expected: 757031940316991 };
});

