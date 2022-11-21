/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s.length < 2) {
    return s;
  }

  const dp = Array.from({length: s.length}, () => []);
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }

  let begin = 0;
  let maxLen = 1;
  for (let strLen = 2; strLen <= s.length; strLen++) {
    for(let left = 0; left <s.length; left++) {
      const right = strLen + left -1;
      if (right >= s.length) {
        break;
      }
      if (s[left] !== s[right]) {
        dp[left][right] = false;
      } else {
        if (right - left < 3) {
          dp[left][right] = true;
        } else  {
          dp[left][right] = dp[left+1][right-1];
        }
      }
      if (dp[left][right] && strLen > maxLen) {
        maxLen = strLen;
        begin = left;
      }
    }
  }
  return  s.substr(begin, maxLen);
};

console.log('longestPalindrome', longestPalindrome('bb'))