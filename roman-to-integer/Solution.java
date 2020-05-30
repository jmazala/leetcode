class Solution {
  public int romanToInt(String s) {
    int answer = 0;
    int N = s.length();
    char next = '_';

    for (int i = 0; i < N; i++) {
      char c = s.charAt(i);

      switch (c) {
        case 'I':
          // last char, no lookahead
          if (i == N - 1) {
            answer++;
            continue;
          }

          next = s.charAt(i + 1);
          if (next == 'V') {
            answer += 4;
            i++;
          } else if (next == 'X') {
            answer += 9;
            i++;
          } else {
            answer++;
          }
          break;

        case 'V':
          answer += 5;
          break;

        case 'X':
          if (i == N - 1) {
            answer += 10;
            continue;
          }

          next = s.charAt(i + 1);
          if (next == 'L') {
            answer += 40;
            i++;
          } else if (next == 'C') {
            answer += 90;
            i++;
          } else {
            answer += 10;
          }

          break;
        case 'L':
          answer += 50;
          break;
        case 'C':
          if (i == N - 1) {
            answer += 100;
            continue;
          }

          next = s.charAt(i + 1);
          if (next == 'D') {
            answer += 400;
            i++;
          } else if (next == 'M') {
            answer += 900;
            i++;
          } else {
            answer += 100;
          }

          break;
        case 'D':
          answer += 500;
          break;
        case 'M':
          answer += 1000;
          break;
      }
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.romanToInt("")); // 0
    System.out.println(s.romanToInt("III")); // 3
    System.out.println(s.romanToInt("IV")); // 4
    System.out.println(s.romanToInt("IX")); // 9
    System.out.println(s.romanToInt("LVIII")); // 58
    System.out.println(s.romanToInt("MCMXCIV")); // 1994
  }
}