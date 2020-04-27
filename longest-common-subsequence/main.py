class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # dp = [[0] * (len(text2) + 1)] * (len(text1) + 1)
        dp = [[None for _ in range(len(text2) + 1)] for _ in range(len(text1) + 1)]

        for i in range(len(text1) + 1):
            for j in range(len(text2) + 1):
                if i == 0 or j == 0:
                    dp[i][j] = 0
                    continue
                
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i-1][j-1] + 1
                else:
                    dp[i][j] = max(dp[i][j-1], dp[i-1][j])
        
        return dp[len(text1)][len(text2)]

if __name__ == '__main__':
    s = Solution();
    print(s.longestCommonSubsequence("abcde", "abc")) #3