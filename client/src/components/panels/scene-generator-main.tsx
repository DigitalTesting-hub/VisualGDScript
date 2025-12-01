import React, { useState, useEffect } from 'react';
import { FileCode, Copy, Download, Upload, Code, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SceneGeneratorMainProps {
  onLoading?: (loading: boolean) => void;
}

export const SceneGeneratorMain: React.FC<SceneGeneratorMainProps> = ({
  onLoading
}) => {
  const { toast } = useToast();
  const [sceneCode, setSceneCode] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (generatedCode) {
      const lines = generatedCode.split('\n').length;
      setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
    }
  }, [generatedCode]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ title: 'Error', description: 'Please upload an image file', variant: 'destructive' });
        return;
      }
      setImageFile(file);
      toast({ title: 'Image Loaded', description: 'Image ready for scene generation' });
    }
  };

  const clearImage = () => {
    setImageFile(null);
    toast({ title: 'Cleared', description: 'Image removed' });
  };

  const generateScene = async () => {
    if (!sceneCode.trim() && !imageFile) {
      toast({ title: 'Error', description: 'Please provide scene code or upload an image', variant: 'destructive' });
      return;
    }

    setLoading(true);
    onLoading?.(true);

    try {
      const inputType = imageFile ? '📸 Image' : '📝 Text';
      toast({ title: 'Generating...', description: `Using AI to generate TSCN from ${inputType}` });

      const formData = new FormData();
      if (sceneCode.trim()) formData.append('sceneCode', sceneCode);
      if (imageFile) formData.append('image', imageFile);

      console.log('📤 Sending to backend:', { hasCode: !!sceneCode.trim(), hasImage: !!imageFile });

      const response = await fetch('/api/scenes/generate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedCode(data.tscnCode);
        const method = imageFile ? 'image analysis' : 'text parsing';
        toast({ 
          title: '✨ Success', 
          description: `TSCN generated with AI ${method}!` 
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast({ 
          title: 'Error', 
          description: errorData.error || 'Failed to generate scene', 
          variant: 'destructive' 
        });
      }
    } catch (error) {
      console.error('Scene generation failed:', error);
      toast({ 
        title: 'Error', 
        description: (error as Error).message || 'Generation failed', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
      onLoading?.(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: 'Copied', description: 'TSCN code copied to clipboard!' });
  };

  const downloadAsTSCN = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generatedCode));
    element.setAttribute('download', 'scene.tscn');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: 'Downloaded', description: 'scene.tscn downloaded!' });
  };

  const clearAll = () => {
    setSceneCode('');
    setImageFile(null);
    setGeneratedCode('');
    toast({ title: 'Cleared', description: 'All fields cleared' });
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 border-l-2 border-cyan-600 overflow-hidden">
      {/* Input Section */}
      <div className="flex-shrink-0 border-b-2 border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 p-4 space-y-3">
        <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
          <FileCode className="w-5 h-5" /> Scene Generator
        </h2>

        {/* Scene Code Input */}
        <div className="bg-slate-800 rounded p-2.5 border border-cyan-600">
          <h3 className="text-cyan-300 font-semibold mb-2 flex items-center gap-1 text-xs">
            <Code className="w-3 h-3" /> Scene Structure (Optional)
          </h3>
          <textarea
            value={sceneCode}
            onChange={(e) => setSceneCode(e.target.value)}
            placeholder="Paste Godot scene structure here...&#10;Example:&#10;Node2D&#10;  Sprite2D (player.png)&#10;  CollisionShape2D"
            className="w-full bg-slate-700 text-white text-xs px-2 py-1.5 rounded border border-slate-600 focus:border-cyan-500 outline-none transition resize-none"
            rows={3}
          />
        </div>

        {/* Image Upload */}
        <div className="bg-slate-800 rounded p-2.5 border border-orange-600">
          <h3 className="text-orange-300 font-semibold mb-2 flex items-center gap-1 text-xs">
            <Upload className="w-3 h-3" /> Upload Scene Diagram (Optional)
          </h3>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-orange-600 file:text-white hover:file:bg-orange-700"
            />
            {imageFile && (
              <div className="flex items-center justify-between bg-slate-700 p-1.5 rounded">
                <span className="text-slate-300 text-xs truncate">{imageFile.name}</span>
                <button
                  onClick={clearImage}
                  className="text-orange-400 hover:text-orange-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={generateScene}
            disabled={loading}
            className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs py-2 rounded font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Generating...
              </>
            ) : (
              '✨ Generate TSCN Scene'
            )}
          </Button>
          <Button
            onClick={clearAll}
            variant="outline"
            className="px-3 text-xs text-slate-400 hover:text-slate-200"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin mb-4 text-3xl">⚙️</div>
              <p className="text-slate-400 text-lg">Generating scene...</p>
            </div>
          </div>
        ) : !generatedCode ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileCode className="w-16 h-16 text-cyan-600 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400 text-lg">Provide scene structure or upload image,</p>
              <p className="text-slate-400 text-lg">then click Generate TSCN Scene</p>
            </div>
          </div>
        ) : (
          <>
            {/* Code Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-cyan-300">Generated TSCN Scene</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{lineNumbers.length} lines</span>
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  className="h-6 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2"
                >
                  <Copy className="w-3 h-3 mr-1" /> Copy
                </Button>
                <Button
                  onClick={downloadAsTSCN}
                  size="sm"
                  className="h-6 bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-2"
                >
                  <Download className="w-3 h-3 mr-1" /> Download
                </Button>
              </div>
            </div>

            {/* Code Display */}
            <div className="flex-1 overflow-hidden flex">
              <div className="bg-slate-900 border-r border-slate-700 px-3 py-4 text-right font-mono text-xs text-slate-500 overflow-y-auto select-none">
                {lineNumbers.map((num) => (
                  <div key={num} className="h-6 leading-6">
                    {num}
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-auto">
                <pre className="bg-slate-950 text-slate-100 text-xs p-4 font-mono whitespace-pre-wrap break-words">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-900 border-t border-slate-700 px-4 py-2 text-xs text-slate-400">
              Ready to copy, download, or import into Godot as .tscn file
            </div>
          </>
        )}
      </div>
    </div>
  );
};
