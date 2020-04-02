import java.util.Arrays;
import java.util.PriorityQueue;

//given an array of meeting time intervals consisting of start and end times [[s, e]]
//find the minimum number of conference rooms required

class Solution {
  public int minMeetingRooms(Interval[] intervals) {
    if (intervals == null || intervals.length == 0) {
      return 0;
    }

    // sort of unnecessary optimization :)
    if (intervals.length == 1) {
      return 1;
    }

    // process in chronological order by start time
    Arrays.sort(intervals, (Interval a, Interval b) -> {
      return a.start - b.start;
    });

    // use a min heap to keep track of what meeting is ending soonest
    PriorityQueue<Interval> minHeap = new PriorityQueue<>((Interval a, Interval b) -> {
      return a.end - b.end;
    });

    minHeap.add(intervals[0]);

    for (int i = 1; i < intervals.length; i++) {
      Interval current = intervals[i];

      Interval earliest = minHeap.remove();
      if (current.start >= earliest.end) {
        earliest.end = current.end;
      } else {
        minHeap.add(current);
      }

      minHeap.add(earliest);
    }

    return minHeap.size();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    Interval[] intervals = { new Interval(0, 30), new Interval(5, 10), new Interval(15, 20) };
    System.out.println(s.minMeetingRooms(intervals));
  }
}