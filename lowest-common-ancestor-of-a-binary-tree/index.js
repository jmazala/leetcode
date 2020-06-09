const { TreeNode } = require('../js-includes');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = function (root, p, q) {
  let pNode;
  let qNode;
  // add parents and depth to the tree
  addParentsAndDepth(root, null, 0);
  // account for difference in depth

  while (qNode.depth !== pNode.depth) {
    if (pNode.depth < qNode.depth) {
      qNode = qNode.parent;
    } else {
      pNode = pNode.parent;
    }
  }

  while (pNode.val !== qNode.val) {
    pNode = pNode.parent;
    qNode = qNode.parent;
  }

  return pNode;

  function addParentsAndDepth(node, parent, depth) {
    if (!node || (pNode && qNode)) {
      return;
    }

    node.depth = depth;
    node.parent = parent;
    if (node.val === p) {
      pNode = node;
    }

    if (node.val === q) {
      qNode = node;
    }

    addParentsAndDepth(node.left, node, depth + 1);
    addParentsAndDepth(node.right, node, depth + 1);
  }
};

const root = new TreeNode(3);
root.left = new TreeNode(5);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);
root.right = new TreeNode(1);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);
console.log(lowestCommonAncestor(root, 5, 1).val); // 3
console.log(lowestCommonAncestor(root, 5, 4).val); // 5
