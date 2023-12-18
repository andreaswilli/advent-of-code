// Day 18: Lavaduct Lagoon
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const dirMapping = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  let steps = input.split("\n").map((line) => {
    const [_, __, step] = line.split(" ");
    return [dirMapping[step[7]], parseInt(step.substring(2, 7), 16)];
  });

  steps = steps.map(([[dx, dy], dist], i) => {
    const [[ndx, ndy]] = steps[(i + 1) % steps.length];
    return [[dx, dy], dx === ndy && dy === -ndx ? "R" : "L", dist];
  });

  let pos = [0, 0];
  const trenchCorners = [pos];

  for (let i = 0; i < steps.length; i++) {
    const [[dx, dy], turn, d] = steps[i];
    const [_, prevTurn] = steps[(i - 1 + steps.length) % steps.length];
    // adjust distance because the perimeter has strength 1 and contributes to
    // the total area
    const dist =
      d + (turn === "R" ? 0.5 : -0.5) + (prevTurn === "R" ? 0.5 : -0.5);
    pos = [pos[0] + dx * dist, pos[1] + dy * dist];
    trenchCorners.push(pos);
  }

  // https://en.wikipedia.org/wiki/Shoelace_formula
  let area = 0;
  for (let i = 0; i < trenchCorners.length - 1; i++) {
    const [x1, y1] = trenchCorners[i];
    const [x2, y2] = trenchCorners[i + 1];
    area += x1 * y2 - y1 * x2;
  }
  area = Math.abs(area / 2);

  return { output: area, expected: 52885384955882 };
});
