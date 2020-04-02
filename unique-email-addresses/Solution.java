import java.util.HashSet;
import java.util.Set;

class Solution {
  // USING REGEX REPLACE
  // public int numUniqueEmails(String[] emails) {
  // Set<String> set = new HashSet<>();

  // for (String email : emails) {
  // String[] split = email.split("@");
  // String local = split[0];
  // String domain = split[1];

  // local = local.replaceAll("\\.", "").replaceAll("\\+\\S+$", "");
  // set.add(local + "@" + domain);
  // }

  // return set.size();
  // }

  // USING STRINGBUILDER
  public int numUniqueEmails(String[] emails) {
    Set<String> set = new HashSet<>();

    for (String email : emails) {
      StringBuilder builder = new StringBuilder();
      int domainIndex = 0;
      boolean afterPlus = false;
      for (char c : email.toCharArray()) {
        if (c == '@') {
          break;
        }
        if (afterPlus || c == '.') {
          domainIndex++;
          continue;
        }
        if (c == '+') {
          afterPlus = true;
          domainIndex++;
          continue;
        }

        builder.append(c);
        domainIndex++;
      }

      builder.append(email.substring(domainIndex, email.length()));
      set.add(builder.toString());
    }

    return set.size();
  }

  public static void main(String[] args) {
    String[] input = { "test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com",
        "testemail+david@lee.tcode.com" };
    Solution s = new Solution();
    System.out.println(s.numUniqueEmails(input));
  }
}