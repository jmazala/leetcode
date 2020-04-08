//https://leetcode.com/problems/frog-jump/
/**
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function (stones) {
  if (!stones || stones.length < 2 || stones[0] !== 0 || stones[1] !== 1) {
    return false;
  }

  const maxStone = stones[stones.length - 1];

  //turn stones into a hash to keep track of available generated steps to that stone
  //don't need it for the last stone.
  const hash = {};
  stones.forEach(stone => {
    hash[stone] = [];
  });

  //from stone 0 we can only move up 1
  hash[0] = [1];

  for (let i = 0; i < stones.length - 1; i++) {
    const current = stones[i];

    for (let j = 0; j < hash[current].length; j++) {
      const steps = hash[current][j];
      const next = current + steps;

      if (hash[next] === undefined || steps < 1) {
        continue;
      }

      if (next === maxStone) {
        return true;
      }

      hash[next].push(steps - 1);
      hash[next].push(steps);
      hash[next].push(steps + 1);
    }
  }

  return false;
}

console.log(canCross([0, 1, 3, 5, 6, 8, 12, 17])); // true
console.log(canCross([0, 1, 2, 3, 4, 8, 9, 11])); // false