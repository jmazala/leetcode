# https://leetcode.com/problems/new-21-game/description/


class Solution:
    # draw points until you reach k
    # you get betwen 1 and maxPts per card
    # output is prob final score is <= n
    # Considering how to find the probability of reaching score i:
    # It's the sum of all [the probability of having the score beforehand * probability of getting the card you want]
    # TIME: O(n*c) (worst case where we don't stop drawing until we reach k)
    # O(n) for creating DP array
    # O(n) for loop to calculate probability of each score of to n
    #   O(c) where ci is # of cards
    # SPACE: O(n) for DP array

    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        # we have 100 probability of getting 0 points because we start with 0 points

        dp = [1] + [0] * n  # dp[i] = probability of reaching i points

        for target in range(1, n + 1):  # only calculate probabilities of reaching 1-n
            for card in range(1, maxPts + 1):
                # Condition 1 - is there a state before we could have gotten to?
                # Condition 2 - would we have stopped drawing cards?
                if target - card >= 0 and target - card < k:
                    dp[target] += (
                        dp[target - card] / maxPts
                    )  # equal probability of drawing card values

        return sum(dp[k:])

    # instead of calculating the sum of DP values, we can keep a sum in a variable
    # for i=1, contributing hands to hand (h + score where 1 <= score <= maxPts) is [0, min(k-1,0)]
    # that's empty when k = 0 or contains only dp[0]
    # as I moves to the right, change s
    # this is sliding window.  as window increases, include probability of a higher score, and decrease the one we left behind
    # This removes having to loop through the cards above because the probability of each card is equal
    def new21Game(self, n: int, k: int, maxPts: int) -> float:
        dp = [1] + [0] * n  # dp[i] = probability of reaching i points

        s = 1 if k > 0 else 0

        for i in range(1, n + 1):
            # s is probability of all states that we could have reached i from
            # make sense.  if you have cards from 1 to 10 and your score is 0, you have equal
            # probability of reaching scores 1 through 10
            # The same is true for any starting / ending score for the next draw
            dp[i] = s / maxPts

            if i < k:
                s += dp[i]
            if i - maxPts >= 0 and i - maxPts < k:
                s -= dp[i - maxPts]

        return sum(dp[k:])


s = Solution()
print(s.new21Game(21, 17, 10))  # 0.73278
print(s.new21Game(10, 1, 10))  # 1.000
print(s.new21Game(6, 1, 10))  # 0.60000
