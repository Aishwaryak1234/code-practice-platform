import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              CodePractice
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Problems
                </Link>
                <Link href="/submissions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Submissions
                </Link>
                <Link href="/leaderboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 