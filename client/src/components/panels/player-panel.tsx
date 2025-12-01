import React, { useState, useEffect } from 'react';
import { Play, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PlayerTemplate {
  id: string;
  name: string;
  code: string;
  variables: Array<{ name: string; value: string; type: string }>;
  functions: Array<{ name: string; enabled: boolean }>;
}

interface PlayerPanelProps {
  onCodeGenerated?: (code: string, isGenerated: boolean) => void;
  onVariablesChanged?: (vars: Record<string, string>, template: any) => void;
  onFunctionsChange?: (functions: Set<string>) => void;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({ 
  onCodeGenerated, 
  onVariablesChanged,
  onFunctionsChange 
}) => {
  const { toast } = useToast();
  const [template, setTemplate] = useState<PlayerTemplate | null>(null);
  const [selectedFunctions, setSelectedFunctions] = useState<Set<string>>(new Set());
  const [customVars, setCustomVars] = useState<Record<string, string>>({});
  const [enhancementPrompt, setEnhancementPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlayerTemplate();
  }, []);

  const loadPlayerTemplate = async () => {
    try {
      const response = await fetch('/api/templates/player');
      if (response.ok) {
        const data = await response.json();
        setTemplate(data);
        
        // Initialize default selections
        const allFunctions = data.functions.map((f: any) => f.name);
        setSelectedFunctions(new Set(allFunctions));
        onFunctionsChange?.(new Set(allFunctions));
        
        const vars: Record<string, string> = {};
        data.variables.forEach((v: any) => {
          vars[v.name] = v.value;
        });
        setCustomVars(vars);
        
        // Notify parent on load
        if (data) {
          onVariablesChanged?.(vars, data);
        }
      }
    } catch (error) {
      console.error('Failed to load player template:', error);
      toast({ title: 'Error', description: 'Failed to load player template', variant: 'destructive' });
    }
  };

  const toggleFunction = (funcName: string) => {
    const newSelected = new Set(selectedFunctions);
    if (newSelected.has(funcName)) {
      newSelected.delete(funcName);
    } else {
      newSelected.add(funcName);
    }
    setSelectedFunctions(newSelected);
    onFunctionsChange?.(newSelected);
  };

  const generatePlayerScript = async () => {
    if (!template) return;
    
    setLoading(true);
    try {
      // Check if partial selection (use AI for better results)
      const isPartialSelection = selectedFunctions.size > 0 && 
                                selectedFunctions.size < template.functions.length;
      
      const response = await fetch('/api/templates/player/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedFunctions: Array.from(selectedFunctions),
          customVariables: customVars,
          useAI: isPartialSelection || enhancementPrompt.length > 0,
          enhancementPrompt: enhancementPrompt.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onCodeGenerated?.(data.code, true);
        
        if (isPartialSelection && enhancementPrompt.length > 0) {
          toast({ 
            title: 'Success', 
            description: 'AI-enhanced script with your requirements applied!' 
          });
        } else if (isPartialSelection) {
          toast({ 
            title: 'Success', 
            description: 'AI-generated script for selected functions!' 
          });
        } else if (enhancementPrompt.length > 0) {
          toast({ 
            title: 'Success', 
            description: 'Script enhanced with your requirements!' 
          });
        } else {
          toast({ 
            title: 'Success', 
            description: 'Player script generated!' 
          });
        }
      } else {
        toast({ title: 'Error', description: 'Failed to generate script', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Generation failed:', error);
      toast({ title: 'Error', description: 'Generation failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (!template) {
    return (
      <div className="space-y-2 py-2 text-xs text-slate-300">
        <p>Loading player template...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 py-2 text-xs">
      {/* Functions Section */}
      <div className="bg-slate-800 rounded p-2.5 border border-blue-600">
        <h3 className="text-blue-300 font-semibold mb-2 flex items-center gap-1">
          <Play className="w-3 h-3" /> Functions ({selectedFunctions.size}/{template.functions.length})
        </h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {template.functions.map((func) => (
            <label key={func.name} className="flex items-center gap-2 hover:bg-slate-700 p-1.5 rounded cursor-pointer transition">
              <input
                type="checkbox"
                checked={selectedFunctions.has(func.name)}
                onChange={() => toggleFunction(func.name)}
                className="w-3 h-3 accent-blue-500 cursor-pointer"
              />
              <span className="text-slate-300 text-xs truncate">{func.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Enhancement Prompt */}
      <div className="bg-slate-800 rounded p-2.5 border border-purple-600">
        <h3 className="text-purple-300 font-semibold mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Enhancement Prompt (Optional)
        </h3>
        <textarea
          value={enhancementPrompt}
          onChange={(e) => setEnhancementPrompt(e.target.value)}
          placeholder="E.g., 'Add dash ability', 'Increase jump speed', 'Add wall slide mechanic', etc."
          className="w-full bg-slate-700 text-white text-xs px-2 py-1.5 rounded border border-slate-600 focus:border-purple-500 outline-none transition resize-none"
          rows={3}
        />
        <p className="text-xs text-slate-400 mt-1">AI will apply these features to your script</p>
      </div>

      {/* Generate Button */}
      <Button
        onClick={generatePlayerScript}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded font-semibold"
      >
        {loading ? (
          <>
            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Generating...
          </>
        ) : (
          '🎬 Generate Script'
        )}
      </Button>
    </div>
  );
};
