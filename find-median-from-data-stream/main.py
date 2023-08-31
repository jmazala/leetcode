# https://leetcode.com/problems/find-median-from-data-stream/description/

import heapq


class MaxHeap:
    def __init__(self):
        self._data = []

    def push(self, value: int) -> None:
        heapq.heappush(self._data, -value)

    def pop(self) -> int:
        return -heapq.heappop(self._data)

    def peek(self) -> int:
        return -self._data[0]

    def __len__(self) -> int:
        return len(self._data)


class MinHeap:
    def __init__(self):
        self._data = []

    def push(self, value: int) -> None:
        heapq.heappush(self._data, value)

    def pop(self) -> int:
        return heapq.heappop(self._data)

    def peek(self) -> int:
        return self._data[0]

    def __len__(self) -> int:
        return len(self._data)


class MedianFinder:
    def __init__(self):
        self.minHeapHigherValues = MinHeap()
        self.maxHeapLowerValues = MaxHeap()
        self.median = None

    def addNum(self, num: int) -> None:
        # first item
        if len(self.maxHeapLowerValues) == 0 and len(self.minHeapHigherValues) == 0:
            self.maxHeapLowerValues.push(num)
            self.median = num
            return

        # EQUAL SIZE HEAPS
        # After insertion, total # of nums is odd
        # Thus median is middle element (top of bigger heap, the one we just inserted into)
        if len(self.maxHeapLowerValues) == len(self.minHeapHigherValues):
            if num < self.maxHeapLowerValues.peek():
                self.maxHeapLowerValues.push(num)
                self.median = self.maxHeapLowerValues.peek()
            else:
                self.minHeapHigherValues.push(num)
                self.median = self.minHeapHigherValues.peek()

            return

        # UNEQUAL SIZE HEAPS
        # After insertion, total # of nums is even
        # Insert into the right heap based on nums value
        # After insertion, heap sizes are equal or +2 to inserted heap
        # Rebalance.  Then median is avg of 2 middle elements (top of both heaps)

        # First, insert into the proper heap based on num
        if num < self.maxHeapLowerValues.peek():
            self.maxHeapLowerValues.push(num)
        else:
            self.minHeapHigherValues.push(num)

        # Rebalance heaps
        if len(self.maxHeapLowerValues) > len(self.minHeapHigherValues):
            self.minHeapHigherValues.push(self.maxHeapLowerValues.pop())
        elif len(self.minHeapHigherValues) > len(self.maxHeapLowerValues):
            self.maxHeapLowerValues.push(self.minHeapHigherValues.pop())

        # Calculate median
        self.median = (
            self.minHeapHigherValues.peek() + self.maxHeapLowerValues.peek()
        ) / 2.0

    def findMedian(self) -> float:
        return self.median


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()
