from typing import List

class Solution:
  def dfsHasCycle(self, course, edges, visited, recursionStack):
    if recursionStack[course]:
      return True
    
    if visited[course]:
      return False
    
    visited[course] = True
    recursionStack[course] = True

    for neighbor in edges[course]:
      if self.dfsHasCycle(neighbor, edges, visited, recursionStack):
        return True
      
    recursionStack[course] = False
    return False
  
  def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
    #make a graph
    #graph[i] = [e1, e2, ...en] leading to node i
    edges = [[] for _ in range(numCourses)]

    #add edges
    for [course, prereq] in prerequisites:
      edges[course].append(prereq)
    
    visited = [False] * numCourses
    recursionStack = [False] * numCourses

    for course in range(numCourses):
      if visited[course]:
        continue

      if self.dfsHasCycle(course, edges, visited, recursionStack):
        return False
    
    return True

if __name__ == '__main__':
  s = Solution()
  print(s.canFinish(2, [[1,0]])) #True
  print(s.canFinish(2, [[1,0], [0, 1]])) #False