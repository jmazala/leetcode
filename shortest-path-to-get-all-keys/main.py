# https://leetcode.com/problems/shortest-path-to-get-all-keys/

import collections
from typing import List

EMPTY = "."
WALL = "#"
START = "@"
DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]]


class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        m = len(grid)
        n = len(grid[0])

        [start, allKeys] = parseGrid(grid)

        # Hash key is our collection of keys, value is set of all coordinates we've seen
        # This works as a tuple (coordinate i j pair) is serializable in Python
        seenHash = collections.defaultdict(set)

        # We begin with no keys, and the START coordinates
        seenHash[0].add((start[0], start[1]))

        # i, j, key collection, numMoves
        queue = [(start[0], start[1], 0, 0)]

        while queue:
            (i, j, curKeyCollection, numMoves) = queue.pop(0)

            for [dI, dJ] in DIRECTIONS:
                [nextI, nextJ] = [i + dI, j + dJ]
                if (
                    nextI < 0
                    or nextJ < 0
                    or nextI == m
                    or nextJ == n
                    or isWall(grid[nextI][nextJ])
                    or (nextI, nextJ) in seenHash[curKeyCollection]
                ):
                    continue

                nextC = grid[nextI][nextJ]

                # Lock, but no key
                if isLock(nextC) and not doesHaveKey(nextC.lower(), curKeyCollection):
                    continue

                # Picking up a key
                if isKey(nextC) and not doesHaveKey(nextC, curKeyCollection):
                    newKeys = collectKey(nextC, curKeyCollection)

                    # is this the last key? This is end state.
                    if newKeys == allKeys:
                        return numMoves + 1

                    # Using the seen hash allows us to revisit previous squares with a new key
                    seenHash[newKeys].add((nextI, nextJ))
                    queue.append((nextI, nextJ, newKeys, numMoves + 1))
                    continue

                # Otherwise accessible cell
                seenHash[curKeyCollection].add((nextI, nextJ))
                queue.append((nextI, nextJ, curKeyCollection, numMoves + 1))

        return -1


def collectKey(key: str, keys: int) -> int:
    bit = ord(key) - ord("a")
    keys += 1 << bit
    return keys


def doesHaveKey(key: str, keys: int) -> bool:
    bit = ord(key) - ord("a")
    return keys & (1 << bit)


def parseGrid(grid):
    start = None
    allKeys = 0

    for i in range(len(grid)):
        for j in range(len(grid[i])):
            c = grid[i][j]
            if isStart(c):
                start = [i, j]
            elif isKey(c):
                allKeys = collectKey(c, allKeys)

    return [start, allKeys]


def isStart(c: str) -> bool:
    return c == START


def isKey(c: str) -> bool:
    return c in "abcdef"


def isLock(c: str) -> bool:
    return c in "ABCDEF"


def isWall(c) -> bool:
    return c == WALL


s = Solution()
print(s.shortestPathAllKeys(["@.a..", "###.#", "b.A.B"]))  # 8
print(s.shortestPathAllKeys(["@..aA", "..B#.", "....b"]))  # 6
print(s.shortestPathAllKeys(["@Aa"]))  # -1
