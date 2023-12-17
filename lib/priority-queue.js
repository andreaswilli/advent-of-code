class Node {
  constructor(element, prio) {
    this.element = element;
    this.prio = prio;
  }
}

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

exports.PriorityQueue = PriorityQueue
