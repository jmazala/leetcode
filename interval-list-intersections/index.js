/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number[][]}
 */
var intervalIntersection = function (A, B) {
    const intervals = [];

    let a = 0;
    let b = 0;

    while (a < A.length && b < B.length) {
        const [minA, maxA] = A[a];
        const [minB, maxB] = B[b];

        if (maxA >= minB && minA <= maxB) {
            intervals.push([Math.max(minA, minB), Math.min(maxA, maxB)]);
        }

        if (maxA < maxB) {
            a++;
        } else {
            b++;
        }

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
console.log(intervalIntersection([[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]]));