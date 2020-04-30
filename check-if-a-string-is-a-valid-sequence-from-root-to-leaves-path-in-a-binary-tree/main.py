from typing import List

# Definition for a binary tree node.
class TreeNode:
  def __init__(self, val=0, left=None, right=None):
    self.val = val
    self.left = left
    self.right = right

class Solution:
  def isValidSequence(self, root: TreeNode, arr: List[int]) -> bool:
    return self.helper(root, arr, 0)
  
  def helper(self, node: TreeNode, arr: List[int], index: int) -> bool:
    if node is None:
      return False
    
    if index == len(arr) - 1:
      return node.left is None and node.right is None and node.val == arr[index]
    
    if arr[index] != node.val:
      return False
    
    return self.helper(node.left, arr, index + 1) or self.helper(node.right, arr, index + 1)

if __name__ == '__main__':
  s = Solution()
  root = TreeNode(0)
  root.left = TreeNode(1)
  root.left.left = TreeNode(0)
  root.left.left.right = TreeNode(1)
  root.left.right = TreeNode(1)
  root.left.right.left = TreeNode(0)
  root.left.right.right = TreeNode(0)
  root.right = TreeNode(0)
  root.right.left = TreeNode(0)
  print(s.isValidSequence(root, [0, 1, 0, 1])) #true
  print(s.isValidSequence(root, [0, 0, 1])) #false
