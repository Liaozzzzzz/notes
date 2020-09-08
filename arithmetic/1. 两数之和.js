// 给定一个整数数组 nums和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
//
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
// 示例:
//   给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

// 1. 原始方法
// lastIndexOf导致时间复杂度变化, 效率不高
var twoSum = function(nums, target) {
  let first = 0;
  let last;
  for (first;first < nums.length - 1;) {
    const diff = target - nums[first];
    last = nums.lastIndexOf(diff);
    if (last !== first && last !== -1) {
      break;
    }
    first++
  }
  return [first, last]
};

// 2. 优化解
// Map结构也可以
var twoSum = function(nums, target) {
  let map = {};//key数字 value下标
  let loop = 0;//循环次数
  let dis;//目标与当前值的差
  while(loop < nums.length){
    dis = target - nums[loop];
    if(map[dis] != undefined){
      return [map[dis], loop];
    }
    map[nums[loop]] = loop;
    loop++;
  }
};