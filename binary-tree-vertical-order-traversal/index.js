const { TreeNode } = require('../js-includes');

const verticalTraversal = function (root) {
  //dfs the tree keeping track of where it's at horizontally
  const hash = {};
  const visited = new Set();
  let minLevel = Infinity;
  let maxLevel = -Infinity;

  dfs(root, 0);
  const answer = [];
  for (let i = minLevel; i <= maxLevel; i++) {
    answer.push(hash[i]);
  }

  return answer;

  function dfs(node, horizontalLevel) {
    if (!node) {
      return;
    }

    minLevel = Math.min(minLevel, horizontalLevel);
    maxLevel = Math.max(maxLevel, horizontalLevel);
    
    if (!visited.has(node.val)) {
      visited.add(node.val);
      hash[horizontalLevel] = hash[horizontalLevel] || [];
      hash[horizontalLevel].push(node.val);
    }

    dfs(node.left, horizontalLevel - 1);
    dfs(node.right, horizontalLevel + 1);
  }
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// var verticalTraversal = function (root) {
//   const nodes = {};

//   //recursively go through the tree and populate a map remembering min and max coordinates
//   dfs(root, 0, 0);
//   //map it to a 2d array and return it
//   answer = []

//   Object.keys(nodes).sort((a, b) => a - b).forEach(x => {
//     let subAnswer = [];

//     Object.keys(nodes[x]).sort((a, b) => a - b).forEach(y => {
//       subAnswer = subAnswer.concat(nodes[x][y].map(node => node.val).sort((a, b) => a - b));
//     });

//     answer.push(subAnswer);
//   });

//   return answer;

//   function dfs(node, x, y) {
//     if (!node) {
//       return;
//     }

//     nodes[x] = nodes[x] || {};
//     nodes[x][y] = nodes[x][y] || [];
//     nodes[x][y].push(node);

//     dfs(node.left, x - 1, y + 1);
//     dfs(node.right, x + 1, y + 1);
//   }
// };

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);
console.log(verticalTraversal(root)); // [ [ 9 ], [ 3, 15 ], [ 20 ], [ 7 ] ]

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(4);
root2.left.right = new TreeNode(5);
root2.right = new TreeNode(3);
root2.right.left = new TreeNode(6);
root2.right.left.right = new TreeNode(8);
root2.right.right = new TreeNode(7);
root2.right.right.right = new TreeNode(9);
console.log(verticalTraversal(root2)); //[ [ 4 ], [ 2 ], [ 1, 5, 6 ], [ 3, 8 ], [ 7 ], [ 9 ] ]