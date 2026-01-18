import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProposalSection, sectionLabels, sectionFieldSchemas, FieldDefinition } from '@/types/proposal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Props {
  section: ProposalSection | null;
  onClose: () => void;
  onUpdate: (sectionId: string, newData: Record<string, any>) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const SectionEditorPanel: React.FC<Props> = ({ section, onClose, onUpdate }) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [expandedRepeaters, setExpandedRepeaters] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (section) {
      setData(JSON.parse(JSON.stringify(section.data || {})));
    }
  }, [section]);

  if (!section) return null;

  const schema = sectionFieldSchemas[section.type] || [];

  const handleChange = (path: string[], value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      if (current[path[i]] === undefined) {
        current[path[i]] = typeof path[i + 1] === 'number' ? [] : {};
      }
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setData(newData);
    onUpdate(section.id, newData);
  };

  const handleImageUpload = async (path: string[], file: File) => {
    const pathKey = path.join('.');
    setUploading(pathKey);
    try {
      const ext = file.name.split('.').pop();
      const filePath = `${section.id}/${path.join('-')}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('proposal-assets').upload(filePath, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('proposal-assets').getPublicUrl(filePath);
      handleChange(path, urlData.publicUrl);
      toast({ title: 'תמונה הועלתה בהצלחה' });
    } catch (error: any) {
      toast({ title: 'שגיאה בהעלאת תמונה', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(null);
    }
  };

  const addRepeaterItem = (path: string[], itemFields: FieldDefinition[]) => {
    const currentArray = getValueByPath(data, path) || [];
    const newItem: Record<string, any> = { id: generateId() };
    itemFields.forEach(field => {
      if (field.type === 'repeater') {
        newItem[field.key] = [];
      } else if (field.type === 'number') {
        newItem[field.key] = 0;
      } else if (field.type === 'boolean') {
        newItem[field.key] = false;
      } else {
        newItem[field.key] = '';
      }
    });
    handleChange(path, [...currentArray, newItem]);
  };

  const removeRepeaterItem = (path: string[], index: number) => {
    const currentArray = getValueByPath(data, path) || [];
    handleChange(path, currentArray.filter((_: any, i: number) => i !== index));
  };

  const reorderRepeaterItems = (path: string[], newItems: any[]) => {
    handleChange(path, newItems);
  };

  const getValueByPath = (obj: any, path: string[]): any => {
    return path.reduce((acc, key) => acc?.[key], obj);
  };

  const toggleRepeater = (key: string) => {
    setExpandedRepeaters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderField = (field: FieldDefinition, path: string[], depth: number = 0) => {
    const value = getValueByPath(data, path);
    const pathKey = path.join('.');
    const isUploading = uploading === pathKey;

    switch (field.type) {
      case 'text':
        return (
          <div key={pathKey} className="space-y-1.5">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Input
              value={value || ''}
              onChange={(e) => handleChange(path, e.target.value)}
              placeholder={field.placeholder}
              className="bg-white"
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={pathKey} className="space-y-1.5">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Textarea
              value={value || ''}
              onChange={(e) => handleChange(path, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className="bg-white"
            />
          </div>
        );

      case 'number':
        return (
          <div key={pathKey} className="space-y-1.5">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Input
              type="number"
              value={value || 0}
              onChange={(e) => handleChange(path, Number(e.target.value))}
              className="bg-white"
              dir="ltr"
            />
          </div>
        );

      case 'image':
        return (
          <div key={pathKey} className="space-y-1.5">
            <Label className="text-sm font-medium">{field.label}</Label>
            {value && (
              <div className="relative w-full h-24 rounded-lg overflow-hidden bg-secondary">
                <img 
                  src={value} 
                  alt="" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <button
                  onClick={() => handleChange(path, '')}
                  className="absolute top-1 left-1 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={value || ''}
                onChange={(e) => handleChange(path, e.target.value)}
                placeholder="URL או העלה תמונה"
                className="flex-1 bg-white text-xs"
                dir="ltr"
              />
              <Button variant="outline" size="sm" className="relative shrink-0" disabled={isUploading}>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(path, e.target.files[0])}
                />
                {isUploading ? '⏳' : <Upload className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        );

      case 'repeater':
        const rawItems = Array.isArray(value) ? value : [];
        // Ensure every item has an ID for Reorder to work properly
        const items = rawItems.map((item: any, i: number) => ({
          ...item,
          id: item.id || `item-${i}-${Date.now()}`
        }));
        // Sync IDs back to data if they were missing
        if (rawItems.some((item: any, i: number) => !item.id)) {
          handleChange(path, items);
        }
        const isExpanded = expandedRepeaters[pathKey] !== false;
        
        return (
          <div key={pathKey} className={`space-y-2 ${depth > 0 ? 'pr-3 border-r-2 border-primary/20' : ''}`}>
            <button
              onClick={() => toggleRepeater(pathKey)}
              className="flex items-center justify-between w-full text-right"
            >
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium cursor-pointer">{field.label}</Label>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <Reorder.Group 
                    axis="y" 
                    values={items} 
                    onReorder={(newItems) => reorderRepeaterItems(path, newItems)}
                    className="space-y-2"
                  >
                    {items.map((item: any, index: number) => (
                      <Reorder.Item
                        key={item.id}
                        value={item}
                        className="bg-secondary/50 rounded-lg p-3 space-y-3 relative group cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-muted-foreground">
                              פריט {index + 1}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeRepeaterItem(path, index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {field.itemFields?.map((subField) => 
                          renderField(subField, [...path, String(index), subField.key], depth + 1)
                        )}
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-dashed"
                    onClick={() => addRepeaterItem(path, field.itemFields || [])}
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    הוסף פריט
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-[420px] bg-background shadow-2xl z-50 flex flex-col border-l"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div>
            <h3 className="font-bold text-lg">{sectionLabels[section.type]}</h3>
            <p className="text-xs text-muted-foreground">עריכת תוכן הסקשן</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {schema.map((field) => renderField(field, [field.key], 0))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <p className="text-xs text-muted-foreground text-center">
            השינויים נשמרים אוטומטית
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionEditorPanel;
