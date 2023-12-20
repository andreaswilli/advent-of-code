function lcm(numbers) {
  const maxPrimeFactors = new Map();

  for (let n of numbers) {
    const primeFactors = new Map();
    let divisor = 2;

    while (divisor <= n) {
      if (n % divisor === 0) {
        primeFactors.set(divisor, (primeFactors.get(divisor) ?? 0) + 1);
        n /= divisor;
        divisor = 2;
      } else {
        divisor += 1;
      }
    }

    for (const [factor, count] of primeFactors.entries()) {
      maxPrimeFactors.set(
        factor,
        Math.max(maxPrimeFactors.get(factor) ?? 0, count)
      );
    }
  }

  let stepCount = 1;

  for (const [factor, exponent] of maxPrimeFactors.entries()) {
    stepCount *= factor ** exponent;
  }

  return stepCount;
}
exports.lcm = lcm
