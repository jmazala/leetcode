import collections
import heapq

class Solution:
    def reorganizeString(self, S: str) -> str:
      hash = collections.defaultdict(lambda: 0)
      for c in S:
        hash[c] -= 1
      
      #put them into a priority queue      
      pq = []
      for c, count in hash.items():
        heapq.heappush(pq, (count, c))

      #it's not possible to do this if any char takes up (N+1) / 2 space
      for (count, char) in pq:
        if (count * -1) > (len(S) + 1) / 2:
          return ""
      
      answer = []
      while len(pq) >= 2:
        count1, c1 = heapq.heappop(pq)
        count2, c2 = heapq.heappop(pq)
        
        answer.extend([c1, c2])
        if count1 + 1 != 0:
          heapq.heappush(pq, (count1 + 1, c1))
        if count2 + 1 != 0:
          heapq.heappush(pq, (count2 + 1, c2))

      if (len(pq) > 0):
        answer.extend(pq[0][1])
      
      return "".join(answer)

if __name__ == '__main__':
  solution = Solution()
  print(solution.reorganizeString('aab'))
  print(solution.reorganizeString('aaab'))