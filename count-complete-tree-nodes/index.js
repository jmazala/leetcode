const _ = require('lodash');
const { TreeNode } = require('../js-includes');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.left = (left===undefined ? null : left)
 *     this.val = (val===undefined ? 0 : val)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// O(h^2) SOLUTION
const countNodes = function (root) {
  if (!root) {
    return 0;
  }

  let leftDepth = 1;
  let current = root;

  // TIME:  O(h)
  // SPACE:  O(1)
  while (current.left) {
    current = current.left;
    leftDepth++;
  }

  // TIME:  O(h)
  // SPACE:  O(1)
  let rightDepth = 1;
  current = root;
  while (current.right) {
    current = current.right;
    rightDepth++;
  }

  // BEST CASE:  TIME:  O(h)
  // the tree is full
  if (leftDepth === rightDepth) {
    // const nodes = 0;
    // for (let i = 0; i < leftDepth; i++) {
    //   nodes += 2 ** i;
    // }
    // return nodes;

    return _.range(leftDepth).reduce((sum, i) => {
      return sum + 2 ** i;
    }, 0);
  }

  /*
   O(hLeft) + O(hRight) = O(h) + O(h)
   * (say, O(h-1) worst case
   where every node is filled except bottom right)
   except we recurse and lower the height by 1 with each recursion
   = O(h^2)
   */

  return 1 + countNodes(root.left) + countNodes(root.right);
};

// O(n) SOLUTION
// const countNodes = function (root) {
//   let nodes = 0;
//   helper(root);
//   return nodes;

//   function helper(node) {
//     if (!node) {
//       return;
//     }

//     nodes++;
//     helper(node.left);
//     helper(node.right);
//   }
// };

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
console.log(countNodes(root)); // 6
