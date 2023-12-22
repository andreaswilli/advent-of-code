// Day 22: Sand Slabs
// Part One
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

  const safeToDisintegrate = (slab, i) => {
    const slabsOnTop = slabs
      .slice(i)
      .filter(
        (s) => slab.end.z + 1 === s.start.z && intersectsHorizontally(slab, s)
      );

    if (slabsOnTop.length === 0) return true;

    const slabsOnSameZ = slabs.filter(({ end }) => slab.end.z === end.z);

    if (slabsOnSameZ.length === 1) return false;

    return slabsOnTop.every(
      (s_top) =>
        slabsOnSameZ.filter((s_same) => intersectsHorizontally(s_top, s_same))
          .length > 1
    );
  };

  for (const [i, slab] of slabs.entries()) {
    const fallDist = getFallDist(slab, i);
    slab.start.z -= fallDist;
    slab.end.z -= fallDist;
  }

  const result = slabs.filter(safeToDisintegrate).length;

  return { output: result, expected: 505 };
});
