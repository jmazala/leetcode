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
 * @return {TreeNode}
 */

//WITH BFS
var invertTree = function(root) {
  if (!root) {
    return root;
  }
  
  const queue = [root];
  
  while (queue.length) {
    const node = queue.shift();
    swap(node);
    
    if (node.left) {
      queue.push(node.left);
    }
    
    if (node.right) {
      queue.push(node.right);
    }
  }
  
  return root;
}

//WITH DFS
// var invertTree = function(root) {
//   if (!root) {
//     return root;
//   }
  
//   swap(root);
  
//   invertTree(root.left);
//   invertTree(root.right);
//   return root;
// };

function swap(root) {
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
}
