import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Copy, RotateCcw, Play, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BLOCK_DEFINITIONS, CATEGORIES, type Block, type BlockSequence } from "@shared/block-schema";

interface BlockEditorPanelProps {
  onCodeGenerated?: (code: string) => void;
}

export const BlockEditorPanel: React.FC<BlockEditorPanelProps> = ({ onCodeGenerated }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [startNodeType, setStartNodeType] = useState("CharacterBody3D");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["events", "movement", "animation"])
  );
  const { toast } = useToast();

  const toggleCategory = (category: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setExpandedCategories(newSet);
  };

  const handleAddBlock = useCallback(
    (blockType: string) => {
      const definition = BLOCK_DEFINITIONS[blockType];
      if (!definition) return;

      const newBlock: Block = {
        id: `block_${Date.now()}_${Math.random()}`,
        type: blockType,
        fields: {},
        children: [],
      };

      for (const field of definition.fields) {
        newBlock.fields[field.id] = field.default || "";
      }

      setBlocks([...blocks, newBlock]);

      toast({
        title: "Block Added",
        description: `Added "${definition.label}" block`,
      });
    },
    [blocks, toast]
  );

  const handleRemoveBlock = useCallback((blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
  }, [blocks]);

  const handleUpdateBlock = useCallback(
    (blockId: string, fields: Record<string, string | number | boolean>) => {
      setBlocks(
        blocks.map((b) =>
          b.id === blockId ? { ...b, fields: { ...b.fields, ...fields } } : b
        )
      );
    },
    [blocks]
  );

  const handleGenerate = async () => {
    if (blocks.length === 0) {
      toast({
        title: "No Blocks",
        description: "Add at least one block to generate code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const sequence: BlockSequence = {
        blocks,
        startNodeType,
      };

      const response = await fetch("/api/blocks/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sequence),
      });

      if (!response.ok) throw new Error("Failed to generate code");

      const data = await response.json();
      setGeneratedCode(data.code);
      onCodeGenerated?.(data.code);

      toast({
        title: "Code Generated",
        description: "Block sequence converted to GDScript",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
    });
  };

  const handleClear = () => {
    setBlocks([]);
    setGeneratedCode("");
    toast({
      title: "Cleared",
      description: "All blocks removed",
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden gap-2 p-2">
      {/* Top Control Panel */}
      <Card className="bg-slate-900 border-slate-700 flex-shrink-0">
        <div className="p-3 space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-semibold text-blue-300 block mb-1">
                Node Type
              </label>
              <select
                value={startNodeType}
                onChange={(e) => setStartNodeType(e.target.value)}
                className="w-full px-2 py-1 rounded text-xs bg-slate-800 border border-slate-600 text-slate-100"
              >
                <option>Node</option>
                <option>Node2D</option>
                <option>Node3D</option>
                <option>CharacterBody2D</option>
                <option>CharacterBody3D</option>
                <option>RigidBody2D</option>
                <option>RigidBody3D</option>
              </select>
            </div>
            <div className="flex gap-1 pt-6">
              <Button
                onClick={handleGenerate}
                disabled={loading || blocks.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-3"
              >
                {loading ? (
                  <Sparkles className="w-3 h-3 animate-spin" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
              </Button>
              <Button
                onClick={handleClear}
                className="bg-red-600 hover:bg-red-700 text-white text-xs h-8 px-3"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Block Library & Canvas Area */}
      <div className="flex-1 flex gap-2 overflow-hidden min-h-0">
        {/* Left Side - Block Categories (scrollable) */}
        <Card className="bg-slate-900 border-slate-700 flex-shrink-0 w-96 overflow-hidden flex flex-col min-h-0">
          <ScrollArea className="flex-1 w-full">
            <div className="p-3 space-y-2">
              <p className="text-xs font-bold text-blue-300 mb-2">Add Blocks</p>
              <div className="space-y-1 pr-3">
                {CATEGORIES.map((category) => (
                  <div key={category}>
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold text-white transition hover:bg-slate-700"
                    >
                      <ChevronDown
                        className={`w-3 h-3 transition flex-shrink-0 ${
                          expandedCategories.has(category) ? "" : "-rotate-90"
                        }`}
                      />
                      <span className="capitalize">{category}</span>
                    </button>

                    {expandedCategories.has(category) && (
                      <div className="grid grid-cols-4 gap-1 px-2 py-1">
                        {Object.entries(BLOCK_DEFINITIONS)
                          .filter(([_, def]) => def.category === category)
                          .map(([id, def]) => {
                            // Create short name: take first word or split by dash
                            const shortName = def.label.split(" - ")[0] || def.label.split(" ")[0];
                            return (
                              <button
                                key={id}
                                onClick={() => handleAddBlock(id)}
                                className="text-xs px-1 py-1 rounded transition hover:opacity-80 text-white font-semibold truncate"
                                style={{ backgroundColor: def.color }}
                                title={def.label}
                              >
                                {shortName}
                              </button>
                            );
                          })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </Card>

        {/* Middle - Block Canvas (scrollable) */}
        <Card className="bg-slate-900 border-slate-700 flex-1 overflow-hidden flex flex-col min-h-0">
          <ScrollArea className="flex-1 w-full">
            <div className="p-3 space-y-2 pr-3">
              {blocks.length === 0 ? (
                <div className="text-center text-slate-400 text-xs py-8">
                  Add blocks from the left panel to build your script
                </div>
              ) : (
                blocks.map((block) => (
                  <BlockVisual
                    key={block.id}
                    block={block}
                    onRemove={() => handleRemoveBlock(block.id)}
                    onUpdate={(fields) => handleUpdateBlock(block.id, fields)}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Bottom - Generated Code (scrollable) */}
      {generatedCode && (
        <Card className="bg-slate-900 border-slate-700 flex-shrink-0 max-h-40 overflow-hidden flex flex-col min-h-0">
          <ScrollArea className="flex-1 w-full">
            <div className="p-3">
              <div className="flex justify-between items-center mb-2 pr-3">
                <label className="text-xs font-semibold text-blue-300">Generated Code</label>
                <Button
                  onClick={handleCopyCode}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 h-6 text-xs"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <pre className="bg-slate-800 rounded p-2 text-xs text-slate-100 overflow-x-auto">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

interface BlockVisualProps {
  block: Block;
  onRemove: () => void;
  onUpdate: (fields: Record<string, string | number | boolean>) => void;
}

const BlockVisual: React.FC<BlockVisualProps> = ({ block, onRemove, onUpdate }) => {
  const definition = BLOCK_DEFINITIONS[block.type];
  if (!definition) return null;

  return (
    <div
      className="rounded-lg p-2 border-2 text-white text-xs space-y-1"
      style={{
        backgroundColor: definition.color,
        borderColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">{definition.label}</span>
        <button
          onClick={onRemove}
          className="text-white hover:opacity-70 transition font-bold"
        >
          ✕
        </button>
      </div>

      <div className="space-y-1">
        {definition.fields.map((field) => (
          <div key={field.id} className="flex gap-1 items-center">
            <label className="font-semibold opacity-80 flex-shrink-0 min-w-12">
              {field.label}:
            </label>
            {field.type === "dropdown" ? (
              <select
                value={String(block.fields[field.id] || field.default)}
                onChange={(e) => onUpdate({ [field.id]: e.target.value })}
                className="flex-1 px-1 py-0 rounded bg-slate-700 text-white text-xs"
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "boolean" ? (
              <input
                type="checkbox"
                checked={Boolean(block.fields[field.id])}
                onChange={(e) => onUpdate({ [field.id]: e.target.checked })}
                className="w-4 h-4"
              />
            ) : (
              <input
                type={field.type === "number" ? "number" : "text"}
                value={String(block.fields[field.id] ?? field.default ?? "")}
                onChange={(e) =>
                  onUpdate({
                    [field.id]:
                      field.type === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
                className="flex-1 px-1 py-0 rounded bg-slate-700 text-white text-xs"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
