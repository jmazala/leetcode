/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n, seen = new Set()) {
  if (seen.has(n)) {
    return false;
  }

  seen.add(n);

  let sum = 0;
  while (n > 0) {
    sum += Math.pow(n % 10, 2);
    n = Math.floor(n / 10);
  }

  if (sum === 1) {
    return true;
  }

  return isHappy(sum, seen);
};

console.log(isHappy(19));
// console.log(isHappy(200));