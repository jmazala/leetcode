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
    hash[stone] = new Set();
  });

  //from stone 0 we can only move up 1
  hash[0] = [1];

  for (let i = 0; i < stones.length - 1; i++) {
    const current = stones[i];
    const stepsArray = Array.from(hash[current]);

    for (let j = 0; j < stepsArray.length; j++) {
      const steps = stepsArray[j];
      const next = current + steps;

      if (hash[next] === undefined || steps < 1) {
        continue;
      }

      if (next === maxStone) {
        return true;
      }

      hash[next].add(steps - 1);
      hash[next].add(steps);
      hash[next].add(steps + 1);
    }
  }

  return false;
}