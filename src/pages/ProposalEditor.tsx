import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProposals } from '@/hooks/useProposals';
import { Proposal, ProposalSection, sectionLabels } from '@/types/proposal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Save, Eye, EyeOff, Settings, ChevronUp, ChevronDown } from 'lucide-react';
import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionEditorPanel from '@/components/admin/SectionEditorPanel';

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
        <Button
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
      <span className="flex-1 font-medium px-2">{sectionLabels[section.type]}</span>
      <Button variant="ghost" size="icon" onClick={onEdit}><Settings className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" onClick={onToggle}>{section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</Button>
    </Reorder.Item>
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
  const [editingSection, setEditingSection] = useState<ProposalSection | null>(null);

  useEffect(() => { if (!authLoading && (!user || !isAdmin)) navigate('/auth'); }, [user, isAdmin, authLoading, navigate]);
  useEffect(() => { if (id) getProposalById(id).then((data) => { setProposal(data); setLoading(false); }); }, [id]);

  if (loading || authLoading) return <div className="min-h-screen flex items-center justify-center">⏳</div>;
  if (!proposal) return <div className="min-h-screen flex items-center justify-center">הצעה לא נמצאה</div>;

  const sortedSections = [...proposal.content].sort((a, b) => a.order - b.order);

  const reorder = (newOrder: ProposalSection[]) => {
    setProposal({ ...proposal, content: newOrder.map((s, i) => ({ ...s, order: i })) });
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sortedSections.length) return;
    const next = [...sortedSections];
    [next[index], next[target]] = [next[target], next[index]];
    reorder(next);
  };

  const toggleVisibility = (sectionId: string) => setProposal({ ...proposal, content: proposal.content.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s) });
  
  const updateSectionData = (sectionId: string, newData: Record<string, any>) => {
    setProposal({ ...proposal, content: proposal.content.map(s => s.id === sectionId ? { ...s, data: newData } : s) });
  };

  const handleSave = async () => { setSaving(true); await updateProposal(proposal.id, { content: proposal.content, title: proposal.title, status: proposal.status, client_info: proposal.client_info, slug: proposal.slug }); setSaving(false); };

  return (
    <div className="min-h-screen bg-secondary/30" dir="rtl">
      <header className="bg-white border-b sticky top-0 z-40 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}><ArrowRight className="h-5 w-5" /></Button>
          <Input value={proposal.title} onChange={(e) => setProposal({ ...proposal, title: e.target.value })} className="font-medium text-lg border-none bg-transparent w-64" />
        </div>
        <div className="flex items-center gap-3">
          <Select value={proposal.status} onValueChange={(v: any) => setProposal({ ...proposal, status: v })}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="draft">טיוטה</SelectItem><SelectItem value="published">פורסם</SelectItem><SelectItem value="signed">נחתם</SelectItem></SelectContent></Select>
          <Button variant="outline" onClick={() => window.open(`/customer/${proposal.slug}`, '_blank')}><Eye className="h-4 w-4 ml-2" />תצוגה</Button>
          <Button onClick={handleSave} disabled={saving}><Save className="h-4 w-4 ml-2" />{saving ? '⏳' : 'שמירה'}</Button>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Client Info Editor */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">פרטי לקוח</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">שם חברה</label>
              <Input 
                value={proposal.client_info?.companyName || ''} 
                onChange={(e) => setProposal({ ...proposal, client_info: { ...proposal.client_info, companyName: e.target.value } })} 
                placeholder="שם חברה"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">איש קשר</label>
              <Input 
                value={proposal.client_info?.contactPerson || ''} 
                onChange={(e) => setProposal({ ...proposal, client_info: { ...proposal.client_info, contactPerson: e.target.value } })} 
                placeholder="איש קשר"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">אימייל</label>
              <Input 
                value={proposal.client_info?.email || ''} 
                onChange={(e) => setProposal({ ...proposal, client_info: { ...proposal.client_info, email: e.target.value } })} 
                placeholder="email@example.com"
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">טלפון</label>
              <Input 
                value={proposal.client_info?.phone || ''} 
                onChange={(e) => setProposal({ ...proposal, client_info: { ...proposal.client_info, phone: e.target.value } })} 
                placeholder="050-0000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">טלפון משני</label>
              <Input 
                value={proposal.client_info?.secondaryPhone || ''} 
                onChange={(e) => setProposal({ ...proposal, client_info: { ...proposal.client_info, secondaryPhone: e.target.value } })} 
                placeholder="טלפון משני (אופציונלי)"
              />
            </div>
          </div>
        </div>

        {/* Slug Editor */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">כתובת הצעה (Slug)</label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">/customer/</span>
            <Input 
              value={proposal.slug} 
              onChange={(e) => setProposal({ ...proposal, slug: e.target.value.toLowerCase().replace(/[^a-z0-9\u0590-\u05FF-]/g, '-') })} 
              className="flex-1 font-mono text-sm"
              placeholder="slug-name"
            />
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-2">סדר וניראות הסקשנים</h2>
        <p className="text-muted-foreground mb-6">גרור לשינוי סדר, לחץ על ⚙️ לעריכת תוכן</p>
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
              onMoveUp={() => moveSection(index, -1)}
              onMoveDown={() => moveSection(index, 1)}
            />
          ))}
        </Reorder.Group>
      </main>
      {editingSection && <SectionEditorPanel section={editingSection} onClose={() => setEditingSection(null)} onUpdate={updateSectionData} />}
    </div>
  );
};

export default ProposalEditor;
