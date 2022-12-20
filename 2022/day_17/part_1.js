// Day 17: Pyroclastic Flow
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let rockCount = 0;
  let height = 0;
  const direction = input;
  const getDirection = (() => {
    let count = 0;
    return () => (direction[count++ % direction.length] === ">" ? 1 : -1);
  })();
  const stoppedRocks = new Set();

  const rocks = [
    (x, y) => [
      [x, y],
      [x + 1, y],
      [x + 2, y],
      [x + 3, y],
    ],
    (x, y) => [
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 2, y + 1],
      [x + 1, y + 2],
    ],
    (x, y) => [
      [x, y],
      [x + 1, y],
      [x + 2, y],
      [x + 2, y + 1],
      [x + 2, y + 2],
    ],
    (x, y) => [
      [x, y],
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
    ],
    (x, y) => [
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
    ],
  ];

  const createRock = () => rocks[rockCount++ % rocks.length](3, height + 4);

  const moveRockHorizontally = (rock) => {
    const direction = getDirection();
    const newParts = [];
    for (let i = 0; i < rock.length; i++) {
      const x = rock[i][0] + direction;
      const y = rock[i][1];
      if (x <= 0 || x > 7 || stoppedRocks.has(`${x},${y}`)) return;
      newParts.push([x, y]);
    }
    rock.splice(0, rock.length, ...newParts);
  };

  const moveRockVertically = (rock) => {
    const newParts = [];
    for (let i = 0; i < rock.length; i++) {
      const x = rock[i][0];
      const y = rock[i][1] - 1;
      if (y <= 0 || stoppedRocks.has(`${x},${y}`)) {
        rock.forEach(([x, y]) => stoppedRocks.add(`${x},${y}`));
        height = Math.max(
          height,
          rock.reduce((acc, [, y]) => Math.max(acc, y), 0)
        );
        return true;
      }
      newParts.push([x, y]);
    }
    rock.splice(0, rock.length, ...newParts);
    return false;
  };

  let rock = createRock();
  while (rockCount <= 2022) {
    moveRockHorizontally(rock);
    const hasStopped = moveRockVertically(rock);
    if (hasStopped) {
      rock = createRock();
    }
  }

  return { output: height, expected: 3124 };
});
