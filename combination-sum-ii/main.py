class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        def dfs(candidates, target, prefix=[]):
            if (target == 0):
                result.add(tuple(prefix))
                return

            if (target < 0 or len(candidates) == 0):
                return

            for i in range(len(candidates)):
                if (i > 0 and candidates[i] == candidates[i-1]):
                    continue

                prefix.append(candidates[i])
                dfs(candidates[i+1:], target - candidates[i], prefix)
                prefix.pop()

        candidates.sort()
        result = set()
        dfs(candidates, target)

        return [list(x) for x in result]
