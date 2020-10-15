class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
}

const BalanceFactor = {
  UNBALANCE_RIGHT: 1,
  SLIGHTLY_UNBALANCE_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCE_LEFT: 4,
  UNBALANCE_LEFT: 5,
}

const defaultCompare = (a, b) => a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;

module.exports = {
  defaultCompare,
  Node,
  Compare,
  BalanceFactor
}