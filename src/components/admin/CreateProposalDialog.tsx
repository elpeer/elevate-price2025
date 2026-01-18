import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProposals } from '@/hooks/useProposals';
import { ClientInfo } from '@/types/proposal';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProposalDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { createProposal } = useProposals();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    clientName: '',
    companyName: '',
    contactPerson: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    const proposal = await createProposal(title, clientInfo);
    setLoading(false);
    
    if (proposal) {
      onOpenChange(false);
      navigate(`/admin/edit/${proposal.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>הצעה חדשה</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>שם ההצעה</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="לדוגמה: הצעה עבור חברת ABC" />
          </div>
          <div>
            <Label>שם החברה</Label>
            <Input value={clientInfo.companyName} onChange={(e) => setClientInfo({...clientInfo, companyName: e.target.value})} />
          </div>
          <div>
            <Label>איש קשר</Label>
            <Input value={clientInfo.contactPerson} onChange={(e) => setClientInfo({...clientInfo, contactPerson: e.target.value})} />
          </div>
          <div>
            <Label>אימייל</Label>
            <Input type="email" value={clientInfo.email} onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})} dir="ltr" />
          </div>
          <div>
            <Label>טלפון</Label>
            <Input value={clientInfo.phone} onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})} dir="ltr" />
          </div>
          <Button type="submit" className="w-full" disabled={loading || !title.trim()}>
            {loading ? '⏳' : 'יצירת הצעה'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalDialog;
