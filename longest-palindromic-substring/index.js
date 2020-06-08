// (i,j)=(P(i+1,j−1) and S i==S j

var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }

  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    //a palindrome at position i can be made with s[i] as the center 
    const length1 = expandAroundCenter(i, i);
    //or s[i] + s[i+1] as the center
    const length2 = expandAroundCenter(i, i + 1);
    const longest = Math.max(length1, length2);

    if (longest > (end - start)) {
      start = i - Math.floor((longest - 1) / 2);
      end = i + Math.floor(longest / 2);
    }
  }

  return s.slice(start, end + 1);

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }

    return right - left - 1;
  }
};