import React from 'react';
import { BookOpen } from 'lucide-react';

export const TemplatesPanel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
      <BookOpen className="w-12 h-12 text-cyan-500 mb-3 opacity-70" />
      <h2 className="text-cyan-300 font-bold text-lg mb-2">
        Get Ready to Download
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        Godot ready scripts for your game
      </p>
      <div className="mt-6 text-cyan-600 text-xs opacity-70">
        👉 Check the main panel →
      </div>
    </div>
  );
};
