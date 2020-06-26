# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        return self.helper(root, float("-inf"), float("inf"))

    def helper(self, node, lowerBound, upperBound):
        if node is None:
            return True

        return (
            node.val > lowerBound and
            node.val < upperBound and
            self.helper(node.left, lowerBound, node.val) and
            self.helper(node.right, node.val, upperBound)
        )
