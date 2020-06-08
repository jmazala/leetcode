/**
 * @param {number} N
 * @return {number}
 */
const countArrangement = function (N) {
  const visited = Array(N + 1);
  let answer = 0;
  permutations(1);
  // permutations([], _.range(1, N + 1));
  return answer;

  // using an index
  function permutations(index) {
    if (index > N) {
      answer++;
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (!visited[i] && (index % i === 0 || i % index === 0)) {
        visited[i] = true;
        permutations(index + 1);
        visited[i] = false;
      }
    }
  }

  // coping arrays
  // function permutations(used, remaining) {
  //   const memoKey = used.join(',');
  //   if (memoKey.length > 0 && memo[memoKey] === undefined) {
  //     memo[memoKey] = isBeautifulArrangement(used);
  //   }

  //   if (memoKey.length > 0 && !memo[memoKey]) {
  //     return;
  //   }

  //   if (remaining.length === 0) {
  //     answer++;
  //   }

  //   for (let i = 0; i < remaining.length; i++) {
  //     //try take the number in this slot
  //     permutations(used.concat(remaining[i]), remaining.slice(0, i).concat(remaining.slice(i + 1)));
  //   }
  // }
};

// we only need to check the last char
// function isBeautifulArrangement(arr) {
//   const i = arr.length - 1;
//   return (arr[i] % (i+1) === 0) || ((i+1) % arr[i] === 0);
// }

console.log(countArrangement(0)); // 1
console.log(countArrangement(1)); // 1
console.log(countArrangement(2)); // 2
console.log(countArrangement(3)); // 3
console.log(countArrangement(4)); // 8
console.log(countArrangement(10)); // 700
console.log(countArrangement(12)); // 4010
console.log(countArrangement(13)); // 4237
console.log(countArrangement(14)); // 10680
console.log(countArrangement(15)); // 24679
