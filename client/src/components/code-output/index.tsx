import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';

export interface CodeOutputProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({
  code,
  language = 'gdscript',
  title = 'GDScript Output'
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleClear = () => {
    window.location.reload();
  };

  return (
    <div className="code-output flex flex-col h-full">
      <div className="code-output-header flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <h3>{title}</h3>
          <span className="language-badge">{language}</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-7 text-xs"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleClear}
            className="h-7 text-xs text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
        </div>
      </div>
      <div className="gdscript-output-container flex-1 overflow-y-auto">
        <pre className="gdscript-output">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeOutput;
