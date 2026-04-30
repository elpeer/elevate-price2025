import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Proposal, ProposalSection, ClientInfo, getDefaultSections } from '@/types/proposal';
import { fetchDefaultTemplateContent } from '@/hooks/useProposalTemplate';
import { useToast } from '@/hooks/use-toast';

export function useProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedData = (data || []).map((item: any) => ({
        ...item,
        content: item.content as unknown as ProposalSection[],
        client_info: item.client_info as unknown as ClientInfo,
        status: item.status as 'draft' | 'published' | 'signed'
      }));

      setProposals(transformedData);
    } catch (error: any) {
      console.error('Error fetching proposals:', error);
      toast({ title: 'שגיאה בטעינת הצעות', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const createProposal = async (title: string, clientInfo: ClientInfo) => {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9֐-׿]+/g, '-').replace(/^-|-$/g, '')
      || `proposal-${Date.now()}`;

    // Pull the latest template content (falls back to hardcoded defaults)
    const templateContent = await fetchDefaultTemplateContent();

    const insertWithSlug = (slug: string) =>
      supabase
        .from('proposals')
        .insert({
          title,
          slug,
          status: 'published' as const,
          content: templateContent as any,
          client_info: clientInfo as any
        })
        .select()
        .single();

    try {
      let { data, error } = await insertWithSlug(baseSlug);

      if (error?.code === '23505') {
        ({ data, error } = await insertWithSlug(`${baseSlug}-${Date.now()}`));
      }

      if (error) throw error;
      toast({ title: 'הצעה נוצרה בהצלחה', description: `הצעה "${title}" נוצרה` });
      await fetchProposals();
      return data;
    } catch (error: any) {
      console.error('Error creating proposal:', error);
      const description = error?.code === '23505'
        ? 'כבר קיימת הצעה עם כותרת דומה. אנא בחר כותרת אחרת.'
        : error?.message || 'אירעה שגיאה לא צפויה. נסה שוב.';
      toast({ title: 'שגיאה ביצירת הצעה', description, variant: 'destructive' });
      return null;
    }
  };

  const updateProposal = async (id: string, updates: Partial<Proposal>) => {
    try {
      const { error } = await supabase
        .from('proposals')
        .update(updates as any)
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'הצעה עודכנה', description: 'השינויים נשמרו בהצלחה' });
      await fetchProposals();
      return true;
    } catch (error: any) {
      console.error('Error updating proposal:', error);
      toast({ title: 'שגיאה בעדכון הצעה', description: error.message, variant: 'destructive' });
      return false;
    }
  };

  const duplicateProposal = async (id: string) => {
    try {
      const original = proposals.find(p => p.id === id);
      if (!original) throw new Error('הצעה לא נמצאה');

      const newTitle = `${original.title} (העתק)`;
      const slug = `${newTitle.toLowerCase().replace(/[^a-z0-9֐-׿]+/g, '-')}-${Date.now()}`;

      const { data, error } = await supabase
        .from('proposals')
        .insert({
          title: newTitle,
          slug,
          status: 'draft' as const,
          content: original.content as any,
          client_info: original.client_info as any
        })
        .select()
        .single();

      if (error) throw error;
      toast({ title: 'הצעה שוכפלה', description: `נוצרה הצעה חדשה: "${newTitle}"` });
      await fetchProposals();
      return data;
    } catch (error: any) {
      console.error('Error duplicating proposal:', error);
      toast({ title: 'שגיאה בשכפול הצעה', description: error.message, variant: 'destructive' });
      return null;
    }
  };

  const deleteProposal = async (id: string) => {
    try {
      const { error } = await supabase.from('proposals').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'הצעה נמחקה' });
      await fetchProposals();
      return true;
    } catch (error: any) {
      console.error('Error deleting proposal:', error);
      toast({ title: 'שגיאה במחיקת הצעה', description: error.message, variant: 'destructive' });
      return false;
    }
  };

  const getProposalBySlug = async (slug: string): Promise<Proposal | null> => {
    try {
      const { data, error } = await supabase.from('proposals').select('*').eq('slug', slug).maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return { ...data, content: data.content as unknown as ProposalSection[], client_info: data.client_info as unknown as ClientInfo, status: data.status as 'draft' | 'published' | 'signed' };
    } catch (error: any) {
      console.error('Error fetching proposal by slug:', error);
      return null;
    }
  };

  const getProposalById = async (id: string): Promise<Proposal | null> => {
    try {
      const { data, error } = await supabase.from('proposals').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return { ...data, content: data.content as unknown as ProposalSection[], client_info: data.client_info as unknown as ClientInfo, status: data.status as 'draft' | 'published' | 'signed' };
    } catch (error: any) {
      console.error('Error fetching proposal by id:', error);
      return null;
    }
  };

  useEffect(() => { fetchProposals(); }, []);

  return { proposals, loading, fetchProposals, createProposal, updateProposal, duplicateProposal, deleteProposal, getProposalBySlug, getProposalById };
}
