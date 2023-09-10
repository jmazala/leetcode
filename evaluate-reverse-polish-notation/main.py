from typing import List


class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []

        for token in tokens:
            if token == "+":
                y = stack.pop()
                x = stack.pop()
                stack.append(x + y)
            elif token == "-":
                y = stack.pop()
                x = stack.pop()
                stack.append(x - y)
            elif token == "*":
                y = stack.pop()
                x = stack.pop()
                stack.append(x * y)
            elif token == "/":
                y = stack.pop()
                x = stack.pop()
                if x >= 0 and y > 0:
                    stack.append(x // y)
                else:
                    stack.append(int(x / y))
            else:
                stack.append(int(token))

        return stack.pop()


s = Solution()
print(s.evalRPN(tokens=["2", "1", "+", "3", "*"]))  # 9
print(s.evalRPN(tokens=["4", "13", "5", "/", "+"]))  # 6
print(
    s.evalRPN(
        tokens=["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
    )
)  # 22
