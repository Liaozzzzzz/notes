// const BinarySearchTree = require('./binary-search-tree');
//
// const tree = new BinarySearchTree();
//
// tree.insert(11);
// tree.insert(10);
// tree.insert(12);
//
// console.log(tree)


const request = (url) => {
  return new Promise((r) => {
    const time = Math.random() * 1000;
    console.log('url', url, time);
    setTimeout(() => r(url), time);
  });
}


const multiRequest = (urls, maxNum) => {

  let i = 0;
  let resolve;

  const ret = [];
  const promise = new Promise(r => resolve = r);

  const addTask = () => {
    if (i >= urls.length) {
      return resolve();
    }

    const task = request(urls[i++]).finally(() => {
      addTask();
    });
    ret.push(task);
  }

  while (i < maxNum && i<urls.length) {
    addTask();
  }

  return promise.then(() => Promise.all(ret));
}

const urls = ['-----1', '-----2', '-----3', '-----4', '-----5', '-----6'];

// multiRequest(urls, 10).then(res => {
//   console.log('res', res);
// })

function add() {
  let args = [...arguments];

  let fn = function () {
    let fnArgs = [...arguments];
    return add.apply(null, args.concat(fnArgs));
  }
  fn.toString = function () {
    return args.reduce((a, b) => a + b)
  }
  return fn;
}

console.log(add(1,2,3)(3)(2).toString());

function curry (fn) {
  let args = [].slice.call(this,1)
  return function currying () {
    args = args.concat(Array.from(arguments))
    const len = args.length
    return len >= fn.length ? fn.apply(this, args) : currying
  }
}
function add (...args) {
  return args.reduce((a,b) => a + b, 0)
}
var add1 = curry(add);
console.log(add1(1, 2)(3))