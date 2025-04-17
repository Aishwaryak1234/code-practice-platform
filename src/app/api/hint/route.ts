import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getHint } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { problemTitle, code } = await request.json();

    if (!problemTitle || !code) {
      return NextResponse.json(
        { error: 'Problem title and code are required' },
        { status: 400 }
      );
    }

    const hint = await getHint(problemTitle, code);
    
    return NextResponse.json({ hint });

  } catch (error) {
    console.error('Hint error:', error);
    return NextResponse.json(
      { error: 'Failed to generate hint' },
      { status: 500 }
    );
  }
} 