const _ = require('lodash');
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
 * @return {number}
 */
// WITHOUT HELPER FUNCTION
const sumNumbers = function (root, sum = 0) {
  if (!root) {
    return 0;
  }

  let val = sum * 10 + root.val;

  const left = sumNumbers(root.left, val);
  const right = sumNumbers(root.right, val);

  if (left + right !== 0) {
    val = left + right;
  }

  return val;
};

// WITH BOTTOM UP
// const sumNumbers = function (root) {
//   if (!root) {
//     return 0;
//   }

//   const answer = bottomUp(root);
//   return _.sum(answer.map((i) => i.num));

//   function bottomUp(node) {
//     if (!node) {
//       return [];
//     }

//     if (!node.left && !node.right) {
//       return [{ num: node.val, tens: 0 }];
//     }

//     // go all the way down the tree left until you can't anymore
//     const left = bottomUp(node.left);
//     const right = bottomUp(node.right);

//     const newResult = [];
//     for (const r of left.concat(right)) {
//       newResult.push({
//         num: r.num + node.val * 10 ** (r.tens + 1),
//         tens: r.tens + 1,
//       });
//     }

//     return newResult;
//   }
// };

// WITH DFS AND STRINGS
// const sumNumbers = function (root) {
//   if (!root) {
//     return 0;
//   }

//   const answer = [];
//   dfs(root, '');
//   // start at the root
//   // dfs, keeping track of the current sum and the place in tens
//   // when you're at a leaf node, store it in an array
//   // sum the array at the end
//   return _.sum(answer.map((i) => +i));

//   function dfs(node, numString) {
//     if (!node) {
//       return 0;
//     }

//     numString += node.val;

//     if (!node.left && !node.right) {
//       answer.push(numString);
//       return;
//     }

//     dfs(node.left, numString);
//     dfs(node.right, numString);
//   }
// };

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
console.log(sumNumbers(root));

const root2 = new TreeNode(4);
root2.left = new TreeNode(9);
root2.left.left = new TreeNode(5);
root2.left.right = new TreeNode(1);
root2.right = new TreeNode(0);
console.log(sumNumbers(root2)); // 1026
