/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  let parentX;
  let parentY;
  let depthX;
  let depthY;
  let queue = [{ node: root }];
  let depth = 0;

  //cousins is same depth different parents
  while (queue.length) {
    depth++;
    let numNodes = queue.length;

    while (numNodes) {
      let node, parent;
      ({ node, parent } = queue.shift());
      numNodes--;

      if (node.val === x) {
        parentX = parent;
        depthX = depth;
      } else if (node.val === y) {
        parentY = parent;
        depthY = depth;
      }

      if (depthX !== undefined && depthY !== undefined) {
        return (depthX === depthY) && (parentX !== parentY);
      }

      if (node.left) {
        queue.push({ node: node.left, parent: node.val });
      }

      if (node.right) {
        queue.push({ node: node.right, parent: node.val });
      }
    }
  }
};