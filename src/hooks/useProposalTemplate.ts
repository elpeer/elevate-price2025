import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProposalSection, getDefaultSections } from '@/types/proposal';
import { useToast } from '@/hooks/use-toast';

export interface ProposalTemplate {
  id: string | null;
  title: string;
  content: ProposalSection[];
}

/**
 * Fetches the global default proposal template content.
 * If no row exists yet, returns the hardcoded defaults (without persisting).
 */
export async function fetchDefaultTemplateContent(): Promise<ProposalSection[]> {
  try {
    const { data, error } = await supabase
      .from('proposal_templates')
      .select('content')
      .eq('is_default', true)
      .maybeSingle();

    if (error) throw error;
    if (data?.content && Array.isArray(data.content) && (data.content as any[]).length > 0) {
      return data.content as unknown as ProposalSection[];
    }
  } catch (e) {
    console.warn('[template] falling back to hardcoded defaults', e);
  }
  return getDefaultSections();
}

export function useProposalTemplate() {
  const [template, setTemplate] = useState<ProposalTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchTemplate = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('proposal_templates')
        .select('*')
        .eq('is_default', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setTemplate({
          id: data.id,
          title: data.title,
          content: data.content as unknown as ProposalSection[],
        });
      } else {
        // No row yet — initialize from hardcoded defaults (in-memory only)
        setTemplate({
          id: null,
          title: 'תבנית ברירת מחדל',
          content: getDefaultSections(),
        });
      }
    } catch (e: any) {
      console.error('[template] fetch error', e);
      toast({ title: 'שגיאה בטעינת התבנית', description: e.message, variant: 'destructive' });
      setTemplate({ id: null, title: 'תבנית ברירת מחדל', content: getDefaultSections() });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const saveTemplate = useCallback(async (next: ProposalTemplate) => {
    setSaving(true);
    try {
      if (next.id) {
        const { error } = await supabase
          .from('proposal_templates')
          .update({ title: next.title, content: next.content as any })
          .eq('id', next.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('proposal_templates')
          .insert({ title: next.title, content: next.content as any, is_default: true })
          .select()
          .single();
        if (error) throw error;
        setTemplate({
          id: data.id,
          title: data.title,
          content: data.content as unknown as ProposalSection[],
        });
      }
      toast({ title: 'התבנית נשמרה', description: 'הצעות חדשות יקבלו את התוכן הזה כברירת מחדל' });
      return true;
    } catch (e: any) {
      console.error('[template] save error', e);
      toast({ title: 'שגיאה בשמירת התבנית', description: e.message, variant: 'destructive' });
      return false;
    } finally {
      setSaving(false);
    }
  }, [toast]);

  useEffect(() => { fetchTemplate(); }, [fetchTemplate]);

  return { template, setTemplate, loading, saving, saveTemplate, fetchTemplate };
}
