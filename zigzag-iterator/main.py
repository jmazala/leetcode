# https://leetcode.com/problems/zigzag-iterator/

from collections import deque
from typing import List


# SOLUTION 1 - ALTERNATE POINTERS
class ZigzagIterator:
    def __init__(self, v1: List[int], v2: List[int]):
        self.v1 = v1
        self.v2 = v2
        self.i = 0
        self.j = 0
        self.use1 = True

    def next(self) -> int:
        if self.i == len(self.v1):
            val = self.v2[self.j]
            self.j += 1
            return val

        if self.j == len(self.v2):
            val = self.v1[self.i]
            self.i += 1
            return val

        if self.use1:
            val = self.v1[self.i]
            self.i += 1
        else:
            val = self.v2[self.j]
            self.j += 1

        self.use1 = not self.use1
        return val

    def hasNext(self) -> bool:
        return self.i < len(self.v1) or self.j < len(self.v2)


# SOLUTION 2 - USE QUEUES
class ZigzagIterator:
    def __init__(self, v1, v2):
        self.vectors = [v1, v2]
        self.queue = deque([(i, 0) for i, v in enumerate(self.vectors) if len(v) > 0])

    def next(self):
        (vectorI, elementI) = self.queue.popleft()
        if elementI < len(self.vectors[vectorI]) - 1:
            self.queue.append((vectorI, elementI + 1))

        return self.vectors[vectorI][elementI]

    def hasNext(self):
        return len(self.queue) > 0


# Your ZigzagIterator object will be instantiated and called as such:
i, v = ZigzagIterator([1, 2], [3, 4, 5, 6]), []
while i.hasNext():
    v.append(i.next())
print(v)  # [1,3,2,4,5,6]

i, v = ZigzagIterator([1], []), []
while i.hasNext():
    v.append(i.next())
print(v)  # [1]

i, v = ZigzagIterator([], [1]), []
while i.hasNext():
    v.append(i.next())
print(v)  # [1]

i, v = ZigzagIterator([], []), []
while i.hasNext():
    v.append(i.next())
print(v)  # []
