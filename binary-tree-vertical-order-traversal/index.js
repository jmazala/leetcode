const { TreeNode } = require('../js-includes');

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
// WITH BFS AND SORTING HASH KEYS
const verticalOrder = function (root) {
  if (!root) {
    return [];
  }

  if (!root.left && !root.right) {
    return [[root.val]];
  }

  const hash = {};
  const queue = [[root, 0]];

  while (queue.length) {
    const [node, col] = queue.shift();

    hash[col] = hash[col] || [];
    hash[col].push(node.val);

    if (node.left) {
      queue.push([node.left, col - 1]);
    }

    if (node.right) {
      queue.push([node.right, col + 1]);
    }
  }

  return Object.keys(hash)
    .sort((a, b) => a - b)
    .map((i) => hash[i]);
};

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);
console.log(JSON.stringify(verticalOrder(root))); // [ [ 9 ], [ 3, 15 ], [ 20 ], [ 7 ] ]

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(4);
root2.left.right = new TreeNode(5);
root2.right = new TreeNode(3);
root2.right.left = new TreeNode(6);
root2.right.left.right = new TreeNode(8);
root2.right.right = new TreeNode(7);
root2.right.right.right = new TreeNode(9);
console.log(JSON.stringify(verticalOrder(root2))); // [ [ 4 ], [ 2 ], [ 1, 5, 6 ], [ 3, 8 ], [ 7 ], [ 9 ] ]
