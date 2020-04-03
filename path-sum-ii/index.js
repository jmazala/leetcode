/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
  if (!root) {
    return [];
  }

  const answer = [];
  dfs(root);
  return answer;

  function dfs(node, prefix = []) {
    prefix = Array.from(prefix);
    prefix.push(node.val);

    if (!node.left && !node.right) {
      if (_.sum(prefix) === sum) {
        answer.push(prefix);
      }

      return;
    }

    if (node.left) {
      dfs(node.left, prefix);
    }

    if (node.right) {
      dfs(node.right, prefix);
    }
  }
};