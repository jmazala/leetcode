/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
  return this;
}

var delNodes = function (root, to_delete) {
  const answer = [];
  
  helper(root);
  if (to_delete.indexOf(root.val) === -1) {
    answer.push(root);
  }
  
  return answer;

  function helper(node) {
    if (!node) {
      return null;
    }

    node.left = helper(node.left);
    node.right = helper(node.right);

    //if it's supposed to be deleted, it's left and right subtrees
    //will be new roots
    //unless those are deleted too

    if (to_delete.indexOf(node.val) > -1) {
      if (node.left) {
        answer.push(node.left);
      }
      
      if (node.right) {
        answer.push(node.right);
      }

      return null;
    }

    return node;
  }
};

root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);
a = delNodes(root, [3, 5])
console.log(a);