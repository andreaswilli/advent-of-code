// Day 7: No Space Left On Device
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let output = 0;

  class File {
    constructor(size) {
      this.size = size;
    }
  }

  class Dir {
    children = [];
    constructor(name) {
      this.name = name;
    }
  }

  const root = new Dir("/");
  const path = [root];

  function populateSize(fileOrDir) {
    if (fileOrDir.size != null) {
      return fileOrDir.size;
    }
    const childrenSize = fileOrDir.children.reduce(
      (totalSize, child) => totalSize + populateSize(child),
      0
    );
    if (childrenSize <= 100000) {
      output += childrenSize;
    }
    fileOrDir.size = childrenSize;
    return childrenSize;
  }

  const lines = input.split("\n");
  let i = 1;

  while (i < lines.length) {
    if (lines[i].startsWith("$ cd")) {
      const target = lines[i].split(" ").slice(-1)[0];
      if (target === "..") {
        path.pop();
      } else {
        path.push(
          path[path.length - 1].children.find((child) => child.name === target)
        );
      }
      i++;
    } else if (lines[i].startsWith("$ ls")) {
      i++;
      while (i < lines.length && !lines[i].startsWith("$")) {
        const [meta, name] = lines[i].split(" ");
        if (meta === "dir") {
          path[path.length - 1].children.push(new Dir(name));
        } else {
          path[path.length - 1].children.push(new File(Number(meta)));
        }
        i++;
      }
    }
  }

  populateSize(root);

  return { output, expected: 1141028 };
});
