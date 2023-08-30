from collections import deque
from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    # METHOD 1 - Insert Level values before iteration
    # 44ms / 17MB
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        answer = []

        if root is None:
            return answer

        queue = deque([root])

        while len(queue) > 0:
            levelAnswer = [node.val for node in queue]

            for i in range(len(queue)):
                node = queue.popleft()

                if node.left is not None:
                    queue.append(node.left)

                if node.right is not None:
                    queue.append(node.right)

            answer.append(levelAnswer)

        return answer

    # METHOD 2 - Insert while iterating
    # 43ms / 16.9MB
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        answer = []

        if root is None:
            return answer

        queue = deque([root])

        while len(queue) > 0:
            levelAnswer = []

            for i in range(len(queue)):
                node = queue.popleft()
                levelAnswer.append(node.val)

                if node.left is not None:
                    queue.append(node.left)

                if node.right is not None:
                    queue.append(node.right)

            answer.append(levelAnswer)

        return answer


s = Solution()

root = TreeNode(3)
root.left = TreeNode(9)
root.right = TreeNode(20)
root.right.left = TreeNode(15)
root.right.right = TreeNode(7)

print(s.levelOrder(root))
