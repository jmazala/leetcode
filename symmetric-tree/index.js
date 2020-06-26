/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = function (root) {
  return helper(root, root);
};

const helper = function (node1, node2) {
  if (!node1 && !node2) {
    return true;
  }

  if (!node1 || !node2) {
    return false;
  }

  // match the outer, match the inner
  return (
    node1.val === node2.val &&
    helper(node1.left, node2.right) &&
    helper(node1.right, node2.left)
  );
};
