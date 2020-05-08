class Solution:
    def trap(self, height: List[int]) -> int:
      maxHeights = [0] * len(heights)
      leftMax = 0

      # calculate left max for each point
      for i in range(len(heights)):
        maxHeights[i] = leftMax
        leftMax = max(leftMax, heights[i])

      rightMax = 0
      # calculate min of left/right max for each point
      # also calculate water above this point
      for i in reversed(range(len(heights))):
        minHeight = min(rightMax, maxHeights[i])
        height = heights[i]
        
        if (height < minHeight):
          maxHeights[i] = minHeight - height
        else:
          maxHeights[i] = 0
      
        rightMax = max(rightMax, height)

      return sum(maxHeights)