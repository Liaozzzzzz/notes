/***
 * 队列
 */

class Queue{
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count += 1;
  }

  isEmpty() {
    return this.count - this.lowestCount;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    Reflect.deleteProperty(this.items, this.lowestCount);
    this.lowestCount += 1;
    return  result;
  }

  peek() {
    if (this.isEmpty()) {
      return  undefined;
    }

    return  this.items[this.lowestCount];
  }

  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.items = [];
    this.lowestCount = 0;
  }
}