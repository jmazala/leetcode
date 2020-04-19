/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  const valuesPerLevel = [];

  if (!root) {
    return valuesPerLevel;
  }

  dfs(root, 0);

  return valuesPerLevel.map(i => _.sum(i) / i.length);

  function dfs(node, level) {
    if (!node) {
      return;
    }

    valuesPerLevel[level] = valuesPerLevel[level] || [];
    valuesPerLevel[level].push(node.val);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
};

