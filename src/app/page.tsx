import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master Your Coding Skills
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Practice coding problems, get instant feedback, and improve your problem-solving abilities with our interactive platform.
          </p>
          <div className="space-x-4">
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-block"
            >
              Start Practicing
            </Link>
            <Link
              href="/about"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-medium inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Interactive Code Editor</h3>
            <p className="text-gray-300">
              Write and test your code in our feature-rich editor with syntax highlighting and auto-completion.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Real-time Feedback</h3>
            <p className="text-gray-300">
              Get instant feedback on your solutions with detailed test cases and performance metrics.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Voice Assistance</h3>
            <p className="text-gray-300">
              Use voice commands and get spoken feedback to enhance your coding experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 