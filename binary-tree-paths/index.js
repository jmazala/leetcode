const { TreeNode } = require('../js-includes');
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
const binaryTreePaths = function (root) {
  const answer = [];
  dfs(root, []);

  return answer.map((i) => i.join('->'));

  function dfs(node, prefix) {
    if (!node) {
      return;
    }

    prefix.push(node.val);
    if (!node.left && !node.right) {
      answer.push(Array.from(prefix));
      prefix.pop();
      return;
    }

    dfs(node.left, prefix);
    dfs(node.right, prefix);
    prefix.pop();
  }
};

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.right = new TreeNode(5);
root.right = new TreeNode(3);
console.log(binaryTreePaths(root));
