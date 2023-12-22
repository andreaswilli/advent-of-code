// Day 22: Sand Slabs
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const slabs = input
    .split("\n")
    .map((line) =>
      line
        .split("~")
        .map((pos) => pos.split(",").map(Number))
        .map(([x, y, z]) => ({ x, y, z }))
    )
    .map(([start, end]) => ({ start, end }))
    .sort((a, b) => a.start.z - b.start.z);

  const intersects = ([a1, a2], [b1, b2]) => {
    const [a_min, a_max] = [a1, a2].sort((a, b) => a - b);
    const [b_min, b_max] = [b1, b2].sort((a, b) => a - b);
    return b_min <= a_max && b_max >= a_min;
  };

  const intersectsHorizontally = (slab_a, slab_b) =>
    intersects(
      [slab_a.start.x, slab_a.end.x],
      [slab_b.start.x, slab_b.end.x]
    ) &&
    intersects([slab_a.start.y, slab_a.end.y], [slab_b.start.y, slab_b.end.y]);

  const getFallDist = (slab, i) => {
    const belowSlabs = slabs
      .slice(0, i)
      .filter((s) => intersectsHorizontally(slab, s));
    const maxZ = Math.max(0, ...belowSlabs.map(({ end }) => end.z));
    return slab.start.z - (maxZ + 1);
  };

  for (const [i, slab] of slabs.entries()) {
    const fallDist = getFallDist(slab, i);
    slab.start.z -= fallDist;
    slab.end.z -= fallDist;
  }

  const supports = new Map(slabs.map(() => new Set()).entries());
  const supported_by = new Map(slabs.map(() => new Set()).entries());

  for (const [hi_i, hi_slab] of slabs.entries()) {
    for (const [lo_i, lo_slab] of slabs.slice(0, hi_i).entries()) {
      if (
        intersectsHorizontally(hi_slab, lo_slab) &&
        hi_slab.start.z === lo_slab.end.z + 1
      ) {
        supports.get(hi_i).add(lo_i);
        supported_by.get(lo_i).add(hi_i);
      }
    }
  }

  let totalFallingSlabs = 0;

  for (let i = 0; i < slabs.length; i++) {
    const falling = new Set([i]);
    const q = [i];

    while (q.length) {
      const cur_i = q.shift();
      for (const candidate of supported_by.get(cur_i)) {
        const hasNoSupporters = [...supports.get(candidate)].every(
          (supporter) => falling.has(supporter)
        );
        if (hasNoSupporters && !falling.has(candidate)) {
          falling.add(candidate);
          q.push(candidate);
        }
      }
    }
    totalFallingSlabs += falling.size - 1;
  }

  return { output: totalFallingSlabs, expected: 71002 };
});
