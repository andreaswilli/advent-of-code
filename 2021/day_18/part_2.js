// Day 18: title
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const numbers = input
    .split("\n")
    .map(JSON.parse)
    .map((line) => toTree(line));
  let max = 0;

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const maxMag = Math.max(
        magnitude(reduce(add(numbers[i], numbers[j]))),
        magnitude(reduce(add(numbers[j], numbers[i])))
      );
      if (maxMag > max) max = maxMag;
    }
  }

  return { output: max, expected: 4583 };

  // helpers
  function add(lhs, rhs) {
    return { left: clone(lhs), right: clone(rhs) };
  }

  function reduce(num) {
    while (true) {
      const { target: explTarget, prevNum, nextNum } = findExplosion(num);
      if (explTarget) {
        if (prevNum) prevNum.value += explTarget.left.value;
        if (nextNum) nextNum.value += explTarget.right.value;
        delete explTarget.left;
        delete explTarget.right;
        explTarget.value = 0;
        continue;
      }

      const splitTarget = findSplit(num);
      if (splitTarget) {
        splitTarget.left = { value: Math.floor(splitTarget.value / 2) };
        splitTarget.right = { value: Math.ceil(splitTarget.value / 2) };
        delete splitTarget.value;
        continue;
      }

      break;
    }
    return num;
  }

  function findExplosion(num) {
    let target = null;
    let prevNum = null;
    let nextNum = null;

    function traverse(num, level = 1) {
      if (target == null) {
        if (level === 5 && num.value == null) {
          target = num;
        } else if (num.value != null) {
          prevNum = num;
        }
      }
      if (nextNum == null && num.value == null && num !== target) {
        traverse(num.left, level + 1);
        traverse(num.right, level + 1);
      }
      if (target != null && nextNum == null && num.value != null) {
        nextNum = num;
      }
    }

    traverse(num);
    return { target, prevNum, nextNum };
  }

  function findSplit(num) {
    if (num.value == null) {
      return findSplit(num.left) || findSplit(num.right);
    }
    if (num.value >= 10) {
      return num;
    }
    return null;
  }

  function magnitude(num) {
    if (num.value != null) return num.value;
    return 3 * magnitude(num.left) + 2 * magnitude(num.right);
  }

  function toTree(arr) {
    if (typeof arr === "number") return { value: arr };
    return { left: toTree(arr[0]), right: toTree(arr[1]) };
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function toStr(tree) {
    if (tree.value != null) return tree.value;
    return `[${toStr(tree.left)},${toStr(tree.right)}]`;
  }
});
