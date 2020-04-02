//https://leetcode.com/problems/combination-sum-ii/submissions/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  result = new Set();
  //usually use DFS to find combinations
  findCombinationsToTargetWithDFS(candidates, target);

  return Array.from(result).map(i => i.split(','));

  function findCombinationsToTargetWithDFS(candidates, target, prefix = []) {
    // console.log(`candidates: ${candidates}, target=${target}, prefix=${prefix}`);
    if (target === 0) {
      console.log(prefix);
      result.add(prefix.join(','));
      return;
    }

    if (target < 0 || !candidates) {
      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      if (i === 0 || candidates[i] > candidates[i - 1]) {
        prefix.push(candidates[i]);
        findCombinationsToTargetWithDFS(candidates.slice(i + 1), target - candidates[i], prefix);
        prefix.pop();
      }
    }
  }
};