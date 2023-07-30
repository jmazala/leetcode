# https://leetcode.com/problems/flatten-2d-vector/

from typing import List


class Vector2D:
    def __init__(self, vec: List[List[int]]):
        self.vec = vec

    def next(self) -> int:
        while len(self.vec[0]) == 0:
            self.vec.pop(0)

        return self.vec[0].pop(0)

    def hasNext(self) -> bool:
        while len(self.vec) > 0 and len(self.vec[0]) == 0:
            self.vec.pop(0)

        return len(self.vec) > 0


vector2D = Vector2D([[], [1, 2], [3], [4], [], [5]])
print(vector2D.next())  # 1
print(vector2D.next())  # 2
print(vector2D.next())  # 3
print(vector2D.hasNext())  # True
print(vector2D.hasNext())  # True
print(vector2D.next())  # 4
print(vector2D.hasNext())  # True
print(vector2D.next())  # 5
print(vector2D.hasNext())  # False

vector2D = Vector2D([[], [], []])
print(vector2D.hasNext())  # False
