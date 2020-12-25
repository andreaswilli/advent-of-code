// Day 24: Lobby Layout
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const paths = input.split("\n");
  let blackTiles = new Set();

  const key = ([x, y]) => `${x}/${y}`;

  const coords = (key) => key.split("/").map((n) => Number(n));

  const toggleTile = (tile) => {
    if (blackTiles.has(tile)) {
      blackTiles.delete(tile);
    } else {
      blackTiles.add(tile);
    }
  };

  const neighbor = {
    e: ([x, y]) => [x, y + 1],
    se: ([x, y]) => [x + 1, y],
    sw: ([x, y]) => [x + 1, y - 1],
    w: ([x, y]) => [x, y - 1],
    nw: ([x, y]) => [x - 1, y],
    ne: ([x, y]) => [x - 1, y + 1],
  };

  const getNeighbors = ([x, y]) => {
    return Object.values(neighbor).map((neigh) => neigh([x, y]));
  };

  const countBlackNeighbors = ([x, y]) => {
    const neighbors = getNeighbors([x, y]);
    let blackNeighbors = 0;
    for (const neighbor of neighbors) {
      if (blackTiles.has(key(neighbor))) {
        blackNeighbors += 1;
      }
    }
    return blackNeighbors;
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
      [x, y] = neighbor[direction]([x, y]);
    }

    toggleTile(key([x, y]));
  }

  for (let i = 0; i < 100; i++) {
    const newBlackTiles = new Set(blackTiles);

    for (const tile of blackTiles) {
      const blackNeighbors = countBlackNeighbors(coords(tile));
      if (blackNeighbors === 0 || blackNeighbors > 2) {
        newBlackTiles.delete(tile);
      }
    }

    const potentiallyBlackTiles = new Set();
    for (const tile of blackTiles) {
      const neighbors = getNeighbors(coords(tile));
      for (const neighbor of neighbors) {
        if (!blackTiles.has(neighbor)) {
          potentiallyBlackTiles.add(key(neighbor));
        }
      }
    }
    for (const tile of potentiallyBlackTiles) {
      if (countBlackNeighbors(coords(tile)) === 2) {
        newBlackTiles.add(tile);
      }
    }

    blackTiles = newBlackTiles;
  }

  output = blackTiles.size;

  return { output /*, operations */ };
};

// output: 4150
run(func);
