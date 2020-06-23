/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
const minWindow = function (S, T) {
  const dp = Array(T.length + 1)
    .fill()
    .map(() => Array(S.length + 1).fill(0));
  const answer = [Infinity, -Infinity];

  for (let i = 1; i <= T.length; i++) {
    for (let j = 1; j <= S.length; j++) {
      if (T[i - 1] === S[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        answer[0] = Math.min(answer[0], j - 1);
        answer[1] = Math.max(answer[1], dp[i][j]);

        if (answer[1] - answer[0] === T.length - 1) {
          return S.substring(answer[0], answer[0] + T.length + 1);
        }
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return '';
};

console.log(minWindow('abcdebdde', 'bde'));
