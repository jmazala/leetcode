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
 * @param {number[]} arr
 * @return {boolean}
 */
//USING BFS FOR FUN
var isValidSequence = function (root, arr) {
  const queue = [[root, 0]];

  while (queue.length) {
    const [node, index] = queue.shift();
    if (!node || index >= arr.length || node.val !== arr[index]) {
      continue;
    }

    if (index === (arr.length - 1) && !node.left && !node.right) {
      return true;
    }

    if (node.left) {
      queue.push([node.left, index + 1]);
    }

    if (node.right) {
      queue.push([node.right, index + 1]);
    }
  }

  return false;
};