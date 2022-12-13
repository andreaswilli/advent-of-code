// Day 15: Chiton
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

class Node {
  constructor(element, prio) {
    this.element = element;
    this.prio = prio;
  }
}

// priority queue with index lookup table
// -> we need to be able to increase priorities without knowing the index
class PriorityQueue {
  minHeap = [null];
  keyToIndex = new Map();

  size = () => this.minHeap.length - 1;
  has = (key) => this.keyToIndex.get(key) != null;

  insert = (element, prio) => {
    this.minHeap.push(new Node(element, Infinity));
    this.keyToIndex.set(element, this.size());
    this.increasePrio(element, prio);
  };

  extractMin = () => {
    this.swap(1, this.size());
    const min = this.minHeap.pop();
    this.minHeapify(1);
    this.keyToIndex.delete(min.element);
    return min.element;
  };

  // low priority values mean high priority
  increasePrio = (element, newPrio) => {
    let i = this.keyToIndex.get(element);
    if (this.minHeap[i].prio <= newPrio) return; // ignore

    this.minHeap[i].prio = newPrio;

    while (i > 1 && this.minHeap[this.parent(i)].prio > this.minHeap[i].prio) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  };

  minHeapify = (i) => {
    let min = i;
    const left = this.leftChild(i);
    const right = this.rightChild(i);

    if (
      left <= this.size() &&
      this.minHeap[left].prio < this.minHeap[min].prio
    ) {
      min = left;
    }
    if (
      right <= this.size() &&
      this.minHeap[right].prio < this.minHeap[min].prio
    ) {
      min = right;
    }
    if (min !== i) {
      this.swap(i, min);
      this.minHeapify(min);
    }
  };

  swap = (a, b) => {
    const keyA = this.minHeap[a].element;
    const keyB = this.minHeap[b].element;
    this.keyToIndex.set(keyA, b);
    this.keyToIndex.set(keyB, a);
    [this.minHeap[a], this.minHeap[b]] = [this.minHeap[b], this.minHeap[a]];
  };

  parent = (i) => Math.floor(i / 2);
  leftChild = (i) => i * 2;
  rightChild = (i) => i * 2 + 1;
}

run(() => {
  const grid = extendGrid(
    input.split("\n").map((line) => line.split("").map(Number))
  );

  const unvisited = new PriorityQueue();
  grid.forEach((row, i) =>
    row.forEach((_, j) =>
      unvisited.insert(key(i, j), i == 0 && j == 0 ? 0 : Infinity)
    )
  );

  const cost = Array(grid.length)
    .fill(null)
    .map(() => Array(grid.length).fill(Infinity));
  cost[0][0] = 0;

  while (unvisited.size() > 0) {
    const current = unvisited.extractMin();
    const unvisitedNeighbors = getUnvisitedNeighbors(current);
    if (unvisitedNeighbors.length === 0) continue;

    const [currCol, currRow] = parse(current);
    const currCost = cost[currRow][currCol];

    for (const n of unvisitedNeighbors) {
      const [nCol, nRow] = parse(n);
      unvisited.increasePrio(n, currCost + grid[nRow][nCol]);
      if (currCost + grid[nRow][nCol] < cost[nRow][nCol]) {
        cost[nRow][nCol] = currCost + grid[nRow][nCol];
      }
    }
  }

  return { output: cost[cost.length - 1][cost.length - 1], expected: 2809 };

  // helpers
  function getUnvisitedNeighbors(node) {
    const [col, row] = parse(node);
    const neighbors = [];
    if (col > 0) neighbors.push(key(row, col - 1));
    if (row > 0) neighbors.push(key(row - 1, col));
    if (col < grid.length - 1) neighbors.push(key(row, col + 1));
    if (row < grid.length - 1) neighbors.push(key(row + 1, col));
    return neighbors.filter((n) => unvisited.has(n));
  }

  function extendGrid(grid) {
    const tileSize = grid.length;
    const extendedGrid = [];

    for (let i = 0; i < 5; i++) {
      for (let row = 0; row < tileSize; row++) {
        extendedGrid[i * tileSize + row] = [];
        for (let j = 0; j < 5; j++) {
          for (let col = 0; col < tileSize; col++) {
            extendedGrid[i * tileSize + row][j * tileSize + col] =
              ((grid[row][col] + i + j - 1) % 9) + 1;
          }
        }
      }
    }
    return extendedGrid;
  }

  function parse(key) {
    return key.split(",").map(Number);
  }

  function key(row, col) {
    return `${col},${row}`;
  }
});

exports.PriorityQueue = PriorityQueue;
