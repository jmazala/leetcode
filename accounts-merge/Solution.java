import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

class Solution {
  public List<List<String>> accountsMerge(List<List<String>> accounts) {
    Map<String, HashSet<String>> emailToEmailGraph = new HashMap<>();
    Map<String, String> emailsToName = new HashMap<>();

    for (List<String> account : accounts) {
      String name = account.get(0);
      String firstEmail = account.get(1);

      emailsToName.put(firstEmail, name);
      HashSet<String> firstSet = emailToEmailGraph.getOrDefault(firstEmail, new HashSet<>());

      for (int i = 2; i < account.size(); i++) {
        String secondEmail = account.get(i);
        HashSet<String> secondSet = emailToEmailGraph.getOrDefault(secondEmail, new HashSet<>());
        secondSet.add(firstEmail);
        secondSet.add(secondEmail);
        firstSet.add(secondEmail);
        emailToEmailGraph.put(secondEmail, secondSet);
      }

      emailToEmailGraph.put(firstEmail, firstSet);
    }

    // Iteratively DFS this graph with a stack
    Set<String> seen = new HashSet<>();
    List<List<String>> answer = new ArrayList<>();

    for (String email : emailsToName.keySet()) {
      if (seen.contains(email)) {
        continue;
      }

      seen.add(email);
      List<String> emails = new ArrayList<>();
      Stack<String> stack = new Stack<>();

      stack.add(email);
      while (!stack.isEmpty()) {
        String currentEmail = stack.pop();
        emails.add(currentEmail);

        for (String linkedEmail : emailToEmailGraph.get(currentEmail)) {
          if (seen.contains(linkedEmail)) {
            continue;
          }

          stack.push(linkedEmail);
          seen.add(linkedEmail);
        }
      }

      Collections.sort(emails);
      String name = emailsToName.get(email);
      emails.add(0, name);
      answer.add(emails);
    }

    return answer;
  }

  public static void main(String[] args) {
    String[][] accountsArr = new String[][] { { "John", "johnsmith@mail.com", "john00@mail.com" },
        { "John", "johnnybravo@mail.com" }, { "John", "johnsmith@mail.com", "john_newyork@mail.com" },
        { "Mary", "mary@mail.com" } };

    List<List<String>> accounts = new ArrayList<>();

    for (String[] account : accountsArr) {
      accounts.add(new ArrayList<>(Arrays.asList(account)));
    }

    Solution s = new Solution();
    // [["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
    // ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
    System.out.println(s.accountsMerge(accounts));
  }
}