import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

export interface CodeEnhancementProps {
  code: string;
  onEnhance?: (enhanced: string) => void;
}

export const CodeEnhancement: React.FC<CodeEnhancementProps> = ({ code, onEnhance }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      // AI enhancement would happen here
      if (onEnhance) {
        onEnhance(code);
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">AI Enhancement</span>
      </div>
      <Button
        onClick={handleEnhance}
        disabled={isEnhancing || !code}
        size="sm"
        className="mt-2"
      >
        {isEnhancing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enhancing...
          </>
        ) : (
          'Enhance Code'
        )}
      </Button>
    </Card>
  );
};

export default CodeEnhancement;
