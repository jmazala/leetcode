# https://leetcode.com/problems/graph-valid-tree/


from collections import defaultdict
from typing import List


class Solution:
    # Graphs are trees only if:
    #   G is fully connected
    #   G contains no cycles
    # METHOD 1
    #   1 - Count components of the graph using DFS
    #   2 - Use undirected graph cycle algorithm (DFS)
    # 103ms / 19.8MB
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if self.countComponents(n, edges) != 1:
            return False

        visited = [False] * n
        neighbors = defaultdict(list)

        for node1, node2 in edges:
            neighbors[node1].append(node2)
            neighbors[node2].append(node1)

        for i in range(n):
            if visited[i]:
                continue

            if self.dfsHasCycle(i, neighbors, visited, -1):
                return False

        return True

    def dfsHasCycle(self, node, neighbors, visited, parent):
        visited[node] = True

        for neighbor in neighbors[node]:
            if not visited[neighbor]:
                if self.dfsHasCycle(neighbor, neighbors, visited, node):
                    return True

            # If an adjacent node is visited, but not the parent of this node
            # then there is a cycle
            elif parent != neighbor:
                return True

        return False

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
print(s.validTree(n=5, edges=[[0, 1], [0, 2], [0, 3], [1, 4]]))  # True
print(s.validTree(n=5, edges=[[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]))  # False
