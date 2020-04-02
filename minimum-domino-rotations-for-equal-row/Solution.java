class Solution {
  public int minDominoRotations(int[] A, int[] B) {
    // 4 different possibilities:
    // make A match B[0]
    // make A match A[0]
    // make B match A[0]
    // make B match B[0]

    int minSwaps = Math.min(numSwaps(A[0], A, B), numSwaps(B[0], A, B));
    minSwaps = Math.min(minSwaps, numSwaps(A[0], B, A));
    minSwaps = Math.min(minSwaps, numSwaps(B[0], B, A));

    return minSwaps == (A.length + 1) ? -1 : minSwaps;
  }

  public int numSwaps(int desired, int[] A, int[] B) {
    int steps = 0;

    for (int i = 0; i < A.length; i++) {
      if (A[i] == desired) {
        continue;
      }
      
      if (B[i] != desired) {
        return A.length + 1;
      }
      steps++;
    }

    return steps;
  }
}