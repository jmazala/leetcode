const { TreeNode } = require('../js-includes');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

//USING BFS
var largestValues = function (root) {
  if (!root) {
    return [];
  }

  let largestValues = [];
  const queue = [root];

  while (queue.length) {
    let numNodes = queue.length;
    let largestValueForRow = -Infinity;

    while (numNodes) {
      const node = queue.shift();
      numNodes--;
      largestValueForRow = Math.max(node.val, largestValueForRow);

      if (node.left) {
        queue.push(node.left)
      };

      if (node.right) {
        queue.push(node.right)
      };
    }

    largestValues.push(largestValueForRow);
  }

  return largestValues;
};

const root = new TreeNode(1);
root.left = new TreeNode(3);
root.right = new TreeNode(2);
root.right.right = new TreeNode(9);
root.left.left = new TreeNode(5);
root.left.right = new TreeNode(3);
console.log(largestValues(root)); // [1, 3, 9]