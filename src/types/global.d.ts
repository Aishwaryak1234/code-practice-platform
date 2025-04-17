interface Window {
  SpeechRecognition: new () => SpeechRecognition;
  webkitSpeechRecognition: new () => SpeechRecognition;
  speechSynthesis: SpeechSynthesis;
}

interface SpeechRecognitionEvent extends Event {
  results: {
    item(index: number): {
      item(index: number): {
        transcript: string;
      };
    };
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: (event: Event) => void;
  start: () => void;
  stop: () => void;
}

interface SpeechSynthesisUtterance {
  text: string;
  lang: string;
  pitch: number;
  rate: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
  onend: (event: Event) => void;
  onerror: (event: Event) => void;
  onpause: (event: Event) => void;
  onresume: (event: Event) => void;
  onstart: (event: Event) => void;
}

interface SpeechSynthesis {
  speak(utterance: SpeechSynthesisUtterance): void;
  cancel(): void;
  pause(): void;
  resume(): void;
  getVoices(): SpeechSynthesisVoice[];
} 