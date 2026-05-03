import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ExternalLink, FolderOpen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';

interface Props {
  hiddenIds: string[];
  onChange: (ids: string[]) => void;
}

const ProjectsSelector: React.FC<Props> = ({ hiddenIds, onChange }) => {
  const { projects, loading } = useProjects();
  const hidden = new Set(hiddenIds || []);

  const toggle = (id: string) => {
    const next = new Set(hidden);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  const visibleCount = projects.length - hidden.size;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-semibold">פרויקטים להצגה בהצעה זו</Label>
          <p className="text-xs text-muted-foreground mt-1">
            מציג {visibleCount} מתוך {projects.length}. לחץ על עין כדי להסתיר/להציג.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/projects" target="_blank">
            <ExternalLink className="h-3.5 w-3.5 ml-2" />
            ניהול הספרייה
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-sm text-muted-foreground">טוען...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-10 bg-secondary/30 rounded-xl border border-dashed">
          <FolderOpen className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-3">אין פרויקטים בספרייה</p>
          <Button asChild size="sm">
            <Link to="/admin/projects" target="_blank">צור פרויקט ראשון</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((p) => {
            const isHidden = hidden.has(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-right ${
                  isHidden
                    ? 'bg-muted/40 border-border opacity-60'
                    : 'bg-white border-primary/30 hover:border-primary'
                }`}
              >
                <div className="w-12 h-12 rounded bg-secondary overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {p.desktop_image ? (
                    <img src={p.desktop_image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <FolderOpen className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{p.title || 'ללא שם'}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.description}</div>
                </div>
                <div className={`p-2 rounded-full ${isHidden ? 'bg-muted' : 'bg-primary/10 text-primary'}`}>
                  {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsSelector;
