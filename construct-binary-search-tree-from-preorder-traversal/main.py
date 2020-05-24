# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def bstFromPreorder(self, preorder: List[int]) -> TreeNode:
    if len(preorder) == 0:
        return None

    root = TreeNode(preorder[0])

    if len(preorder) == 1:
      root

    #preorder is node, left, right

    #find the right subtree
    i = 1
    while (i < len(preorder) and preorder[i] < root.val):
      i += 1

    root.left = self.bstFromPreorder(preorder[1:i])
    root.right = self.bstFromPreorder(preorder[i:])
    return root