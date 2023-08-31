# https://leetcode.com/problems/pacific-atlantic-water-flow/


from typing import List


class Solution:
    # METHOD 1 - BFS
    # 260ms / 18.1MB
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        m = len(heights)
        n = len(heights[0])

        pacific = [[False] * n for _ in range(m)]
        atlantic = [[False] * n for _ in range(m)]
        answer = []

        # calc pacific
        queue = [(0, j) for j in range(n)] + [(i, 0) for i in range(m)]
        # we have (0, 0) twice
        queue.pop(0)
        seen = set(queue)
        while len(queue):
            (i, j) = queue.pop(0)
            seen.add((i, j))
            pacific[i][j] = True

            for nextI, nextJ in [(i, j + 1), (i, j - 1), (i + 1, j), (i - 1, j)]:
                if (
                    nextI < 0
                    or nextJ < 0
                    or nextI == m
                    or nextJ == n
                    or (nextI, nextJ) in seen
                    or heights[nextI][nextJ] < heights[i][j]
                ):
                    continue

                queue.append((nextI, nextJ))

        # calc atlantic
        queue = [(m - 1, j) for j in range(n)] + [(i, n - 1) for i in range(m)]
        # we have (m-1, n-1) twice
        queue.pop()
        seen = set(queue)
        while len(queue):
            (i, j) = queue.pop(0)
            atlantic[i][j] = True

            for nextI, nextJ in [(i, j + 1), (i, j - 1), (i + 1, j), (i - 1, j)]:
                if (
                    nextI < 0
                    or nextJ < 0
                    or nextI == m
                    or nextJ == n
                    or (nextI, nextJ) in seen
                    or heights[nextI][nextJ] < heights[i][j]
                ):
                    continue

                seen.add((nextI, nextJ))
                queue.append((nextI, nextJ))

        for i in range(m):
            for j in range(n):
                if pacific[i][j] and atlantic[i][j]:
                    answer.append([i, j])

        return answer

    # METHOD 2 - DFS
    # 243ms / 20.4MB
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        self.m = len(heights)
        self.n = len(heights[0])
        self.heights = heights

        self.pacific = [[False] * self.n for _ in range(self.m)]
        self.atlantic = [[False] * self.n for _ in range(self.m)]
        answer = []

        # for i in range(self.m):
        #     self.atlantic[i][n - 1] = True
        #     self.pacific[i][0] = True

        # for j in range(self.n):
        #     self.atlantic[m - 1][j] = True
        #     self.pacific[0][j] = True

        self.dfs(0, 0, self.pacific, True)
        self.dfs(self.m - 1, self.n - 1, self.atlantic, False)

        for i in range(self.m):
            for j in range(self.n):
                if self.pacific[i][j] and self.atlantic[i][j]:
                    answer.append([i, j])

        return answer

    def dfs(self, i, j, ocean, isPacific):
        ocean[i][j] = True

        for nextI, nextJ in [(i, j + 1), (i, j - 1), (i + 1, j), (i - 1, j)]:
            if (
                nextI < 0
                or nextJ < 0
                or nextI == self.m
                or nextJ == self.n
                or ocean[nextI][nextJ]
            ):
                continue

            if (
                ((nextI == 0 or nextJ == 0) and isPacific)  # Borders pacific
                or (
                    (nextI == self.m - 1 or nextJ == self.n - 1) and not isPacific
                )  # Borders Atlantic
                or self.heights[nextI][nextJ] >= self.heights[i][j]  # Flows downhill
            ):
                self.dfs(nextI, nextJ, ocean, isPacific)


s = Solution()

print(
    s.pacificAtlantic(
        heights=[
            [1, 2, 2, 3, 5],
            [3, 2, 3, 4, 4],
            [2, 4, 5, 3, 1],
            [6, 7, 1, 4, 5],
            [5, 1, 1, 2, 4],
        ]
    )
)  # [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]

print(
    s.pacificAtlantic([[1, 2, 3], [8, 9, 4], [7, 6, 5]])
)  # [[0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
