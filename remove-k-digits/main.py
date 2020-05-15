class Solution:
  def removeKdigits(self, num: str, k: int) -> str:
    if (k == len(num)):
      return "0"
    
    digits = len(num) - k
    stack = [None] * digits
    top = 0

    for i in range(len(num)):
      c = num[i]
      while (top > 0 and stack[top - 1] > c and k > 0):
        k -= 1
        top -= 1
      
      if (top < digits):
        stack[top] = c
        top += 1
      else:
        k -= 1


    index = 0
    while (index < digits and stack[index] == '0'):
      index += 1
    
    if index == digits:
      return "0"
    
    answer = ""
    for i in range(index, digits - index):
      answer += stack[i]
    
    return answer

if __name__ == '__main__':
  s = Solution()
  print(s.removeKdigits("10", 2)) # 0
  print(s.removeKdigits("10200", 1)) # 200
  print(s.removeKdigits("1432219", 3)) # 1219