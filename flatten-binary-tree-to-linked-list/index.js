const { bstFromPreorder } = require('../js-includes');

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
// eslint-disable-next-line consistent-return
const flatten = function (root) {
  if (!root) {
    return root;
  }

  const nodes = [];
  preorder(root);

  for (let i = 1; i < nodes.length; i++) {
    nodes[i - 1].left = null;
    nodes[i - 1].right = nodes[i];
  }

  function preorder(node) {
    if (!node) {
      return;
    }

    nodes.push(node);
    preorder(node.left);
    preorder(node.right);
  }
};

const root = bstFromPreorder([1, 2, 5, 3, 4, null, 6]);
flatten(root);
console.log(root);
