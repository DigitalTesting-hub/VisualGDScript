import React, { useState, useEffect } from 'react';
import { ChevronDown, Swords, Crosshair, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnemyPanelProps {
  onEnemyTypeSelected: (type: 'zombie' | 'ranged' | 'spawner') => void;
}

export const EnemyPanel: React.FC<EnemyPanelProps> = ({ onEnemyTypeSelected }) => {
  const [expandedType, setExpandedType] = useState<'zombie' | 'ranged' | 'spawner' | null>(null);
  const [selectedType, setSelectedType] = useState<'zombie' | 'ranged' | 'spawner' | null>(null);

  const toggleExpand = (type: 'zombie' | 'ranged' | 'spawner') => {
    if (expandedType === type) {
      setExpandedType(null);
    } else {
      setExpandedType(type);
    }
  };

  const selectType = (type: 'zombie' | 'ranged' | 'spawner') => {
    setSelectedType(type);
    onEnemyTypeSelected(type);
  };

  return (
    <div className="space-y-2 py-2">
      {/* Zombie - Melee */}
      <div className="border border-blue-600 rounded bg-slate-900">
        <button
          onClick={() => toggleExpand('zombie')}
          className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 transition text-left ${
            selectedType === 'zombie' ? 'bg-blue-900' : ''
          }`}
        >
          <Swords className="w-4 h-4 text-green-400" />
          <span className="text-blue-300 font-semibold flex-1">Melee - Zombie</span>
          <ChevronDown
            className={`w-4 h-4 text-blue-400 transition-transform flex-shrink-0 ${
              expandedType === 'zombie' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedType === 'zombie' && (
          <div className="border-t border-blue-600 px-3 py-2 bg-slate-800 space-y-2">
            <p className="text-xs text-slate-300 mb-2">
              Basic melee zombie with pathfinding and close-range attacks
            </p>
            <Button
              onClick={() => selectType('zombie')}
              className={`w-full text-xs py-1 ${
                selectedType === 'zombie'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {selectedType === 'zombie' ? '✓ Selected' : 'Select Zombie'}
            </Button>
          </div>
        )}
      </div>

      {/* Gun - Ranged */}
      <div className="border border-blue-600 rounded bg-slate-900">
        <button
          onClick={() => toggleExpand('ranged')}
          className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 transition text-left ${
            selectedType === 'ranged' ? 'bg-blue-900' : ''
          }`}
        >
          <Crosshair className="w-4 h-4 text-amber-400" />
          <span className="text-blue-300 font-semibold flex-1">Gun - Ranged</span>
          <ChevronDown
            className={`w-4 h-4 text-blue-400 transition-transform flex-shrink-0 ${
              expandedType === 'ranged' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedType === 'ranged' && (
          <div className="border-t border-blue-600 px-3 py-2 bg-slate-800 space-y-2">
            <p className="text-xs text-slate-300 mb-2">
              Gun-based enemy with ranged attacks and tactical positioning
            </p>
            <Button
              onClick={() => selectType('ranged')}
              className={`w-full text-xs py-1 ${
                selectedType === 'ranged'
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {selectedType === 'ranged' ? '✓ Selected' : 'Select Ranged'}
            </Button>
          </div>
        )}
      </div>

      {/* Spawner */}
      <div className="border border-blue-600 rounded bg-slate-900">
        <button
          onClick={() => toggleExpand('spawner')}
          className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 transition text-left ${
            selectedType === 'spawner' ? 'bg-blue-900' : ''
          }`}
        >
          <Zap className="w-4 h-4 text-purple-400" />
          <span className="text-blue-300 font-semibold flex-1">Spawner - Enemy</span>
          <ChevronDown
            className={`w-4 h-4 text-blue-400 transition-transform flex-shrink-0 ${
              expandedType === 'spawner' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedType === 'spawner' && (
          <div className="border-t border-blue-600 px-3 py-2 bg-slate-800 space-y-2">
            <p className="text-xs text-slate-300 mb-2">
              Zombie spawner with automatic enemy generation and management
            </p>
            <Button
              onClick={() => selectType('spawner')}
              className={`w-full text-xs py-1 ${
                selectedType === 'spawner'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {selectedType === 'spawner' ? '✓ Selected' : 'Select Spawner'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
