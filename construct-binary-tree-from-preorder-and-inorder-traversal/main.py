from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    # METHOD 1 - TRACK INDICES
    # Inorder is useful because we know indices of values (with comparison to each other)
    # This tells us relative values
    # Iterating through preorder, and checking indices, allows us to build that tree
    # NOTE:  this only works because the values are unique
    # 50ms / 20.6MB
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        # PREORDER is node, left, right
        # INORDER is left, node, right

        idx = {val: i for i, val in enumerate(inorder)}
        head = TreeNode(preorder.pop(0))
        stack = [head]

        # Iterate over preorder and construct the tree
        for val in preorder:
            node = TreeNode(val)

            # With a lower inorder index, it must be top of stack's left node
            if idx[val] < idx[stack[-1].val]:
                stack[-1].left = node
            else:
                # Must be right of a node.  But which one?
                while len(stack) > 0 and idx[stack[-1].val] < idx[val]:
                    parentNode = stack.pop()
                parentNode.right = node

            stack.append(node)

        return head

    # METHOD 2 - RECURSION
    # PREORDER = node, left right
    #   We know root = preorder[0]
    # INORDER = left, node, right
    #   If we know where root is, we can split into 2 subtrees
    # 142ms / 55.3MB
    # TIME: O(n^2)
    #   O(n) for every node
    #     O(n for array split)
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        return self.helper(preorder, inorder)

    def helper(self, preorder, inorder: List[int]):
        if len(inorder) == 0:
            return None

        root = TreeNode(preorder.pop(0))
        splitIndex = inorder.index(root.val)
        root.left = self.helper(preorder, inorder[:splitIndex])
        root.right = self.helper(preorder, inorder[splitIndex + 1 :])
        return root


"""
9: 0
3: 1
15: 2
20: 3
7: 4

STACK:
7

starting with 3, always the head
next is 9.  We know it's on the left because its index is less than top of stack
next is 20.  check the stack for for the lowest index less than its index
next is 15
next is 7
"""
s = Solution()
s.buildTree(preorder=[3, 9, 20, 15, 7], inorder=[9, 3, 15, 20, 7])
