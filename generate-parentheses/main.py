# https://leetcode.com/problems/generate-parentheses/


from typing import List


class Solution:
    # METHOD 1 - RECURSION
    def generateParenthesis(self, n: int) -> List[str]:
        output = []
        self.helper(n, n, "", output)
        return output

    def helper(
        self, openingNeeded: int, closingNeeded: int, prefix: str, output: List[str]
    ):
        if openingNeeded == 0 and closingNeeded == 0:
            output.insert(0, prefix)
            return

        if openingNeeded > 0:
            self.helper(openingNeeded - 1, closingNeeded, prefix + "(", output)

        if closingNeeded > openingNeeded:
            self.helper(openingNeeded, closingNeeded - 1, prefix + ")", output)

    # METHOD 2 - ITERATIVE (STACK)
    def generateParenthesis(self, n: int) -> List[str]:
        output = []
        stack = [(n, n, "")]

        while stack:
            (openingNeeded, closingNeeded, prefix) = stack.pop()

            if not openingNeeded and not closingNeeded:
                output.insert(0, prefix)
                continue

            if openingNeeded > 0:
                stack.append((openingNeeded - 1, closingNeeded, prefix + "("))  # type: ignore

            if closingNeeded > openingNeeded:
                stack.append((openingNeeded, closingNeeded - 1, prefix + ")"))  # type: ignore

        return output


s = Solution()
print(s.generateParenthesis(1))  # ['()']
print(s.generateParenthesis(2))  # ['()()', '(())']
print(s.generateParenthesis(3))  # ['()()()', '()(())', '(())()', '(()())', '((()))']
