# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        self.parent = None

class Solution:
  def isCousins(self, root: TreeNode, x: int, y: int) -> bool:
    self.nodeX = None
    self.nodeY = None
    self.x = x
    self.y = y
    
    #DFS the tree to add parents store nodes for x and y when you reach them
    self.addParents(root)
    
    return (self.nodeX is not None and self.nodeY is not None) and (self.nodeX.parent is not None and self.nodeY.parent is not None) and (self.nodeX.parent.val != self.nodeY.parent.val) and (self.nodeX.depth == self.nodeY.depth)

  def addParents(self, node, parent=None, depth=0):
    #don't need to further traverse the tree if we found x and y already
    if node is None or (self.nodeX is not None and self.nodeY is not None):
      return
    
    node.depth = depth
    node.parent = parent
    
    if node.val == self.x:
      self.nodeX = node
    
    elif node.val == self.y:
      self.nodeY = node
    
    self.addParents(node.left, node, depth + 1)
    self.addParents(node.right, node, depth + 1)

if __name__ == '__main__':
  root = TreeNode(1)
  root.left = TreeNode(2)
  root.right = TreeNode(3)
  root.left.left = TreeNode(4)
  s = Solution()
  print(s.isCousins(root, 4, 3)) #false

  s2 = Solution()
  root2 = TreeNode(1)
  root2.left = TreeNode(2)
  root2.left.right = TreeNode(4)
  root2.right = TreeNode(3)
  root2.right.right = TreeNode(5)
  print(s2.isCousins(root2, 5, 4)) #true