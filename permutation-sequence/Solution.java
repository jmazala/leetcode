import java.util.ArrayList;
import java.util.List;

class Solution {
  String answer;
  int k;

  public String getPermutation(int n, int k) {
    answer = "";
    this.k = k;
    List<Integer> nums = new ArrayList<>();
    for (int i = 1; i <= n; i++) {
      nums.add(i);
    }

    helper(new ArrayList<>(), nums);
    return answer;
  }

  private void helper(List<Integer> taken, List<Integer> remaining) {
    if (this.k == 0) {
      return;
    }

    if (remaining.size() == 0) {
      this.k--;
      if (this.k == 0) {
        StringBuilder builder = new StringBuilder();

        for (int i : taken) {
          builder.append(i);
        }

        answer = builder.toString();
      }

      return;
    }

    for (int i = 0; i < remaining.size(); i++) {
      taken.add(remaining.get(i));
      List<Integer> nextRemaining = new ArrayList<>(remaining);
      nextRemaining.remove(i);
      helper(taken, nextRemaining);
      taken.remove(taken.size() - 1);
    }
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.getPermutation(3, 3)); // 213
  }
}