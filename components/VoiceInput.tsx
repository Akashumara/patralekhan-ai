import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface Props {
  onTranscript: (text: string) => void;
  lang: string; // 'en-IN' or 'hi-IN'
}

const VoiceInput: React.FC<Props> = ({ onTranscript, lang }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      
      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recog.onerror = (event: any) => {
        console.error(event.error);
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    } else {
      setIsSupported(false);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!isSupported) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.lang = lang;
      recognition.start();
      setIsListening(true);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={toggleListening}
      className={`p-3 rounded-full transition-all ${
        isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
      }`}
      title="Speak to write"
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  );
};

export default VoiceInput;
