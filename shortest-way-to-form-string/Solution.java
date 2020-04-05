class Solution {
  public int shortestWay(String source, String target) {
    int numSubsequences = 0;

    while (target.length() > 0) {
      int i = 0;
      int j = 0;
      StringBuilder subsequence = new StringBuilder();

      while (i < source.length() && j < target.length()) {
        if (target.charAt(j) == source.charAt(i++)) {
          subsequence.append(target.charAt(j++));
        }
      }

      if (subsequence.length() == 0) {
        return -1;
      }

      target = target.substring(subsequence.length());
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