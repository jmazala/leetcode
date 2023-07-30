# https://leetcode.com/problems/sliding-puzzle/

import json
from copy import deepcopy
from typing import List

DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]]


class Solution:
    def slidingPuzzle(self, board: List[List[int]]) -> int:
        emptySpot = None

        # It's a 2x3 board
        for i in range(0, 2):
            for j in range(0, 3):
                if board[i][j] == 0:
                    emptySpot = [i, j]
                    break

        # starting with empty spot, try every possible move, BFS
        queue = [[emptySpot, board]]
        seen = set([getKey(board)])
        moves = 0

        if isSolved(board):
            return moves

        while queue:
            queueLength = len(queue)
            moves += 1

            for i in range(queueLength):
                [[emptyI, emptyJ], curBoard] = queue.pop(0)

                for [dI, dJ] in DIRECTIONS:
                    [nextI, nextJ] = [emptyI + dI, emptyJ + dJ]

                    if nextI < 0 or nextJ < 0 or nextI > 1 or nextJ > 2:
                        continue

                    nextBoard = deepcopy(curBoard)
                    swap(nextBoard, nextI, nextJ, emptyI, emptyJ)
                    key = getKey(nextBoard)
                    if key in seen:
                        continue

                    if isSolved(nextBoard):
                        return moves

                    seen.add(key)
                    queue.append([[nextI, nextJ], nextBoard])

        return -1


def getKey(board: List[List[int]]) -> str:
    return json.dumps(board)


def swap(matrix, i1, j1, i2, j2):
    [matrix[i1][j1], matrix[i2][j2]] = [matrix[i2][j2], matrix[i1][j1]]


def isSolved(board):
    return board == [[1, 2, 3], [4, 5, 0]]


s = Solution()
print(s.slidingPuzzle([[1, 2, 3], [4, 0, 5]]))  # 1
print(s.slidingPuzzle([[1, 2, 3], [5, 4, 0]]))  # -1
print(s.slidingPuzzle([[4, 1, 2], [5, 0, 3]]))  # 5
