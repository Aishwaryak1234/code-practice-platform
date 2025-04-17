import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

console.log('Gemini API Key length:', process.env.GEMINI_API_KEY.length);
console.log('Gemini API Key starts with:', process.env.GEMINI_API_KEY.substring(0, 5));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getHint(problemTitle: string, code: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a helpful coding tutor. Provide concise, helpful hints without giving away the complete solution.
I'm working on the problem "${problemTitle}". Here's my current code:\n\n${code}\n\nCan you give me a hint about what I might be missing or how to improve it?`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error(`Failed to generate hint: ${error.message}`);
  }
} 