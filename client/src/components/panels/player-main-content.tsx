import React, { useState, useEffect } from 'react';
import { FileCode, Copy, Download, Zap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PlayerMainContentProps {
  template: any;
  customVars: Record<string, string>;
  selectedFunctions: Set<string>;
  originalCode: string;
  generatedCode: string;
  isGenerated: boolean;
  onVariableChange: (varName: string, value: string) => void;
}

export const PlayerMainContent: React.FC<PlayerMainContentProps> = ({ 
  template,
  customVars,
  originalCode,
  generatedCode,
  isGenerated,
  onVariableChange
}) => {
  const { toast } = useToast();
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const displayCode = isGenerated ? generatedCode : originalCode;

  useEffect(() => {
    if (displayCode) {
      const lines = displayCode.split('\n').length;
      setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
    }
  }, [displayCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayCode);
    toast({ title: 'Copied', description: 'Code copied to clipboard!' });
  };

  const downloadAsGD = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(displayCode));
    element.setAttribute('download', 'player.gd');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: 'Downloaded', description: 'player.gd downloaded!' });
  };

  if (!displayCode) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 border-l-2 border-blue-600">
        <div className="text-center">
          <FileCode className="w-16 h-16 text-blue-600 mx-auto mb-4 opacity-50" />
          <p className="text-slate-400 text-lg">Configure variables and select functions,</p>
          <p className="text-slate-400 text-lg">then click Generate Script</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 border-l-2 border-green-600 overflow-hidden">
      {/* Top Section: Variables - Takes 45% of screen */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-green-600 px-4 py-3 h-1/2 overflow-y-auto">
        <h3 className="text-green-300 font-semibold mb-3 flex items-center gap-2 text-xs">
          <Zap className="w-4 h-4" /> Variables Configuration
        </h3>
        <div className="space-y-2">
          {template?.variables?.map((variable: any) => (
            <div key={variable.name} className="bg-slate-800 p-2.5 rounded border border-slate-700 hover:border-green-600 transition">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-300 text-xs font-semibold">{variable.name}</label>
                <span className="text-xs text-slate-500 bg-slate-700 px-1.5 py-0.5 rounded">{variable.type}</span>
              </div>
              <input
                type="text"
                value={customVars[variable.name] || ''}
                onChange={(e) => onVariableChange(variable.name, e.target.value)}
                className="w-full bg-slate-700 text-white text-xs px-2 py-1 rounded border border-slate-600 focus:border-green-500 outline-none transition"
                placeholder={variable.value}
                title={`Default: ${variable.value}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Header with Copy/Download Buttons */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-green-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-bold text-green-300">
            {isGenerated ? 'Generated Player Script' : 'Player Script Preview'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 mr-2">{lineNumbers.length} lines</span>
          {isGenerated && (
            <>
              <Button
                onClick={copyToClipboard}
                size="sm"
                className="h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs"
              >
                <Copy className="w-3 h-3 mr-1" /> Copy
              </Button>
              <Button
                onClick={downloadAsGD}
                size="sm"
                className="h-7 bg-green-600 hover:bg-green-700 text-white text-xs"
              >
                <Download className="w-3 h-3 mr-1" /> Download
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Code Display - Takes remaining 50% */}
      <div className="flex-1 overflow-hidden flex">
        {/* Line Numbers */}
        <div className="bg-slate-900 border-r border-slate-700 px-3 py-4 text-right font-mono text-xs text-slate-500 overflow-y-auto select-none">
          {lineNumbers.map((num) => (
            <div key={num} className="h-6 leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto">
          <pre className="bg-slate-950 text-slate-100 text-xs p-4 font-mono whitespace-pre-wrap break-words">
            <code>{displayCode}</code>
          </pre>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-900 border-t border-slate-700 px-4 py-2 text-xs text-slate-400">
        {isGenerated 
          ? 'Ready to copy, download, or use in your Godot project' 
          : 'Edit variables above to see real-time updates'}
      </div>
    </div>
  );
};
