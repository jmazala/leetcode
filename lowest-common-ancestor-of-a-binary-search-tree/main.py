# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class TreeNode:
  def __init__(self, x):
    self.val = x
    self.left = None
    self.right = None

class Solution:
  #recursive
  # def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
  #   if (p.val < root.val and q.val < root.val):
  #     return self.lowestCommonAncestor(root.left, p, q)
    
  #   if (p.val > root.val and q.val > root.val):
  #     return self.lowestCommonAncestor(root.right, p, q)
    
  #   return root
  #iterative
  def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    while (True):
      if (p.val < root.val and q.val < root.val):
        root = root.left
    
      elif (p.val > root.val and q.val > root.val):
        root = root.right
      else:
        return root

if __name__ == '__main__':
  #[6,2,8,0,4,7,9,null,null,3,5]
  # 2
  # 4
  root = TreeNode(6)
  p = TreeNode(2)
  q = TreeNode(4)
  root.left = p
  root.left.left = TreeNode(0)
  root.left.right = q
  root.left.right.left = TreeNode(3)
  root.left.right.right = TreeNode(5)
  root.right = TreeNode(8)
  root.right.left = TreeNode(7)
  root.right.right = TreeNode(9)
  s = Solution()
  print(s.lowestCommonAncestor(root, p, q).val)