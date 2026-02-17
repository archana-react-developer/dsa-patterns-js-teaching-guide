// 01 Prefix Sum Template
// 01 Prefix Sum Template (JavaScript)
// Covers: range sum queries, subarray sum equals k, and 2D prefix sum (grid)
/**
 * 1) Build 1D Prefix Sum
 * prefix[i] = sum of nums[0..i-1]
 * So rangeSum(L..R) = prefix[R+1] - prefix[L]
 */
export function buildPrefixSum(nums) {
  const prefix = new Array(nums.length + 1);
  prefix[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  return prefix;
}

export function rangeSum(prefix, L, R) {
  if (L < 0 || R >= prefix.length - 1 || L > R) {
    throw new Error("Invalid range");
  }
  return prefix[R + 1] - prefix[L];
}

/**
 * 2) Subarray Sum Equals K (LeetCode 560)
 * Real-world analogy: count how many time periods sum to a target value.
 * Idea: if currentPrefix - target was seen before, those form valid subarrays.
 * Time: O(n), Space: O(n)
 */
export function countSubarraysWithSumK(nums, k) {
  let count = 0;
  let running = 0;
  const freq = new Map();
  freq.set(0, 1); // prefix sum 0 occurs once
  for (const x of nums) {
    running += x;
    const need = running - k;
    if (freq.has(need)) count += freq.get(need);
    freq.set(running, (freq.get(running) || 0) + 1);
  }
  return count;
}

/**
 * 3) 2D Prefix Sum (grid range sum)
 * prefix[r+1][c+1] = sum of grid[0..r][0..c]
 * Query sum of rectangle (r1,c1) -> (r2,c2) in O(1)
 */
export function buildPrefixSum2D(grid) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const prefix = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0)
  );
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      prefix[r + 1][c + 1] =
        grid[r][c] +
        prefix[r][c + 1] +
        prefix[r + 1][c] -
        prefix[r][c];
    }
  }
  return prefix;
}

export function rangeSum2D(prefix, r1, c1, r2, c2) {
  // inclusive coordinates
  return (
    prefix[r2 + 1][c2 + 1] -
    prefix[r1][c2 + 1] -
    prefix[r2 + 1][c1] +
    prefix[r1][c1]
  );
}

/** Quick sanity tests (run node code/01-prefix-sum.js if using commonjs, or adjust for ESM) */
function demo() {
  const nums = [100, 200, 50, 300];
  const pre = buildPrefixSum(nums);
  console.log("Range sum [1..3] =", rangeSum(pre, 1, 3)); // 550
  const arr = [1, 2, 3, -2, 2, 1];
  console.log("Count sub arrays sum=3:", countSubarraysWithSumK(arr, 3));

  const grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const pre2d = buildPrefixSum2D(grid);
  console.log("2D sum (1,1)-(2,2) =", rangeSum2D(pre2d, 1, 1, 2, 2)); // 5+6+8+9 = 28
}

// Uncomment to run demo locally
demo();


       