import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import sidebarLogo from '@/assets/why-elevate-logo.svg';

const navItems = [
  { id: 'intro', label: 'פתיח' },
  { id: 'about', label: 'עלינו' },
  { id: 'why', label: 'למה אנחנו?' },
  { id: 'values', label: 'ערכי הליבה שלנו' },
  { id: 'testimonials', label: 'לקוחות מספרים' },
  { id: 'projects', label: 'פרויקטים' },
  { id: 'content', label: 'תכולת האתר' },
  { id: 'deliverables', label: 'מה כלול' },
  { id: 'project-details', label: 'פרטים נוספים' },
  { id: 'pricing', label: 'תשלומים' },
  { id: 'signature', label: 'חתימה' },
];

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveItem(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveItem(id);
      setIsOpen(false);
    }
  };

  const currentLabel = navItems.find(item => item.id === activeItem)?.label || 'פתיח';

  return (
    <>
      {/* Mobile Bottom Nav Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-6 py-4 rounded-full backdrop-blur-xl border border-white/20 shadow-lg transition-all"
          style={{ 
            background: 'rgba(244, 244, 244, 0.50)',
            borderRadius: '100px'
          }}
        >
          <ChevronUp className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          <span className="text-foreground font-medium">{currentLabel}</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
          
          {/* Menu Card */}
          <div 
            className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-sm rounded-3xl p-6 shadow-2xl border border-white/30"
            style={{ 
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img 
                src={sidebarLogo} 
                alt="Elevate Logo" 
                className="h-8 w-auto"
              />
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col gap-1" dir="rtl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-right py-3 px-4 rounded-full text-base transition-colors ${
                    activeItem === item.id
                      ? 'bg-secondary text-primary font-medium'
                      : 'text-muted-foreground hover:bg-secondary/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-secondary text-foreground font-medium"
            >
              <ChevronDown className="w-5 h-5" />
              <span>סגירה</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
