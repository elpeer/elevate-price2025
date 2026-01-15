import React from 'react';

// Custom hand-drawn style icons as SVG components
const StarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/60">
    <path d="M20 4L22.5 15L34 15L25 22L28 34L20 26L12 34L15 22L6 15L17.5 15L20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M20 8L18 12M24 18L28 16M16 22L12 26M28 26L24 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const CrownIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/60">
    <path d="M8 28L6 14L14 20L20 10L26 20L34 14L32 28H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M10 32H30M12 28V32M28 28V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="20" cy="10" r="2" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

const SendIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/60">
    <path d="M6 20L34 8L26 34L20 22L6 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M20 22L34 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 18L10 16M12 24L14 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/60">
    <path d="M20 34C20 34 6 24 6 14C6 10 10 6 14 6C17 6 19 8 20 10C21 8 23 6 26 6C30 6 34 10 34 14C34 24 20 34 20 34Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M12 12L14 14M26 14L28 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/60">
    <path d="M8 10H32C33 10 34 11 34 12V26C34 27 33 28 32 28H14L8 34V28V12C8 11 9 10 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 17H26M14 21H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="30" cy="8" r="3" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

const AwardIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/60">
    <circle cx="20" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M14 24L12 36L20 32L28 36L26 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M20 10V12M16 16H18M22 16H24M20 20V22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const services = [
  {
    icon: SendIcon,
    title: 'שירות מקיף',
    description: 'מעיצוב UI/UX ועד פיתוח, מיתוג, אירוח, אבטחה ואסטרטגיה דיגיטלית - אנו מציעים שירותי אינטרנט מקיפים תחת קורת גג אחת. תהנה מאינטגרציה חלקה, איכות עקבית וניהול פשוט בכל ההיבטים של הנוכחות המקוונת שלך.'
  },
  {
    icon: ChatIcon,
    title: 'פתרונות מותאמים אישית',
    description: 'הפורטפוליו המגוון שלנו מציג את יכולתנו להסתגל לתעשיות שונות. אנו משלבים תובנות בתעשייה עם מגמות עיצוב מתקדמות כדי ליצור אתרים המהדהדים עם הקהל הספציפי שלך ומניעים מעורבות משמעותית.'
  },
  {
    icon: StarIcon,
    title: 'עיצוב אתר אסטרטגי להצלחה עסקית',
    description: 'שדרג את הנוכחות שלך באינטרנט עם אתר אינטרנט שנבנה בקפידה סביב אסטרטגיית שיווק מובילה המבוססת על היעדים העסקיים של החברה.'
  },
  {
    icon: CrownIcon,
    title: 'מצוינות ללא טרחה',
    description: 'תירגע בזמן שאנו מטפלים בכל פרט. השירות שלנו מקצה לקצה מבטיח תהליך חלק ונטול דאגות משלב הרעיון ועד ההשקה. אתה מתמקד בעסק שלך, אנו נספק אתר מדהים עם ביצועים גבוהים העולה על הציפיות.'
  },
  {
    icon: HeartIcon,
    title: 'תמיכת לקוחות יוצאת דופן',
    description: 'החזון שלך מניע את העבודה שלנו. אנו מקשיבים בתשומת לב, מגיבים מיד ומתאימים את עצמנו בצורה גמישה לצרכים שלכם, ומבטיחים שיתוף פעולה חלק ומספק מתחילתו ועד סופו.'
  },
  {
    icon: AwardIcon,
    title: 'הצטיינות מהימנה',
    description: 'אנו משרתים את החברות המובילות בישראל באמינות ושקיפות מוכחות, ומספקים עיצובים המניעים הצלחה עסקית.'
  }
];

const WhyElevateSection: React.FC = () => {
  return (
    <section id="why" className="min-h-screen w-full py-24 px-16" style={{ backgroundColor: '#EFEFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Title - Why on LEFT, logo in CENTER, elevate on RIGHT (using dir="ltr" for correct visual order) */}
        <div dir="ltr" className="flex items-center justify-center gap-8 mb-8">
          <h2 className="text-8xl font-serif font-normal text-foreground">Why</h2>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-8xl font-mono font-normal text-foreground">elevate</h2>
        </div>

        {/* Description */}
        <p className="text-center text-foreground text-lg leading-8 max-w-4xl mx-auto mb-20">
          אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים המשקפים את מהות המותג שלך ומגבירים מעורבות. המומחיות שלנו ב-UX/UI, בשילוב מחקר מעמיק ועיצוב ממוקד משתמש, מבטיחה שהמוצר הדיגיטלי שלך יבלוט ויספק ערך אמיתי בסביבה המקוונת התחרותית.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-x-16 gap-y-16">
          {services.map((service, index) => (
            <div key={index} className="text-right">
              <div className="mb-4 flex justify-end">
                <service.icon />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-7 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyElevateSection;
