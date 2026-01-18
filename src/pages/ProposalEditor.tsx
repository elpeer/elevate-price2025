import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProposals } from '@/hooks/useProposals';
import { Proposal, ProposalSection, sectionLabels } from '@/types/proposal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Save, Eye, EyeOff, GripVertical, Send } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SortableItem = ({ section, onToggle }: { section: ProposalSection; onToggle: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  
  return (
    <div ref={setNodeRef} style={style} className={`flex items-center gap-3 p-4 bg-white rounded-xl border ${section.visible ? 'border-border' : 'border-dashed border-muted opacity-60'}`}>
      <button {...attributes} {...listeners} className="cursor-grab"><GripVertical className="h-5 w-5 text-muted-foreground" /></button>
      <span className="flex-1 font-medium">{sectionLabels[section.type]}</span>
      <Button variant="ghost" size="icon" onClick={onToggle}>{section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</Button>
    </div>
  );
};

const ProposalEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { getProposalById, updateProposal } = useProposals();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate('/auth');
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (id) {
      getProposalById(id).then((data) => { setProposal(data); setLoading(false); });
    }
  }, [id]);

  if (loading || authLoading) return <div className="min-h-screen flex items-center justify-center">⏳</div>;
  if (!proposal) return <div className="min-h-screen flex items-center justify-center">הצעה לא נמצאה</div>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = proposal.content.findIndex(s => s.id === active.id);
      const newIndex = proposal.content.findIndex(s => s.id === over.id);
      const newContent = arrayMove(proposal.content, oldIndex, newIndex).map((s, i) => ({ ...s, order: i }));
      setProposal({ ...proposal, content: newContent });
    }
  };

  const toggleVisibility = (sectionId: string) => {
    const newContent = proposal.content.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s);
    setProposal({ ...proposal, content: newContent });
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProposal(proposal.id, { content: proposal.content, title: proposal.title, status: proposal.status, client_info: proposal.client_info });
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-secondary/30" dir="rtl">
      <header className="bg-white border-b sticky top-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}><ArrowRight className="h-5 w-5" /></Button>
          <Input value={proposal.title} onChange={(e) => setProposal({ ...proposal, title: e.target.value })} className="font-medium text-lg border-none bg-transparent w-64" />
        </div>
        <div className="flex items-center gap-3">
          <Select value={proposal.status} onValueChange={(v: any) => setProposal({ ...proposal, status: v })}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">טיוטה</SelectItem>
              <SelectItem value="published">פורסם</SelectItem>
              <SelectItem value="signed">נחתם</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => window.open(`/p/${proposal.slug}`, '_blank')}><Eye className="h-4 w-4 ml-2" />תצוגה מקדימה</Button>
          <Button onClick={handleSave} disabled={saving}><Save className="h-4 w-4 ml-2" />{saving ? '⏳' : 'שמירה'}</Button>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">סדר וניראות הסקשנים</h2>
        <p className="text-muted-foreground mb-6">גרור כדי לשנות סדר, לחץ על העין כדי להסתיר/להציג</p>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={proposal.content.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {proposal.content.sort((a, b) => a.order - b.order).map(section => (
                <SortableItem key={section.id} section={section} onToggle={() => toggleVisibility(section.id)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
};

export default ProposalEditor;
