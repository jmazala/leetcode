import java.util.ArrayList;
import java.util.List;

class Solution {

  private static int HALF_INT_MIN = -1073741824;

  // USING EXPONENTIAL SEARCH + LINKED LIST
  public static int divide(int a, int b) {
    if (a == Integer.MIN_VALUE && b == -1) {
      return Integer.MAX_VALUE;
    }

    // need to convert to negatives to have a larger problem space
    int negatives = 2;

    if (a > 0) {
      negatives--;
      a = -a;
    }

    if (b > 0) {
      negatives--;
      b = -b;
    }

    List<Integer> doubles = new ArrayList<>();
    List<Integer> powersOfTwo = new ArrayList<>();
    int powerOfTwo = -1;

    // remember - we're using negatives, that's why we do b >= a
    while (b >= a) {
      powersOfTwo.add(powerOfTwo);
      doubles.add(b);
      // Prevent needless overflows from occurring...
      if (b < HALF_INT_MIN) {
        break;
      }
      powerOfTwo += powerOfTwo;
      b += b;
    }

    int quotient = 0;
    for (int i = doubles.size() - 1; i >= 0; i--) {
      if (doubles.get(i) >= a) {
        quotient += powersOfTwo.get(i);
        a -= doubles.get(i);
      }
    }

    if (negatives != 1) {
      quotient = -quotient;
    }

    return quotient;
  }

  // USING EXPONENTIAL SEARCH
  // public static int divide(int dividend, int divisor) {
  // if (dividend == Integer.MIN_VALUE && divisor == -1) {
  // return Integer.MAX_VALUE;
  // }

  // // need to convert to negatives to have a larger problem space
  // int negatives = 2;

  // if (dividend > 0) {
  // negatives--;
  // dividend = -dividend;
  // }

  // if (divisor > 0) {
  // negatives--;
  // divisor = -divisor;
  // }

  // int quotient = 0;

  // // try to fit as many copies of divisor into current dividend
  // while (divisor >= dividend) {
  // int powerOfTwo = -1;
  // int value = divisor;

  // // keep doubling until we're too big
  // // reduces time to O(log n)
  // while (value >= HALF_INT_MIN && // for overflow
  // value + value >= dividend) {
  // value += value;
  // powerOfTwo += powerOfTwo;
  // }

  // // in this run we got powerOfTwo times
  // quotient += powerOfTwo;
  // dividend -= value; // so we can restart our exponential search
  // }

  // if (negatives != 1) {
  // quotient = -quotient;
  // }

  // return quotient;
  // }

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
    // System.out.println(divide(5, 5)); // 1
    System.out.println(divide(694, 53)); // 13
    // System.out.println(divide(-694, 53)); // -13
    // System.out.println(divide(-2147483648, -1)); // 2147483648
  }
}