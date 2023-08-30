# https://leetcode.com/problems/same-tree/


# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    # METHOD 1 - RECURSIVE
    # 41ms / 16.4MB
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if p is None and q is None:
            return True

        if p is None or q is None or p.val != q.val:
            return False

        left = self.isSameTree(p.left, q.left)
        right = self.isSameTree(p.right, q.right)
        return left and right

    # METHOD 2 - ITERATIVE (STACKS)
    # 32ms / 16.2MB
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        stack = [(p, q)]

        while len(stack) > 0:
            (a, b) = stack.pop()

            if a is None and b is None:
                continue

            if a is None or b is None or a.val != b.val:
                return False

            stack.append((a.left, b.left))
            stack.append((a.right, b.right))

        return True


s = Solution()
p = TreeNode(1)
p.left = TreeNode(2)
q = TreeNode(1)
q.right = TreeNode(2)

print(s.isSameTree(p, q))  # False

a = TreeNode(1)
a.left = TreeNode(2)
a.right = TreeNode(3)

b = TreeNode(1)
b.left = TreeNode(2)
b.right = TreeNode(3)

print(s.isSameTree(a, b))  # True
