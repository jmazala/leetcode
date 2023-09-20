# https://leetcode.com/problems/balanced-binary-tree/
from typing import Optional, Tuple


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        return self.helper(root)[0]

    def helper(self, root: Optional[TreeNode]) -> Tuple[bool, int]:
        if not root:
            return True, -1

        (leftBal, leftHeight) = self.helper(root.left)
        if not leftBal:
            return False, 0

        (rightBal, rightHeight) = self.helper(root.right)
        if not rightBal:
            return False, 0

        bal = abs(leftHeight - rightHeight) < 2
        height = 1 + max(leftHeight, rightHeight)
        return (bal, height)
