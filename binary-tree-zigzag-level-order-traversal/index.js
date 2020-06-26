/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = function (root) {
  if (!root) {
    return [];
  }

  let forward = true;

  const queue = [root];
  const answer = [];

  while (queue.length) {
    let numNodes = queue.length;
    const rowAnswer = [];
    while (numNodes) {
      const node = queue.shift();
      numNodes--;

      rowAnswer.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    forward ? answer.push(rowAnswer) : answer.push(rowAnswer.reverse());
    forward = !forward;
  }

  return answer;
};
