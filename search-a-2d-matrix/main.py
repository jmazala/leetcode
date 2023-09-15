# https://leetcode.com/problems/search-a-2d-matrix/description/
from typing import List


class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m = len(matrix)
        n = len(matrix[0])
        # Binary search to find the correct row
        row_low = 0
        row_high = m - 1
        row = -1

        while row_low <= row_high:
            row_mid = (row_low + row_high) // 2

            if target >= matrix[row_mid][0] and target <= matrix[row_mid][-1]:
                row = row_mid
                break

            if target > matrix[row_mid][-1]:
                row_low = row_mid + 1
            else:
                row_high = row_mid - 1

        if row == -1:
            return False

        # Binary search within row
        col_low = 0
        col_high = n - 1

        while col_low <= col_high:
            col_mid = (col_low + col_high) // 2

            if matrix[row][col_mid] == target:
                return True

            if matrix[row][col_mid] > target:
                col_high = col_mid - 1
            else:
                col_low = col_mid + 1

        return False


s = Solution()
print(s.searchMatrix([[1]], 1))  # True
print(
    s.searchMatrix(matrix=[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target=3)
)  # True
print(
    s.searchMatrix(matrix=[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target=16)
)  # True
print(
    s.searchMatrix(matrix=[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target=60)
)  # True

print(s.searchMatrix([[1]], 0))  # False

print(
    s.searchMatrix(matrix=[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target=2)
)  # False
print(
    s.searchMatrix(matrix=[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target=13)
)  # False
print(
    s.searchMatrix(matrix=[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target=45)
)  # False
