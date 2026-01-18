import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ScrollAnimation } from '../ScrollAnimation';
import SignatureCanvas from '../SignatureCanvas';
import HebrewDatePicker from '../HebrewDatePicker';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SignatureData { title?: string; agreementText?: string; }
interface Props { data: SignatureData; proposalId?: string; proposalStatus?: string; }

const SignatureSectionDynamic: React.FC<Props> = ({ data, proposalId, proposalStatus }) => {
  const [clientName, setClientName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySigned, setAlreadySigned] = useState(false);
  const [existingSignature, setExistingSignature] = useState<{ client_name: string; signed_at: string } | null>(null);
  const { toast } = useToast();

  const title = data.title || 'אישור לקוח';
  const agreementText = data.agreementText || 'בחתימה מעלה, אני מאשר שקראתי, הבנתי והסכמתי לכל התנאים, התנאים והמדיניות המפורטים בהסכם פרויקט ADU.';

  // Check if already signed
  useEffect(() => {
    const checkSignature = async () => {
      if (!proposalId) return;
      const { data: sigData } = await supabase
        .from('signatures')
        .select('client_name, signed_at')
        .eq('proposal_id', proposalId)
        .maybeSingle();
      if (sigData) {
        setAlreadySigned(true);
        setExistingSignature(sigData);
      }
    };
    checkSignature();
  }, [proposalId]);

  const canSubmit = agreed && signatureData && clientName.trim() !== '' && proposalId && (proposalStatus === 'published' || proposalStatus === 'signed') && !alreadySigned;

  const handleSubmit = async () => {
    if (!canSubmit || !proposalId || alreadySigned) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('signatures').insert({ proposal_id: proposalId, client_name: clientName, signature_data: signatureData, agreed_to_terms: agreed });
      if (error) throw error;
      await supabase.from('proposals').update({ status: 'signed' }).eq('id', proposalId);
      setSubmitted(true);
      toast({ title: 'ההצעה נחתמה בהצלחה!', description: 'תודה רבה' });
    } catch (error: any) {
      toast({ title: 'שגיאה בשמירת החתימה', description: error.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  // Already signed view
  if (alreadySigned && existingSignature) {
    return (
      <section id="signature" className="w-full bg-background py-12 px-6 md:px-16 pb-32 md:pb-12" dir="rtl">
        <div className="max-w-2xl mx-auto text-center py-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-green-600" /></motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-4">ההצעה נחתמה</h2>
          <p className="text-muted-foreground mb-2">נחתם על ידי: <strong>{existingSignature.client_name}</strong></p>
          <p className="text-muted-foreground">בתאריך: {new Date(existingSignature.signed_at).toLocaleDateString('he-IL')}</p>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section id="signature" className="w-full bg-background py-12 px-6 md:px-16 pb-32 md:pb-12" dir="rtl">
        <div className="max-w-2xl mx-auto text-center py-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-10 h-10 text-green-600" /></motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-4">תודה רבה!</h2>
          <p className="text-muted-foreground">ההצעה נחתמה בהצלחה. ניצור איתך קשר בהקדם.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="signature" className="w-full bg-background py-12 px-6 md:px-16 pb-32 md:pb-12" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="md:order-1">
            <ScrollAnimation direction="right"><h2 className="text-2xl md:text-4xl font-normal text-foreground text-right mb-8 md:mb-12">{title}</h2></ScrollAnimation>
            <div className="space-y-6 md:space-y-8">
              <ScrollAnimation delay={0.1}><div><label className="block text-right text-base md:text-lg font-medium text-foreground mb-2 md:mb-3">שם לקוח</label><input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="הכנס שם מלא" className="w-full bg-secondary rounded-full px-5 md:px-6 py-3 md:py-4 text-right text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" /></div></ScrollAnimation>
              <ScrollAnimation delay={0.2}><div><label className="block text-right text-base md:text-lg font-medium text-foreground mb-2 md:mb-3">תאריך</label><HebrewDatePicker selectedDate={selectedDate} onChange={setSelectedDate} placeholder="בחר תאריך" /></div></ScrollAnimation>
            </div>
          </div>
          <div className="md:order-2">
            <ScrollAnimation direction="left">
              <div className="rounded-2xl md:rounded-3xl p-6 md:p-8" style={{ backgroundColor: '#F3F5FF' }}>
                <div className="text-right mb-4 md:mb-6"><h3 className="text-xl md:text-2xl font-medium text-foreground">חתימה</h3><p className="text-muted-foreground text-sm md:text-base">יש לחתום בשדה הבא וללחוץ אישור.</p></div>
                <div className="mb-4 md:mb-6"><SignatureCanvas onSignatureChange={setSignatureData} /></div>
                <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setAgreed(!agreed)} className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded border-2 flex items-center justify-center transition-colors ${agreed ? 'bg-primary border-primary' : 'bg-white border-muted-foreground'}`}>{agreed && <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />}</motion.button>
                  <p className="text-foreground text-right leading-6 md:leading-7 text-xs md:text-sm">{agreementText}</p>
                </div>
                <motion.button whileHover={canSubmit ? { scale: 1.02 } : {}} whileTap={canSubmit ? { scale: 0.98 } : {}} onClick={handleSubmit} disabled={!canSubmit || submitting} className={`px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-2 md:gap-3 transition-colors ${canSubmit && !submitting ? 'bg-primary text-white hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}><span className="font-medium text-sm md:text-base">{submitting ? '⏳' : 'אישור'}</span><div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${canSubmit ? 'bg-white' : 'bg-muted-foreground'}`} /></motion.button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureSectionDynamic;
