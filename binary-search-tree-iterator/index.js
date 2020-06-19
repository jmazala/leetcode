/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 
 const LEFT = 0;
 conse ROOT = 1;
 const RIGHT = 2;
 */

/**
 * @param {TreeNode} root
 */
const BSTIterator = function (root) {
  this.stack = [];
  this.getLeftMostNodes(root);
  return this;
};

BSTIterator.prototype.getLeftMostNodes = function (node) {
  while (node) {
    this.stack.push(node);
    node = node.left;
  }
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  const node = this.stack.pop();
  if (node.right) {
    this.getLeftMostNodes(node.right);
  }

  return node.val;
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
