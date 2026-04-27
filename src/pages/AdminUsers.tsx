import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, Shield, Mail, KeyRound, Pencil } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
import AdminLayout from '@/components/admin/AdminLayout';

interface AdminUser {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
  display_name?: string;
}

const AdminUsers: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Add dialog
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  // Edit dialog
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin');
      if (rolesError) throw rolesError;

      const userIds = roles?.map((r) => r.user_id) || [];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', userIds);
      if (profilesError) throw profilesError;

      const merged = roles?.map((role) => ({
        ...role,
        email: profiles?.find((p) => p.user_id === role.user_id)?.email || 'לא ידוע',
        display_name: profiles?.find((p) => p.user_id === role.user_id)?.display_name || '',
      })) || [];

      setAdmins(merged);
    } catch (error: any) {
      console.error('Error fetching admins:', error);
      toast({ title: 'שגיאה בטעינת משתמשים', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const callAdminFn = async (body: Record<string, any>) => {
    const { data, error } = await supabase.functions.invoke('admin-manage-users', {
      body,
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const handleAddAdmin = async () => {
    if (!newEmail.trim() || !newPassword.trim()) return;
    if (newPassword.length < 6) {
      toast({ title: 'הסיסמה חייבת להיות לפחות 6 תווים', variant: 'destructive' });
      return;
    }
    setAdding(true);
    try {
      await callAdminFn({
        action: 'create',
        email: newEmail.trim(),
        password: newPassword,
        display_name: newName.trim() || undefined,
      });
      toast({ title: 'מנהל נוסף בהצלחה' });
      setShowAddDialog(false);
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      fetchAdmins();
    } catch (error: any) {
      console.error('Error adding admin:', error);
      toast({ title: 'שגיאה בהוספת מנהל', description: error.message, variant: 'destructive' });
    } finally {
      setAdding(false);
    }
  };

  const openEdit = (admin: AdminUser) => {
    setEditTarget(admin);
    setEditEmail(admin.email || '');
    setEditPassword('');
  };

  const handleSaveEdit = async () => {
    if (!editTarget) return;
    setSaving(true);
    try {
      if (editEmail.trim() && editEmail.trim() !== editTarget.email) {
        await callAdminFn({
          action: 'update_email',
          target_user_id: editTarget.user_id,
          email: editEmail.trim(),
        });
      }
      if (editPassword.trim()) {
        if (editPassword.length < 6) {
          toast({ title: 'הסיסמה חייבת להיות לפחות 6 תווים', variant: 'destructive' });
          setSaving(false);
          return;
        }
        await callAdminFn({
          action: 'update_password',
          target_user_id: editTarget.user_id,
          password: editPassword,
        });
      }
      toast({ title: 'הפרטים עודכנו בהצלחה' });
      setEditTarget(null);
      fetchAdmins();
    } catch (error: any) {
      console.error('Error updating admin:', error);
      toast({ title: 'שגיאה בעדכון', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.user_id === user?.id) {
      toast({ title: 'לא ניתן למחוק את עצמך', variant: 'destructive' });
      setDeleteTarget(null);
      return;
    }
    setDeleting(true);
    try {
      await callAdminFn({
        action: 'delete',
        target_user_id: deleteTarget.user_id,
      });
      toast({ title: 'המנהל נמחק בהצלחה' });
      setDeleteTarget(null);
      fetchAdmins();
    } catch (error: any) {
      console.error('Error deleting admin:', error);
      toast({ title: 'שגיאה במחיקה', description: error.message, variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout title="ניהול משתמשים">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="ניהול משתמשים" subtitle="הוספה, עריכה והסרה של מנהלים מהמערכת">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            הוסף מנהל
          </Button>
        </div>

        <div className="bg-white rounded-xl border">
          <div className="p-4 border-b">
            <h2 className="font-medium">מנהלים פעילים</h2>
          </div>
          <div className="divide-y">
            {admins.map((admin, index) => (
              <motion.div
                key={admin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{admin.display_name || admin.email}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {admin.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">מנהל</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(admin)}
                    title="ערוך"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {admin.user_id !== user?.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(admin)}
                      className="text-destructive hover:text-destructive"
                      title="מחק"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Admin Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>הוסף מנהל חדש</DialogTitle>
            <DialogDescription>
              צור משתמש מנהל חדש עם אימייל וסיסמה. המשתמש יוכל להתחבר מיד.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>שם תצוגה (אופציונלי)</Label>
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="גדי כהן"
              />
            </div>
            <div className="space-y-2">
              <Label>אימייל</Label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>סיסמה (לפחות 6 תווים)</Label>
              <Input
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              ביטול
            </Button>
            <Button
              onClick={handleAddAdmin}
              disabled={adding || !newEmail.trim() || !newPassword.trim()}
            >
              {adding ? '⏳ יוצר...' : 'הוסף מנהל'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={!!editTarget} onOpenChange={(o) => !o && setEditTarget(null)}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>עריכת מנהל</DialogTitle>
            <DialogDescription>
              עדכן את האימייל או הגדר סיסמה חדשה. השאר ריק כדי לא לשנות.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>אימייל</Label>
              <Input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <KeyRound className="h-3 w-3" />
                סיסמה חדשה (אופציונלי)
              </Label>
              <Input
                type="password"
                autoComplete="new-password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="השאר ריק כדי לא לשנות"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditTarget(null)}>
              ביטול
            </Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              {saving ? '⏳ שומר...' : 'שמור שינויים'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>מחיקת מנהל</AlertDialogTitle>
            <AlertDialogDescription>
              פעולה זו תמחק את המשתמש לצמיתות מהמערכת ולא ניתן לשחזר אותו. האם להמשיך?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel disabled={deleting}>ביטול</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground"
            >
              {deleting ? '⏳' : 'מחק לצמיתות'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminUsers;
