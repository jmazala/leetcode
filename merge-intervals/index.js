/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length < 2) {
    return intervals;
  }

  const answer = [];

  intervals.sort((a, b) => a[0] - b[0]);

  let currentInterval = intervals.shift();
  while (intervals.length) {
    const nextInterval = intervals.shift();

    //starts in the middle
    if (nextInterval[0] <= currentInterval[1]) {
      currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
    } else {
      answer.push(currentInterval);
      currentInterval = nextInterval;
    }
  }

  answer.push(currentInterval);
  return answer;
};