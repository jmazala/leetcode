const { TreeNode } = require('../js-includes');

function findClosestElement(root, k) {
  let closest = Infinity;
  let answer;

  while (root) {
    if (k === root.val) {
      return k;
    }

    if (Math.abs(root.val - k) < closest) {
      answer = root.val;
      closest = Math.abs(root.val - k);
    }

    if (k < root.val) {
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return answer;
}

node = new TreeNode(9);
node.left = new TreeNode(4);
node.right = new TreeNode(17);
node.left.left = new TreeNode(3);
node.left.right = new TreeNode(6);
node.left.right.left = new TreeNode(5);
node.left.right.right = new TreeNode(7);
node.right.right = new TreeNode(22);
node.right.right.left = new TreeNode(20);
console.log(findClosestElement(node, 4)); //4
console.log(findClosestElement(node, 18)); //17
console.log(findClosestElement(node, 12)); //9