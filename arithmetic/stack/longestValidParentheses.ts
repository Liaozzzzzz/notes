import  Stack from './stack';

const longestValidParentheses = (s) => {
  const stack = new Stack();

  for (let i = 0; i <s.length; i++) {
    const cur = s[i];
    if (stack.isEmpty()) {
      stack.push(i);
    } else {
      const lastIndex = stack.peek();
      const last = s[lastIndex];
      if (last === '(' && cur === ')') {
        stack.pop();
      } else {
        stack.push(i);
      }
    }
  }

  if (stack.isEmpty()) {
    return s.length;
  }

  let currIndex = stack.pop();
  let longest = s.length - currIndex - 1;

  while (!stack.isEmpty()) {
    const nextIndex = stack.pop();
    const len = currIndex - nextIndex - 1;
    longest = Math.max(len, longest);
    currIndex = nextIndex;
  }

  longest = Math.max(currIndex, longest);

  return longest;
}
const pre = Date.now();
console.log(longestValidParentheses("(()))())("));
console.log('112', Date.now() - pre);
