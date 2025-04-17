import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface TestCase {
  input: any;
  expected_output: any;
}

interface CodeExecutionRequest {
  code: string;
  language: string;
  problemId: string;
  testCases: TestCase[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CodeExecutionRequest = await request.json();
    const { code, language, testCases } = body;

    // For now, we'll implement a simple Python code execution
    // In production, this should be done in a secure sandbox environment
    if (language === 'python') {
      const results = [];
      
      for (const testCase of testCases) {
        try {
          // Here we'll add the actual code execution logic
          // For now, returning mock results
          results.push({
            passed: true,
            input: testCase.input,
            expected: testCase.expected_output,
            actual: testCase.expected_output,
            executionTime: '0.001s'
          });
        } catch (error) {
          results.push({
            passed: false,
            input: testCase.input,
            expected: testCase.expected_output,
            actual: null,
            error: error.message
          });
        }
      }

      return NextResponse.json({
        success: true,
        results,
        summary: {
          total: testCases.length,
          passed: results.filter(r => r.passed).length,
          failed: results.filter(r => !r.passed).length
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Unsupported language'
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
} 