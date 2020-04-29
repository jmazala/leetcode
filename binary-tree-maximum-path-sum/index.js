/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  //
  let maxPathSum = Number.MIN_SAFE_INTEGER;
  helper(root);
  return maxPathSum;

  function helper(node) {
    if (!node) {
      return 0;
    }

    //check left and right sub trees recursively
    const left = Math.max(0, helper(node.left));
    const right = Math.max(0, helper(node.right));

    maxPathSum = Math.max(maxPathSum, left + right + node.val);

    return node.val + Math.max(left, right);
  };
};