class Solution {

  // BITWISE WITH NEGATIVE
  public boolean isPowerOfTwo(int n) {
    if (n == 0) {
      return false;
    }

    long x = (long) n;

    return (x & (-x)) == x;
  }

  // BITWISE WITH -1
  // public boolean isPowerOfTwo(int n) {
  // if (n == 0) {
  // return false;
  // }

  // long x = (long) n;

  // return (x & (x - 1)) == 0;
  // }

  // LOG N SOLUTION
  // public boolean isPowerOfTwo(int n) {
  // // could convert it to binary, check all 0's except starting bit
  // // could keep multiplying by 2 until we reach or exceed n
  // // 4 bytes, 32 bits, so at most 32 checks. really fast
  // long i = 1;
  // while (i < n) {
  // i *= 2;
  // }

  // return i == n;
  // }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.isPowerOfTwo(1));
    System.out.println(s.isPowerOfTwo(16));
    System.out.println(s.isPowerOfTwo(218));
  }
}