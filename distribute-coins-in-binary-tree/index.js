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
 * @return {number}
 */
const distributeCoins = function (root) {
  if (!root || (!root.left && !root.right)) {
    return 0;
  }

  let transfers = 0;
  helper(root, null);
  return transfers;

  function helper(node) {
    if (!node) {
      return 0;
    }

    // in a leaf left and right will be 0
    const left = helper(node.left);
    const right = helper(node.right);

    // ideally we should have 1 coin
    // anything "excess" is a transfer
    // i.e if we have 0 coins it requires a move
    // or if we have 5 coins it requires 4 moves
    transfers += Math.abs(left) + Math.abs(right);

    // we include left and right here because
    // we may need to continue passing coins up
    return node.val + left + right - 1;
  }
};
