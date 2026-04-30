import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronLeft,
  FileSignature,
  LayoutTemplate
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import elevateLogo from '@/assets/why-elevate-logo.svg';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backLink?: string;
}

const navItems = [
  { path: '/admin', label: 'הצעות מחיר', icon: FileText },
  { path: '/admin/template', label: 'תבנית', icon: LayoutTemplate },
  { path: '/admin/signatures', label: 'חתימות', icon: FileSignature },
  { path: '/admin/users', label: 'משתמשים', icon: Users },
];

const userMenuItems = [
  { path: '/admin/profile', label: 'הפרופיל שלי', icon: User },
  { path: '/admin/settings', label: 'הגדרות אתר', icon: Settings },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle, backLink }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname.startsWith('/admin/edit');
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-secondary/30" dir="rtl">
      {/* Desktop Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Back */}
            <div className="flex items-center gap-4">
              {backLink ? (
                <Button variant="ghost" size="icon" onClick={() => navigate(backLink)}>
                  <ChevronLeft className="h-5 w-5 rotate-180" />
                </Button>
              ) : null}
              <Link to="/admin" className="flex items-center gap-3">
                <img src={elevateLogo} alt="Elevate" className="h-8" />
                <span className="text-lg font-medium text-foreground hidden sm:block">לוח בקרה</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User & Actions */}
            <div className="flex items-center gap-2">
              {/* User Avatar Dropdown - Desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex items-center gap-2 px-2 h-10 rounded-full hover:bg-secondary">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {user?.email?.[0]?.toUpperCase() ?? 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="text-xs text-muted-foreground">מחובר/ת בתור</div>
                    <div className="text-sm font-medium truncate">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)} className="cursor-pointer">
                      <item.icon className="h-4 w-4 ml-2" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 ml-2" />
                    יציאה
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t">
                <div className="px-4 py-2 text-sm text-muted-foreground">{user?.email}</div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  יציאה
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
