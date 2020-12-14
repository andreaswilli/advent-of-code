// Day 12: Rain Risk
// Part Two
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

  const waypoint = {
    n_s: -1,
    w_e: 10,
  };

  const moveWaypoint = (dir, dis) => {
    switch (dir) {
      case "N":
        waypoint.n_s -= dis;
        break;
      case "E":
        waypoint.w_e += dis;
        break;
      case "S":
        waypoint.n_s += dis;
        break;
      case "W":
        waypoint.w_e -= dis;
        break;
    }
  };

  const rotateWaypoint = (dir, deg) => {
    if (dir === "L") {
      deg *= -1;
    }
    deg = (deg + 360) % 360;

    for (let i = 0; i < deg / 90; i++) {
      const tmp = waypoint.n_s;
      waypoint.n_s = waypoint.w_e;
      waypoint.w_e = -tmp;
    }
  };

  const move = (times) => {
    pos.n_s += waypoint.n_s * times;
    pos.w_e += waypoint.w_e * times;
  };

  for (let ins of instructions) {
    switch (ins.action) {
      case "L":
      case "R":
        rotateWaypoint(ins.action, ins.value);
        break;
      case "N":
      case "E":
      case "S":
      case "W":
        moveWaypoint(ins.action, ins.value);
        break;
      case "F":
        move(ins.value);
        break;
    }
  }

  output = Math.abs(pos.n_s) + Math.abs(pos.w_e);

  return { output /*, operations */ };
};

// output: 39518
run(func);
