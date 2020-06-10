# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        self.answer = float("-inf")
        self.helper(root)
        return self.answer

    def helper(self, node: TreeNode) -> int:
        if node is None:
            return 0

        # with respect to THIS NODE, we could use the left or not use it
        left = max(0, self.helper(node.left))
        right = max(0, self.helper(node.right))  # same with the right side

        self.answer = max(self.answer, node.val + left + right)
        # combined with max(0) this basically says take left, right or neither
        return node.val + max(left, right)
