import heapq
import collections
from typing import List

class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        hash = collections.defaultdict(lambda: 0)
        # we want to sort in descending order for the heap
        for s in tasks:
            hash[s] -= 1

        pq = []
        cycles = 0
        for c, count in hash.items():
            heapq.heappush(pq, (count, c))
    
        while len(pq) > 0:
            remainingTasks = []
            # we have to stick n other tasks or idle in between
            for i in range(n + 1):
                if (len(pq) > 0):
                    (taskCount, task) = heapq.heappop(pq)
                    cycles += 1
                    taskCount += 1
                    if taskCount < 0:
                        remainingTasks.append((taskCount, task))
                else:
                    if len(remainingTasks) == 0: #we have more remaining to push on the heap
                        return cycles
                    else :
                        cycles += 1  # idle cycle
            
            for (taskCount, task) in remainingTasks:
                heapq.heappush(pq, (taskCount, task))

        return cycles

if __name__ == '__main__':
    s = Solution()
    print(s.leastInterval(["A", "A", "A", "B", "B", "B"], 2))
