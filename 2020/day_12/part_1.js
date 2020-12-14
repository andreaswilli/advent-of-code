// Day 12: Rain Risk
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const instructions = input
    .split("\n")
    .map((ins) => ({ action: ins[0], value: Number(ins.slice(1)) }));

  const pos = {
    n_s: 0,
    w_e: 0,
  };

  const getDirection = (orientation) => {
    switch (orientation) {
      case 0:
        return "N";
      case 90:
        return "E";
      case 180:
        return "S";
      case 270:
        return "W";
    }
  };

  const move = (dir, dis) => {
    switch (dir) {
      case "N":
        pos.n_s -= dis;
        break;
      case "E":
        pos.w_e += dis;
        break;
      case "S":
        pos.n_s += dis;
        break;
      case "W":
        pos.w_e -= dis;
        break;
    }
  };

  const rotate = (dir, deg) => {
    if (dir === "L") {
      deg *= -1;
    }
    orientation = (orientation + deg + 360) % 360;
  };

  let orientation = 90;

  for (let ins of instructions) {
    if (ins.action === "L" || ins.action === "R") {
      rotate(ins.action, ins.value);
    } else {
      move(
        ins.action === "F" ? getDirection(orientation) : ins.action,
        ins.value
      );
    }
  }

  output = Math.abs(pos.n_s) + Math.abs(pos.w_e);

  return { output /*, operations */ };
};

// output: 364
run(func);
