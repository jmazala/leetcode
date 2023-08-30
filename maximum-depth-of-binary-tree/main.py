# https://leetcode.com/problems/maximum-depth-of-binary-tree/

# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class TreeInfo:
    def __init__(self):
        self.maxDepth = 0


class Solution:
    # METHOD 1 - DFS w/ TreeInfo
    # TIME: O(n)
    # SPACE: O(h)
    # 55ms / 18.7MB
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        self.t = TreeInfo()
        self.helper(root, 0)
        return self.t.maxDepth

    def helper(self, node: Optional[TreeNode], depth) -> None:
        if node is None:
            self.t.maxDepth = max(self.t.maxDepth, depth)
            return

        self.helper(node.left, depth + 1)
        self.helper(node.right, depth + 1)

    # METHOD 2 - DFS w/out TreeInfo
    # 44ms / 18.7MB
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        leftDepth = self.maxDepth(root.left)
        rightDepth = self.maxDepth(root.right)

        return 1 + max(leftDepth, rightDepth)

    # METHOD 3 - ITERATIVE (STACK)
    # 45ms / 17.6MB
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        maxDepth = 1
        stack = [(1, root)]

        while len(stack) > 0:
            (depth, node) = stack.pop()
            maxDepth = max(maxDepth, depth)

            if node.left is not None:
                stack.append((depth + 1, node.left))

            if node.right is not None:
                stack.append((depth + 1, node.right))

        return maxDepth


s = Solution()
t = TreeNode(3)
t.left = TreeNode(9)
t.right = TreeNode(20)
t.right.left = TreeNode(15)
t.right.right = TreeNode(7)

print(s.maxDepth(t))  # 3
