import React, { useState } from 'react';
import { FlowchartPanel } from '@/components/panels/flowchart-panel';
import { PlayerPanel } from '@/components/panels/player-panel';
import { PlayerMainContent } from '@/components/panels/player-main-content';
import { SceneGeneratorMain } from '@/components/panels/scene-generator-main';
import { TemplatesPanel } from '@/components/panels/templates-panel';
import { TemplatesMainPanel } from '@/components/panels/templates-main-panel';
import { EnemyPanel } from '@/components/panels/enemy-panel';
import { EnemyMainContent } from '@/components/panels/enemy-main-content';
import { VehiclePanel } from '@/components/panels/vehicle-panel';
import { VehicleMainContent } from '@/components/panels/vehicle-main-content';
import { NodeEditorPanel } from '@/components/panels/node-editor-panel';
import { AICodeGeneratorPanel } from '@/components/panels/ai-code-generator-panel';
import { AICodeGeneratorMain } from '@/components/panels/ai-code-generator-main';
import { BlockEditorPanel } from '@/components/panels/block-editor-panel';
import { ChevronDown, Grid3x3, BookOpen, Zap, Users, UserSquare, Truck, Bot, Package, Sparkles, Boxes } from 'lucide-react';

const tabConfig = [
  { id: 'flowchart', label: 'Flowchart', icon: Grid3x3 },
  { id: 'nodes', label: 'Nodes', icon: Package },
  { id: 'block-editor', label: 'Block Editor', icon: Boxes },
  { id: 'templates', label: 'Templates', icon: BookOpen },
  { id: 'scene-generator', label: 'Scene Generator', icon: Zap },
  { id: 'ai-code-generator', label: 'AI Code Generator', icon: Sparkles },
  { id: 'player', label: 'Player', icon: UserSquare },
  { id: 'enemy', label: 'Enemy', icon: Users },
  { id: 'vehicle', label: 'Vehicle', icon: Truck },
  { id: 'npc', label: 'NPC', icon: Bot },
];

const nodeTypes = [
  { type: 'event', label: 'Event', icon: '▶', color: '#3b82f6' },
  { type: 'movement', label: 'Movement', icon: '→', color: '#10b981' },
  { type: 'rotation', label: 'Rotation', icon: '↻', color: '#06b6d4' },
  { type: 'scale', label: 'Scale', icon: '◆', color: '#8b5cf6' },
  { type: 'animation', label: 'Animation', icon: '▶▶', color: '#06b6d4' },
  { type: 'audio', label: 'Audio', icon: '🔊', color: '#f97316' },
  { type: 'timer', label: 'Timer', icon: '⏱', color: '#eab308' },
  { type: 'destroy', label: 'Destroy', icon: '✕', color: '#f43f5e' },
  { type: 'code', label: 'Code', icon: '</>', color: '#3f3f3f' },
  { type: 'print', label: 'Print', icon: '🖨', color: '#059669' },
  { type: 'comment', label: 'Comment', icon: '#', color: '#6b7280' },
  { type: 'condition', label: 'Condition', icon: '◇', color: '#f59e0b' },
  { type: 'loop', label: 'Loop', icon: '↻', color: '#8b5cf6' },
  { type: 'variable', label: 'Variable', icon: 'x', color: '#ec4899' },
  { type: 'function_call', label: 'Function', icon: 'ƒ', color: '#6366f1' },
  { type: 'signal', label: 'Signal', icon: '◆', color: '#ef4444' },
  { type: 'physics', label: 'Physics', icon: '⚡', color: '#14b8a6' },
  { type: 'spawn', label: 'Spawn', icon: '✚', color: '#84cc16' },
  { type: 'camera', label: 'Camera', icon: '📷', color: '#a855f7' },
  { type: 'tween', label: 'Tween', icon: '~', color: '#d946ef' },
  { type: 'group', label: 'Group', icon: '⊙', color: '#0ea5e9' },
  { type: 'property', label: 'Property', icon: '⚙', color: '#64748b' },
  { type: 'input_check', label: 'Input Check', icon: '?', color: '#78350f' },
  { type: 'scene', label: 'Scene', icon: '⊞', color: '#10b981' },
  { type: 'collision', label: 'Collision', icon: '◈', color: '#1e40af' },
  { type: 'data', label: 'Data', icon: '📊', color: '#6b7280' },
];

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  expanded: boolean;
}

// Helper function to apply custom variables to template
function applyVarsToTemplate(template: any, customVars: Record<string, string>): string {
  if (!template || !template.code) return '';
  
  let code = template.code;
  
  // Apply custom variable values
  Object.entries(customVars).forEach(([varName, value]) => {
    if (value && value.trim()) {
      // Replace const value
      code = code.replace(
        new RegExp(`(const\\s+${varName}\\s*(?::\\s*[^\\s]+)?\\s*=\\s*)([^\\n]+)`),
        `$1${value}`
      );
      
      // Replace @export value
      code = code.replace(
        new RegExp(`(@export\\s+var\\s+${varName}\\s*(?::\\s*[^\\s]+)?\\s*=\\s*)([^\\n]+)`),
        `$1${value}`
      );
    }
  });
  
  return code;
}

export const MainLayout: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>(
    tabConfig.map((t) => ({
      ...t,
      expanded: t.id === 'flowchart',
    }))
  );
  const [activeTab, setActiveTab] = useState('flowchart');
  const [playerGeneratedCode, setPlayerGeneratedCode] = useState('');
  const [playerIsGenerated, setPlayerIsGenerated] = useState(false);
  const [playerTemplate, setPlayerTemplate] = useState<any>(null);
  const [playerCustomVars, setPlayerCustomVars] = useState<Record<string, string>>({});
  const [sceneGeneratedCode, setSceneGeneratedCode] = useState('');
  const [sceneLoading, setSceneLoading] = useState(false);
  const [selectedEnemyType, setSelectedEnemyType] = useState<'zombie' | 'ranged' | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<'car' | null>(null);
  const [aiProvider, setAiProvider] = useState<'gemini' | 'groq'>('gemini');
  const [aiModel, setAiModel] = useState('gemini-2.0-flash');

  const toggleTab = (tabId: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((t) => ({
        ...t,
        expanded: t.id === tabId ? !t.expanded : false,
      }))
    );
    setActiveTab(tabId);
  };

  const renderMainContent = (tabId: string) => {
    if (tabId === 'templates') {
      return <TemplatesMainPanel />;
    }

    if (tabId === 'scene-generator') {
      return <SceneGeneratorMain />;
    }

    if (tabId === 'enemy') {
      return <EnemyMainContent enemyType={selectedEnemyType} />;
    }

    if (tabId === 'vehicle') {
      return <VehicleMainContent vehicleType={selectedVehicleType} />;
    }

    return null;
  };

  const renderTabContent = (tabId: string) => {
    if (tabId === 'templates') {
      return <TemplatesPanel />;
    }

    if (tabId === 'nodes') {
      return <NodeEditorPanel />;
    }

    if (tabId === 'flowchart') {
      return (
        <div className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-1 text-center text-xs">
            {nodeTypes.map((node) => (
              <div
                key={node.type}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer?.setData('nodeType', node.type);
                }}
                className="bg-slate-800 hover:bg-blue-900 p-2 rounded cursor-move border border-blue-600 hover:border-blue-400 transition"
                title={node.label}
              >
                <div className="text-base">{node.icon}</div>
                <div className="text-xs mt-0.5 truncate">{node.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (tabId === 'scene-generator') {
      return (
        <div className="space-y-2 py-2 text-xs text-slate-300">
          <p>Generate scene structure</p>
        </div>
      );
    }
    if (tabId === 'player') {
      return (
        <PlayerPanel 
          onCodeGenerated={(code, isGenerated) => {
            setPlayerGeneratedCode(code);
            setPlayerIsGenerated(isGenerated);
          }}
          onVariablesChanged={(vars, template) => {
            setPlayerCustomVars(vars);
            setPlayerTemplate(template);
          }}
        />
      );
    }
    if (tabId === 'enemy') {
      return <EnemyPanel onEnemyTypeSelected={setSelectedEnemyType} />;
    }
    if (tabId === 'vehicle') {
      return <VehiclePanel onVehicleTypeSelected={setSelectedVehicleType} />;
    }
    if (tabId === 'npc') {
      return (
        <div className="space-y-2 py-2 text-xs text-slate-300">
          <p>NPC interaction scripts</p>
        </div>
      );
    }
    if (tabId === 'ai-code-generator') {
      return (
        <AICodeGeneratorPanel
          onProviderChange={setAiProvider}
          onModelChange={setAiModel}
        />
      );
    }
    if (tabId === 'block-editor') {
      return (
        <div className="space-y-2 py-2 text-xs text-slate-300">
          <p>Block Editor - Scratch-style visual programming</p>
        </div>
      );
    }
  };

  return (
    <div className="h-screen w-screen flex bg-slate-950 text-slate-100">
      {/* Left Side Panel - Collapsible Tabs */}
      <div className="w-72 h-screen border-r-2 border-blue-600 bg-slate-950 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-3 py-2 border-b-2 border-blue-600 bg-gradient-to-r from-slate-900 to-slate-800">
          <h1 className="text-sm font-bold text-blue-400">Tools</h1>
        </div>

        {/* Collapsible Tabs */}
        <div className="flex-1 overflow-y-auto space-y-1 p-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <div
                key={tab.id}
                className="border border-blue-600 rounded bg-slate-900"
              >
                {/* Tab Header - Always Visible */}
                <button
                  onClick={() => toggleTab(tab.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 transition text-left text-sm"
                >
                  <IconComponent className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-blue-300 font-semibold flex-1">{tab.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-blue-400 transition-transform flex-shrink-0 ${
                      tab.expanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Tab Content - Expandable */}
                {tab.expanded && (
                  <div className="border-t border-blue-600 px-3 py-2 bg-slate-800 max-h-96 overflow-y-auto">
                    {renderTabContent(tab.id)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {activeTab === 'flowchart' && <FlowchartPanel />}
        {activeTab === 'nodes' && <NodeEditorPanel />}
        {activeTab === 'block-editor' && <BlockEditorPanel />}
        {activeTab === 'templates' && renderMainContent('templates')}
        {activeTab === 'scene-generator' && renderMainContent('scene-generator')}
        {activeTab === 'ai-code-generator' && <AICodeGeneratorMain provider={aiProvider} model={aiModel} />}
        {activeTab === 'enemy' && renderMainContent('enemy')}
        {activeTab === 'vehicle' && renderMainContent('vehicle')}
        {activeTab === 'player' && (
          <PlayerMainContent 
            template={playerTemplate}
            customVars={playerCustomVars}
            selectedFunctions={new Set()}
            originalCode={applyVarsToTemplate(playerTemplate, playerCustomVars)}
            generatedCode={playerGeneratedCode}
            isGenerated={playerIsGenerated}
            onVariableChange={(varName, value) => {
              const updated = { ...playerCustomVars, [varName]: value };
              setPlayerCustomVars(updated);
              if (playerTemplate) {
                setPlayerTemplate({ ...playerTemplate });
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
