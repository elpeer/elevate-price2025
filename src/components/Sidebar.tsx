import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'intro', label: 'פתיח' },
  { id: 'about', label: 'עלינו' },
  { id: 'why', label: 'למה אנחנו' },
  { id: 'testimonials', label: 'לקוחות מספרים' },
  { id: 'projects', label: 'פרויקטים' },
  { id: 'content', label: 'תכולת האתר' },
  { id: 'deliverables', label: 'מה כלול' },
  { id: 'pricing', label: 'תשלומים' },
  { id: 'signature', label: 'חתימה' },
];

const Sidebar: React.FC = () => {
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
    }
  };

  return (
    <aside className="w-[220px] bg-background border-r border-border fixed top-0 right-0 h-screen flex flex-col py-6 px-4 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 justify-end">
        <span className="text-xl font-semibold text-foreground">elevate</span>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 5L5 19H19L12 5Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`text-right py-2.5 px-4 rounded-full text-sm transition-colors ${
              activeItem === item.id
                ? 'bg-muted text-foreground font-medium'
                : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
