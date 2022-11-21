/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let left = 0;
  let right = 0;
  let res = 0;

  const set = new Set();
  while(right < s.length) {
    let ls = s[left];
    let rs = s[right];
    set.add(ls);
    if (set.has(rs)) {
      left = right -1;
      set.clear();
      while(left >= 1 && s[left] !== rs) {
        set.add(s[left]);
        left--;
      }
      left++;
      res = Math.max(res, right - left + 1);
    } else {
      res = Math.max(res, right - left + 1);
    }
    set.add(rs);
    right++;
  }
  return res;
};

console.log(lengthOfLongestSubstring("abcabcbb"))