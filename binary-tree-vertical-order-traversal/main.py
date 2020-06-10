from typing import List
import collections

# Definition for a binary tree node.

# THIS DOESN'T PASS ALL TEST CASES, JUST KEEPING IT FOR REFERENCE


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def verticalTraversal(self, root):
        seen = collections.defaultdict(
            lambda: collections.defaultdict(list))

        def dfs(node, x=0, y=0):
            if node is None:
                return

            seen[x][y].append(node)
            dfs(node.left, x-1, y+1)
            dfs(node.right, x+1, y+1)

        dfs(root)
        ans = []

        # sorts the seen hash by key
        #seen is {x: {y: [node1AtX-Y, node2AtX-Y]}}
        for x in sorted(seen):
            # sub array
            subAnswer = []
            for y in sorted(seen[x]):
                # If two nodes have the same position
                # then the value of the node that is subAnswered first
                # is the value that is smaller.
                subAnswer.extend(sorted(node.val for node in seen[x][y]))

            ans.append(subAnswer)

        return ans


if __name__ == '__main__':
    s = Solution()
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    print(s.verticalTraversal(root))
