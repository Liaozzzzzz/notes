// 根据Promises/A+规范模拟Promise类

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(promise, results, resolve, reject) {
  if (promise === results) {
    reject(new TypeError('Chaining cycle'));
  }
  if (results && typeof results === 'object' || typeof results === 'function') {
    let resolved = false;
    try {
      const then = results.then;
      if (typeof then === 'function') {
        then.call(results, (f) => {
          if (!resolved) {
            resolved = true;
            resolvePromise(promise, f, resolve, reject);
          }
        }, (r) => {
          if (!resolved) {
            resolved = true;
            reject(r);
          }
        })
      } else {
        if (!resolved) {
          resolved = true;
          resolve(results);
        }
      }
    } catch (e) {
      if (!resolved) {
        resolved = true;
        reject(e);
      }
    }
  } else {
    resolve(results);
  }
}

function APromise(executor) {
  const self = this;
  self.status = PENDING;
  self.value = undefined;
  self.reason = undefined;
  self.fulfilledCallbacks = [];
  self.rejectedCallbacks = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.value = value;
      if (value instanceof APromise && value.status === PENDING) {
        resolvePromise(self, value, resolve, reject)
      } else {
        self.status = FULFILLED;
        self.fulfilledCallbacks.forEach(f => f());
      }
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.rejectedCallbacks.forEach(f => f());
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

APromise.prototype.then = function (onFulfilled, onRejected) {
  const safeOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  const safeOnRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason;
  };

  const self = this;
  const resultPromise = new APromise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          const result = safeOnFulfilled(self.value);
          resolvePromise(resultPromise, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    }

    if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          const result = safeOnRejected(self.reason);
          resolvePromise(resultPromise, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    }

    if (self.status === PENDING) {
      self.fulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const result = safeOnFulfilled(self.value);
            resolvePromise(resultPromise, result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      });

      self.rejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const result = safeOnRejected(self.reason);
            resolvePromise(resultPromise, result, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      })
    }
  });
  return resultPromise;
};

APromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};


APromise.prototype.finally = function (callback) {
  return this.then((value) => {
    return APromise.resolve(callback()).then(() => {
      return value;
    });
  }, (err) => {
    return APromise.resolve(callback()).then(() => {
      throw err;
    });
  });
};

APromise.resolve = function (param) {
  if (param instanceof APromise) {
    return param;
  }

  return new APromise((resolve, reject) => {
    resolvePromise(this, param, resolve, reject);
  });
};

APromise.reject = function (reason) {
  return new APromise((resolve, reject) => {
    reject(reason);
  });
};


const adapter = {
  deferred: () => {
    let resolve;
    let reject;
    const promise = new APromise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return {
      promise,
      reject,
      resolve,
    };
  },
  rejected: (reason) => APromise.reject(reason),
  resolved: (value) => APromise.resolve(value),
};

// const adapter = {
//   deferred: () => {
//     let resolve;
//     let reject;
//     const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
//     return {
//       promise,
//       reject,
//       resolve,
//     };
//   },
//   rejected: (reason) => Promise.reject(reason),
//   resolved: (value) => Promise.resolve(value),
// };

module.exports = adapter;