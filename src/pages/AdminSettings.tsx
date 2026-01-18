import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Globe, Image, Save, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

interface SiteSettings {
  site_title: string;
  site_description: string;
  og_image: string;
  favicon: string;
}

const AdminSettings: React.FC = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: '',
    site_description: '',
    og_image: '',
    favicon: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      const settingsMap: SiteSettings = {
        site_title: '',
        site_description: '',
        og_image: '',
        favicon: '',
      };

      data?.forEach(item => {
        if (item.key in settingsMap) {
          settingsMap[item.key as keyof SiteSettings] = item.value || '';
        }
      });

      setSettings(settingsMap);
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      toast({ title: 'שגיאה בטעינת הגדרות', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: update.value })
          .eq('key', update.key);

        if (error) throw error;
      }

      toast({ title: 'ההגדרות נשמרו בהצלחה' });
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast({ title: 'שגיאה בשמירת הגדרות', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (key: 'og_image' | 'favicon', file: File) => {
    setUploading(key);
    try {
      const ext = file.name.split('.').pop();
      const filePath = `site/${key}-${Date.now()}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from('proposal-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('proposal-assets')
        .getPublicUrl(filePath);

      setSettings(prev => ({ ...prev, [key]: urlData.publicUrl }));
      toast({ title: 'התמונה הועלתה בהצלחה' });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({ title: 'שגיאה בהעלאת תמונה', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(null);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout title="הגדרות אתר">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="הגדרות אתר" subtitle="הגדרות גלובליות עבור האתר">
      <div className="max-w-2xl space-y-6">
        {/* Meta Settings */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-medium">הגדרות מטא</h2>
              <p className="text-sm text-muted-foreground">כותרת ותיאור האתר</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>כותרת האתר (Title)</Label>
              <Input
                value={settings.site_title}
                onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
                placeholder="Elevate Digital Studio"
              />
              <p className="text-xs text-muted-foreground">מופיע בטאב הדפדפן ובתוצאות החיפוש</p>
            </div>

            <div className="space-y-2">
              <Label>תיאור האתר (Description)</Label>
              <Textarea
                value={settings.site_description}
                onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                placeholder="אפיון ועיצוב UX/UI"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">מופיע בתוצאות החיפוש ובשיתופים ברשתות חברתיות</p>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Image className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium">תמונות</h2>
              <p className="text-sm text-muted-foreground">פאביקון ותמונת שיתוף</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Favicon */}
            <div className="space-y-2">
              <Label>פאביקון (Favicon)</Label>
              <div className="flex items-center gap-4">
                {settings.favicon && (
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={settings.favicon} alt="Favicon" className="w-8 h-8 object-contain" />
                  </div>
                )}
                <div className="flex-1 flex gap-2">
                  <Input
                    value={settings.favicon}
                    onChange={(e) => setSettings(prev => ({ ...prev, favicon: e.target.value }))}
                    placeholder="URL או העלה קובץ"
                    dir="ltr"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" className="relative shrink-0" disabled={uploading === 'favicon'}>
                    <input
                      type="file"
                      accept="image/*,.ico"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload('favicon', e.target.files[0])}
                    />
                    {uploading === 'favicon' ? '⏳' : <Upload className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">האייקון הקטן שמופיע בטאב הדפדפן</p>
            </div>

            {/* OG Image */}
            <div className="space-y-2">
              <Label>תמונת שיתוף (OG Image)</Label>
              {settings.og_image && (
                <div className="w-full h-32 bg-secondary rounded-lg overflow-hidden mb-2">
                  <img src={settings.og_image} alt="OG Image" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={settings.og_image}
                  onChange={(e) => setSettings(prev => ({ ...prev, og_image: e.target.value }))}
                  placeholder="URL או העלה קובץ"
                  dir="ltr"
                  className="flex-1"
                />
                <Button variant="outline" size="sm" className="relative shrink-0" disabled={uploading === 'og_image'}>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload('og_image', e.target.files[0])}
                  />
                  {uploading === 'og_image' ? '⏳' : <Upload className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">התמונה שמופיעה כשמשתפים את האתר ברשתות חברתיות (1200x630 מומלץ)</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="h-4 w-4 ml-2" />
            {saving ? '⏳ שומר...' : 'שמור הגדרות'}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
