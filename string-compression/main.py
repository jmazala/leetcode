class Solution:
  def compress(self, chars: List[str]) -> int:
    if (len(chars) == 0):
      return 0
    
    if (len(chars) == 1):
      return 1
    
    read = 0
    write = 0
    
    while (read < len(chars)):
      count = 0
      current = chars[read]
      
      while (read < len(chars) and chars[read] == current):
        read += 1
        count += 1
      
      chars[write] = current
      write += 1
      
      if (count == 1):
        continue
      
      for c in str(count):
        chars[write] = c
        write += 1
        
    return write