// Day 17: Pyroclastic Flow
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let rockCount = 0;
  const direction = input;
  let directionIndex = 0;
  const getDirection = () =>
    direction[directionIndex++ % direction.length] === "<" ? 1 : -1;
  const grid = [];

  const rocks = [
    [0b0011110],
    [0b0001000, 0b0011100, 0b0001000],
    [0b0011100, 0b0000100, 0b0000100],
    [0b0010000, 0b0010000, 0b0010000, 0b0010000],
    [0b0011000, 0b0011000],
  ];

  const createRock = () => ({
    x: 0,
    y: grid.length + 3,
    type: rockCount++ % rocks.length,
  });

  const shift = (line, offset) => {
    if (offset >= 0) return line << offset;
    return line >> Math.abs(offset);
  };

  const moveRockHorizontally = (rock) => {
    const direction = getDirection();
    for (const [i, line] of rocks[rock.type].entries()) {
      const newX = rock.x + direction;
      if (
        (newX > 0 && line << newX > 2 ** 7 - 1) ||
        shift(line, newX) & grid[rock.y + i]
      ) {
        return;
      }
      if (
        (newX < 0 && line & (2 ** Math.abs(newX) - 1)) ||
        shift(line, newX) & grid[rock.y + i]
      ) {
        return;
      }
      if (newX === 0 && line & grid[rock.y + i]) {
        return;
      }
    }
    rock.x += direction;
  };

  const moveRockVertically = (rock) => {
    if (
      rock.y == 0 ||
      rocks[rock.type].some(
        (line, i) => shift(line, rock.x) & grid[rock.y + i - 1]
      )
    ) {
      for (const [i, line] of rocks[rock.type].entries()) {
        grid[rock.y + i] = (grid[rock.y + i] ?? 0) | shift(line, rock.x);
      }
      return true;
    }
    rock.y--;
    return false;
  };

  // this does not seem to work perfectly for every input (works for example, off-by-one for full input)
  const detectCylce = () => {
    const state = `${rockCount % 5}-${directionIndex % direction.length}-${grid
      .slice(-100)
      .join(",")}`;
    if (state === repeatedState) {
      cycleHeight = grid.length - cycleStart;
      cycleRocks = rockCount - cycleStartRock;
    }
    if ((repeatedState == null) & states.has(state)) {
      repeatedState = state;
      cycleStart = grid.length;
      cycleStartRock = rockCount;
    }
    states.add(state);
  };

  const ROCKS = 1_000_000_000_000;
  const states = new Set();
  let repeatedState;
  let cycleStartRock;
  let cycleStart;
  let cycleHeight;
  let cycleRocks;
  let rock = createRock();

  while (cycleRocks == null || (ROCKS - rockCount) % cycleRocks !== 0) {
    detectCylce();
    moveRockHorizontally(rock);
    const hasStopped = moveRockVertically(rock);
    if (hasStopped) {
      rock = createRock();
    }
  }

  const remainingCycles = (ROCKS - rockCount) / cycleRocks;

  return {
    output: grid.length + cycleHeight * remainingCycles,
    expected: 1561176470569,
  };
});
