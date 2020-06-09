class Solution {
  // USING indexOf
  public boolean isSubsequence(String s, String t) {
    if (s.length() == 0) {
      return true;
    }

    if (t.length() == 0) {
      return false;
    }

    int index = -1;
    for (char c : s.toCharArray()) {
      index = t.indexOf(c, index + 1);
      if (index == -1) {
        return false;
      }
    }

    return true;
  }

  // USING POINTERS
  // public boolean isSubsequence(String s, String t) {
  // if (s.length() == 0) {
  // return true;
  // }

  // if (t.length() == 0) {
  // return false;
  // }

  // int sPointer = 0;
  // int tPointer = 0;

  // while (sPointer < s.length() && tPointer < t.length()) {
  // if (s.charAt(sPointer) == t.charAt(tPointer)) {
  // sPointer++;
  // if (sPointer == s.length()) {
  // return true;
  // }
  // }

  // tPointer++;
  // }

  // return false;
  // }
}