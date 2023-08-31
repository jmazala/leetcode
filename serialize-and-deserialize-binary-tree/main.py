# https://leetcode.com/problems/serialize-and-deserialize-binary-tree/


# Definition for a binary tree node.
import json


class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


PLACEHOLDER = "#"


class Codec:
    # USE PREORDER TRAVERSAL (NODE, LEFT, RIGHT)
    def serialize(self, root):
        """
        Encodes a tree to a single string.

        :type root: TreeNode
        :rtype: str
        """
        serialized = []
        stack = [root]

        while len(stack) > 0:
            node = stack.pop()

            if node is None:
                serialized.append(PLACEHOLDER)
            else:
                serialized.append(node.val)
                stack.append(node.right)  # it's a stack.  push right first
                stack.append(node.left)

        return json.dumps(serialized)

    def deserialize(self, data):
        """
        Decodes your encoded data to tree.

        :type data: str
        :rtype: TreeNode
        """
        deserialized = json.loads(data)
        return self.helper(deserialized)

    def helper(self, preorder) -> TreeNode:
        val = preorder.pop(0)
        if val == PLACEHOLDER:
            return None

        node = TreeNode(val)
        node.left = self.helper(preorder)
        node.right = self.helper(preorder)
        return node


# Your Codec object will be instantiated and called as such:
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.right.left = TreeNode(4)
root.right.right = TreeNode(5)
ser = Codec()
deser = Codec()
ans = deser.deserialize(ser.serialize(root))
