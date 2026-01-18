import React, { useState } from 'react';
import { X, Upload, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProposalSection, sectionLabels } from '@/types/proposal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Props {
  section: ProposalSection | null;
  onClose: () => void;
  onUpdate: (sectionId: string, newData: Record<string, any>) => void;
}

const SectionEditorPanel: React.FC<Props> = ({ section, onClose, onUpdate }) => {
  const [data, setData] = useState<Record<string, any>>(section?.data || {});
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  if (!section) return null;

  const handleChange = (key: string, value: any) => {
    const newData = { ...data, [key]: value };
    setData(newData);
    onUpdate(section.id, newData);
  };

  const handleImageUpload = async (key: string, file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${section.id}/${key}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('proposal-assets').upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('proposal-assets').getPublicUrl(path);
      handleChange(key, urlData.publicUrl);
      toast({ title: 'תמונה הועלתה בהצלחה' });
    } catch (error: any) {
      toast({ title: 'שגיאה בהעלאת תמונה', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const renderField = (key: string, value: any, label: string) => {
    if (key.toLowerCase().includes('image') || key.toLowerCase().includes('background')) {
      return (
        <div key={key} className="space-y-2">
          <Label>{label}</Label>
          {value && <img src={value} alt="" className="w-full h-32 object-cover rounded-lg" />}
          <div className="flex gap-2">
            <Input value={value || ''} onChange={(e) => handleChange(key, e.target.value)} placeholder="URL של תמונה" className="flex-1" dir="ltr" />
            <Button variant="outline" size="icon" className="relative" disabled={uploading}>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && handleImageUpload(key, e.target.files[0])} />
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }
    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          <Label>{label}</Label>
          {value.map((item, i) => (
            <div key={i} className="p-3 bg-secondary rounded-lg space-y-2">
              {typeof item === 'string' ? (
                <Input value={item} onChange={(e) => { const arr = [...value]; arr[i] = e.target.value; handleChange(key, arr); }} />
              ) : (
                Object.keys(item).map(subKey => (
                  <div key={subKey}>
                    <Label className="text-xs">{subKey}</Label>
                    <Input value={item[subKey] || ''} onChange={(e) => { const arr = [...value]; arr[i] = { ...arr[i], [subKey]: e.target.value }; handleChange(key, arr); }} />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      );
    }
    if (typeof value === 'string' && value.length > 100) {
      return <div key={key} className="space-y-2"><Label>{label}</Label><Textarea value={value} onChange={(e) => handleChange(key, e.target.value)} rows={4} /></div>;
    }
    return <div key={key} className="space-y-2"><Label>{label}</Label><Input value={value || ''} onChange={(e) => handleChange(key, e.target.value)} /></div>;
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col" dir="rtl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg">{sectionLabels[section.type]}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(data).map(([key, value]) => renderField(key, value, key))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionEditorPanel;
