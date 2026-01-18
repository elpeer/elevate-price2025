import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSignature, Eye, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AdminLayout from '@/components/admin/AdminLayout';

interface SignatureWithProposal {
  id: string;
  proposal_id: string;
  client_name: string;
  signature_data: string;
  signed_at: string;
  agreed_to_terms: boolean;
  created_at: string;
  proposal?: {
    title: string;
    slug: string;
  };
}

const AdminSignatures: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [signatures, setSignatures] = useState<SignatureWithProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignature, setSelectedSignature] = useState<SignatureWithProposal | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    setLoading(true);
    try {
      const { data: sigData, error } = await supabase
        .from('signatures')
        .select('*')
        .order('signed_at', { ascending: false });

      if (error) throw error;

      // Fetch proposal details for each signature
      const signaturesWithProposals = await Promise.all(
        (sigData || []).map(async (sig) => {
          const { data: proposalData } = await supabase
            .from('proposals')
            .select('title, slug')
            .eq('id', sig.proposal_id)
            .single();
          return { ...sig, proposal: proposalData || undefined };
        })
      );

      setSignatures(signaturesWithProposals);
    } catch (error) {
      console.error('Error fetching signatures:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout title="חתימות" subtitle="צפייה בכל החתימות שהתקבלו">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="חתימות" subtitle="צפייה בכל החתימות שהתקבלו">
      {signatures.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-12 text-center"
        >
          <FileSignature className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-medium text-foreground mb-2">
            אין חתימות עדיין
          </h2>
          <p className="text-muted-foreground">
            כאשר לקוחות יחתמו על הצעות, הן יופיעו כאן
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {signatures.map((sig, index) => (
            <motion.div
              key={sig.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-foreground">
                    {sig.client_name}
                  </h3>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 ml-1" />
                    נחתם
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>
                    הצעה: {sig.proposal?.title || 'לא ידוע'}
                  </span>
                  <span>
                    נחתם: {new Date(sig.signed_at).toLocaleDateString('he-IL')} {new Date(sig.signed_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedSignature(sig)}
                  title="צפייה בחתימה"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {sig.proposal?.slug && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/customer/${sig.proposal?.slug}`, '_blank')}
                  >
                    צפה בהצעה
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Signature Detail Dialog */}
      <Dialog open={!!selectedSignature} onOpenChange={() => setSelectedSignature(null)}>
        <DialogContent dir="rtl" className="max-w-lg">
          <DialogHeader>
            <DialogTitle>פרטי חתימה</DialogTitle>
          </DialogHeader>
          {selectedSignature && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">שם לקוח</span>
                  <p className="font-medium">{selectedSignature.client_name}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">תאריך חתימה</span>
                  <p className="font-medium">{new Date(selectedSignature.signed_at).toLocaleDateString('he-IL')}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">הצעה</span>
                  <p className="font-medium">{selectedSignature.proposal?.title || 'לא ידוע'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">אישור תנאים</span>
                  <p className="font-medium">{selectedSignature.agreed_to_terms ? '✅ אושר' : '❌'}</p>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">חתימה</span>
                <div className="mt-2 p-4 bg-secondary rounded-lg">
                  {selectedSignature.signature_data && (
                    <img 
                      src={selectedSignature.signature_data} 
                      alt="חתימת לקוח" 
                      className="max-w-full h-auto mx-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSignatures;
