const _ = require('lodash');

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getPermutation = function (n, k) {
  let answer = '';
  const nums = _.range(1, n + 1);
  helper([], nums);
  return answer;

  function helper(taken, remaining) {
    if (k === 0) {
      return;
    }

    if (remaining.length === 0) {
      k--;

      if (k === 0) {
        answer = taken.join('');
      }

      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      taken.push(remaining[i]);
      const nextRemaining = Array.from(remaining);
      nextRemaining.splice(i, 1);
      helper(taken, nextRemaining);
      taken.pop();
    }
  }
};

console.log(getPermutation(3, 3)); // 213
