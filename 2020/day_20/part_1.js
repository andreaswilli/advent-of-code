// Day 20: Jurassic Jigsaw
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 1;
  // let operations = 0; // count the number of operations

  const reverse = (str) => str.split("").reverse().join("");

  const tiles = input.split("\n\n").map((tile) => {
    const [meta, ...lines] = tile.split("\n");
    const [id] = /\d+/.exec(meta);
    return {
      id,
      border: {
        top: lines[0],
        bottom: reverse(lines[lines.length - 1]),
        right: lines.map((l) => l[l.length - 1]).join(""),
        left: reverse(lines.map((l) => l[0]).join("")),
      },
    };
  });

  let cornerTilesFound = 0;

  for (let tile of tiles) {
    let unmatchedBorders = 0;

    for (let border of Object.values(tile.border)) {
      const matchingTile = tiles
        .filter((t) => t !== tile)
        .find(
          (t) =>
            Object.values(t.border).includes(border) ||
            Object.values(t.border).includes(reverse(border))
        );

      if (!matchingTile) {
        unmatchedBorders += 1;

        if (unmatchedBorders === 2) {
          cornerTilesFound += 1;
          output *= Number(tile.id);
          break;
        }
      }
    }
    if (cornerTilesFound === 4) break;
  }

  return { output /*, operations */ };
};

// output: 15006909892229
run(func);
