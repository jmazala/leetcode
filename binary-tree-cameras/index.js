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
 * @return {number}
 */
const minCameraCover = function (root) {
  if (!root) {
    return 0;
  }

  if (!root.left && !root.right) {
    return 1;
  }

  const covered = new Set([null]);
  let answer = 0;
  helper(root, null);
  return answer;

  function helper(node, parent) {
    if (!node) {
      return;
    }

    helper(node.left, node);
    helper(node.right, node);

    if (
      (!parent && !covered.has(node)) ||
      !covered.has(node.left) ||
      !covered.has(node.right)
    ) {
      covered.add(node);
      covered.add(parent);
      covered.add(node.left);
      covered.add(node.right);
      answer++;
    }
  }
};
