import React, { useState } from 'react';
import { generateLetter } from '../services/geminiService';
import VoiceInput from './VoiceInput';
import InteractiveLetter from './InteractiveLetter';
import { Template } from '../types';
import { Sparkles, Send } from 'lucide-react';

const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<Template | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      // Determine probable language based on input (simple check)
      const isHindi = /[\u0900-\u097F]/.test(prompt);
      const targetLang = isHindi ? 'Hindi' : 'English';
      
      const body = await generateLetter(prompt, targetLang);
      
      // Create a temporary template object to reuse the InteractiveLetter component
      const tempTemplate: Template = {
        id: `ai-${Date.now()}`,
        title: 'Custom AI Letter',
        category: 'General',
        tags: ['ai', 'custom'],
        englishBody: targetLang === 'English' ? body : '',
        hindiBody: targetLang === 'Hindi' ? body : '',
        faqs: []
      };

      // If text is Hinglish/Mixed, put it in the active slot. 
      // For this demo, if requested English, put in EnglishBody.
      if (targetLang === 'English') tempTemplate.englishBody = body;
      else tempTemplate.hindiBody = body;

      setGeneratedTemplate(tempTemplate);
    } catch (error) {
      alert("AI Generation failed. Please check your API key or connection.");
    } finally {
      setIsLoading(false);
    }
  };

  if (generatedTemplate) {
    return <InteractiveLetter template={generatedTemplate} onBack={() => setGeneratedTemplate(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="text-yellow-300" /> PatraLekhan AI Assistant
        </h2>
        <p className="opacity-90">
          Can't find the right format? Just describe what you need, or speak in Hindi/English.
          <br/>Example: <i>"Write a letter to the municipality about broken street lights in my colony."</i>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your request here... (e.g., 'Bijli vibhag ko letter likho...')"
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-lg"
        />
        
        <div className="absolute bottom-8 right-8 flex items-center gap-3">
           <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">Voice Input</span>
           <VoiceInput onTranscript={(text) => setPrompt(prev => prev + " " + text)} lang="hi-IN" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? 'Thinking...' : 'Generate Letter'}
          {!isLoading && <Send size={20} />}
        </button>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Trending AI Requests</h3>
        <div className="flex flex-wrap gap-3">
          {["Sick leave for 2 days", "Bank account close application", "Complaint about stray dogs", "Electricity bill correction"].map((req, i) => (
            <button 
              key={i}
              onClick={() => setPrompt(req)}
              className="bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm transition"
            >
              {req}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
