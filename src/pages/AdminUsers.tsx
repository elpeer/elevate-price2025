import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, Shield, Mail } from 'lucide-react';
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
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
      // Get all admin roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin');

      if (rolesError) throw rolesError;

      // Get profiles for these users
      const userIds = roles?.map(r => r.user_id) || [];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', userIds);

      if (profilesError) throw profilesError;

      // Merge data
      const merged = roles?.map(role => ({
        ...role,
        email: profiles?.find(p => p.user_id === role.user_id)?.email || 'לא ידוע',
        display_name: profiles?.find(p => p.user_id === role.user_id)?.display_name || '',
      })) || [];

      setAdmins(merged);
    } catch (error: any) {
      console.error('Error fetching admins:', error);
      toast({ title: 'שגיאה בטעינת משתמשים', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) return;
    
    setAdding(true);
    try {
      // Find user by email in profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('email', newAdminEmail.trim())
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        toast({ 
          title: 'משתמש לא נמצא', 
          description: 'המשתמש צריך להירשם לאתר קודם',
          variant: 'destructive' 
        });
        return;
      }

      // Check if already admin
      const { data: existing } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', profile.user_id)
        .eq('role', 'admin')
        .maybeSingle();

      if (existing) {
        toast({ title: 'המשתמש כבר מנהל', variant: 'destructive' });
        return;
      }

      // Add admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: profile.user_id, role: 'admin' });

      if (error) throw error;

      toast({ title: 'מנהל נוסף בהצלחה' });
      setShowAddDialog(false);
      setNewAdminEmail('');
      fetchAdmins();
    } catch (error: any) {
      console.error('Error adding admin:', error);
      toast({ title: 'שגיאה בהוספת מנהל', description: error.message, variant: 'destructive' });
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveAdmin = async () => {
    if (!deleteId) return;

    try {
      // Don't allow removing yourself
      const adminToRemove = admins.find(a => a.id === deleteId);
      if (adminToRemove?.user_id === user?.id) {
        toast({ title: 'לא ניתן להסיר את עצמך', variant: 'destructive' });
        setDeleteId(null);
        return;
      }

      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      toast({ title: 'מנהל הוסר בהצלחה' });
      fetchAdmins();
    } catch (error: any) {
      console.error('Error removing admin:', error);
      toast({ title: 'שגיאה בהסרת מנהל', variant: 'destructive' });
    } finally {
      setDeleteId(null);
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
    <AdminLayout title="ניהול משתמשים" subtitle="הוספה והסרה של מנהלים מהמערכת">
      <div className="space-y-6">
        {/* Add Admin Button */}
        <div className="flex justify-end">
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 ml-2" />
            הוסף מנהל
          </Button>
        </div>

        {/* Admins List */}
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
                  {admin.user_id !== user?.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(admin.id)}
                      className="text-destructive hover:text-destructive"
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
              הזן את כתובת האימייל של המשתמש שברצונך להפוך למנהל. המשתמש חייב להיות רשום במערכת.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>אימייל המשתמש</Label>
              <Input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              ביטול
            </Button>
            <Button onClick={handleAddAdmin} disabled={adding || !newAdminEmail.trim()}>
              {adding ? '⏳' : 'הוסף מנהל'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>הסרת מנהל</AlertDialogTitle>
            <AlertDialogDescription>
              האם אתה בטוח שברצונך להסיר את ההרשאות מהמשתמש הזה?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveAdmin} className="bg-destructive text-destructive-foreground">
              הסר
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminUsers;
