const { TreeNode } = require('../js-includes');

/*
 * recall that a preorder traversal is:
 * node, left, right
 /*
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
const bstFromPreorder = function (preorder) {
  if (!preorder.length) {
    return null;
  }

  const root = new TreeNode(preorder[0]);
  let i = 1;

  // locate where the right subtree begins
  // it's the first value greater than the root
  while (i < preorder.length && preorder[i] < root.val) {
    i++;
  }

  root.left = bstFromPreorder(preorder.slice(1, i));
  root.right = bstFromPreorder(preorder.slice(i));
  return root;
};

//   8
// 5   10
// 1 7    12

console.log(bstFromPreorder([8, 5, 1, 7, 10, 12]));
