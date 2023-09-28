# https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/description/


from math import inf
from typing import List


class Solution:
    # METHOD 1 - Find all subarrays with sum target, find smallest combination (TLE)
    def minSumOfLengths(self, arr: List[int], target: int) -> int:
        left = 0
        right = 0
        sum = 0
        subs = []

        while True:
            if sum == target:
                subs.append((left, right - 1))
                sum -= arr[left]
                left += 1
                continue

            if sum < target:
                if right == len(arr):
                    break
                sum += arr[right]
                right += 1
                continue

            if sum > target:
                sum -= arr[left]
                left += 1
                continue

        subs = sorted(subs, key=lambda x: x[1] - x[0] + 1)
        minSumLength = inf

        for i in range(len(subs)):
            [x1, x2] = subs[i]

            if x2 - x1 + 1 > minSumLength:
                break

            for j in range(i + 1, len(subs)):
                [y1, y2] = subs[j]
                if y2 - y1 + 1 > minSumLength:
                    continue

                if y1 > x2 or y2 < x1:
                    minSumLength = min(minSumLength, x2 - x1 + 1 + y2 - y1 + 1)

        return minSumLength if minSumLength != inf else -1  # type: ignore

    # METHOD 2 - FIND ALL SUBARRAYS, ONLY REMEMBER SMALLEST NON OVERLAPPING
    def minSumOfLengths(self, arr: List[int], target: int) -> int:
        left = 0
        right = 0
        sum = 0
        subs = [(), ()]

        while True:
            if sum == target:
                if not subs[0]:
                    subs[0] = (left, right - 1)  # type: ignore
                elif not subs[1]:
                    subs[1] = (left, right - 1)  # type: ignore
                else:
                    (x1, x2) = subs[0]
                    (y1, y2) = subs[1]

                    # window 1 is smaller.  try to replace
                    if x2 - x1 > y2 - y1:
                        if left > x2 and (right - 1 - left < x2 - x1):
                            subs[0] = (left, right - 1)  # type: ignore
                    else:
                        if left > y2 and (right - 1 - left < y2 - y2):
                            subs[1] = (left, right - 1)  # type: ignore

                sum -= arr[left]
                left += 1
                continue

            if sum < target:
                if right == len(arr):
                    break
                sum += arr[right]
                right += 1
                continue

            if sum > target:
                sum -= arr[left]
                left += 1
                continue

        if not subs[1]:
            return -1

        (x1, x2) = subs[0]  # type: ignore
        (y1, y2) = subs[1]
        return y2 - y1 + 1 + x2 - x1 + 1


s = Solution()
# print(
#     s.minSumOfLengths(
#         arr=[
#             2,
#             2,
#             4,
#             4,
#             4,
#             4,
#             4,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#             1,
#         ],
#         target=20,
#     )
# )  # 23
print(s.minSumOfLengths([3, 2, 2, 4, 3], 3))  # 2
print(s.minSumOfLengths([7, 3, 4, 7], 7))  # 2
print(s.minSumOfLengths(arr=[4, 3, 2, 6, 2, 3, 4], target=6))  # -1
print(s.minSumOfLengths(arr=[1, 1, 1, 2, 2, 2, 4, 4], target=6))  # 6
