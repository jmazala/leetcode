# https://leetcode.com/problems/min-stack/


class MinStack:
    def __init__(self):
        self.values = []

    # push val onto stack
    def push(self, val: int) -> None:
        if not len(self.values):
            self.values.insert(0, (val, val))
        else:
            self.values.insert(0, (val, min(val, self.getMin())))

    # remove element on top of stack
    def pop(self) -> None:
        return self.values.pop(0)[0]

    # get element on top of stack
    def top(self) -> int:
        return self.values[0][0]

    # get minimum element in the stack
    def getMin(self) -> int:
        return self.values[0][1]


# Your MinStack object will be instantiated and called as such:
obj = MinStack()
obj.push(-2)
obj.push(0)
obj.push(-3)
print(obj.getMin())  # -3
print(obj.pop())  # -3
print(obj.top())  # 0
print(obj.getMin())  # -2
