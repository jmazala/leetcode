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
const isValidBST = function (root) {
  return helper(root, -Infinity, Infinity);
};

const helper = function (root, lower, upper) {
  if (!root) {
    return true;
  }

  return (
    root.val > lower &&
    root.val < upper &&
    helper(root.right, root.val, upper) &&
    helper(root.left, lower, root.val)
  );
};
