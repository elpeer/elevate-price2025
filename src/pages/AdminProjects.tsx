import React, { useState } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Plus, Trash2, GripVertical, Upload, X, ChevronUp, ChevronDown, FolderOpen, Search } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProjects, ProjectRecord } from '@/hooks/useProjects';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ImageField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  uploadPath: string;
}> = ({ label, value, onChange, uploadPath }) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${uploadPath}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('proposal-assets').upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from('proposal-assets').getPublicUrl(path);
      onChange(data.publicUrl);
      toast({ title: 'תמונה הועלתה' });
    } catch (e: any) {
      toast({ title: 'שגיאה בהעלאה', description: e.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-3 items-start" dir="rtl">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-border flex items-center justify-center">
          {value ? (
            <>
              <img src={value} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => onChange('')}
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
          <Input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="URL או העלה תמונה" className="bg-white text-sm" />
          <Button variant="outline" size="sm" className="relative" disabled={uploading}>
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
            {uploading ? '⏳ מעלה...' : <><Upload className="h-4 w-4 ml-2" />העלה תמונה</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{
  project: ProjectRecord;
  index: number;
  total: number;
  onUpdate: (patch: Partial<ProjectRecord>) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}> = ({ project, index, total, onUpdate, onDelete, onMove }) => {
  const dragControls = useDragControls();
  const [expanded, setExpanded] = useState(false);

  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={dragControls}
      className="bg-white rounded-xl border border-border shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 p-4">
        <button
          type="button"
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex flex-col">
          <Button type="button" variant="ghost" size="icon" className="h-6 w-6" disabled={index === 0} onClick={() => onMove(-1)}>
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="h-6 w-6" disabled={index === total - 1} onClick={() => onMove(1)}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-12 h-12 rounded bg-secondary flex-shrink-0 overflow-hidden flex items-center justify-center">
          {project.desktop_image ? <img src={project.desktop_image} className="w-full h-full object-cover" alt="" /> : <FolderOpen className="h-5 w-5 text-muted-foreground" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground truncate">{project.title || 'ללא שם'}</div>
          <div className="text-xs text-muted-foreground truncate">{project.description}</div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'סגור' : 'ערוך'}
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {expanded && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-border p-4 space-y-4 bg-secondary/20">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>שם פרויקט</Label>
              <Input value={project.title} onChange={(e) => onUpdate({ title: e.target.value })} className="bg-white" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>תיאור</Label>
              <Textarea value={project.description} onChange={(e) => onUpdate({ description: e.target.value })} rows={3} className="bg-white" />
            </div>
            <ImageField label="תמונה (דסקטופ)" value={project.desktop_image} onChange={(v) => onUpdate({ desktop_image: v })} uploadPath={`projects/${project.id}/desktop`} />
            <ImageField label="תמונה (מובייל)" value={project.mobile_image} onChange={(v) => onUpdate({ mobile_image: v })} uploadPath={`projects/${project.id}/mobile`} />
          </div>
        </motion.div>
      )}
    </Reorder.Item>
  );
};

const AdminProjects: React.FC = () => {
  const { projects, loading, createProject, updateProject, deleteProject, reorderProjects } = useProjects();

  return (
    <AdminLayout title="פרויקטים" subtitle="ספריית הפרויקטים שמופיעים בהצעות המחיר. ערוך כאן פעם אחת – ובחר אילו להציג בכל הצעה.">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">סך הכל {projects.length} פרויקטים</p>
          <Button onClick={() => createProject({})}>
            <Plus className="h-4 w-4 ml-2" />
            פרויקט חדש
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">טוען...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">אין עדיין פרויקטים</p>
            <Button onClick={() => createProject({})}>
              <Plus className="h-4 w-4 ml-2" />
              צור פרויקט ראשון
            </Button>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={projects}
            onReorder={(items) => reorderProjects(items.map(p => p.id))}
            className="space-y-3"
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                total={projects.length}
                onUpdate={(patch) => updateProject(p.id, patch)}
                onDelete={() => {
                  if (confirm(`למחוק את "${p.title}"?`)) deleteProject(p.id);
                }}
                onMove={(dir) => {
                  const ids = projects.map(x => x.id);
                  const target = i + dir;
                  if (target < 0 || target >= ids.length) return;
                  [ids[i], ids[target]] = [ids[target], ids[i]];
                  reorderProjects(ids);
                }}
              />
            ))}
          </Reorder.Group>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;
