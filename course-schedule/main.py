# https://leetcode.com/problems/course-schedule/

from typing import List


class Solution:
    # METHOD 1 - CYCLE DETECTION WITH DFS
    # Create a directed graph representation using the prereqs array
    # For each node (course), DFS
    # If, starting with that node, we visit the same node twice, there is a cycle
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # make a graph
        # graph[i] = [e1, e2, ...en] leading to node i
        edges = [[] for _ in range(numCourses)]

        # add edges
        for [course, prereq] in prerequisites:
            edges[prereq].append(course)

        visited = [False] * numCourses
        recursionStack = [False] * numCourses

        for course in range(numCourses):
            if visited[course]:
                continue

            if self.dfsHasCycle(course, edges, visited, recursionStack):
                return False

        return True

    def dfsHasCycle(self, course, edges, visited, recursionStack):
        if recursionStack[course]:
            return True

        if visited[course]:
            return False

        visited[course] = True

        # Since DFS, set node as visited here (w.r.t starting node), undo later
        recursionStack[course] = True

        for neighbor in edges[course]:
            if self.dfsHasCycle(neighbor, edges, visited, recursionStack):
                return True

        # Undo the visit, since DFS
        recursionStack[course] = False
        return False


if __name__ == "__main__":
    s = Solution()
    print(s.canFinish(2, [[1, 0]]))  # True
    print(s.canFinish(2, [[1, 0], [0, 1]]))  # False
