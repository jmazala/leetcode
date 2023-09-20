# https://leetcode.com/problems/count-good-nodes-in-binary-tree/


# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        self.answer = 0
        self.dfs(root, root.val)
        return self.answer

    def dfs(self, root: Optional[TreeNode], largest: int) -> None:
        if root is None:
            return

        if root.val >= largest:
            self.answer += 1
            largest = root.val

        self.dfs(root.left, largest)
        self.dfs(root.right, largest)


root = TreeNode(3)
root.left = TreeNode(1)
root.left.left = TreeNode(3)
root.right = TreeNode(4)
root.right.left = TreeNode(1)
root.right.right = TreeNode(5)
s = Solution()
print(s.goodNodes(root))  # 4
