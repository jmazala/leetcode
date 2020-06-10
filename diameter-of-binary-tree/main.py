# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        if root is None:
            return 0

        rightHeight = self.height(root.left)
        leftHeight = self.height(root.right)
        rightDiameter = self.diameterOfBinaryTree(root.right)
        leftDiameter = self.diameterOfBinaryTree(root.left)
        diameter = max(rightHeight + leftHeight, rightDiameter, leftDiameter)

        return diameter

    def height(self, root: TreeNode) -> int:
        if root is None:
            return 0

        return 1 + max(self.height(root.left), self.height(root.right))
