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
var isValidBST = function(root) {
  return helper(root, -Infinity, Infinity);
};

var helper = function(root, lower, upper) {
  if (!root) {
    return true;
  }
  
  return root.val > lower &&
    root.val < upper &&
    helper(root.right, val, upper) &&
    helper(root.left, lower, val);
}