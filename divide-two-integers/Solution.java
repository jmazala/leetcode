class Solution {

  private static int HALF_INT_MIN = -1073741824;

  // USING EXPONENTIAL SEARCH
  public static int divide(int dividend, int divisor) {
    if (dividend == Integer.MIN_VALUE && divisor == -1) {
      return Integer.MAX_VALUE;
    }

    // need to convert to negatives to have a larger problem space
    int negatives = 2;

    if (dividend > 0) {
      negatives--;
      dividend = -dividend;
    }

    if (divisor > 0) {
      negatives--;
      divisor = -divisor;
    }

    int quotient = 0;

    // try to fit as many copies of divisor into current dividend
    while (divisor >= dividend) {
      int powerOfTwo = -1;
      int value = divisor;

      // keep doubling until we're too big
      // reduces time to O(log n)
      while (value >= HALF_INT_MIN && // for overflow
          value + value >= dividend) {
        value += value;
        powerOfTwo += powerOfTwo;
      }

      // in this run we got powerOfTwo times
      quotient += powerOfTwo;
      dividend -= value; // so we can restart our exponential search
    }

    if (negatives != 1) {
      quotient = -quotient;
    }

    return quotient;
  }

  // USING BRUTE FORCE
  // public static int divide(int dividend, int divisor) {
  // if (dividend == Integer.MIN_VALUE && divisor == -1) {
  // return Integer.MAX_VALUE;
  // }

  // boolean isNegative = dividend > 0 && divisor < 0 || dividend < 0 && divisor >
  // 0;
  // if (dividend < 0) {
  // dividend = -dividend;
  // }

  // if (divisor < 0) {
  // divisor = -divisor;
  // }

  // if (divisor > dividend) {
  // return 0;
  // }

  // if (divisor == dividend) {
  // return isNegative ? -1 : 1;
  // }

  // int count = 0;
  // while (dividend >= divisor) {
  // dividend -= divisor;
  // count++;
  // }

  // return isNegative ? -1 * count : count;
  // }

  public static void main(String[] args) {
    System.out.println(divide(5, 5)); // 1
    System.out.println(divide(694, 53)); // 13
    System.out.println(divide(-694, 53)); // -13
    System.out.println(divide(-2147483648, -1)); // 2147483648
  }
}