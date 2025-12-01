import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AICodeGeneratorPanelProps {
  onModelChange?: (model: string) => void;
  onProviderChange?: (provider: string) => void;
}

export const AICodeGeneratorPanel: React.FC<AICodeGeneratorPanelProps> = ({
  onModelChange,
  onProviderChange,
}) => {
  const [provider, setProvider] = useState<'gemini' | 'groq'>('gemini');
  const [model, setModel] = useState('gemini-2.0-flash');

  const geminiModels = [
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (Fast)' },
    { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
  ];

  const groqModels = [
    { id: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B (Fast)' },
    { id: 'llama-2-70b-chat', label: 'Llama 2 70B' },
  ];

  const currentModels = provider === 'gemini' ? geminiModels : groqModels;
  const currentDefaultModel = provider === 'gemini' ? 'gemini-2.0-flash' : 'mixtral-8x7b-32768';

  const handleProviderChange = (newProvider: 'gemini' | 'groq') => {
    setProvider(newProvider);
    setModel(newProvider === 'gemini' ? 'gemini-2.0-flash' : 'mixtral-8x7b-32768');
    onProviderChange?.(newProvider);
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    onModelChange?.(newModel);
  };

  return (
    <div className="space-y-3 py-2">
      {/* Provider Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-blue-300">AI Provider</label>
        <div className="space-y-1">
          <button
            onClick={() => handleProviderChange('gemini')}
            className={`w-full px-2 py-1 rounded text-xs transition ${
              provider === 'gemini'
                ? 'bg-blue-600 text-white border border-blue-400'
                : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
            }`}
          >
            <Sparkles className="inline w-3 h-3 mr-1" />
            Gemini
          </button>
          <button
            onClick={() => handleProviderChange('groq')}
            className={`w-full px-2 py-1 rounded text-xs transition ${
              provider === 'groq'
                ? 'bg-blue-600 text-white border border-blue-400'
                : 'bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600'
            }`}
          >
            <Sparkles className="inline w-3 h-3 mr-1" />
            Groq
          </button>
        </div>
      </div>

      {/* Model Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-blue-300">Model</label>
        <select
          value={model}
          onChange={(e) => handleModelChange(e.target.value)}
          className="w-full px-2 py-1 rounded text-xs bg-slate-700 text-slate-100 border border-slate-600 focus:border-blue-400 focus:outline-none"
        >
          {currentModels.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Info */}
      <div className="text-xs text-slate-400 mt-4 p-2 bg-slate-800 rounded border border-slate-700">
        <p className="font-semibold text-blue-300 mb-1">💡 How to use:</p>
        <ul className="space-y-1 text-xs">
          <li>1. Select your preferred AI provider</li>
          <li>2. Choose a model variant</li>
          <li>3. Enter your prompt in the main panel</li>
          <li>4. Click "Generate" to create code</li>
        </ul>
      </div>
    </div>
  );
};
