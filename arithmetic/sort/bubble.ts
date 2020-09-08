/**
 * 冒泡排序
 * @param arr
 * 对未排序的各元素从头到尾依次比较相邻的两个元素大小关系
 * 如果左边的队员高, 则两队员交换位置
 * 向右移动一个位置, 比较下面两个队员
 * 当走到最右端时, 最高的队员一定被放在了最右边
 * 按照这个思路, 从最左端重新开始, 这次走到倒数第二个位置的队员即可.
 * 依次类推, 就可以将数据排序完成
 */

export const bubbleSort = (arr = []) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 1; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

const testArr = [1, 4, 2, 5, 6, 234, 21423, 52, 12, 1, 4, 2];

console.log(bubbleSort(testArr));