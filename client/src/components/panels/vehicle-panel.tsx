import React, { useState } from 'react';
import { ChevronDown, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VehiclePanelProps {
  onVehicleTypeSelected: (type: 'car') => void;
}

export const VehiclePanel: React.FC<VehiclePanelProps> = ({ onVehicleTypeSelected }) => {
  const [expandedType, setExpandedType] = useState<'car' | null>(null);
  const [selectedType, setSelectedType] = useState<'car' | null>(null);

  const toggleExpand = (type: 'car') => {
    if (expandedType === type) {
      setExpandedType(null);
    } else {
      setExpandedType(type);
    }
  };

  const selectType = (type: 'car') => {
    setSelectedType(type);
    onVehicleTypeSelected(type);
  };

  return (
    <div className="space-y-2 py-2">
      {/* Car */}
      <div className="border border-orange-600 rounded bg-slate-900">
        <button
          onClick={() => toggleExpand('car')}
          className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 transition text-left ${
            selectedType === 'car' ? 'bg-orange-900' : ''
          }`}
        >
          <Car className="w-4 h-4 text-orange-400" />
          <span className="text-orange-300 font-semibold flex-1">Car</span>
          <ChevronDown
            className={`w-4 h-4 text-orange-400 transition-transform flex-shrink-0 ${
              expandedType === 'car' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedType === 'car' && (
          <div className="border-t border-orange-600 px-3 py-2 bg-slate-800 space-y-2">
            <p className="text-xs text-slate-300 mb-2">
              High-performance car with multiplayer and solo support
            </p>
            <p className="text-xs text-orange-200 font-semibold">
              Configured for: Multiplayer + Solo
            </p>
            <Button
              onClick={() => selectType('car')}
              className={`w-full text-xs py-1 ${
                selectedType === 'car'
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {selectedType === 'car' ? '✓ Selected' : 'Select Car'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
