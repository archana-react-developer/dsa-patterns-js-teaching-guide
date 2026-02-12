# 01 Prefix Sum
## Concept
The Prefix Sum pattern is used to efficiently compute range sums in an array.
Instead of calculating the sum of a subarray repeatedly (which takes O(n) each time),
we precompute cumulative sums once in O(n), allowing future range queries in O(1).

Core idea:
We build a new array where:
prefix[i] = sum of elements from index 0 to i-1
Then any range sum from L to R can be calculated as:
rangeSum(L..R) = prefix[R + 1] - prefix[L]
This transforms repeated computation into a constant-time lookup.
Time Complexity:
Build prefix: O(n)
Each range query: O(1)

## Real-World Analogy
💳 Banking App
Imagine you have daily expenses:
[100, 200, 50, 300]

If a user asks:
"How much did I spend from Day 2 to Day 4?"
Without prefix sums:
You must re-add those numbers every time.
With prefix sums:
You already stored cumulative totals.
This is exactly how analytics dashboards compute:
Monthly totals
Quarterly revenue
Running balances

## Visual Diagram

Original array:
Index:   0    1    2    3
Value: 100  200   50  300

Prefix array:
Index:    0    1    2    3    4
Prefix:   0  100  300  350  650

Explanation:
prefix[1] = 100
prefix[2] = 100 + 200 = 300
prefix[3] = 300 + 50 = 350
prefix[4] = 350 + 300 = 650

To find sum from index 1 to 3:
prefix[4] - prefix[1]
650 - 100 = 550
Which equals:
200 + 50 + 300 = 550

## JavaScript Template

// Build prefix sum array

function buildPrefixSum(nums) {
  const prefix = new Array(nums.length + 1);
  prefix[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  return prefix;
}
// Query range sum in O(1)
function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}
## Practice Problems
1. 
// Example
const nums = [100, 200, 50, 300];
const prefix = buildPrefixSum(nums);
console.log(rangeSum(prefix, 1, 3)); 
// Output: 550
2. ##Advanced Variation: Subarray Sum Equals K 
Sometimes you're asked:
3. How many subarrays equal target k?
This is also a prefix-sum problem using a hashmap.

function countSubarraysWithSumK(nums, k) {
  let count = 0;
  let runningSum = 0;
  const map = new Map();
  map.set(0, 1);

  for (let num of nums) {
    runningSum += num;
    if (map.has(runningSum - k)) {
      count += map.get(runningSum - k);
    }
    map.set(runningSum, (map.get(runningSum) || 0) + 1);
  }
  return count;
}

Time: O(n)
Space: O(n)