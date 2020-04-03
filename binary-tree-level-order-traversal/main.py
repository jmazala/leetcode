from collections import deque
from typing import List

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        answer = []
        if (root is None):
            return answer

        queue = deque()
        queue.append(root)

        while (len(queue) > 0):
            levelAnswer = []
            numNodes = len(queue)
            while (numNodes > 0):
                node = queue.popleft()
                numNodes -= 1
                levelAnswer.append(node.val)
                if (node.left is not None):
                    queue.append(node.left)

                if (node.right is not None):
                    queue.append(node.right)

            answer.append(levelAnswer)

        return answer
