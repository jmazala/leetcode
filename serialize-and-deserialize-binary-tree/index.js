const { TreeNode } = require('../js-includes');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = function (root) {
  const serialized = [];

  // use preorder traversel - node, left, right
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (node) {
      serialized.push(node.val);
      stack.push(node.right);
      stack.push(node.left);
    } else {
      serialized.push(null);
    }
  }

  return JSON.stringify(serialized);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = function (data) {
  const deserialized = JSON.parse(data);
  return helper(deserialized);

  function helper(preorder) {
    if (!preorder || !preorder.length) {
      return null;
    }

    const val = preorder.shift();
    if (val === null) {
      return null;
    }

    const node = new TreeNode(val);
    node.left = helper(preorder);
    node.right = helper(preorder);
    return node;
  }
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);
const serialized = serialize(root);
console.log(deserialize(serialized));
