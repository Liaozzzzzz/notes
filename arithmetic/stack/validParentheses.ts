import  Stack from './stack';

const left = ["(", "[", "{"];
const right = [")", "]", "}"];

const isValid = (s) => {
  const stack = new Stack();

  for (let i = 0; i <s.length; i++) {
    const cur = s[i];
    if (stack.isEmpty()) {
      stack.push(cur)
    } else {
      const last = stack.peek();
      if (left.indexOf(last) === right.indexOf(cur) &&right.indexOf(cur) !== -1) {
        stack.pop();
      } else {
        stack.push(cur)
      }
    }
  }

  return stack.isEmpty();
}
console.log('111', isValid("{[]}"))
