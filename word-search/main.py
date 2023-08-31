from typing import List


class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        self.m = len(board)
        self.n = len(board[0])
        self.board = board
        self.word = word

        for i in range(len(board)):
            for j in range(len(board[0])):
                if self.dfs(i, j, 0, set()):
                    return True

        return False

    def dfs(self, i, j, index, seen):
        if index == len(self.word):
            return True

        # Check for OOB or not a match or been here before
        if (
            i == -1
            or j == -1
            or i >= self.m
            or j >= self.n
            or (i, j) in seen
            or self.board[i][j] != self.word[index]
        ):
            return False

        seen.add((i, j))

        # for nextI, nextJ in up, down, left, right
        for nextI, nextJ in [(i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)]:
            if self.dfs(nextI, nextJ, index + 1, seen):
                return True

        seen.remove((i, j))
        return False


s = Solution()
print(
    s.exist(
        board=[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
        word="ABCCED",
    )
)  # True

print(
    s.exist(
        board=[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
        word="SEE",
    )
)  # True

print(
    s.exist(
        board=[["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]],
        word="ABCB",
    )
)  # False
