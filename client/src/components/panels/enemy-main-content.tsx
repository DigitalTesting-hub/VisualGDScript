import React, { useState, useEffect } from 'react';
import { Copy, Download, Code, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EnemyVariable {
  name: string;
  type: string;
  value: string;
}

interface EnemyFunction {
  name: string;
  signature: string;
}

interface EnemyMainContentProps {
  enemyType: 'zombie' | 'ranged' | null;
}

export const EnemyMainContent: React.FC<EnemyMainContentProps> = ({ enemyType }) => {
  const { toast } = useToast();
  const [template, setTemplate] = useState<any>(null);
  const [customVars, setCustomVars] = useState<Record<string, string>>({});
  const [selectedFunctions, setSelectedFunctions] = useState<Set<string>>(new Set());
  const [enhancementPrompt, setEnhancementPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enemyType) {
      setTemplate(null);
      setCustomVars({});
      setSelectedFunctions(new Set());
      setGeneratedCode('');
      return;
    }

    fetchEnemyTemplate(enemyType);
  }, [enemyType]);

  const fetchEnemyTemplate = async (type: 'zombie' | 'ranged') => {
    try {
      const response = await fetch(`/api/enemies/template/${type}`);
      if (response.ok) {
        const data = await response.json();
        setTemplate(data.template);
        setCustomVars({});
        setSelectedFunctions(new Set(data.template.functions.map((f: EnemyFunction) => f.name)));
        setGeneratedCode(data.template.code);
        setIsGenerated(false);
      }
    } catch (error) {
      console.error('Failed to fetch enemy template:', error);
      toast({ title: 'Error', description: 'Failed to load enemy template', variant: 'destructive' });
    }
  };

  const toggleFunction = (funcName: string) => {
    const newSet = new Set(selectedFunctions);
    if (newSet.has(funcName)) {
      newSet.delete(funcName);
    } else {
      newSet.add(funcName);
    }
    setSelectedFunctions(newSet);
  };

  const generateCode = async () => {
    if (!template) return;

    setLoading(true);
    try {
      const response = await fetch('/api/enemies/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enemyType,
          customVars,
          selectedFunctions: Array.from(selectedFunctions),
          enhancementPrompt,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedCode(data.code);
        setIsGenerated(true);
        toast({ title: 'Generated', description: 'Enemy script generated with AI enhancements!' });
      }
    } catch (error) {
      console.error('Generation failed:', error);
      toast({ title: 'Error', description: 'Failed to generate script', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: 'Copied', description: 'Code copied to clipboard!' });
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${enemyType}_enemy.gd`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: 'Downloaded', description: `${enemyType}_enemy.gd downloaded!` });
  };

  if (!enemyType || !template) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <p className="text-sm">Select an enemy type to begin</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 border-l-2 border-cyan-600 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 p-3 border-b border-cyan-600">
        <h2 className="text-cyan-300 font-bold text-sm mb-1 capitalize">
          {enemyType} Enemy Script Generator
        </h2>
        <p className="text-slate-400 text-xs">Edit variables, select functions, and generate with AI</p>
      </div>

      {/* Content Sections */}
      <div className="flex-1 overflow-y-auto flex flex-col p-3 gap-3">
        {/* Variables Section */}
        <div className="bg-slate-800 rounded p-2.5 border border-slate-700">
          <h3 className="text-purple-300 font-semibold text-xs mb-2">📝 Variables</h3>
          <div className="space-y-2">
            {template.variables.map((variable: EnemyVariable) => (
              <div key={variable.name} className="flex items-center gap-2">
                <label className="text-xs text-slate-300 flex-1 min-w-0">
                  {variable.name} <span className="text-slate-500">({variable.type})</span>
                </label>
                <input
                  type="text"
                  value={customVars[variable.name] || variable.value}
                  onChange={(e) =>
                    setCustomVars((prev) => ({ ...prev, [variable.name]: e.target.value }))
                  }
                  className="text-xs bg-slate-700 text-white px-2 py-1 rounded w-20 border border-slate-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Functions Section */}
        <div className="bg-slate-800 rounded p-2.5 border border-slate-700">
          <h3 className="text-blue-300 font-semibold text-xs mb-2">
            ⚙️ Functions ({selectedFunctions.size}/{template.functions.length})
          </h3>
          <div className="space-y-1 max-h-24 overflow-y-auto">
            {template.functions.map((func: EnemyFunction) => (
              <label key={func.name} className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFunctions.has(func.name)}
                  onChange={() => toggleFunction(func.name)}
                  className="w-3 h-3"
                />
                <span className="text-slate-300">{func.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Enhancement Prompt */}
        <div className="bg-purple-900 rounded p-2.5 border border-purple-600">
          <h3 className="text-purple-300 font-semibold text-xs mb-2">✨ Enhancement Prompt (Optional)</h3>
          <textarea
            value={enhancementPrompt}
            onChange={(e) => setEnhancementPrompt(e.target.value)}
            placeholder="e.g., Add patrol behavior, increase damage, add shield..."
            className="w-full text-xs bg-slate-700 text-white px-2 py-1 rounded border border-purple-600 h-16 resize-none"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateCode}
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs py-2 rounded font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Generating...
            </>
          ) : (
            '✨ Generate with AI'
          )}
        </Button>
      </div>

      {/* Generated Code Section */}
      <div className="flex-1 flex flex-col overflow-hidden border-t border-slate-700 p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-cyan-300 font-semibold text-xs flex items-center gap-1">
            <Code className="w-3 h-3" /> Generated Code
          </h3>
          {isGenerated && <span className="text-purple-400 text-xs">✨ AI Enhanced</span>}
        </div>

        <div className="flex-1 bg-slate-900 rounded border border-slate-700 p-2 overflow-auto mb-2">
          <pre className="text-slate-300 text-xs font-mono whitespace-pre-wrap break-words">
            {generatedCode}
          </pre>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={copyToClipboard}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1"
          >
            <Copy className="w-3 h-3 mr-1" /> Copy
          </Button>
          <Button
            onClick={downloadCode}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-1"
          >
            <Download className="w-3 h-3 mr-1" /> Download
          </Button>
        </div>
      </div>
    </div>
  );
};
