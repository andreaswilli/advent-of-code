// Day 16: Packet Decoder
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  const binaryPacket = input
    .split("")
    .map((digit) => Number(parseInt(digit, 16)).toString(2).padStart(4, "0"))
    .join("");

  const { vSum } = decode(binaryPacket);

  return { output: vSum, expected: 871 };

  // helpers
  function decode(packet) {
    const type = extractType(packet);

    if (type === 4) return decodeLiteral(packet);

    return decodeOperator(packet);
  }

  function decodeLiteral(packet) {
    const version = extractVersion(packet);
    let len = 6;

    do {
      len += 5;
    } while (parseInt(packet[len - 5], 2) === 1);

    return { vSum: version, len };
  }

  function decodeOperator(packet) {
    let version = extractVersion(packet);
    let len = 7;

    if (extractLengthType(packet) === 0) {
      len += 15;
      const subPacketLen = extractSubPacketLen(packet);
      let decodedLen = 0;

      while (decodedLen < subPacketLen) {
        const { vSum, len: l } = decode(packet.slice(len + decodedLen));
        version += vSum;
        decodedLen += l;
      }
      len += decodedLen;
    } else {
      len += 11;
      const subPacketCount = extractSubPacketCount(packet);

      for (let i = 0; i < subPacketCount; i++) {
        const { vSum, len: l } = decode(packet.slice(len));
        version += vSum;
        len += l;
      }
    }
    return { vSum: version, len };
  }

  function extractVersion(packet) {
    return parseInt(packet.slice(0, 3), 2);
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
