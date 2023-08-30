# https://leetcode.com/problems/binary-tree-maximum-path-sum


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    # MAX PATH SUM IS EITHER:
    #   left subtree
    #   through the root
    #   the right subtree
    # METHOD 1 - POST ORDER DFS (LEFT, RIGHT, NODE)
    def maxPathSum(self, root: TreeNode) -> int:
        self.answer = float("-inf")
        self.helper(root)
        return self.answer

    def helper(self, node: TreeNode) -> int:
        if node is None:
            return 0

        # if left subtree max path sum is negative, don't use it (hence max)
        left = max(0, self.helper(node.left))
        # same as right
        right = max(0, self.helper(node.right))  # same with the right side

        # FOR THIS NODE, max path sum is value + leftMax/0 + rightMax/0
        self.answer = max(self.answer, node.val + left + right)

        # W.R.T the parent (Caller of this function), this nodes maxPath is its value
        # and either the left or the right.
        # Can't go through left path and right path and node and the parent too
        return node.val + max(left, right)
