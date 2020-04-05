class Solution {
  public int shortestWay(String source, String target) {
    int numSubsequences = 0;
    String remaining = target;

    while (remaining.length() > 0) {
      int i = 0;
      int j = 0;
      StringBuilder subsequence = new StringBuilder();

      while (i < source.length() && j < remaining.length()) {
        if (remaining.charAt(j) == source.charAt(i++)) {
          subsequence.append(remaining.charAt(j++));
        }
      }

      if (subsequence.length() == 0) {
        return -1;
      }

      remaining = remaining.substring(subsequence.length());
      numSubsequences++;
    }

    return numSubsequences;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.shortestWay("abc", "abcbc"));
    System.out.println(s.shortestWay("abc", "abdcbc"));
  }
}