class Solution {
  public boolean isMatch(String s, String p) {
    if (p.equals(".*")) {
      return true;
    }

    if (p.length() == 0) {
      return s.length() == 0;
    }

    boolean firstCharMatches = s.length() > 0 && (p.charAt(0) == '.' || p.charAt(0) == s.charAt(0));

    // if p starts with anything followed by a * ,
    if (p.length() >= 2 && p.charAt(1) == '*') {
      // we can just ignore it (take the rest of the regex)
      return isMatch(s, p.substring(2)) ||
      // OR or count that many of the character if it matches
      // i.e. a* matches aaaaaaaaa
          (firstCharMatches && isMatch(s.substring(1), p));
    }

    return firstCharMatches && isMatch(s.substring(1), p.substring(1));
  }
}