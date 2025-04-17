'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { problems } from '@/data/problems';
import VoiceAssistant from '@/components/VoiceAssistant';

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

export default function DashboardPage() {
  const [currentProblem] = useState(problems[0]);
  const [code, setCode] = useState(currentProblem.starterCode.python);
  const [results, setResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: 'python',
          problemId: currentProblem.id,
          testCases: currentProblem.testCases,
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error running code:', error);
      setResults({
        success: false,
        error: 'Failed to execute code',
      });
    }
    setIsRunning(false);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Handle different voice commands
    if (lowerCommand.includes('run') || lowerCommand.includes('execute')) {
      speak('Running your code...');
      handleRunCode();
    } else if (lowerCommand.includes('reset') || lowerCommand.includes('clear')) {
      setCode(currentProblem.starterCode.python);
      speak('Code has been reset to the starter template.');
    } else if (lowerCommand.includes('read') || lowerCommand.includes('describe')) {
      speak(`${currentProblem.title}. ${currentProblem.description}`);
    } else if (lowerCommand.includes('help')) {
      speak('Available commands: "Run code" to execute, "Reset code" to clear, "Read problem" to hear the description, "Give me a hint" for help, and "Help" to hear available commands.');
    } else if (lowerCommand.includes('hint')) {
      // Hint handling is now done in the VoiceAssistant component
      return;
    } else {
      speak("I didn't understand that command. Say 'help' to hear available commands.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">{currentProblem.title}</h2>
              <span className={`px-2 py-1 rounded text-sm ${
                currentProblem.difficulty === 'Easy' ? 'bg-green-600' :
                currentProblem.difficulty === 'Medium' ? 'bg-yellow-600' :
                'bg-red-600'
              }`}>
                {currentProblem.difficulty}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="text-gray-300">
                {currentProblem.description}
              </div>
              
              <div className="bg-gray-700 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Examples:</h3>
                <div className="space-y-4">
                  {currentProblem.examples.map((example, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-green-400">Input: {example.input}</div>
                      <div className="text-green-400">Output: {example.output}</div>
                      {example.explanation && (
                        <div className="text-gray-400">Explanation: {example.explanation}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Constraints:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {currentProblem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-[500px] relative">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  className={`px-4 py-2 rounded ${
                    isRunning
                      ? 'bg-blue-700 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  disabled={isRunning}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Results Panel */}
            {results && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Results</h3>
                {results.success ? (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Total Tests</div>
                        <div className="text-2xl">{results.summary.total}</div>
                      </div>
                      <div className="bg-green-900 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Passed</div>
                        <div className="text-2xl">{results.summary.passed}</div>
                      </div>
                      <div className="bg-red-900 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Failed</div>
                        <div className="text-2xl">{results.summary.failed}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {results.results.map((result: any, index: number) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            result.passed ? 'bg-green-900/50' : 'bg-red-900/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`text-sm ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                              Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                            </div>
                            {result.executionTime && (
                              <div className="text-xs text-gray-400">
                                ({result.executionTime})
                              </div>
                            )}
                          </div>
                          {!result.passed && result.error && (
                            <div className="mt-2 text-sm text-red-400">
                              Error: {result.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-red-400">
                    {results.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <VoiceAssistant 
        onCommand={handleVoiceCommand}
        currentProblem={currentProblem}
        currentCode={code}
      />
    </div>
  );
} 