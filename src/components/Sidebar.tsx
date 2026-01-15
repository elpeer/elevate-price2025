import React from 'react';

const navItems = [
  { id: 'intro', label: 'פתיח' },
  { id: 'toc', label: 'תוכן עניינים' },
  { id: 'about', label: 'עלינו' },
  { id: 'why', label: 'למה אנחנו' },
  { id: 'testimonials', label: 'לקוחות מספרים' },
  { id: 'team', label: 'צוות הפרויקט' },
  { id: 'timeline', label: 'לוחות זמנים' },
  { id: 'extras', label: 'תוספות אופציונליות' },
  { id: 'included', label: 'מה כלול' },
  { id: 'payments', label: 'תשלומים' },
  { id: 'signature', label: 'חתימה' },
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('intro');

  return (
    <aside className="w-[220px] bg-background border-r border-border fixed top-0 right-0 h-screen flex flex-col py-6 px-4 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 justify-end">
        <span className="text-xl font-semibold text-foreground">elevate</span>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 4L20 20H4L12 4Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
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
