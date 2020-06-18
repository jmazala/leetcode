// WITH BINARY SEARCH
const hIndex = function (citations) {
  const n = citations.length;
  let low = 0;
  let high = n - 1;

  while (low <= high) {
    const i = Math.floor(low + (high - low) / 2);

    // consider an article who's citation number c is index at i
    const c = citations[i];

    // with the current article, there are n - i articles cited at least c times
    // the number of articles whose citation number is higher than c would be n - i - 1.
    const numArticlesWithAtLeastCCitations = n - i;

    if (c === n - i) {
      return n - i;
    }

    // find the first article at i where c >= (n-i)
    if (c > numArticlesWithAtLeastCCitations) {
      high = i - 1;
    } else {
      low = i + 1;
    }
  }

  /*
   * As we know that all the articles following i would be cited at least c times,
   * so in total there are n - i articles that are cited at least c times.
   * As a result, according to the definition, the H-Index of the author should be n - i.
   */

  return n - low;
};

// LINEAR SOLUTION
// const hIndex = function (citations) {
//   const n = citations.length;
//   let i = n - 1;

//   while (i >= 0) {
//     if (citations[i] < n - i) {
//       break;
//     }

//     i--;
//   }

//   return n - i - 1;
// };

console.log(hIndex([100])); // 1
console.log(hIndex([11, 15])); // 2
console.log(hIndex([50, 54, 57])); // 3
console.log(hIndex([0, 1, 3, 4, 5, 8, 10, 13])); // 4
