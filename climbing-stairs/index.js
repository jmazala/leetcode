/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n < 2) {
    return 1;
  }

  let minusTwo = 1;
  let minusOne = 1;
  let answer;

  for (let i = 2; i <= n; i++) {
    answer = minusOne + minusTwo;
    minusTwo = minusOne;
    minusOne = answer;
  }

  return answer;
};