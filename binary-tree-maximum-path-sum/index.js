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
const maxPathSum = function (root) {
  let answer = Number.MIN_SAFE_INTEGER;
  helper(root);
  return answer;

  function helper(node) {
    if (!node) {
      return 0;
    }

    // check left and right sub trees recursively
    const left = Math.max(0, helper(node.left));
    const right = Math.max(0, helper(node.right));

    answer = Math.max(answer, left + right + node.val);

    // we are overwriting answer, but we still
    // return with node.val because is meant to return
    // the gain from (and including) this particular node
    return node.val + Math.max(left, right);
  }
};
