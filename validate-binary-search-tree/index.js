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
  return helper(root, null, null);
};

var helper = function(root, lower, upper) {
  //base case there's nothing here.
  if (!root) {
      return true;
  }
  
  const val = root.val;
  if (lower !== null && val <= lower) {
      return false;
  }
  
  if (upper !== null && val >= upper) {
      return false;
  }
  
  return helper(root.right, val, upper) && helper(root.left, lower, val);
}