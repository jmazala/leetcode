# https://leetcode.com/problems/edit-distance/


class Solution:
    # STORE ALL ROWS (DP)
    def minDistance(self, word1: str, word2: str) -> int:
        dp = [[0] * (len(word2) + 1) for _ in range(len(word1) + 1)]

        # Simulate starting at "" and adding 1 char each in word1
        for i in range(len(word1) + 1):
            dp[i][0] = i

        # same for word2
        for i in range(len(word2) + 1):
            dp[0][i] = i

        for i in range(1, len(word1) + 1):
            c1 = word1[i - 1]
            for j in range(1, len(word2) + 1):
                c2 = word2[j - 1]

                up = dp[i - 1][j] + 1
                left = dp[i][j - 1] + 1
                diagonal = dp[i - 1][j - 1] + (0 if c1 == c2 else 1)
                dp[i][j] = min(up, left, diagonal)

        return dp[len(word1)][len(word2)]

    # STORE ONLY LAST 2 ROWS (DP)
    def minDistance(self, word1: str, word2: str) -> int:
        if len(word1) == 0:
            return len(word2)

        if len(word2) == 0:
            return len(word1)

        # The dp rows algo works with word1 x word2 or word2 x word1, but
        # since we are limiting the height of the dp matrix to 2,
        # we can further save space by minimizing the width.
        # use the smaller word as # of cols
        small = word1 if len(word1) < len(word2) else word2
        big = word1 if small == word2 else word2

        # just as before, 0th row should be [0, 1, 2, 3 ...]
        evenEdits = [x for x in range(len(small) + 1)]
        # on first iteration this isn't assigned yet
        oddEdits = [None for _ in range(len(small) + 1)]

        for i in range(1, len(big) + 1):
            c1 = big[i - 1]
            # on first iteration i = 1 so we begin by editing oddEdits (set to None above)
            [currentRow, prevRow] = (
                [oddEdits, evenEdits] if i % 2 == 1 else [evenEdits, oddEdits]
            )

            # can't forget this.
            currentRow[0] = i
            for j in range(1, len(small) + 1):
                c2 = small[j - 1]
                up = prevRow[j] + 1
                left = currentRow[j - 1] + 1
                diagonal = prevRow[j - 1] + (0 if c1 == c2 else 1)

                currentRow[j] = min(up, left, diagonal)

        return currentRow[len(small)]


s = Solution()
print(s.minDistance("horse", "ros"))  # 3 (add h, add o, add e)
print(s.minDistance("intention", "execution"))  # 5 (inten to execu, tion is unchanged)
