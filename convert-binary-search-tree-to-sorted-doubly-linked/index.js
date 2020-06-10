const treeToDoublyList = function (root) {
  if (!root) {
    return root;
  }

  let min;
  let max;

  inorder(root);

  min.left = max;
  max.right = min;
  return min;

  function inorder(node) {
    if (!node) {
      return;
    }

    inorder(node.left);

    if (max) {
      node.left = max;
      max.right = node;
    } else {
      min = node;
    }

    max = node;

    inorder(node.right);
  }
};
