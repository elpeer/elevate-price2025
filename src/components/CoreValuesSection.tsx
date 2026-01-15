import React from 'react';

// Icons matching the reference design
const InnovationIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M20 28V34C20 35.1 20.9 36 22 36H26C27.1 36 28 35.1 28 34V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M22 36V38M26 36V38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 8V10M18 12L16 10M30 12L32 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CustomerFocusIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M24 12L24 36M24 12L20 16M24 12L28 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 20L12 24M32 20L36 24M16 28L12 24M32 28L36 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

const ReliabilityIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M12 36V20L16 16V36M20 36V24L24 20V36M28 36V16L32 12V36M36 36V28L40 24V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 36H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ServiceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M24 38C24 38 10 30 10 20C10 16 14 12 18 12C21 12 23 14 24 16C25 14 27 12 30 12C34 12 38 16 38 20C38 30 24 38 24 38Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const values = [
  {
    icon: InnovationIcon,
    title: 'חדשנות',
    description: 'דחיפת גבולות בעיצוב ופיתוח אתרים עם פתרונות חדשניים.'
  },
  {
    icon: CustomerFocusIcon,
    title: 'מיקוד לקוח',
    description: 'מתן עדיפות לתקשורת ברורה ופתרונות מותאמים בהתאמה למטרות הלקוח.'
  },
  {
    icon: ReliabilityIcon,
    title: 'מהימנות',
    description: 'אספקת תוצאות אמינות ואיכותיות באופן עקבי העולה על הציפיות.'
  },
  {
    icon: ServiceIcon,
    title: 'שירות מקיף',
    description: 'נציע פתרונות משולבים ברמה גבוהה לכל ההיבטים של נוכחות באינטרנט.'
  }
];

const clientLogos = [
  'ISRAELCANADA',
  'Playtika',
  'Coca-Cola',
  'מזרחי טפחות',
  'pango',
  'Abbott',
  'Statement.',
  'AIWAYS'
];

const CoreValuesSection: React.FC = () => {
  return (
    <section id="values" className="w-full" dir="rtl">
      {/* Main content area */}
      <div className="flex flex-row-reverse">
        {/* Right side - Values list (white background) */}
        <div className="w-1/2 bg-white py-24 px-16">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-right">ערכי הליבה שלנו</h2>
          
          <div className="space-y-10">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-6" dir="rtl">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon />
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left side - Image and logos (lavender background) */}
        <div className="w-1/2 flex flex-col" style={{ backgroundColor: '#EFEFFF' }}>
          {/* Blue abstract image with text overlay */}
          <div 
            className="relative h-[500px] bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400"
            style={{
              backgroundImage: 'linear-gradient(135deg, #0a1628 0%, #1a3a5c 30%, #2563eb 60%, #60a5fa 100%)'
            }}
          >
            {/* Decorative light streaks */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-400/30 rounded-full blur-2xl"></div>
            </div>
            
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-12 text-center">
              <p className="text-white/90 text-lg leading-8 mb-8">
                המשימה שלנו היא להעצים עסקים עם פתרונות אינטרנט מתקדמים המניעים צמיחה ומעורבות. אנו משלבים תובנה אסטרטגית, עיצוב חדשני ומומחיות טכנית כדי ליצור אתרים מותאמים הבולטים בנוף הדיגיטלי.
              </p>
              <p className="text-white/90 text-lg leading-8">
                עם מחויבות למצוינות ולשביעות רצון לקוחות, אנו שואפים להיות השותף מנצח עבור חברות המעוניינות להוביל את הנוכחות הדיגיטלית שלהם להשגת מטרותיהם.
              </p>
            </div>
          </div>

          {/* Client logos section */}
          <div className="py-12 px-8">
            <p className="text-center text-foreground font-medium mb-8">נבחרנו על ידי הטובים ביותר</p>
            
            {/* Logos grid - 2 rows */}
            <div className="grid grid-cols-4 gap-6 items-center justify-items-center">
              {clientLogos.map((logo, index) => (
                <div key={index} className="text-muted-foreground font-semibold text-sm">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
