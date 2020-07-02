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
 * @return {number[][]}
 */
const levelOrderBottom = function (root) {
  const answer = [];

  if (!root) {
    return answer;
  }

  const queue = [root];

  while (queue.length) {
    let numNodes = queue.length;
    const level = [];
    while (numNodes) {
      const node = queue.shift();
      level.push(node.val);
      numNodes--;

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    answer.unshift(level);
  }

  return answer;
};
