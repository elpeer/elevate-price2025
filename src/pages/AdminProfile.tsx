import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminProfile: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setDisplayName(data?.display_name || '');
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ title: 'הפרופיל עודכן בהצלחה' });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({ title: 'שגיאה בעדכון הפרופיל', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: 'הסיסמאות לא תואמות', variant: 'destructive' });
      return;
    }

    if (newPassword.length < 6) {
      toast({ title: 'הסיסמה חייבת להכיל לפחות 6 תווים', variant: 'destructive' });
      return;
    }

    setSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({ title: 'הסיסמה עודכנה בהצלחה' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast({ title: 'שגיאה בשינוי הסיסמה', description: error.message, variant: 'destructive' });
    } finally {
      setSavingPassword(false);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout title="הפרופיל שלי">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="הפרופיל שלי" subtitle="עדכון פרטים אישיים וסיסמה">
      <div className="max-w-2xl space-y-6">
        {/* Profile Info */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium">פרטים אישיים</h2>
              <p className="text-sm text-muted-foreground">עדכן את השם והאימייל שלך</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>שם תצוגה</Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="השם שיוצג במערכת"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                אימייל
              </Label>
              <Input
                value={email}
                disabled
                className="bg-secondary"
              />
              <p className="text-xs text-muted-foreground">לא ניתן לשנות את האימייל</p>
            </div>

            <Button onClick={handleSaveProfile} disabled={saving}>
              <Save className="h-4 w-4 ml-2" />
              {saving ? '⏳' : 'שמור שינויים'}
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Lock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium">שינוי סיסמה</h2>
              <p className="text-sm text-muted-foreground">עדכן את סיסמת הכניסה שלך</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>סיסמה חדשה</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="הזן סיסמה חדשה"
              />
            </div>

            <div className="space-y-2">
              <Label>אימות סיסמה חדשה</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="הזן את הסיסמה שוב"
              />
            </div>

            <Button 
              onClick={handleChangePassword} 
              disabled={savingPassword || !newPassword || !confirmPassword}
              variant="outline"
            >
              <Lock className="h-4 w-4 ml-2" />
              {savingPassword ? '⏳' : 'שנה סיסמה'}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
