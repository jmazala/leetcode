# https://leetcode.com/problems/invert-binary-tree/

# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    # METHOD 1 - Recursion with direct calls
    # 37ms, 16.2MB
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return

        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root

    # METHOD 2 - flip, recurse
    # 31ms, 16.4MB
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return

        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)

        return root

    # METHOD 3 - Iterative (queue)
    # 46ms / 16.2MB
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root is None:
            return

        queue = [root]

        while len(queue) > 0:
            node = queue.pop(0)
            node.left, node.right = node.right, node.left

            if node.left is not None:
                queue.append(node.left)

            if node.right is not None:
                queue.append(node.right)

        return root


s = Solution()
print(s.invertTree([]))  # []

root = TreeNode(4)
root.left = TreeNode(2)
root.right = TreeNode(7)
root.left.left = TreeNode(1)
root.left.right = TreeNode(3)
root.right.left = TreeNode(6)
root.right.right = TreeNode(9)
