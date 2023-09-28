from typing import List


class Solution:
    # METHOD 1 - Follow it exactly (TLE)
    def totalStrength(self, strength: List[int]) -> int:
        answer = 0

        for i in range(len(strength)):
            curMin = -1
            sum = 0

            for j in range(len(strength)):
                if j < i:
                    continue

                if i == j:
                    curMin = strength[i]
                    sum = strength[i]
                else:
                    curMin = min(curMin, strength[j])
                    sum += strength[j]

                answer += curMin * sum

        return answer % (10**9 + 7)


s = Solution()
print(s.totalStrength([1, 3, 1, 2]))  # 44


from typing import List


class Solution:
    # METHOD 2 - Some kind of math lol
    def totalStrength(self, strength: List[int]) -> int:
        dp = [[(-1, -1)] * len(strength) for _ in range(len(strength))]

        sums = 0
        for i in range(len(strength)):
            for j in range(len(strength)):
                if j < i:
                    continue

                if i == j:
                    dp[i][j] = (strength[i], strength[i])
                else:
                    dp[i][j] = (
                        min(strength[j], dp[i][j - 1][0]),
                        dp[i][j - 1][1] + strength[j],
                    )

                sums += dp[i][j][0] * dp[i][j][1]

        return sums % (10**9 + 7)
