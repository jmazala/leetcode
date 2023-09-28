# https://leetcode.com/problems/surrounded-regions/

from typing import List

O = "O"
X = "X"
PRESERVED = "P"
LEFT = [0, -1]
RIGHT = [0, 1]
UP = [-1, 0]
DOWN = [1, 0]
DIRECTIONS = [RIGHT, DOWN, LEFT, UP]


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """

        m = len(board)
        n = len(board[0])

        # DFS from borders
        # Top and bottom row
        for j in range(n):
            self.dfs(0, j, m, n, board)
            self.dfs(m - 1, j, m, n, board)

        # left and right col
        for i in range(m):
            self.dfs(i, 0, m, n, board)
            self.dfs(i, n - 1, m, n, board)

        # revert placeholders
        for i in range(m):
            for j in range(n):
                if board[i][j] == PRESERVED:
                    board[i][j] = O
                elif board[i][j] == O:
                    board[i][j] = X

    def dfs(self, i: int, j: int, m: int, n: int, board: List[List[str]]) -> None:
        if i < 0 or j < 0 or i == m or j == n or board[i][j] != O:
            return

        board[i][j] = PRESERVED

        for dI, dJ in DIRECTIONS:
            nextI, nextJ = i + dI, j + dJ
            self.dfs(nextI, nextJ, m, n, board)


s = Solution()
board = [
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "X", "O", "X"],
    ["X", "O", "X", "X"],
]
s.solve(board)
print(
    board
)  # [['X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X'], ['X', 'X', 'X', 'X'], ['X', 'O', 'X', 'X']]
