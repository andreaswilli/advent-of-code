// Day 19: Beacon Scanner
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const unmatchedScanners = new Set();
  const scanners = input.split("\n\n").map((scanner, i) => {
    unmatchedScanners.add(i);
    return scanner.split("\n").slice(1);
  });
  const Axis = {
    X: { rotate: rotateX },
    Y: { rotate: rotateY },
    Z: { rotate: rotateZ },
  };

  const beacons = new Set();
  const scannerLocations = ["0,0,0"];

  matchBeacons(0, "0,0,0", [0, 0, 0]);

  while (unmatchedScanners.size > 0) {
    for (const i of unmatchedScanners) {
      for (const orientation of getOrientations()) {
        const match = isMatch(
          beacons,
          scanners[i].map((b) => rotateMulti(b, orientation))
        );
        if (match) {
          matchBeacons(i, match.offset, orientation);
          scannerLocations.push(match.offset);
          break;
        }
      }
    }
  }

  let maxDistance = 0;
  for (let i = 0; i < scannerLocations.length; i++) {
    for (let j = 0; j < scannerLocations.length; j++) {
      const distance = manhattanDistance(
        scannerLocations[i],
        scannerLocations[j]
      );
      if (distance > maxDistance) maxDistance = distance;
    }
  }

  return { output: maxDistance, expected: 10965 };

  // helpers
  function manhattanDistance(aStr, bStr) {
    const a = toArr(aStr);
    const b = toArr(bStr);
    return (
      Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
    );
  }

  function isMatch(a, b) {
    const REQUIRED_MATCHES = 12;
    const offsets = new Set();

    const beaconArr = [...a];

    for (let i = 0; i < beaconArr.length; i++) {
      for (let j = 0; j < b.length; j++) {
        const offset = subtract(beaconArr[i], b[j]);
        offsets.add(offset);
      }
    }

    for (const offset of offsets) {
      let matchingPoints = 0;
      for (let i = 0; i < b.length; i++) {
        if (a.has(add(b[i], offset))) matchingPoints++;
        if (matchingPoints >= REQUIRED_MATCHES) return { offset };
        if (b.length - i < REQUIRED_MATCHES - matchingPoints) break;
      }
    }
    return false;
  }

  function matchBeacons(i, offset, orientation) {
    unmatchedScanners.delete(i);

    for (const beacon of scanners[i]) {
      beacons.add(add(rotateMulti(beacon, orientation), offset));
    }
  }

  function add(aStr, bStr) {
    const a = toArr(aStr);
    const b = toArr(bStr);
    return toStr([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
  }

  function subtract(aStr, bStr) {
    const a = toArr(aStr);
    const b = toArr(bStr);
    return toStr([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
  }

  function rotateMulti(point, [x, y, z]) {
    return rotate(rotate(rotate(point, Axis.X, x), Axis.Y, y), Axis.Z, z);
  }

  function rotate(point, axis, amount) {
    for (let i = 0; i < (amount + 4) % 4; i++) {
      point = toStr(axis.rotate(toArr(point)));
    }
    return point;
  }

  function rotateX([x, y, z]) {
    return [x, -z, y];
  }

  function rotateY([x, y, z]) {
    return [-z, y, x];
  }

  function rotateZ([x, y, z]) {
    return [y, -x, z];
  }

  function getOrientations() {
    const orientations = [
      [0, 0],
      [0, 1],
      [0, 3],
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    return orientations
      .map((o) => [0, 1, 2, 3].map((z) => o.concat(z)))
      .reduce((flat, cur) => flat.concat(cur), []);
  }

  function toArr(str) {
    return str.split(",").map(Number);
  }

  function toStr(arr) {
    return arr.toString();
  }
});
