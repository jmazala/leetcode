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
//add all parents to trees, traverse and log
// var lowestCommonAncestor = function (root, p, q) {
//   addParentsToNodes(root); //O(n)

//   //get parents for p
//   const pParents = [];
//   const qParents = [];

//   let temp = p;
//   while (temp) { //O(log n)
//     pParents.push(temp.val);
//     temp = temp.parent;
//   }

//   temp = q;
//   while (temp) { //O(log n)
//     qParents.push(temp.val);
//     temp = temp.parent;
//   }

//   return new TreeNode(_.intersection(pParents, qParents)[0]);
// };

// const addParentsToNodes = (node, parent = null) => {
//   if (!node) {
//     return;
//   }

//   node.parent = parent;
//   addParentsToNodes(node.left, node);
//   addParentsToNodes(node.right, node);
// };

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
//O(1) space, O(log n) time.  split in half repeatedly
var lowestCommonAncestor = function (root, p, q) {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }

  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }

  return root;
};