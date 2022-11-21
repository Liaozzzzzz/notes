// 最小硬币找零问题

function minCoinChange(coins, amount) {
  const cache = {};
  const makeChange = (value) => {
    if (!value) {
      return []
    }

    if (cache[value]) {
      return cache[value]
    }

    let min = [];
    let newMin = [];
    let newAmount = 0;

    for (let i = 0; i < coins.length - 1; i++) {
      const coin = coins[i];
      newAmount = value - coin;
      if (newAmount >= 0) {
        newMin = makeChange(newAmount);
      }
      if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
        min = [coin].concat(newMin);
      }
    }
    cache[value] = min;
    console.log(cache)
    return min;
  }
  return makeChange(amount);
}

console.log(minCoinChange([1,5,10,25], 10));