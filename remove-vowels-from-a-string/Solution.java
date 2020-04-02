class Solution {
  //using regex replace
  // public String removeVowels(String s) {
  //   return s.replaceAll("[aeiou]", "");
  // }

  //using string builder
  public String removeVowels(String s) {
    StringBuilder b = new StringBuilder();
    for (char c : s.toCharArray()) {
      switch (c) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
          continue;
        default:
          b.append(c);
      }
    }

    return b.toString();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.removeVowels("To perform a substitution using a regular expression, use"));
  }
}