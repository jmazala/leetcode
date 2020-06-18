/**
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = function (citations) {
  citations.sort((a, b) => a - b);

  const n = citations.length;
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    // this is valid, but try to find a higher index
    if (citations[mid] < n - mid) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return n - low;
};

console.log(hIndex([100])); // 1
console.log(hIndex([11, 15])); // 2
console.log(hIndex([50, 54, 57])); // 3
console.log(hIndex([0, 1, 3, 4, 5, 8, 10, 13])); // 4
