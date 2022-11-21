function countOne(n = 0) {
  let factor = 1;
  let count = 0;
  let next = Math.floor(n / factor);

  while (next !== 0) {
    const lower = n - next * factor;
    const high = Math.floor(n / (10 * factor));
    const curr = next % 10;
    console.log(lower, high, curr, next)

    if (curr === 0) {
      count += high * factor;
    } else if (curr === 1) {
      count += high * factor + lower + 1;
    } else {
      count += (high + 1) * factor;
    }

    factor *= 10;
    next = Math.floor(n / factor);
    console.log(count);
  }
  return count;
}

console.log('countOne(5)', countOne(21))