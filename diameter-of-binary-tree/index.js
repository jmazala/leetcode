function TreeNode(val) {
  this.val = val;
  return this;
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let answer = 0;

  if (!root) {
    return answer;
  }

  const leftHeight = height(root.left);
  const rightHeight = height(root.right);
  const leftDiameter = diameterOfBinaryTree(root.left);
  const rightDiameter = diameterOfBinaryTree(root.right);

  answer = Math.max(leftHeight + rightHeight, Math.max(leftDiameter, rightDiameter));
  return answer;
};

function height(node) {
  if (!node) {
    return 0; //height of no node is 1
  }

  return 1 + Math.max(height(node.left), height(node.right));
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right = new TreeNode(3);
console.log(diameterOfBinaryTree(root));