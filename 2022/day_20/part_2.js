// Day 20: Grove Positioning System
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let head;
  const numbers = input.split("\n").map(Number);
  const originalNumbers = [];
  const SIZE = numbers.length;
  const DECRYPTION_KEY = 811589153;

  const traverse = (node, k) => {
    k %= SIZE - 1;
    for (; k > 0; k--) {
      node = node.next;
    }
    for (; k < 0; k++) {
      node = node.prev;
    }
    return node;
  };

  const shift = (node, k) => {
    if (k === 0) return;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    const target = traverse(node, k < 0 ? k - 1 : k);
    node.prev = target;
    node.next = target.next;
    target.next.prev = node;
    target.next = node;
  };

  let tmpHead = {};
  let prev = tmpHead;
  for (const n of numbers) {
    const cur = { value: n * DECRYPTION_KEY };
    originalNumbers.push(cur);
    if (n === 0) {
      head = cur;
    }
    cur.prev = prev;
    prev.next = cur;
    prev = cur;
  }
  prev.next = tmpHead.next;
  tmpHead.next.prev = prev;

  for (let i = 0; i < 10; i++) {
    for (const n of originalNumbers) {
      shift(n, n.value);
    }
  }

  return {
    output:
      traverse(head, 1000).value +
      traverse(head, 2000).value +
      traverse(head, 3000).value,
    expected: 4979911042808,
  };
});
