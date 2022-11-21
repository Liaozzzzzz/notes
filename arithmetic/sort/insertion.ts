
/**
 * 插入排序
 * @param arr
 * 从第一个元素开始，该元素可以认为已经被排序
 * 取出下一个元素 temp，在已经排序的元素序列中从后向前扫描
 * 如果该元素（已排序的元素）大于新元素 temp，将该元素移到下一位置
 * 重复上一个步骤，直到找到已排序的元素小于或者等于新元素 temp 的位置
 * 将新元素插入到该位置后, 重复上面的步骤
 */

const insertionSort = (arr = []) => {
  for (let i = 1; i <= arr.length - 1; i++) {
    let j = i;
    let temp = arr[i];
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    [temp, arr[j]] = [arr[j], temp];
  }
  return arr;
}

const testArr = [1, 4, 2, 5, 6, 234, 21423, 52, 12, 1, 4, 2];

console.log(insertionSort(testArr));