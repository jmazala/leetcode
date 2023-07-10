// https://leetcode.com/problems/zigzag-conversion

import java.util.ArrayList;
import java.util.List;

public class ZigzagConversion {
  /*
   * TIME: O (n + rows)
   * O(rows) to build arrayList
   * O(n) for building zig zag
   * O(n) for building strings
   * 
   * SPACE: O(n)
   * O(n) for arraylist
   * O(n) for output string
   */
  public String convert(String s, int numRows) {
    if (numRows == 0) {
      return "";
    }

    if (numRows == 1) {
      return s;
    }

    /*
     * PAYPALISHIRING
     * [P, A, H, N]
     * [A, P, L, S, I, I, G]
     * [Y, I, R]
     */

    List<List<Character>> zigzagPattern = new ArrayList<>();
    for (int i = 0; i < numRows; i++) {
      zigzagPattern.add(new ArrayList<Character>());
    }

    int row = 0;
    boolean goingDown = true;
    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      zigzagPattern.get(row).add(c);

      if (goingDown) {
        if (row == numRows - 1) {
          goingDown = false;
          row--;
        } else {
          row++;
        }
      } else {
        if (row == 0) {
          goingDown = true;
          row++;
        } else {
          row--;
        }
      }

    }

    StringBuilder builder = new StringBuilder();
    for (List<Character> l : zigzagPattern) {
      for (Character c : l) {
        builder.append(c);
      }
    }

    return builder.toString();
  }
}
