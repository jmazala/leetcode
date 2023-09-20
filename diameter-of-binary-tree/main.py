# https://leetcode.com/problems/diameter-of-binary-tree/
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    answer = 0

    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.helper(root)
        return self.answer

    def helper(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        left = self.helper(root.left)
        right = self.helper(root.right)
        self.answer = max(self.answer, left + right)
        return 1 + max(left, right)
