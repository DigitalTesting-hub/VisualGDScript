import React, { useState, useEffect } from 'react';
import { Download, FileCode, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  file: string;
  size: string;
}

export const TemplatesMainPanel: React.FC = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates/library');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
        setCategories(['All', ...(data.categories || [])]);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const filteredTemplates =
    selectedCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const downloadTemplate = (templateId: string) => {
    setLoading(true);
    fetch(`/api/templates/library/${templateId}/download`)
      .then((res) => {
        if (res.ok) {
          return res.blob();
        }
        throw new Error('Download failed');
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const template = templates.find((t) => t.id === templateId);
        a.download = template?.file || `${templateId}.gd`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast({ title: 'Downloaded', description: `${template?.name} script downloaded!` });
      })
      .catch((error) => {
        console.error('Download error:', error);
        toast({ title: 'Error', description: 'Failed to download template', variant: 'destructive' });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 border-l-2 border-cyan-600 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 p-3 border-b border-cyan-600">
        <h2 className="text-cyan-300 font-bold text-sm flex items-center gap-2 mb-1">
          <FileCode className="w-4 h-4" /> Godot Template Scripts
        </h2>
        <p className="text-slate-400 text-xs">9 ready-to-use game system scripts for Godot 4.4</p>
      </div>

      {/* Category Filter */}
      <div className="px-3 py-2.5 border-b border-slate-700 bg-slate-900">
        <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
          <Filter className="w-3 h-3" /> Filter
        </div>
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
              className={`text-xs h-7 ${
                selectedCategory === cat
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">No templates found</div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-slate-800 rounded p-3 border border-slate-700 hover:border-cyan-600 transition"
              >
                {/* Template Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-cyan-300 font-semibold text-sm">{template.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-purple-400 text-xs px-2 py-0.5 bg-slate-700 rounded">
                        {template.category}
                      </span>
                      <span className="text-slate-500 text-xs">{template.size}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs mb-2.5 leading-relaxed">{template.description}</p>

                {/* Download Button */}
                <Button
                  onClick={() => downloadTemplate(template.id)}
                  disabled={loading}
                  size="sm"
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs py-2"
                >
                  <Download className="w-3 h-3 mr-1.5" /> Download {template.file}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-900 p-2 text-xs text-slate-500">
        📝 All scripts are fully documented and ready to use in Godot 4.4
      </div>
    </div>
  );
};
