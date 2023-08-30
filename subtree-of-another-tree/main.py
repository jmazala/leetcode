# https://leetcode.com/problems/subtree-of-another-tree/


# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    # BFS the tree and call equal tree
    # 107ms / 17.1MB
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        queue = [root]

        while len(queue) > 0:
            node = queue.pop(0)

            if node is None:
                continue

            if node.val == subRoot.val and self.areEqual(node, subRoot):
                return True

            queue.append(node.left)
            queue.append(node.right)

        return False

    def areEqual(self, tree, subTree):
        if subTree is None and tree is None:
            return True

        if tree is None or subTree is None or tree.val != subTree.val:
            return False

        return self.areEqual(tree.left, subTree.left) and self.areEqual(
            tree.right, subTree.right
        )


s = Solution()

root = TreeNode(3)
root.left = TreeNode(4)
root.right = TreeNode(5)
root.left.left = TreeNode(1)
root.left.right = TreeNode(2)

subRoot = TreeNode(4)
subRoot.left = TreeNode(1)
subRoot.right = TreeNode(2)

print(s.isSubtree(root, subRoot))  # True

root.left.right.left = TreeNode(0)
print(s.isSubtree(root, subRoot))  # False
