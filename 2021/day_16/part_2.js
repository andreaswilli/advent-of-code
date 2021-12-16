// Day 16: Packet Decoder
// Part Two
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const binaryPacket = input
    .split("")
    .map((digit) => Number(parseInt(digit, 16)).toString(2).padStart(4, "0"))
    .join("");

  const { val } = decode(binaryPacket);

  return { output: val, expected: 68703010504 };

  // helpers
  function decode(packet) {
    const type = extractType(packet);

    if (type === 4) return decodeLiteral(packet);

    return decodeOperator(packet);
  }

  function decodeLiteral(packet) {
    let len = 6;
    let str = "";

    do {
      str += packet.slice(len + 1, len + 5);
      len += 5;
    } while (parseInt(packet[len - 5], 2) === 1);

    return { len, val: parseInt(str, 2) };
  }

  function decodeOperator(packet) {
    const type = extractType(packet);
    let len = 7;

    const values = [];

    if (extractLengthType(packet) === 0) {
      len += 15;
      const subPacketLen = extractSubPacketLen(packet);
      let decodedLen = 0;

      while (decodedLen < subPacketLen) {
        const { len: l, val } = decode(packet.slice(len + decodedLen));
        decodedLen += l;
        values.push(val);
      }
      len += decodedLen;
    } else {
      len += 11;
      const subPacketCount = extractSubPacketCount(packet);

      for (let i = 0; i < subPacketCount; i++) {
        const { len: l, val } = decode(packet.slice(len));
        len += l;
        values.push(val);
      }
    }
    return { len, val: calculate(values, type) };
  }

  function calculate(values, type) {
    switch (type) {
      case 0:
        return values.reduce((sum, cur) => sum + cur, 0);
      case 1:
        return values.reduce((prod, cur) => prod * cur, 1);
      case 2:
        return Math.min(...values);
      case 3:
        return Math.max(...values);
      case 5:
        return values[0] > values[1] ? 1 : 0;
      case 6:
        return values[0] < values[1] ? 1 : 0;
      case 7:
        return values[0] === values[1] ? 1 : 0;
    }
  }

  function extractType(packet) {
    return parseInt(packet.slice(3, 6), 2);
  }

  function extractLengthType(packet) {
    return parseInt(packet[6], 2);
  }

  function extractSubPacketLen(packet) {
    return parseInt(packet.slice(7, 22), 2);
  }

  function extractSubPacketCount(packet) {
    return parseInt(packet.slice(7, 18), 2);
  }
});
