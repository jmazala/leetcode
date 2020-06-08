/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const results = [];
  const set = new Set();
  helper([], nums);
  return results;

  function helper(taken, remaining) {
    if (remaining.length === 0) {
      const key = JSON.stringify(taken);
      if (!set.has(key)) {
        results.push(taken);
        set.add(key)
      }

      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const num = remaining[i];
      taken.push(num);
      const newRemaining = Array.from(remaining);
      newRemaining.splice(i, 1);
      helper(Array.from(taken), newRemaining);
      taken.pop(num);
    }
  }
};