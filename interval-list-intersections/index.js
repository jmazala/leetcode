/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
const intervalIntersection = function (A, B) {
  const intervals = [];

  // TODO:  should sort A and B by interval start (index 0) ?

  let a = 0;
  let b = 0;

  while (a < A.length && b < B.length) {
    const [minA, maxA] = A[a];
    const [minB, maxB] = B[b];

    // if they intersect, mark the interval
    // helps to draw a picture here
    if (maxA >= minB && minA <= maxB) {
      intervals.push([Math.max(minA, minB), Math.min(maxA, maxB)]);
    }

    // move on based on which interval extends further
    if (maxA < maxB) {
      a++;
    } else {
      b++;
    }

    // EVERY COMPARISON HERE.  TRIMMED ABOVE
    //         //they don't intersect at all, increment a or b
    //         if (minB > maxA) {
    //             a++;
    //             continue;
    //         }

    //         if (minA > maxB) {
    //             b++;
    //             continue;
    //         }

    //         if (minA <= minB && maxA <= maxB) {
    //             intervals.push([minB, maxA]);
    //             a++;
    //             continue;
    //         }

    //         if (minA <= minB && maxA >= maxB) {
    //             intervals.push([minB, maxB]);
    //             b++;
    //             continue;
    //         }

    //         if (minA >= minB && maxA >= maxB) {
    //             intervals.push([minA, maxB]);
    //             b++;
    //             continue;
    //         }

    //         if (minA >= minB && maxA <= maxB) {
    //             intervals.push([minA, maxA]);
    //             a++;
    //             continue;
    //         }
  }

  return intervals;
};

// [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
console.log(
  intervalIntersection(
    [
      [0, 2],
      [5, 10],
      [13, 23],
      [24, 25],
    ],
    [
      [1, 5],
      [8, 12],
      [15, 24],
      [25, 26],
    ]
  )
);
