// https://leetcode.com/problems/integer-to-roman

public class IntegerToRoman {
  /*
   * METHOD 1 - Build the roman numeral string through repeated subtraction
   */
  public String intToRoman(int num) {
    StringBuilder builder = new StringBuilder();

    while (num > 0) {
      if (num >= 1000) {
        builder.append("M");
        num -= 1000;
      } else if (num >= 900) {
        builder.append("CM");
        num -= 900;
      } else if (num >= 500) {
        builder.append("D");
        num -= 500;
      } else if (num >= 400) {
        builder.append("CD");
        num -= 400;
      } else if (num >= 100) {
        builder.append("C");
        num -= 100;
      } else if (num >= 90) {
        builder.append("XC");
        num -= 90;
      } else if (num >= 50) {
        builder.append("L");
        num -= 50;
      } else if (num >= 40) {
        builder.append("XL");
        num -= 40;
      } else if (num >= 10) {
        builder.append("X");
        num -= 10;
      } else if (num >= 9) {
        builder.append("IX");
        num -= 9;
      } else if (num >= 5) {
        builder.append("V");
        num -= 5;
      } else if (num >= 4) {
        builder.append("IV");
        num -= 4;
      } else {
        builder.append("I");
        num -= 1;
      }
    }

    return builder.toString();
  }

  /*
   * METHOD 2: Use ones / tens / hundreds / thousands digit placeholders
   */
  public String intToRoman2(int num) {
    String[] ones = new String[] { "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" };
    String[] tens = new String[] { "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC" };
    String[] hundreds = new String[] { "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM" };
    String[] thousands = new String[] { "", "M", "MM", "MMM" };

    return thousands[num / 1000] + hundreds[(num % 1000) / 100] + tens[(num % 100) / 10] + ones[num % 10];
  }
}
