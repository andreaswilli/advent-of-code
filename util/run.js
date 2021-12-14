const { performance } = require("perf_hooks");

exports.run = (func) => {
  const start = performance.now();
  const result = func();
  const { output, operations, expected } = result;
  const time = performance.now() - start;

  if (result.hasOwnProperty("expected")) {
    console.assert(
      output === expected,
      `Output did not match!\n  expected: ${expected}\n  got     : ${output}`
    );
  }

  const outputData = [
    { label: "Output value", value: `${output}` },
    { label: "Finished after", value: `${time.toFixed(3)} ms` },
  ];
  if (operations != undefined) {
    outputData.push({
      label: "Operations",
      value: `${operations}`.replace(/\B(?=(\d{3})+(?!\d))/g, "'"),
    });
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

  console.log("\n");
  console.log(`★ ${"=".repeat(outputLines[0].length - 4)} ★`);
  console.log(`‖${" ".repeat(outputLines[0].length - 2)}‖`);
  outputLines.forEach((line) => {
    console.log(line);
  });
  console.log(`‖${" ".repeat(outputLines[0].length - 2)}‖`);
  console.log(`★ ${"=".repeat(outputLines[0].length - 4)} ★`);
  console.log("\n");
};
