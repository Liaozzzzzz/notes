/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var divide = function(a, b) {
  const MAX_VALUE = 2 ** 31 -1;
  const MIN_VALUE = -(2**31);
  const MAX_LIMIT = MIN_VALUE >> 1;

  if (a === 0) {
    return  0;
  }

  if (a === MIN_VALUE && b === -1) {
    return MAX_VALUE;
  }

  const isPos = a < 0 && b > 0 || a > 0 && b < 0;
  if (a > 0) {
    a = -a;
  }
  if (b > 0) {
    b = -b;
  }

  let ans = 0;
  while (a <= b) {
    let divisor = b;
    let quotient = 1;

    while (divisor >= MAX_LIMIT && divisor+divisor >= a) {
      divisor += divisor;
      quotient += quotient;
    }

    a -= divisor;
    ans += quotient;
  }

  return isPos ? ans : -ans;
};