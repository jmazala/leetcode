/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
  return this;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const nodes = {};

  //recursively go through the tree and populate a map remembering min and max coordinates
  dfs(root, 0, 0);
  //map it to a 2d array and return it
  answer = []

  Object.keys(nodes).sort((a, b) => a - b).forEach(x => {
    let subAnswer = [];

    Object.keys(nodes[x]).sort((a, b) => a - b).forEach(y => {
      subAnswer = subAnswer.concat(nodes[x][y].map(node => node.val).sort((a, b) => a - b));
    });

    answer.push(subAnswer);
  });

  return answer;

  function dfs(node, x, y) {
    if (!node) {
      return;
    }

    nodes[x] = nodes[x] || {};
    nodes[x][y] = nodes[x][y] || [];
    nodes[x][y].push(node);

    dfs(node.left, x - 1, y + 1);
    dfs(node.right, x + 1, y + 1);
  }
};

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);
console.log(verticalTraversal(root));