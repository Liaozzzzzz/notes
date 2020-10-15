const BinarySearchTree = require('./binary-search-tree');
const {defaultCompare, BalanceFactor, Compare, Node} = require('./utils');


class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  getNodeHeight(node) {
    if (node === null) {
      return -1;
    }

    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);

    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCE_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCE_LEFT;
      case 2:
        return BalanceFactor.UNBALANCE_LEFT;
      default:
        return BalanceFactor.BALANCED;

    }
  }

  // LL: 向右的单旋转
  rotationLL(node) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  // RR: 向左的单旋转
  rotationRR(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }

  // LR: 向右的双旋转
  rotationLR(node) {
    node.left = this.rotationLL(node.left);
    return this.rotationRR(node)
  }

  //RL: 向左的双旋转
  rotationRl(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  inset(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    if (node === null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }

    // 判断是否需要平衡
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.SLIGHTLY_UNBALANCE_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCE_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        return this.rotationRl(node);
      }
    }

    return node;
  }

  removeNode(node, key) {
    node = super.removeNode(node, key);
    if (node === null) {
      return node;
    }

    // 判断是否需要平衡
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCE_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCE_LEFT) {
        return this.rotationLL(node);
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT) {
        return this.rotationLR(node.left);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCE_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT) {
        return this.rotationRR(node);
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCE_LEFT) {
        return this.rotationLR(node.right);
      }
    }
  }
}

module.exports = AVLTree;