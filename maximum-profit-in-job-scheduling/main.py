# https://leetcode.com/problems/maximum-profit-in-job-scheduling/

import heapq
from typing import List


class Solution:
    # BRUTE FORCE
    # Take or Skip every job
    # TIME: O(2^n)
    # We can do better with dynamic programming I think
    def jobScheduling(
        self, startTime: List[int], endTime: List[int], profit: List[int]
    ) -> int:
        if len(startTime) == 1:
            return profit[0]

        self.maxProfit = 0
        self.helper(startTime, endTime, profit, 0, 0)
        return self.maxProfit

    def helper(self, startTime, endTime, profit, nextAvailableTime, curProfit):
        for i in range(len(startTime)):
            if startTime[i] < nextAvailableTime:
                continue

            # take this job
            self.helper(
                startTime[i + 1 :],
                endTime[i + 1 :],
                profit[i + 1 :],
                endTime[i],
                curProfit + profit[i],
            )

            # (implicit) or don't take this job
            self.helper(
                startTime[i + 1 :],
                endTime[i + 1 :],
                profit[i + 1 :],
                nextAvailableTime,
                curProfit,
            )

        self.maxProfit = max(self.maxProfit, curProfit)

    # DYNAMIC PROGRAMMING (TOP DOWN) W/ BINARY SEARCH AND MEMOIZATION
    # TIME: O(n log n)
    # O(n) for memo
    # O(n log n) to sort
    # O(n) to sort again
    # O(2n) for each findMaxProfit call (take / don't take) for every non-memoized call.  O(1) for memoized
    # O(log n) for every binary search (called N times)
    # SPACE: O(n)
    # O(n) for memoization
    # O(3n) for jobs flattening
    # O(n) for recursion stack (worst case is for every job not taken)
    def jobScheduling(
        self, startTime: List[int], endTime: List[int], profit: List[int]
    ) -> int:
        # memoization array to avoid duplicate calculations
        memo = [-1] * len(startTime)

        # Flatten structures to (startTime, endTime, profit) for each job
        jobs = [(startTime[i], endTime[i], profit[i]) for i in range(len(startTime))]

        # Sort according to start time
        jobs.sort(key=lambda job: job[0])

        # Since we use binary search to find the next available job (instead of linear scan), sort startTime as well
        # Instead of n log n for startTime we can do it in O(n) since we already sorted the flattened job tuples
        startTime = [job[0] for job in jobs]

        # Iterate left to right, compare take it vs leave it max profits
        return Solution.findMaxProfit(jobs, startTime, 0, memo)

    @staticmethod
    def findMaxProfit(
        jobs: List[tuple], startTime: List[int], pos: int, memo: List[int]
    ) -> int:
        # 0 profit if we've iterated through all of jobs
        if pos == len(jobs):
            return 0

        if memo[pos] > -1:
            return memo[pos]

        maxProfitSkippingThisJob = Solution.findMaxProfit(
            jobs, startTime, pos + 1, memo
        )

        # Use binary search to find the next non-conflicting job
        nextIndex = Solution.findNextJob(startTime, jobs[pos][1])
        profitForThisJob = jobs[pos][2]

        maxProfitIncludingThisJob = profitForThisJob + Solution.findMaxProfit(
            jobs, startTime, nextIndex, memo
        )

        memo[pos] = max(maxProfitSkippingThisJob, maxProfitIncludingThisJob)
        return memo[pos]

    @staticmethod
    def findNextJob(startTime: List[int], nextAvailableTime: int) -> int:
        start = 0
        end = len(startTime) - 1
        nextJobIndex = len(
            startTime
        )  # Default here to match base case of findMaxProfit

        while start <= end:
            mid = (start + end) // 2

            if (
                startTime[mid] >= nextAvailableTime
            ):  # Could be here OR before (hence >= vs >)
                nextJobIndex = mid
                end = mid - 1
            else:  # Job is too late, look at earlier jobs
                start = mid + 1

        return nextJobIndex

    # DYNAMIC PROGRAMMING (BOTTOM-UP) W/ BINARY SEARCH
    # Top down has recursion stack space that can be avoided
    # Iterative manner which is generally faster.
    # Start from position = n (base case, no more jobs scheduled = max profit of 0)
    # search through jobs backwards and build up memoization with previously calculated profits
    # To build memo, at each index, check profits that can be obtained by scheduling / not scheduling that job
    #   If we schedule job[i], apply binary search to find nextIndex of the first non-conflicting job (in the future)
    #     Total profit would be the sum of current job and memo[nextIndex]
    #   If we skip job[i], maxProfit is the same as memo[i+1] (max profit from starting next job)
    # Thus memo[i] = max profit with non conflicting jobs between i and n
    # It doesn't matter if there are multiple non-conflicting future jobs because we are using DP right to left
    # Hence the first non conflicting job will take into account the other jobs
    # TIME: O(n log n)
    # O(n) to make DP array
    # O(n log n) to sort
    # O(n) for findMaxProfit outer loop
    #   O(log n) to find next job (binary search)
    # SPACE: O(n)
    # O(n) for DP
    # O(3n) for jobs
    def jobScheduling(
        self, startTime: List[int], endTime: List[int], profit: List[int]
    ) -> int:
        dp = [-1] * len(startTime)

        # Flatten structures to (startTime, endTime, profit) for each job
        jobs = [(startTime[i], endTime[i], profit[i]) for i in range(len(startTime))]

        # Sort according to start time
        jobs.sort(key=lambda job: job[0])

        # Since we use binary search to find the next available job (instead of linear scan), sort startTime as well
        # Instead of n log n for startTime we can do it in O(n) since we already sorted the flattened job tuples
        startTime = [job[0] for job in jobs]

        return Solution.findMaxProfit(jobs, startTime, dp)

    @staticmethod
    def findMaxProfit(jobs: List[tuple], startTime: int, dp: List[int]) -> int:
        length = len(startTime)

        # Iterate right to left, curProfit is sum of current job's profit and max profit for nextIndex and end
        for pos in range(length - 1, -1, -1):
            curProfit = jobs[pos][2]

            # Find the earliest non-conflicting job
            nextIndex = Solution.findNextJob(startTime, jobs[pos][1])

            # We have a non conflicting job, apply its max profit as well
            if nextIndex != length:
                curProfit += dp[nextIndex]

            if pos == length - 1:
                dp[pos] = curProfit
            else:
                dp[pos] = max(curProfit, dp[pos + 1])

        return dp[0]

    # APPROACH 3 - SORT + HEAP
    # Each job is a pair of startTime / endTime (a link in the chain.  See https://leetcode.com/problems/maximum-length-of-pair-chain/)
    # Each link has a profit associated with it.  Instead of making the longest chain, make the most profitable chain
    # This is similar to a longest increasing subsequence problem, with maximizing profit instead of length
    # Thus, sort jobs according to start time.  For ecah job, chose the most profitable chain to add it to
    # For every new job, iterate through all the previous chains to find the most profitable chain ending ending before (or at) this new jobs starting time
    # Brute force is O(n^2) assuming we look through every chain.  We can use a heap to do better
    # 1 - for each job, find all possible chains to extend it to
    # 2 - Since all jobs are sorted according to start time, if a chain doesn't conflict with the current job, it won't conflict with future jobs
    # Observation 1 says store existing chains so thoe ending earliest can be accessed quickly (find existing probable chains the fastest)
    # Observation 2 says we dont need to remember chains that have ended, just the maximum profit from any chain that has ended
    # ALGORITHM
    # iterate jobs left to right (after soritng), and check previous chains by popping them out of a heap
    # If we can extend, extend and push into heap.  The heap contains endTime and profit
    # Caveat:  We can't just immediately push back into the heap because we might immediately pop it again

    def jobScheduling(
        self, startTime: List[int], endTime: List[int], profit: List[int]
    ) -> int:
        # Flatten structures to (startTime, endTime, profit) for each job
        jobs = [(startTime[i], endTime[i], profit[i]) for i in range(len(startTime))]

        # Sort according to start time
        jobs.sort(key=lambda job: job[0])
        return Solution.findMaxProfit(jobs)

    @staticmethod
    def findMaxProfit(jobs: List[tuple]) -> int:
        maxProfit = 0
        maxHeap = MaxHeap()

        for [start, end, profit] in jobs:
            # keep popping while heap isn't empty and jobs don't conflict
            while len(maxHeap) > 0 and start >= maxHeap.peek()[0]:
                item = maxHeap.pop()
                maxProfit = max(maxProfit, item[1])

            heapItem = (end, profit + maxProfit)
            maxHeap.push(heapItem)

        while len(maxHeap) > 0:
            maxProfit = max(maxProfit, maxHeap.pop()[1])

        return maxProfit


class HeapItem:
    def __init__(self, item: tuple):
        self.item = item

    def __lt__(self, another):
        return self.item[0] - another.item[0] < 0


class MaxHeap:
    def __init__(self):
        self._data = []

    def push(self, value: HeapItem) -> None:
        heapq.heappush(self._data, value)

    def pop(self) -> int:
        return heapq.heappop(self._data)

    def peek(self) -> int:
        return self._data[0]

    def __len__(self) -> int:
        return len(self._data)


s = Solution()
print(s.jobScheduling([4, 2, 4, 8, 2], [5, 5, 5, 10, 8], [1, 2, 8, 10, 4]))  # 18
print(s.jobScheduling([1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]))  # 120
print(s.jobScheduling([1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60]))  # 150
