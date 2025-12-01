import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Copy, RotateCcw, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AICodeGeneratorMainProps {
  provider: string;
  model: string;
}

export const AICodeGeneratorMain: React.FC<AICodeGeneratorMainProps> = ({ provider, model }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Empty Prompt',
        description: 'Please enter a prompt to generate code.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          provider,
          model,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code');
      }

      const data = await response.json();
      setGeneratedCode(data.code || '');

      toast({
        title: 'Code Generated',
        description: 'Your code has been generated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate code',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: 'Copied to Clipboard',
      description: 'Code has been copied to your clipboard.',
    });
  };

  const handleClear = () => {
    setGeneratedCode('');
    setPrompt('');
    toast({
      title: 'Cleared',
      description: 'Prompt and results have been cleared.',
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-blue-600 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-bold text-blue-400">AI Code Generator</h2>
          <span className="text-xs text-slate-400 ml-auto">
            {provider === 'gemini' ? '🔵' : '⚫'} {provider.charAt(0).toUpperCase() + provider.slice(1)} - {model}
          </span>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Prompt Input Area */}
        <div className="px-4 py-3 border-b border-slate-700 flex-shrink-0">
          <label className="text-xs font-semibold text-blue-300 block mb-2">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the GDScript code you want to generate..."
            className="w-full h-24 px-3 py-2 rounded bg-slate-800 border border-slate-600 text-slate-100 text-xs focus:border-blue-400 focus:outline-none resize-none"
          />
          <div className="flex gap-2 mt-2">
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
            >
              {loading ? (
                <>
                  <Loader className="w-3 h-3 mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 mr-1" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Results Area - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {generatedCode ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-300 block sticky top-0 bg-slate-950 py-1">
                Generated Code
              </label>
              <pre className="bg-slate-900 border border-slate-700 rounded p-3 text-xs text-slate-100 overflow-x-auto max-h-full">
                <code>{generatedCode}</code>
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-xs">
              <p>Generated code will appear here</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {generatedCode && (
          <div className="px-4 py-3 border-t border-slate-700 flex gap-2 flex-shrink-0 bg-slate-900">
            <Button
              onClick={handleCopyCode}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs h-8"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
            <Button
              onClick={handleClear}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs h-8"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Clear
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
