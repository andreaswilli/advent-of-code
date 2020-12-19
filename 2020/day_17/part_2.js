// Day 17: Conway Cubes
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const key = (x, y, z, w) => `${x}/${y}/${z}/${w}`;
  const coords = (key) => key.split("/").map((n) => Number(n));

  const neighbors = (cube) => {
    const n = new Set();
    const [x, y, z, w] = coords(cube);

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        for (let k = z - 1; k <= z + 1; k++) {
          for (let l = w - 1; l <= w + 1; l++) {
            if (key(i, j, k, l) !== cube) {
              n.add(key(i, j, k, l));
            }
          }
        }
      }
    }
    return n;
  };

  const countActiveNeighbors = (cube) => {
    let count = 0;

    for (neighbor of neighbors(cube)) {
      if (activeCubes.has(neighbor)) {
        count += 1;
      }
    }
    return count;
  };

  let activeCubes = new Set();

  input.split("\n").forEach((row, i) => {
    row.split("").forEach((cube, j) => {
      if (cube === "#") {
        activeCubes.add(key(j, i, 0, 0));
      }
    });
  });

  const simulateCycle = () => {
    const potentiallyActiveCubes = new Set();

    for (cube of activeCubes) {
      for (neighbor of neighbors(cube)) {
        if (!activeCubes.has(neighbor)) {
          potentiallyActiveCubes.add(neighbor);
        }
      }
    }

    const newActiveCubes = new Set(activeCubes);

    for (cube of potentiallyActiveCubes) {
      const activeNeighbors = countActiveNeighbors(cube);
      if (activeNeighbors === 3) {
        newActiveCubes.add(cube);
      }
    }

    for (cube of activeCubes) {
      const activeNeighbors = countActiveNeighbors(cube);
      if (activeNeighbors < 2 || activeNeighbors > 3) {
        newActiveCubes.delete(cube);
      }
    }

    activeCubes = new Set(newActiveCubes);
    newActiveCubes.clear();
  };

  for (i in Array(6).fill()) {
    simulateCycle();
  }

  output = activeCubes.size;

  return { output /*, operations */ };
};

// output: 2292
run(func);
