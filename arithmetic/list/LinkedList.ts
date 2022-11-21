import {defaultEquals} from "./utils";
import {Node} from "./nodes";

export default class linkedList {
  count;

  head;

  equalsFn;

  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  push(element) {
    const node = new Node(element);
    let current = this.head;
    if (!current) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  removeAt(index) {
    if (index >= 0 &&)
  }
}