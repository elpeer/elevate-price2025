import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  desktop_image: string;
  mobile_image: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setProjects(data as ProjectRecord[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (payload: Partial<ProjectRecord>) => {
    const maxOrder = projects.reduce((m, p) => Math.max(m, p.sort_order), 0);
    const { data, error } = await supabase
      .from('projects')
      .insert({
        title: payload.title || 'פרויקט חדש',
        description: payload.description || '',
        desktop_image: payload.desktop_image || '',
        mobile_image: payload.mobile_image || '',
        sort_order: maxOrder + 10,
      })
      .select()
      .single();
    if (!error && data) {
      setProjects(prev => [...prev, data as ProjectRecord]);
      return data as ProjectRecord;
    }
    return null;
  };

  const updateProject = async (id: string, patch: Partial<ProjectRecord>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)));
    await supabase.from('projects').update(patch).eq('id', id);
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    await supabase.from('projects').delete().eq('id', id);
  };

  const reorderProjects = async (orderedIds: string[]) => {
    const updates = orderedIds.map((id, idx) => ({ id, sort_order: (idx + 1) * 10 }));
    setProjects(prev => {
      const map = new Map(prev.map(p => [p.id, p]));
      return updates
        .map(u => {
          const p = map.get(u.id);
          return p ? { ...p, sort_order: u.sort_order } : null;
        })
        .filter(Boolean) as ProjectRecord[];
    });
    await Promise.all(
      updates.map(u =>
        supabase.from('projects').update({ sort_order: u.sort_order }).eq('id', u.id)
      )
    );
  };

  return { projects, loading, fetchProjects, createProject, updateProject, deleteProject, reorderProjects };
};
