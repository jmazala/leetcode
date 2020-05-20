/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  //inorder traverse the tree until we get the kth element
  //inorder is left, node, right
  const values = [];
  dfs(root);
  return values[k - 1];

  function dfs(node) {
    if (!node || values.length === k) {
      return;
    }

    dfs(node.left);
    values.push(node.val);
    if (values.length === k) {
      return;
    }
    dfs(node.right);
  }
};