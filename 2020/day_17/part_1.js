// Day 17: Conway Cubes
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output;
  // let operations = 0; // count the number of operations

  const key = (x, y, z) => `${x}/${y}/${z}`;
  const coords = (key) => key.split("/").map((n) => Number(n));

  const neighbors = (cube) => {
    const n = new Set();
    const [x, y, z] = coords(cube);

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        for (let k = z - 1; k <= z + 1; k++) {
          if (key(i, j, k) !== cube) {
            n.add(key(i, j, k));
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
        activeCubes.add(key(j, i, 0));
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

// output: 242
run(func);
