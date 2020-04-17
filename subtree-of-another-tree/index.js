const _ = require('lodash');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
//with DFS
var isSubtree = function (s, t) {
  if (!s) {
    return false;
  }

  return dfsFindMatch(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
}

//with BFS
// var isSubtree = function (s, t) {
//   if (!s) {
//     return false;
//   }

//   //bfs s to find matching start nodes in s for t
//   const queue = [s];
//   while (queue.length) {
//     const node = queue.shift();
//     if (!node) {
//       continue;
//     }

//     if (node.val === t.val) {
//       const match = dfsFindMatch(node, t);
//       if (match) {
//         return true;
//       }
//     }

//     queue.push(node.left);
//     queue.push(node.right);
//   }

//   return false;
// };

function dfsFindMatch(root1, root2) {
  if (!root1 && !root2) {
    return true;
  }

  if (_.get(root1, 'val') !== _.get(root2, 'val')) {
    return false;
  }

  return dfsFindMatch(root1.left, root2.left) && dfsFindMatch(root1.right, root2.right);
}