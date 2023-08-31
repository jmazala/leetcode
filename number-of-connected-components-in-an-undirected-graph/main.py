# https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/


from collections import defaultdict
from typing import List


class Solution:
    # This is a union-find (Disjoint Set) algorithm problem
    # BETTER SPACE, WORSE TIME
    # Declare each node as:
    #   It's own parent
    #   Size of 1
    # Traverse through each edge.  If the parents are the same, do nothing
    # Otherwise, take the smaller node (size in group), combine into larger node
    # And mark the parent as being the lager node
    # Doing that eliminates 1 component group, so subtract 1
    # 107ms / 17.8MB
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        self.parents = [i for i in range(n)]
        self.sizes = [1 for i in range(n)]

        components = n
        for [node1, node2] in edges:
            components -= self.union(node1, node2)

        return components

    def union(self, node1, node2):
        node1 = self.find(node1)
        node2 = self.find(node2)

        if node1 == node2:
            return 0

        if self.sizes[node1] > self.sizes[node2]:
            self.sizes[node1] += self.sizes[node2]
            self.parents[node2] = node1
        else:
            self.sizes[node2] += self.sizes[node1]
            self.parents[node1] = node2

        return 1

    def find(self, node):
        if node == self.parents[node]:
            return node

        self.parents[node] = self.find(self.parents[node])
        return self.parents[node]

    # METHOD 2 - USING DFS (BETTER TIME, WORSE SPACE)
    # Visit each node from 0 to n-1
    # For every node visited, mark it as belonging to the base node (0 to n-1)
    # Count distinct belonging groups
    # 93ms / 19.3MB
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        self.visited = [False] * n
        self.neighbors = defaultdict(list)
        components = 0

        for [node1, node2] in edges:
            self.neighbors[node1].append(node2)
            self.neighbors[node2].append(node1)

        for i in range(n):
            if not self.visited[i]:
                components += 1
                self.dfs(i, i, edges)

        return components

    def dfs(self, baseNode, curNode, edges):
        self.visited[curNode] = True

        for neighbor in self.neighbors[curNode]:
            if not self.visited[neighbor]:
                self.dfs(baseNode, neighbor, edges)


s = Solution()
print(s.countComponents(5, [[0, 1], [1, 2], [3, 4]]))  # 2
print(s.countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]))  # 1
print(s.countComponents(4, [[2, 3], [1, 2], [1, 3]]))  # 2
