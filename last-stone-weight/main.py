from typing import List
import heapq

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
      if (stones is None or len(stones) == 0):
        return 0

      heap = []

      for stone in stones:
        heapq.heappush(heap, -1 * stone)
        
      """
      Each turn, we choose the two heaviest stones and smash them together.
      Suppose the stones have weights x and y with x <= y.
      """
      
      while len(heap) > 1:
        x = -1 *  heapq.heappop(heap)
        y = -1 * heapq.heappop(heap)

        # If x == y, both stones are totally destroyed;
        if (x == y):
          continue

        """
        If x != y, the stone of weight x is totally destroyed,
        and the stone of weight y has new weight y-x.
        """
        heapq.heappush(heap, -1 * abs(x - y))

      """
      At the end, there is at most 1 stone left.
      Return the weight of this stone (or 0 if there are no stones left.)
      """
      return 0 if len(heap) == 0 else -1 * heap[0]

if __name__ == '__main__':
  s = Solution()
  print(s.lastStoneWeight([2,7,4,1,8,1])) #1
  print(s.lastStoneWeight([10,4,2,10])) #2
  print(s.lastStoneWeight([7,6,7,6,9])) #3