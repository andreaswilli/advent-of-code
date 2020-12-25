// Day 24: Lobby Layout
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const paths = input.split("\n");
  const blackTiles = new Set();

  const key = ([x, y]) => `${x}/${y}`;

  const toggleTile = (tile) => {
    if (blackTiles.has(tile)) {
      blackTiles.delete(tile);
    } else {
      blackTiles.add(tile);
    }
  };

  const navigate = ([x, y], direction) => {
    switch (direction) {
      case "e":
        return [x, y + 1];
      case "se":
        return [x + 1, y];
      case "sw":
        return [x + 1, y - 1];
      case "w":
        return [x, y - 1];
      case "nw":
        return [x - 1, y];
      case "ne":
        return [x - 1, y + 1];
    }
  };

  for (let path of paths) {
    let [x, y] = [0, 0];

    while (path.length) {
      let direction = path[0];
      path = path.substr(1);
      if (["n", "s"].includes(direction)) {
        direction += path[0];
        path = path.substr(1);
      }
      [x, y] = navigate([x, y], direction);
    }

    toggleTile(key([x, y]));
  }

  output = blackTiles.size;

  return { output /*, operations */ };
};

// output: 459
run(func);
