# https://leetcode.com/problems/clone-graph/


# Definition for a Node.
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class Solution:
    def __init__(self):
        self.nodes = {}

    def cloneGraph(self, node: "Node") -> "Node":
        if node is None:
            return None

        if node.val in self.nodes:
            return self.nodes[node.val]

        newNode = Node(node.val)
        self.nodes[node.val] = newNode
        for nextNode in node.neighbors:
            newNode.neighbors.append(self.cloneGraph(nextNode))

        return newNode


one = Node(1)
two = Node(2)
three = Node(3)
four = Node(4)

one.neighbors = [two, four]
two.neighbors = [one, three]
three.neighbors = [two, four]
four.neighbors = [one, three]

s = Solution()
s.cloneGraph(one)
