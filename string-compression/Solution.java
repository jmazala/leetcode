class Solution {
  public static int compress(char[] chars) {
    if (chars == null || chars.length == 0) {
      return 0;
    }

    if (chars.length == 1) {
      return 1;
    }

    int read = 0;
    int write = 0;

    while (read < chars.length) {
      int count = 0;
      char current = chars[read];

      while (read < chars.length && chars[read] == current) {
        read++;
        count++;
      }

      chars[write] = current;
      write++;

      if (count == 1) {
        continue;
      }

      for (char digit : String.valueOf(count).toCharArray()) {
        chars[write++] = digit;
      }
    }

    return write;
  }

  public static void main(String[] args) {
    System.out.println(Solution.compress(new char[] { 'a', 'a', 'b', 'b', 'c', 'c', 'c' }));
  }
}