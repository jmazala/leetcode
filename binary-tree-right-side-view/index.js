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
const rightSideView = function (root) {
  if (!root) {
    return [];
  }

  if (!root.left && !root.right) {
    return [root.val];
  }

  const queue = [root];
  const answer = [];

  while (queue.length) {
    let numNodes = queue.length;

    while (numNodes) {
      const node = queue.shift();
      numNodes--;
      // since BFS left to right we are going level by level.  only keep the last of each level

      if (numNodes === 0) {
        answer.push(node.val);
      }

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return answer;
};
