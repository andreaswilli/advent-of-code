// Day 15: Lens Library
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const steps = input.split(",");

  function hash(str) {
    let currentValue = 0;
    for (const char of str) {
      currentValue += char.charCodeAt(0);
      currentValue *= 17;
      currentValue %= 256;
    }
    return currentValue;
  }

  const boxes = Array.from({ length: 256 }, () => []);

  for (const step of steps) {
    const [_, label, operator, value] = step.match(/(\w+)(-|=)(\d*)/);
    let box = boxes[hash(label)];
    const index = box.findIndex(([l]) => l === label);
    if (operator === "-") {
      if (index >= 0) {
        box.splice(index, 1);
      }
    } else {
      const lens = [label, Number(value)];
      if (index >= 0) {
        box[index] = lens;
      } else {
        box.push(lens);
      }
    }
  }

  let sum = 0;

  for (const [boxNum, box] of boxes.entries()) {
    for (const [slotNum, slot] of box.entries()) {
      const [_, focalLength] = slot;
      sum += (boxNum + 1) * (slotNum + 1) * focalLength;
    }
  }

  return { output: sum, expected: 286278 };
});
