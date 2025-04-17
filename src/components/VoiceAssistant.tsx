'use client';

import React, { useState, useCallback, useEffect } from 'react';

interface VoiceAssistantProps {
  onCommand: (command: string) => void;
  currentProblem?: {
    title: string;
  };
  currentCode?: string;
}

export default function VoiceAssistant({ onCommand, currentProblem, currentCode }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Initialize preferred voice
  useEffect(() => {
    const initVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find a natural-sounding English voice
      const preferredVoice = voices.find(
        voice => 
          (voice.name.includes('Samantha') || // macOS
           voice.name.includes('Google UK English Female') || // Chrome
           voice.name.includes('Microsoft Libby')) && // Windows
          voice.lang.startsWith('en')
      ) || voices.find(voice => voice.lang.startsWith('en')); // Fallback to any English voice
      
      if (preferredVoice) {
        setSelectedVoice(preferredVoice);
      }
    };

    // Voice list might not be available immediately
    if (window.speechSynthesis.getVoices().length) {
      initVoice();
    }
    window.speechSynthesis.onvoiceschanged = initVoice;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        speak("I'm listening...");
      };

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        setTranscript(command);
        onCommand(command);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      return recognition;
    }
    return null;
  }, [onCommand]);

  // Enhanced text-to-speech function
  const speak = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Get hint from OpenAI
  const getHint = async () => {
    if (!currentProblem?.title || !currentCode) {
      speak("I'm sorry, but I need both the problem and your code to provide a hint.");
      return;
    }

    speak("Let me analyze your code and provide a hint...");

    try {
      const response = await fetch('/api/hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemTitle: currentProblem.title,
          code: currentCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get hint');
      }

      const data = await response.json();
      speak(data.hint);
    } catch (error) {
      console.error('Error getting hint:', error);
      speak("I'm sorry, but I couldn't generate a hint right now. Please try again later.");
    }
  };

  const startListening = useCallback(() => {
    const recognition = initializeSpeechRecognition();
    if (recognition) {
      recognition.start();
    } else {
      console.error('Speech recognition not supported');
      speak('Speech recognition is not supported in your browser.');
    }
  }, [initializeSpeechRecognition]);

  // Handle hint requests
  useEffect(() => {
    if (transcript.toLowerCase().includes('hint')) {
      getHint();
    }
  }, [transcript]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`p-4 rounded-full shadow-lg ${
          isListening
            ? 'bg-red-600 animate-pulse'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        title={isListening ? 'Listening...' : 'Click to speak'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>
      {transcript && (
        <div className="mt-2 p-2 bg-gray-800 rounded-lg text-sm text-gray-300">
          {transcript}
        </div>
      )}
    </div>
  );
} 