import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDown, Settings2, Code2, Wand2, Search, X } from 'lucide-react';

interface NodeProperty {
  name: string;
  type: string;
  default: string | number | boolean;
  description: string;
}

interface GodotNode {
  id: string;
  name: string;
  category: string;
  description: string;
  properties: NodeProperty[];
}

export const NodeEditorPanel: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GodotNode | null>(null);
  const [nodeProperties, setNodeProperties] = useState<Record<string, any>>({});
  const [generatedCode, setGeneratedCode] = useState('');
  const [allNodes, setAllNodes] = useState<GodotNode[]>([]);
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNodeDropdown, setShowNodeDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await fetch('/api/godot/nodes');
        const data = await response.json();
        setAllNodes(data.nodes || []);
      } catch (error) {
        console.error('Failed to fetch nodes:', error);
      }
    };
    fetchNodes();
  }, []);

  const filteredNodes = allNodes.filter(node =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertyChange = (propName: string, value: any) => {
    setNodeProperties(prev => ({ ...prev, [propName]: value }));
  };

  const generateCode = async () => {
    if (!selectedNode) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/node/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeId: selectedNode.id,
          nodeType: selectedNode.name,
          nodeCategory: selectedNode.category,
          nodeDescription: selectedNode.description,
          properties: nodeProperties,
          prompt: customPrompt
        })
      });
      const data = await response.json();
      setGeneratedCode(data.code || '');
      setShowPromptDialog(false);
      setCustomPrompt('');
    } catch (error) {
      console.error('Code generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
        {/* Node Selector - Custom Dropdown */}
        <div className="p-3 border-b border-blue-600">
          <label className="text-xs font-semibold text-blue-300">Select Node ({allNodes.length} available)</label>
          <div className="relative mt-2">
            <button
              onClick={() => setShowNodeDropdown(!showNodeDropdown)}
              className="w-full px-3 py-2 text-sm bg-slate-800 border border-blue-600 rounded text-white text-left flex items-center justify-between hover:bg-slate-700 transition"
            >
              <span>{selectedNode?.name || 'Choose a Godot node...'}</span>
              <ChevronDown className={`w-4 h-4 transition ${showNodeDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Custom Dropdown Menu */}
            {showNodeDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border-2 border-blue-600 rounded shadow-lg z-50 max-h-96 flex flex-col">
                {/* Search Box */}
                <div className="p-2 border-b border-slate-700 sticky top-0 bg-slate-800">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search nodes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-6 pr-2 py-1 text-sm bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500"
                    />
                  </div>
                </div>
                
                {/* Nodes List */}
                <div className="overflow-y-auto max-h-80">
                  {filteredNodes.length > 0 ? (
                    filteredNodes.map(node => (
                      <button
                        key={node.id}
                        onClick={() => {
                          setSelectedNode(node);
                          setNodeProperties({});
                          setGeneratedCode('');
                          setShowNodeDropdown(false);
                          setSearchQuery('');
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-blue-900 transition border-b border-slate-700 last:border-b-0"
                      >
                        <div className="font-medium text-white">{node.name}</div>
                        <div className="text-xs text-slate-400">{node.category}</div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-slate-400">No nodes found</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="text-xs text-slate-400 mt-1">{selectedNode?.id}</div>
        </div>

        {selectedNode && (
          <>
            {/* Node Details */}
            <div className="p-3 border-b border-blue-600 text-sm">
              <h3 className="font-bold text-blue-400">{selectedNode.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedNode.description}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-900 text-blue-200 rounded">
                {selectedNode.category}
              </span>
            </div>

            {/* Property Editor */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              <h4 className="text-sm font-semibold text-blue-300 flex items-center gap-2">
                <Settings2 className="w-4 h-4" /> Properties
              </h4>
              {selectedNode.properties.map(prop => (
                <div key={prop.name} className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    {prop.name}
                    <span className="text-blue-400 ml-1">({prop.type})</span>
                  </label>
                  <input
                    type={prop.type === 'float' || prop.type === 'int' ? 'number' : 'text'}
                    value={nodeProperties[prop.name] ?? prop.default}
                    onChange={(e) => handlePropertyChange(prop.name, e.target.value)}
                    placeholder={String(prop.default)}
                    className="w-full px-2 py-1 text-sm bg-slate-800 border border-slate-600 rounded text-white"
                  />
                  <p className="text-xs text-slate-400">{prop.description}</p>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <div className="p-3 border-t border-blue-600">
              <button
                onClick={() => setShowPromptDialog(true)}
                disabled={isGenerating}
                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-sm font-semibold rounded flex items-center justify-center gap-2 transition"
              >
                <Code2 className="w-4 h-4" /> {isGenerating ? 'Generating...' : 'Generate Code'}
              </button>
            </div>
          </>
        )}

        {/* Generated Code */}
        {generatedCode && (
          <div className="p-3 border-t border-blue-600 bg-slate-800">
            <p className="text-xs font-semibold text-blue-300 mb-2">Generated GDScript:</p>
            <pre className="text-xs bg-slate-950 p-2 rounded overflow-auto text-slate-300 max-h-32">
              {generatedCode}
            </pre>
          </div>
        )}
      </div>

      {/* Prompt Dialog - Rendered via Portal to ensure visibility */}
      {showPromptDialog && selectedNode && ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-auto">
          <div className="bg-slate-800 border-2 border-blue-600 rounded-lg p-4 max-w-sm w-full mx-4 shadow-lg">
            <h3 className="text-blue-300 font-bold mb-3">Enhance Code Generation</h3>
            <label className="text-xs text-slate-300 block mb-2">
              Describe what you want this {selectedNode.name} node to do:
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., Create a button that moves the player forward with smooth animation"
              className="w-full px-2 py-2 text-sm bg-slate-900 border border-slate-600 rounded text-white mb-3 resize-none h-20"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPromptDialog(false);
                  setCustomPrompt('');
                }}
                className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={generateCode}
                disabled={isGenerating}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white text-sm font-semibold rounded flex items-center justify-center gap-2 transition"
              >
                <Wand2 className="w-4 h-4" /> Generate
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
