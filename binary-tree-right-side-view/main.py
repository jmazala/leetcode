# https://leetcode.com/problems/binary-tree-right-side-view/

# Definition for a binary tree node.
from collections import deque
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        answer = []

        if root is None:
            return answer

        queue = deque([root])

        while queue:
            answer.append(queue[-1].val)
            numNodes = len(queue)
            for i in range(numNodes):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return answer


root = TreeNode(1)
root.left = TreeNode(2)
root.left.right = TreeNode(5)
root.right = TreeNode(3)
root.right.right = TreeNode(4)

s = Solution()
print(s.rightSideView(root))  # [1, 3, 4]
