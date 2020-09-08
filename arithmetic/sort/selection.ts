import {bubbleSort} from "./bubble";

/**
 * 选择排序
 * @param arr
 * 选定第一个索引位置，然后和后面元素依次比较
 * 如果后面的队员, 小于第一个索引位置的队员, 则交换位置
 * 经过一轮的比较后, 可以确定第一个位置是最小的
 * 然后使用同样的方法把剩下的元素逐个比较即可
 * 可以看出选择排序，第一轮会选出最小值，第二轮会选出第二小的值，直到最后
 */

export const selectionSort = (arr = []) => {
  for (let i = 0; i <= arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j <= arr.length - 1; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

const testArr = [1, 4, 2, 5, 6, 234, 21423, 52, 12, 1, 4, 2];

console.log(selectionSort(testArr));