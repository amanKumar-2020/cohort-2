import { Problem, Solution } from '../types/battle.types';

const MOCK_PROBLEM: Problem = {
  id: 'p1',
  title: 'Array Synthesis',
  description: 'Implement an optimized algorithm to find the **k-th largest element** in an unsorted neural stream. The solution must minimize heap memory allocation for low-latency combat feedback loops.',
  timeConstraint: 'O(n log k)',
  memoryTier: 'S-Class',
};

const MOCK_SOLUTIONS: Solution[] = [
  {
    id: 's1',
    name: 'Zalem Protocol A',
    protocol: 'QuickSelect Optimization',
    isWinner: true,
    code: `function findKthLargest(nums, k) {
  const target = nums.length - k;
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const pivotIndex = partition(nums, left, right);
    if (pivotIndex === target) return nums[pivotIndex];
    else if (pivotIndex < target) left = pivotIndex + 1;
    else right = pivotIndex - 1;
  }
}`,
    metrics: {
      efficiency: 98,
      readability: 84,
      security: 92,
    },
    reasoning: 'Zalem Protocol A achieved superior performance by utilizing in-place partitioning, effectively reducing auxiliary space complexity to **O(1)**. While Scap-Iron Logic B provides a stable min-heap structure, the overhead of heap property maintenance at each insertion introduces significant latency in high-frequency data streams.',
  },
  {
    id: 's2',
    name: 'Scrap-Iron Logic B',
    protocol: 'Min-Heap Strategy',
    isWinner: false,
    code: `const heap = new MinHeap();
for (const num of nums) {
  heap.push(num);
  if (heap.size() > k) {
    heap.pop();
  }
}
return heap.peek();`,
    metrics: {
      efficiency: 75,
      readability: 92,
      security: 88,
    },
    reasoning: 'Scrap-Iron Logic B provides a stable min-heap structure, but the overhead of heap property maintenance at each insertion introduces significant latency in high-frequency data streams.',
  },
];

export const api = {
  initializeBattle: async (specs: string): Promise<{ problem: Problem; solutions: Solution[] }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      problem: MOCK_PROBLEM,
      solutions: MOCK_SOLUTIONS,
    };
  },
};
