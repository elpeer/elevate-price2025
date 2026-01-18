import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Copy, 
  Trash2, 
  Eye, 
  Edit, 
  LogOut, 
  FileText,
  CheckCircle,
  Clock,
  Send
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProposals } from '@/hooks/useProposals';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import CreateProposalDialog from '@/components/admin/CreateProposalDialog';
import elevateLogo from '@/assets/why-elevate-logo.svg';

const statusConfig = {
  draft: { label: 'טיוטה', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  published: { label: 'פורסם', icon: Send, color: 'bg-blue-100 text-blue-800' },
  signed: { label: 'נחתם', icon: CheckCircle, color: 'bg-green-100 text-green-800' }
};

const Admin: React.FC = () => {
  const { user, signOut, isAdmin, loading: authLoading } = useAuth();
  const { proposals, loading, duplicateProposal, deleteProposal } = useProposals();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Redirect if not admin
  React.useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleView = (slug: string) => {
    window.open(`/customer/${slug}`, '_blank');
  };

  const handleDuplicate = async (id: string) => {
    await duplicateProposal(id);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProposal(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={elevateLogo} alt="Elevate" className="h-8" />
            <span className="text-lg font-medium text-foreground">לוח בקרה</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 ml-2" />
              יציאה
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">הצעות מחיר</h1>
            <p className="text-muted-foreground mt-1">
              ניהול וצפייה בכל הצעות המחיר שלך
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            הצעה חדשה
          </Button>
        </div>

        {/* Proposals Grid */}
        {proposals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 text-center"
          >
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-medium text-foreground mb-2">
              אין הצעות מחיר עדיין
            </h2>
            <p className="text-muted-foreground mb-6">
              צור את הצעת המחיר הראשונה שלך
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 ml-2" />
              הצעה חדשה
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {proposals.map((proposal, index) => {
              const StatusIcon = statusConfig[proposal.status].icon;
              return (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-foreground">
                        {proposal.title}
                      </h3>
                      <Badge className={statusConfig[proposal.status].color}>
                        <StatusIcon className="h-3 w-3 ml-1" />
                        {statusConfig[proposal.status].label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>
                        לקוח: {proposal.client_info?.companyName || 'לא צוין'}
                      </span>
                      <span>
                        נוצר: {new Date(proposal.created_at).toLocaleDateString('he-IL')}
                      </span>
                      <span className="text-primary font-mono text-xs">
                        /customer/{proposal.slug}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(proposal.slug)}
                      title="צפייה"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(proposal.id)}
                      title="עריכה"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDuplicate(proposal.id)}
                      title="שכפול"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(proposal.id)}
                      className="text-destructive hover:text-destructive"
                      title="מחיקה"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* Create Dialog */}
      <CreateProposalDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
            <AlertDialogDescription>
              פעולה זו לא ניתנת לביטול. ההצעה תימחק לצמיתות.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              מחיקה
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
