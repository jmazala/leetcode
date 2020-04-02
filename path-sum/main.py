# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:    
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if root is None:
          return False
        
        sum -= root.val

        if (root.left is None and root.right is None and sum == 0):
          return True
        
        return hasPathSum(root.left, sum) or hasPathSum(root.right, sum)