/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
  public int firstBadVersion(int n) {
    int low = 1; // 1
    int high = n; // 5

    while (low < high) {
      int mid = low + (high - low) / 2; // 3

      // if mid is not a bad version, first bad version has to be to the right
      if (!isBadVersion(mid)) {
        low = mid + 1;
      } else {
        high = mid; // mid could be first bad version
      }
    }

    return low;
  }
}