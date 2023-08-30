# https://leetcode.com/problems/kth-smallest-element-in-a-bst/

# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    # METHOD 1 - INORDER TRAVERSE (ITERATIVE), COUNTING NODES
    # 55ms / 20.3MB
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []

        while True:
            while root is not None:
                stack.append(root)
                root = root.left

            node = stack.pop()
            k -= 1

            if k == 0:
                return node.val

            root = node.right

    # METHOD 2 - INORDER TRAVERSE (RECURSIVE), COUNTING NODES
    # 51ms, 20.5MB
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        self.k = k
        self.answer = None
        self.helper(root)
        return self.answer

    def helper(self, root):
        if root is None or self.answer is not None:
            return

        self.helper(root.left)

        self.k -= 1
        if self.k == 0:
            self.answer = root.val
            return

        self.helper(root.right)


s = Solution()
root = TreeNode(3)
root.left = TreeNode(1)
root.left.right = TreeNode(2)
root.right = TreeNode(4)

print(s.kthSmallest(root, 1))  # 1
print(s.kthSmallest(root, 2))  # 2
print(s.kthSmallest(root, 3))  # 3
print(s.kthSmallest(root, 4))  # 4
