import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProposalTemplate } from '@/hooks/useProposalTemplate';
import { ProposalSection, sectionLabels, getDefaultSections } from '@/types/proposal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Save, Eye, EyeOff, Settings, ChevronUp, ChevronDown, RotateCcw, Search } from 'lucide-react';
import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import SectionEditorPanel from '@/components/admin/SectionEditorPanel';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const SectionRow = ({
  section,
  index,
  total,
  onToggle,
  onEdit,
  onMoveUp,
  onMoveDown,
}: {
  section: ProposalSection;
  index: number;
  total: number;
  onToggle: () => void;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      dragControls={dragControls}
      whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)', zIndex: 50 }}
      className={`flex items-center gap-2 p-3 bg-white rounded-xl border select-none ${section.visible ? 'border-border' : 'border-dashed border-muted opacity-60'}`}
      style={{ listStyle: 'none' }}
    >
      <button
        onPointerDown={(e) => { e.preventDefault(); dragControls.start(e); }}
        className="cursor-grab active:cursor-grabbing p-2 touch-none hover:bg-muted rounded"
        aria-label="גרור לשינוי סדר"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      <div className="flex flex-col">
        <Button variant="ghost" size="icon" className="h-6 w-6" disabled={index === 0} onClick={onMoveUp} aria-label="הזז למעלה">
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" disabled={index === total - 1} onClick={onMoveDown} aria-label="הזז למטה">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <span className="flex-1 font-medium px-2">{sectionLabels[section.type]}</span>
      <Button variant="ghost" size="icon" onClick={onEdit}><Settings className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" onClick={onToggle}>{section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</Button>
    </Reorder.Item>
  );
};

const ProposalTemplateEditor: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { template, setTemplate, loading, saving, saveTemplate } = useProposalTemplate();
  const [editingSection, setEditingSection] = useState<ProposalSection | null>(null);
  const [search, setSearch] = useState('');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const isInitialLoadRef = React.useRef(true);
  const saveTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { if (!authLoading && (!user || !isAdmin)) navigate('/auth'); }, [user, isAdmin, authLoading, navigate]);

  // Debounced autosave whenever template changes (skip the very first load)
  useEffect(() => {
    if (!template) return;
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      const ok = await saveTemplate(template);
      if (ok) setLastSavedAt(new Date());
    }, 800);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [template, saveTemplate]);

  if (loading || authLoading || !template) {
    return (
      <AdminLayout title="תבנית ברירת מחדל">
        <div className="flex items-center justify-center py-12">⏳</div>
      </AdminLayout>
    );
  }

  const sortedSections = [...template.content].sort((a, b) => a.order - b.order);

  const reorder = (newOrder: ProposalSection[]) => {
    setTemplate({ ...template, content: newOrder.map((s, i) => ({ ...s, order: i })) });
  };

  const moveSection = (sectionId: string, direction: -1 | 1) => {
    setTemplate((prev) => {
      if (!prev) return prev;
      const sorted = [...prev.content].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((s) => s.id === sectionId);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= sorted.length) return prev;
      [sorted[index], sorted[target]] = [sorted[target], sorted[index]];
      return { ...prev, content: sorted.map((s, i) => ({ ...s, order: i })) };
    });
  };

  const toggleVisibility = (sectionId: string) =>
    setTemplate({ ...template, content: template.content.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s) });

  const updateSectionData = (sectionId: string, newData: Record<string, any>) => {
    setTemplate({ ...template, content: template.content.map(s => s.id === sectionId ? { ...s, data: newData } : s) });
  };

  const handleSave = () => saveTemplate(template);

  const handleResetToHardcoded = () => {
    setTemplate({ ...template, content: getDefaultSections() });
  };

  return (
    <AdminLayout title="תבנית ברירת מחדל" subtitle="התוכן כאן יהווה ברירת מחדל לכל הצעת מחיר חדשה">
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6 sticky top-0 z-30 bg-secondary/30 -mx-4 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}><ArrowRight className="h-5 w-5" /></Button>
            <Input
              value={template.title}
              onChange={(e) => setTemplate({ ...template, title: e.target.value })}
              className="font-medium text-lg border-none bg-transparent w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline"><RotateCcw className="h-4 w-4 ml-2" />איפוס לברירת מחדל</Button>
              </AlertDialogTrigger>
              <AlertDialogContent dir="rtl">
                <AlertDialogHeader>
                  <AlertDialogTitle>לאפס את התבנית?</AlertDialogTitle>
                  <AlertDialogDescription>
                    הפעולה תחזיר את כל הסקשנים והתוכן לברירת המחדל המקורית של המערכת. השינוי לא ישמר עד שתלחץ "שמירה".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ביטול</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetToHardcoded}>אפס</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSave} disabled={saving} variant="outline">
              <Save className="h-4 w-4 ml-2" />{saving ? 'שומר…' : lastSavedAt ? 'נשמר ✓' : 'שמירה'}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4 mb-6 text-sm text-muted-foreground">
          💡 <strong className="text-foreground">איך זה עובד:</strong> התוכן שתערוך בעמוד הזה ישומש כברירת מחדל בכל הצעת מחיר חדשה שתוצר.
          הצעות קיימות לא ישתנו. <span className="text-primary">השינויים נשמרים אוטומטית.</span>
        </div>

        <h2 className="text-xl font-bold mb-2">סדר וניראות הסקשנים</h2>
        <p className="text-muted-foreground mb-6">השתמש בחיצים ⬆️⬇️ או גרור מהידית לשינוי סדר • ⚙️ לעריכת תוכן</p>

        <Reorder.Group
          axis="y"
          values={sortedSections}
          onReorder={reorder}
          className="space-y-3 list-none p-0"
        >
          {sortedSections.map((section, index) => (
            <SectionRow
              key={section.id}
              section={section}
              index={index}
              total={sortedSections.length}
              onToggle={() => toggleVisibility(section.id)}
              onEdit={() => setEditingSection(section)}
              onMoveUp={() => moveSection(section.id, -1)}
              onMoveDown={() => moveSection(section.id, 1)}
            />
          ))}
        </Reorder.Group>
      </div>
      {editingSection && (() => {
        const fresh = template.content.find(s => s.id === editingSection.id) || editingSection;
        return <SectionEditorPanel section={fresh} onClose={() => setEditingSection(null)} onUpdate={updateSectionData} />;
      })()}
    </AdminLayout>
  );
};

export default ProposalTemplateEditor;
