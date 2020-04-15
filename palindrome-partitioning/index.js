/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  if (s.length === 0) {
    return [];
  }

  if (s.length === 1) {
    return [[s]];
  }

  let answer = [];
  if (isPalindrome(s)) {
    answer.push([s]); // don't need to partition at index 0
  }

  //try to partition at each index
  for (let i = 1; i < s.length; i++) {
    const prefix = s.slice(0, i);
    let suffix = s.slice(i);
    //if our prefix is a partition we need to recursively call partition with the rest of the string
    if (isPalindrome(prefix)) {
      const suffixAnswer = partition(suffix);
      if (suffixAnswer.length > 0) {
        suffixAnswer.forEach(item => {
          let subAnswer = [prefix];
          subAnswer = subAnswer.concat(item);
          answer.push(subAnswer);
        })
      }
    }
  }

  return answer;
};

//add that letter to prefix
//take that letter by itself
//add it to suffix

function isPalindrome(s) {
  if (s.length === 0) {
    return true;
  }

  let start = 0;
  let end = s.length - 1;
  while (start <= end) {
    if (s[start] !== s[end]) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}