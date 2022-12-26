const { performance } = require("perf_hooks");

exports.run = (func) => {
  console.clear();

  const start = performance.now();
  const result = func();
  const { output, expected } = result;
  const time = performance.now() - start;

  const outputData = [
    { label: "Output", value: `${output}` },
    { label: "Time", value: `${formatTime(time, 1)}` },
  ];
  let color = "\x1b[0m";
  if (expected != null) {
    if (output === expected) {
      color = "\x1b[32m";
    } else {
      outputData.splice(1, 0, { label: "Expected", value: String(expected) });
      color = "\x1b[31m";
    }
  }

  const maxLabelLength = Math.max(
    ...outputData.map((data) => data.label.length)
  );
  const maxValueLength = Math.max(
    ...outputData.map((data) => data.value.length)
  );

  const outputLines = outputData.map(
    (data) =>
      `‖  ${data.label.padEnd(maxLabelLength)} : ${data.value.padEnd(
        maxValueLength
      )}  ‖`
  );

  console.log(color + `★ ${"=".repeat(outputLines[0].length - 4)} ★`);
  console.log(`‖${" ".repeat(outputLines[0].length - 2)}‖`);
  outputLines.forEach((line) => {
    console.log(line);
  });
  console.log(`‖${" ".repeat(outputLines[0].length - 2)}‖`);
  console.log(`★ ${"=".repeat(outputLines[0].length - 4)} ★` + "\x1b[0m");

  function formatTime(timeMs, decPlaces) {
    if (timeMs < 1) return `${(timeMs * 1000).toFixed(decPlaces)} μs`;
    if (timeMs < 1000) return `${timeMs.toFixed(decPlaces)} ms`;
    if (timeMs < 1000 * 60) return `${(timeMs / 1000).toFixed(decPlaces)} s`;
    return `${(timeMs / (1000 * 60)).toFixed(decPlaces)} min`;
  }
};
