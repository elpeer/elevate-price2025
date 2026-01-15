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
    <aside className="w-[220px] bg-background border-l fixed top-0 right-0 h-screen flex flex-col py-6 px-4 z-50" style={{ borderLeftColor: '#CBCBD4' }}>
      {/* Logo - replaceable via Visual Edits */}
      <img 
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%232563EB'/%3E%3Cpath d='M20 12L12 26h16L20 12z' fill='white'/%3E%3C/svg%3E" 
        alt="Logo" 
        className="w-10 h-10 mb-8"
      />

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
