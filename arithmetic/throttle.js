const throttle = (fn, wait) => {
  let isRunning = true;

  return function (...args) {
    if (isRunning) {
      isRunning = false;
      setTimeout(() => {
        fn.apply(this, args);
        isRunning = true;
      })
    }
  }
}

Function.prototype.myCall = (self, ...args) => {
  const context = self || window;
  context.fn = this;
  const results = context.fn(...args);
  Reflect.deleteProperty(context, 'fn');
  return results;
}

Function.prototype.myApply = (self, args) => {
  const context = self || window;
  context.fn = this;
  const results = context.fn(...args);
  Reflect.deleteProperty(context, 'fn');
  return  results;
}

Function.prototype.myBind = (self, ...args) => {
  const context = this;
  return function (...realArgs) {
    return context.apply(self, [...args, ...realArgs]);
  }
}

function _new(obj, ...rest) {
  const newObj = Object.create(obj.prototype);
  const results = obj.apply(newObj, rest);
  return  results instanceof Object ? results : newObj;
}