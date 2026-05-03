import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProposalSection, sectionLabels, sectionFieldSchemas, FieldDefinition } from '@/types/proposal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProjectsSelector from './ProjectsSelector';

interface Props {
  section: ProposalSection | null;
  onClose: () => void;
  onUpdate: (sectionId: string, newData: Record<string, any>) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

interface RepeaterItemProps {
  item: any;
  index: number;
  total: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  children: React.ReactNode;
}

const RepeaterItem: React.FC<RepeaterItemProps> = ({ item, index, total, onRemove, onMoveUp, onMoveDown, children }) => {
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={dragControls}
      className="bg-white rounded-xl p-4 space-y-4 relative group border border-border shadow-sm"
    >
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab active:cursor-grabbing touch-none p-1 -m-1 hover:bg-muted rounded"
            aria-label="גרור לשינוי סדר"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex flex-col">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={index === 0}
              onClick={onMoveUp}
              aria-label="הזז למעלה"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={index === total - 1}
              onClick={onMoveDown}
              aria-label="הזז למטה"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm font-medium text-foreground">
            פריט {index + 1}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </Reorder.Item>
  );
};

// Group fields by type for tabbed interface
const groupFields = (schema: FieldDefinition[]) => {
  const simpleFields: FieldDefinition[] = [];
  const repeaterFields: FieldDefinition[] = [];
  
  schema.forEach(field => {
    if (field.type === 'repeater' || (field.type as string) === 'projects-selector') {
      repeaterFields.push(field);
    } else {
      simpleFields.push(field);
    }
  });
  
  return { simpleFields, repeaterFields };
};

const SectionEditorPanel: React.FC<Props> = ({ section, onClose, onUpdate }) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [expandedRepeaters, setExpandedRepeaters] = useState<Record<string, boolean>>({});
  const normalizedRepeatersRef = useRef<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    if (section) {
      setData(JSON.parse(JSON.stringify(section.data || {})));
      normalizedRepeatersRef.current.clear();
    }
  }, [section]);

  if (!section) return null;

  const schema = sectionFieldSchemas[section.type] || [];
  const { simpleFields, repeaterFields } = groupFields(schema);

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

  const moveRepeaterItem = (path: string[], index: number, direction: -1 | 1) => {
    const currentArray = [...(getValueByPath(data, path) || [])];
    const target = index + direction;
    if (target < 0 || target >= currentArray.length) return;
    [currentArray[index], currentArray[target]] = [currentArray[target], currentArray[index]];
    handleChange(path, currentArray);
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
          <div key={pathKey} className="space-y-2">
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
          <div key={pathKey} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Textarea
              value={value || ''}
              onChange={(e) => handleChange(path, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className="bg-white"
            />
          </div>
        );

      case 'number':
        const isPriceField = field.key.toLowerCase().includes('price') || field.label.includes('מחיר') || field.label.includes('עלות');
        return (
          <div key={pathKey} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            <Input
              type="number"
              value={value === 0 || value === undefined || value === null ? '' : value}
              onChange={(e) => handleChange(path, e.target.value === '' ? 0 : Number(e.target.value))}
              placeholder={field.placeholder || (isPriceField ? '0' : '')}
              className="bg-white w-40"
            />
          </div>
        );

      case 'image':
        return (
          <div key={pathKey} className="space-y-2">
            <Label className="text-sm font-medium">{field.label}</Label>
            <div className="flex gap-3 items-start">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-border flex items-center justify-center">
                {value ? (
                  <>
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
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">אין תמונה</span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  value={value || ''}
                  onChange={(e) => handleChange(path, e.target.value)}
                  placeholder="URL או העלה תמונה"
                  className="bg-white text-sm"
                />
                <Button variant="outline" size="sm" className="relative" disabled={isUploading}>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(path, e.target.files[0])}
                  />
                  {isUploading ? '⏳ מעלה...' : <><Upload className="h-4 w-4 ml-2" />העלה תמונה</>}
                </Button>
              </div>
            </div>
          </div>
        );

      case 'repeater':
        const rawItems = Array.isArray(value) ? value : [];
        const itemFields = field.itemFields || [];
        const firstKey = itemFields[0]?.key;

        const needsNormalize = rawItems.some((item: any) => {
          if (!item) return true;
          if (typeof item !== 'object') return true;
          if (Array.isArray(item)) return true;
          return !('id' in item) || !item.id;
        });

        const normalizedItems = rawItems.map((item: any) => {
          if (item && typeof item === 'object' && !Array.isArray(item)) {
            return { ...item, id: item.id || generateId() };
          }
          const obj: Record<string, any> = { id: generateId() };
          if (firstKey) obj[firstKey] = String(item ?? '');
          return obj;
        });

        const items = needsNormalize ? normalizedItems : rawItems;

        if (needsNormalize && !normalizedRepeatersRef.current.has(pathKey)) {
          normalizedRepeatersRef.current.add(pathKey);
          setTimeout(() => handleChange(path, items), 0);
        }

        const isExpanded = expandedRepeaters[pathKey] !== false;
        
        return (
          <div key={pathKey} className={`space-y-3 ${depth > 0 ? 'pr-4 border-r-2 border-primary/20 mr-2' : ''}`}>
            <button
              onClick={() => toggleRepeater(pathKey)}
              className="flex items-center justify-between w-full text-right py-2 px-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <Label className="text-sm font-semibold cursor-pointer">{field.label}</Label>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <Reorder.Group 
                    axis="y" 
                    values={items} 
                    onReorder={(newItems) => reorderRepeaterItems(path, newItems)}
                    className="space-y-3"
                  >
                    {items.map((item: any, index: number) => (
                      <RepeaterItem
                        key={String(item.id)}
                        item={item}
                        index={index}
                        total={items.length}
                        onRemove={() => removeRepeaterItem(path, index)}
                        onMoveUp={() => moveRepeaterItem(path, index, -1)}
                        onMoveDown={() => moveRepeaterItem(path, index, 1)}
                      >
                        <div className="grid gap-4">
                          {field.itemFields?.map((subField) => 
                            renderField(subField, [...path, String(index), subField.key], depth + 1)
                          )}
                        </div>
                      </RepeaterItem>
                    ))}
                  </Reorder.Group>
                  
                  <Button
                    variant="outline"
                    className="w-full border-dashed py-6 text-muted-foreground hover:text-foreground"
                    onClick={() => addRepeaterItem(path, field.itemFields || [])}
                  >
                    <Plus className="h-5 w-5 ml-2" />
                    הוסף פריט חדש
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'projects-selector' as any:
        return (
          <div key={pathKey}>
            <ProjectsSelector
              hiddenIds={Array.isArray(value) ? value : []}
              onChange={(ids) => handleChange(path, ids)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const hasRepeaters = repeaterFields.length > 0;
  const hasSimpleFields = simpleFields.length > 0;

  return (
    <Dialog open={!!section} onOpenChange={() => onClose()}>
      <DialogContent 
        className="max-w-4xl h-[85vh] p-0 flex flex-col" 
        dir="rtl"
      >
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            {sectionLabels[section.type]}
            <span className="text-sm font-normal text-muted-foreground">עריכת תוכן</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {hasRepeaters && hasSimpleFields ? (
            <Tabs defaultValue="general" className="h-full flex flex-col">
              <TabsList className="mx-6 mt-4 justify-start gap-2 bg-secondary/50 p-1 flex-shrink-0">
                <TabsTrigger value="general" className="px-6">
                  הגדרות כלליות
                </TabsTrigger>
                {repeaterFields.map(field => (
                  <TabsTrigger key={field.key} value={field.key} className="px-6">
                    {field.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="general" className="flex-1 overflow-hidden m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 grid gap-5 md:grid-cols-2">
                    {simpleFields.map(field => (
                      <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        {renderField(field, [field.key], 0)}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {repeaterFields.map(field => (
                <TabsContent key={field.key} value={field.key} className="flex-1 overflow-hidden m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      {renderField(field, [field.key], 0)}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <ScrollArea className="h-full">
              <div className="p-6 grid gap-5 md:grid-cols-2">
                {schema.map(field => (
                  <div key={field.key} className={field.type === 'textarea' || field.type === 'repeater' ? 'md:col-span-2' : ''}>
                    {renderField(field, [field.key], 0)}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-secondary/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              ✓ השינויים נשמרים אוטומטית
            </p>
            <Button onClick={onClose}>
              סיום עריכה
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectionEditorPanel;
