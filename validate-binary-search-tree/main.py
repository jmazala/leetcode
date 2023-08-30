# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    # METHOD 1 - RECURSIVE W/ BOUNDS (EASIEST AND FASTEST)
    # 47ms / 18.7MB
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        return self.helper(root, float("-inf"), float("inf"))

    def helper(self, node, lowerBound, upperBound):
        if node is None:
            return True

        return (
            node.val > lowerBound
            and node.val < upperBound
            and self.helper(node.left, lowerBound, node.val)
            and self.helper(node.right, node.val, upperBound)
        )

    # METHOD 2 - ITERATIVE W/ BOUNDS
    # 50ms / 18.7MB
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        stack = [(root, float("-inf"), float("inf"))]

        while len(stack) > 0:
            (node, lowerBound, upperBound) = stack.pop()
            if node is None:
                continue

            if node.val <= lowerBound or node.val >= upperBound:
                return False

            stack.append((node.left, lowerBound, node.val))
            stack.append((node.right, node.val, upperBound))

        return True

    # METHOD 3 - RECURSIVE INORDER TRAVERSAL
    # 55ms / 19.1MB
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        self.prevVal = float("-inf")
        return self.helper(root)

    def helper(self, root, prevVal):
        if root is None:
            return True

        if not self.helper(root.left):
            return False

        if root.val <= self.prevVal:
            return False

        self.prevVal = root.val
        return self.helper(root.right)

    # METHOD 4 - ITERATIVE INORDER TRAVERSAL (ONLY USEFUL TO AVOID STACK OVERFLOW)
    # 47ms / 18.7MB
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        prev = float("-inf")
        stack = []

        while len(stack) > 0 or root is not None:
            while root is not None:
                stack.append(root)
                root = root.left

            root = stack.pop()
            if root.val <= prev:
                return False

            prev = root.val
            root = root.right

        return True
