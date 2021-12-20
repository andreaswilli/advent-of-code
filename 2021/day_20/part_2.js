// Day 20: Trench Map
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [algorithm, image] = input.split("\n\n");
  let lightPixels = new Set();
  image = image.split("\n");
  image.forEach((row, y) =>
    row.split("").forEach((pixel, x) => {
      if (pixel === "#") {
        lightPixels.add(key(x, y));
      }
    })
  );
  let minX = 0;
  let maxX = image[0].length;
  let minY = 0;
  let maxY = image.length;

  const STEPS = 50;

  let step = 0;
  while (step < STEPS) {
    enhanceImage();
    step++;
  }

  return { output: lightPixels.size, expected: 18395 };

  // helpers
  function enhanceImage() {
    const newLightPixels = new Set();

    for (let y = minY - 1; y < maxY + 1; y++) {
      for (let x = minX - 1; x < maxX + 1; x++) {
        const index = analyzePixel(x, y);
        if (algorithm[index] === "#") newLightPixels.add(key(x, y));
      }
    }

    lightPixels = newLightPixels;
    minX--;
    maxX++;
    minY--;
    maxY++;
  }

  function analyzePixel(x, y) {
    let value = "";
    for (let row = y - 1; row <= y + 1; row++) {
      for (let col = x - 1; col <= x + 1; col++) {
        value += isLight(col, row) ? "1" : "0";
      }
    }
    return parseInt(value, 2);
  }

  function isLight(x, y) {
    if (
      algorithm[0] === "#" &&
      algorithm[algorithm.length - 1] === "." &&
      (x < minX || x >= maxX || y < minY || y >= maxY)
    ) {
      return step % 2 !== 0;
    }
    return lightPixels.has(key(x, y));
  }

  function key(x, y) {
    return `${x},${y}`;
  }
});
