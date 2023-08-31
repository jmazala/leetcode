// (i,j)=(P(i+1,j−1) and S i==S j

DYNAMIC PROGRAMMING
var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }

  //make DP array
  const dp = Array(s.length).fill().map(i => Array(s.length).fill(false));

  let start = 0;
  let end = 0;

  //build up 1 letter and 2 letter palindromes
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;

    if (i === s.length - 1) {
      continue;
    }

    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      end = i + 1;
    }
  }

  //3 letter palindromes and on
  for (let length = 3; length <= s.length; length++) {
    for (let i = 0; i < s.length; i++) {
      const j = i + length - 1;
      if (j >= s.length) {
        break;
      }

      if (dp[i + 1][j - 1] && s[i] === s[j]) {
        dp[i][j] = true;

        if ((j - i) > (end - start)) {
          start = i;
          end = j;
        }
      }
    }
  }

  return s.slice(start, end + 1);
}

// EXPAND AROUND CENTER
const longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }

  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    // a palindrome at position i can be made with s[i] as the center
    const [left1, right1] = expandAroundCenter(i, i);
    // or s[i] + s[i+1] as the center
    const [left2, right2] = expandAroundCenter(i, i + 1);

    if (right1 - left1 > end - start) {
      end = right1;
      start = left1;
    }

    if (right2 - left2 > end - start) {
      end = right2;
      start = left2;
    }
  }

  return s.slice(start, end + 1);

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }

    return [left + 1, right - 1];
  }
};

console.log(longestPalindrome('')); //
console.log(longestPalindrome('a')); // a
console.log(longestPalindrome('bb')); // bb
console.log(longestPalindrome('abb')); // bb
console.log(longestPalindrome('bba')); // bb
console.log(longestPalindrome('jabacddcf')); // cddc
console.log(longestPalindrome('jabaeeeeecddc')); // eeeee
console.log(longestPalindrome('jabafcddcf')); // fcddcf
console.log(longestPalindrome('jabaeeeeefcddcf')); // fcddcf
console.log(longestPalindrome('gggggggjabaeeeeefcddcf')); // ggggggg
