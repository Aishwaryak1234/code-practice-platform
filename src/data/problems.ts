export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  testCases: {
    input: any;
    expected_output: any;
  }[];
  starterCode: {
    python: string;
    javascript?: string;
  };
}

export const problems: Problem[] = [
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: 'Given an integer x, return true if it reads the same forward and backward as a palindrome, and false otherwise. For instance, 121 is a palindrome, but 123 is not since it reverses to 321.',
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-.'
      }
    ],
    constraints: [
      '-2³¹ <= x <= 2³¹-1'
    ],
    testCases: [
      { input: 121, expected_output: true },
      { input: -121, expected_output: false },
      { input: 10, expected_output: false },
      { input: 12321, expected_output: true }
    ],
    starterCode: {
      python: `def solution(x):
    # Your code here
    pass`,
      javascript: `function solution(x) {
    // Your code here
}`
    }
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10⁴',
      '-10⁹ <= nums[i] <= 10⁹',
      '-10⁹ <= target <= 10⁹'
    ],
    testCases: [
      { 
        input: { nums: [2,7,11,15], target: 9 },
        expected_output: [0,1]
      },
      {
        input: { nums: [3,2,4], target: 6 },
        expected_output: [1,2]
      }
    ],
    starterCode: {
      python: `def solution(nums, target):
    # Your code here
    pass`,
      javascript: `function solution(nums, target) {
    // Your code here
}`
    }
  }
]; 