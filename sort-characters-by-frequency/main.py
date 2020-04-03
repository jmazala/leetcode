import collections
import heapq


class Solution:
  def frequencySort(self, s: str) -> str:
    if (s is None or len(s) == 0):
      return ""

    hash = collections.defaultdict(lambda: 0)

    for c in s:
      hash[c] -= 1  # negative because sorting descending

    pq = []
    for c, count in hash.items():
      heapq.heappush(pq, (count, c))

    answer = ""
    while (len(pq) > 0):
      (count, c) = heapq.heappop(pq)
      for i in range(-1 * count):
        answer += c

    return answer

if __name__ == '__main__':
  s = Solution()
  print(s.frequencySort("raaeaedere"))