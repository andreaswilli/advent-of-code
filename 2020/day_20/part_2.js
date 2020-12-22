// Day 20: Jurassic Jigsaw
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

const func = () => {
  let output = 1;
  // let operations = 0; // count the number of operations

  const reverse = (str) => str.split("").reverse().join("");

  const rotate = (grid) => {
    const newGrid = Array(grid[0].length).fill("");
    grid.forEach((line) => {
      for (let i in line) {
        newGrid[i] = line[i] + newGrid[i];
      }
    });
    return newGrid;
  };

  const rotateTile = (tile) => {
    tile.data = rotate(tile.data);

    let tmp = tile.border.top;
    tile.border.top = tile.border.left;
    tile.border.left = tile.border.bottom;
    tile.border.bottom = tile.border.right;
    tile.border.right = tmp;
  };

  const flip = (grid) => grid.map((line) => reverse(line));

  const flipTile = (tile) => {
    tile.data = flip(tile.data);

    tile.border.top = reverse(tile.border.top);
    tile.border.bottom = reverse(tile.border.bottom);
    let tmp = tile.border.right;
    tile.border.right = reverse(tile.border.left);
    tile.border.left = reverse(tmp);
  };

  const ori = ["top", "right", "bottom", "left"];

  const numberOfRotations = (from, to) => {
    return (ori.indexOf(to) - ori.indexOf(from) + ori.length) % ori.length;
  };

  const opposite = (dir) => ori[(ori.indexOf(dir) + 2) % ori.length];

  const keyByValue = (val, obj) => Object.keys(obj).find((k) => obj[k] === val);

  const tiles = input.split("\n\n").map((tile) => {
    const [meta, ...lines] = tile.split("\n");
    const [id] = /\d+/.exec(meta);
    return {
      id,
      pos: { x: null, y: null },
      border: {
        top: lines[0],
        bottom: reverse(lines[lines.length - 1]),
        right: lines.map((l) => l[l.length - 1]).join(""),
        left: reverse(lines.map((l) => l[0]).join("")),
      },
      data: lines.slice(1, -1).map((line) => line.substr(1, line.length - 2)),
    };
  });

  const tileStack = [];
  tileStack.push(tiles[0]);
  tiles[0].pos = { x: 0, y: 0 };

  while (tileStack.length > 0) {
    const tile = tileStack[tileStack.length - 1];
    let matchingTile;

    for (let o of ori) {
      const border = tile.border[o];

      matchingTile = tiles
        .filter((t) => t.pos.x == null)
        .find(
          (t) =>
            Object.values(t.border).includes(border) ||
            Object.values(t.border).includes(reverse(border))
        );

      if (!matchingTile) continue;

      if (keyByValue(border, matchingTile.border)) {
        flipTile(matchingTile);
      }

      const matchingOri = keyByValue(reverse(border), matchingTile.border);

      for (let i = 0; i < numberOfRotations(matchingOri, opposite(o)); i++) {
        rotateTile(matchingTile);
      }

      switch (o) {
        case "top":
          matchingTile.pos.x = tile.pos.x;
          matchingTile.pos.y = tile.pos.y - 1;
          break;
        case "bottom":
          matchingTile.pos.x = tile.pos.x;
          matchingTile.pos.y = tile.pos.y + 1;
          break;
        case "right":
          matchingTile.pos.x = tile.pos.x + 1;
          matchingTile.pos.y = tile.pos.y;
          break;
        case "left":
          matchingTile.pos.x = tile.pos.x - 1;
          matchingTile.pos.y = tile.pos.y;
          break;
      }
      tileStack.push(matchingTile);
      break;
    }

    if (!matchingTile) {
      tileStack.pop();
    }
  }

  let image = [];
  const size = Math.sqrt(tiles.length);
  const tileSize = tiles[0].data.length;
  let minX = Infinity;
  let minY = Infinity;

  for (let tile of tiles) {
    minX = Math.min(minX, tile.pos.x);
    minY = Math.min(minY, tile.pos.y);
  }

  for (let y = minY; y < minY + size; y++) {
    for (let i = 0; i < tileSize; i++) {
      image.push("");
    }
    for (let x = minX; x < minX + size; x++) {
      const tile = tiles.find((t) => t.pos.x === x && t.pos.y === y);
      for (let i = 0; i < tileSize; i++) {
        image[(y - minY) * tileSize + i] += tile.data[i];
      }
    }
  }

  const waterRoughness = new Set();

  const findMatches = (searchImage, image) => {
    let matches = 0;

    waterRoughness.clear();
    for (let i = 0; i < image.length; i++) {
      for (let j = 0; j < image[i].length; j++) {
        if (image[i][j] === "#") {
          waterRoughness.add(`${i}/${j}`);
        }
      }
    }

    for (let i = 0; i < image.length - searchImage.length; i++) {
      for (let j = 0; j < image[0].length - searchImage[0].length; j++) {
        let match = true;
        let toDelete = [];
        for (let k = 0; k < searchImage.length; k++) {
          for (let l = 0; l < searchImage[k].length; l++) {
            if (searchImage[k][l] !== "#") continue;
            if (image[i + k][j + l] === "#") {
              toDelete.push(`${i + k}/${j + l}`);
            } else {
              match = false;
              break;
            }
          }
          if (!match) break;
        }
        if (match) {
          toDelete.forEach((val) => waterRoughness.delete(val));
          matches += 1;
        }
      }
    }
    return matches;
  };

  const seaMonster = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
  ];

  findMatches(seaMonster, image) ||
    findMatches(seaMonster, rotate(image)) ||
    findMatches(seaMonster, rotate(rotate(image))) ||
    findMatches(seaMonster, rotate(rotate(rotate(image)))) ||
    findMatches(seaMonster, flip(image)) ||
    findMatches(seaMonster, rotate(flip(image))) ||
    findMatches(seaMonster, rotate(rotate(flip(image)))) ||
    findMatches(seaMonster, rotate(rotate(rotate(flip(image)))));

  output = waterRoughness.size;

  return { output /*, operations */ };
};

// output: 2190
run(func);
