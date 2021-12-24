// Day 23: Amphipod
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const amphipods = ["A", "B", "C", "D"];
  const rooms = { A: [], B: [], C: [], D: [] };
  input
    .split("\n")
    .slice(2, 4)
    .map((line) => line.replaceAll("#", "").trim())
    .forEach((line, i) => {
      rooms.A[i] = line[0];
      rooms.B[i] = line[1];
      rooms.C[i] = line[2];
      rooms.D[i] = line[3];
    });
  const hall = [null, null, "X", null, "X", null, "X", null, "X", null, null];
  const cache = new Map();
  let lowestCost = Infinity;

  solve(hall, rooms, 0);

  return { output: lowestCost, expected: 13066 };

  // helpers
  function solve(hall, rooms, cost) {
    const stateKey = getStateKey(hall, rooms);
    if (cache.has(stateKey) && cache.get(stateKey) <= cost) {
      return;
    }
    cache.set(stateKey, cost);
    if (amphipods.every((a) => isRoomComplete(a, rooms))) {
      if (cost < lowestCost) {
        lowestCost = cost;
      }
      return;
    }

    for (let i = 0; i < hall.length; i++) {
      if (hall[i] == null || hall[i] === "X") continue;

      const spotInRoom = getRoomSpotForAmphipod(i, hall, rooms);
      if (spotInRoom != null) {
        const [moveCost, newHall, newRooms] = moveToRoom(i, hall, rooms);
        solve(newHall, newRooms, cost + moveCost);
      }
    }

    for (const a of amphipods) {
      const spotInRoom = getFirstSpotToMoveOut(a, rooms);
      if (spotInRoom != null) {
        for (const s of getValidHallSpots(a, hall)) {
          const [moveCost, newHall, newRooms] = moveToHall(a, s, hall, rooms);
          solve(newHall, newRooms, cost + moveCost);
        }
      }
    }
  }

  function moveToHall(amphipod, pos, hall, rooms) {
    const modifiedHall = clone(hall);
    const modifiedRooms = clone(rooms);
    const spotInRoom = getFirstSpotToMoveOut(amphipod, rooms);

    modifiedHall[pos] = rooms[amphipod][spotInRoom];
    modifiedRooms[amphipod][spotInRoom] = null;

    return [
      (Math.abs(pos - getRoomXPos(amphipod)) + spotInRoom + 1) *
        getCost(modifiedHall[pos]),
      modifiedHall,
      modifiedRooms,
    ];
  }

  function moveToRoom(pos, hall, rooms) {
    const amphipod = hall[pos];
    const spotInRoom = getRoomSpotForAmphipod(pos, hall, rooms);

    const modifiedHall = clone(hall);
    const modifiedRooms = clone(rooms);

    modifiedHall[pos] = null;
    modifiedRooms[amphipod][spotInRoom] = amphipod;

    return [
      (Math.abs(pos - getRoomXPos(amphipod)) + spotInRoom + 1) *
        getCost(amphipod),
      modifiedHall,
      modifiedRooms,
    ];
  }

  function getCost(amphipod) {
    return 10 ** amphipods.indexOf(amphipod);
  }

  function getRoomXPos(amphipod) {
    return 2 + 2 * amphipods.indexOf(amphipod);
  }

  function getValidHallSpots(amphipod, hall) {
    const validSpots = [];

    for (let i = getRoomXPos(amphipod) - 1; i >= 0; i--) {
      if (hall[i] === "X") continue;
      if (hall[i] != null) break;
      validSpots.unshift(i);
    }
    for (let i = getRoomXPos(amphipod) + 1; i < hall.length; i++) {
      if (hall[i] === "X") continue;
      if (hall[i] != null) break;
      validSpots.push(i);
    }
    return validSpots;
  }

  function getRoomSpotForAmphipod(pos, hall, rooms) {
    const amphipod = hall[pos];
    const roomPos = getRoomXPos(amphipod);
    const hallSpacesInBetween = hall.slice(
      Math.min(pos, roomPos) + 1,
      Math.max(pos, roomPos)
    );

    for (const spot of hallSpacesInBetween) {
      if (!["X", null].includes(spot)) return null;
    }

    if (rooms[amphipod].some((spot) => ![amphipod, null].includes(spot))) {
      return null;
    }

    return (
      rooms[amphipod].length - 1 - [...rooms[amphipod]].reverse().indexOf(null)
    );
  }

  function getFirstSpotToMoveOut(amphipod, rooms) {
    if (!rooms[amphipod].some((spot) => ![amphipod, null].includes(spot))) {
      return null;
    }
    const index = rooms[amphipod].findIndex((spot) => spot != null);
    return index !== -1 ? index : null;
  }

  function isRoomComplete(amphipod, rooms) {
    return !rooms[amphipod].some((spot) => spot !== amphipod);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getStateKey(hall, rooms) {
    return `${hall}-${amphipods.reduce(
      (acc, cur) => acc + rooms[cur] + "/",
      ""
    )}`;
  }
});
