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

//iterative
var inorderTraversal = function (root) {
  const stack = [];
  const answer = [];

  let current = root;
  while (current != null || stack.length > 0) {
    while (current != null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop();
    answer.push(current.val);
    current = current.right;
  }

  return answer;
}

//recursive
// var inorderTraversal = function (root) {
//   let answer = [];
//   if (!root) {
//     return answer;
//   }

//   answer = answer.concat(inorderTraversal(root.left));
//   answer.push(root.val);
//   answer = answer.concat(inorderTraversal(root.right));
//   return answer;
// };