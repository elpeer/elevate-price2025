import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import elevateLogo from '@/assets/elevate-logo.svg';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'שגיאה',
        description: 'נא למלא את כל השדות',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast({
        title: 'שגיאת התחברות',
        description: 'אימייל או סיסמה שגויים',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={elevateLogo} alt="Elevate" className="h-10" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">התחברות למערכת</h1>
            <p className="text-muted-foreground text-sm">
              הזינו את פרטי ההתחברות שלכם
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-right block mb-2">
                אימייל
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="text-left"
                dir="ltr"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-right block mb-2">
                סיסמה
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="text-left pl-10"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <>
                  <LogIn className="h-4 w-4 ml-2" />
                  התחברות
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-xs mt-6">
            גישה למערכת זו מוגבלת למנהלים בלבד
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
