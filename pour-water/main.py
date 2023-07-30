# https://leetcode.com/problems/pour-water

from typing import List


def pourWater(heights: List[int], volume: int, k: int) -> List[int]:
    while volume > 0:
        if didFillLeft(heights, k):
            pass
        elif didFillRight(heights, k):
            pass
        else:
            heights[k] += 1

        volume -= 1

    return heights


def didFillLeft(heights: List[int], k: int) -> bool:
    fill = k
    curHeight = heights[k]
    i = k - 1

    while i >= 0:
        if heights[i] > curHeight:
            break

        if heights[i] < curHeight:
            curHeight = heights[i]
            fill = i

        i -= 1

    if fill == k:
        return False

    heights[fill] += 1
    return True


def didFillRight(heights: List[int], k: int) -> bool:
    fill = k
    curHeight = heights[k]
    i = k + 1

    while i < len(heights):
        if heights[i] > curHeight:
            break

        if heights[i] < curHeight:
            curHeight = heights[i]
            fill = i

        i += 1

    if fill == k:
        return False

    heights[fill] += 1
    return True


print(pourWater([2, 1, 1, 2, 1, 2, 2], 4, 3))  # [2, 2, 2, 3, 2, 2, 2]
print(
    pourWater([1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1], 10, 2)
)  # [4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 3, 2, 1]
