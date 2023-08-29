# https://leetcode.com/problems/course-schedule-ii/

from collections import deque
from typing import List


class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        prereqCounts = [0] * numCourses
        deps = [set() for _ in range(numCourses)]

        for [course, dependency] in prerequisites:
            prereqCounts[course] += 1
            deps[dependency].add(course)

        order = []
        queue = deque(
            [course for course, count in enumerate(prereqCounts) if count == 0]
        )

        while queue:
            course = queue.popleft()
            order.append(course)
            for next in deps[course]:
                prereqCounts[next] -= 1

                if prereqCounts[next] == 0:
                    queue.append(next)

        return order if len(order) == numCourses else []


s = Solution()
print(s.findOrder(2, [[1, 0]]))  # [0,1]
print(s.findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))  # [0,2,1,3]
