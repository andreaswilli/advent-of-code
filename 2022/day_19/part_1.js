// Day 19: Not Enough Minerals
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let totalQualityLevel = 0;
  const key = (robots, resources, time) => `${robots}-${resources}-${time}`;

  const search = (bp, maxSpend, robots, resources, time) => {
    const queue = [[robots, resources, time]];
    const memo = {};
    let max = 0;

    while (queue.length) {
      const [robots, resources, time] = queue.pop();

      if (time == 0) max = Math.max(max, resources[3]);

      if (memo[key(robots, resources, time)] != null) continue;

      // only mine
      max = Math.max(max, resources[3] + robots[3] * time);

      // or craft any robot
      for (const [robotType, cost] of bp.entries()) {
        if (robots[robotType] >= maxSpend[robotType]) continue;

        let requiredTime = 0;
        for (const [resType, amt] of cost) {
          if (robots[resType] === 0) {
            requiredTime = Infinity;
          } else {
            requiredTime = Math.max(
              requiredTime,
              Math.ceil((amt - resources[resType]) / robots[resType])
            );
          }
        }
        const timeLeft = time - requiredTime - 1;
        if (timeLeft > 0) {
          const newRobots = [...robots];
          newRobots[robotType]++;

          const newResources = [...resources];
          for (let resType = 0; resType < 4; resType++) {
            newResources[resType] = Math.min(
              newResources[resType] + robots[resType] * (requiredTime + 1),
              maxSpend[resType] * timeLeft
            );
          }
          for (const [resType, amt] of cost) {
            newResources[resType] -= amt;
          }

          queue.push([newRobots, newResources, timeLeft]);
        }
      }
      memo[key(robots, resources, time)] = max;
    }
    return max;
  };

  for (const [i, line] of input.split("\n").entries()) {
    const maxSpend = [0, 0, 0, Infinity];
    const bp = line
      .split(": ")[1]
      .slice(0, -1)
      .split(". ")
      .map((robotType) => {
        return robotType
          .split("costs ")[1]
          .split(" and ")
          .map((cost) => {
            let [amt, res] = cost.split(" ");
            res = ["ore", "clay", "obsidian"].indexOf(res);
            maxSpend[res] = Math.max(maxSpend[res], amt);
            return [res, Number(amt)];
          });
      });
    totalQualityLevel +=
      (i + 1) * search(bp, maxSpend, [1, 0, 0, 0], [0, 0, 0, 0], 24);
  }

  return { output: totalQualityLevel, expected: 1550 };
});
