// 背包问题

function knapSack(capacity, weights, values) {
  const {length: n} = values;
  const ks = Array.from({length:n}, () => []);

  for (let i = 0; i <= length; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        // 留空值
        ks[i][w] = 0;
      } else if (weights [i - 1] <= w) {
        // 改质量可用时
        // w - weights[i - 1]表示当前质量未达到目标质量时, 取之前计算的质量对应的最大价值
        const a = values[i - 1] + ks[i - 1][w - weights[i - 1]];
        const b = ks[i - 1][w];
        ks[i][w] = Math.max(a, b)
      } else {
        ks[i][w] = ks[i-1][w];
      }
    }
  }

  return ks[n][capacity]
}
