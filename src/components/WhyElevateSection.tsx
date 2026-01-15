import React from 'react';
import { Send, Heart, Sparkles, Mail, Feather, Award } from 'lucide-react';

const services = [
  {
    icon: Feather,
    title: 'שירות מקיף',
    description: 'מעיצוב UI/UX ועד פיתוח, מיתוג, אירוח, אבטחה ואסטרטגיה דיגיטלית - אנו מציעים שירותי אינטרנט מקיפים תחת קורת גג אחת. תהנה מאינטגרציה חלקה, איכות עקבית וניהול פשוט בכל ההיבטים של הנוכחות המקוונת שלך.'
  },
  {
    icon: Mail,
    title: 'פתרונות מותאמים אישית',
    description: 'הפורטפוליו המגוון שלנו מציג את יכולתנו להסתגל לתעשיות שונות. אנו משלבים תובנות בתעשייה עם מגמות עיצוב מתקדמות כדי ליצור אתרים המהדהדים עם הקהל הספציפי שלך ומניעים מעורבות משמעותית.'
  },
  {
    icon: Sparkles,
    title: 'עיצוב אתר אסטרטגי להצלחה עסקית',
    description: 'שדרג את הנוכחות שלך באינטרנט עם אתר אינטרנט שנבנה בקפידה סביב אסטרטגיית שיווק מובילה המבוססת על היעדים העסקיים של החברה.'
  },
  {
    icon: Send,
    title: 'מצוינות ללא טרחה',
    description: 'תירגע בזמן שאנו מטפלים בכל פרט. השירות שלנו מקצה לקצה מבטיח תהליך חלק ונטול דאגות משלב הרעיון ועד ההשקה. אתה מתמקד בעסק שלך, אנו נספק אתר מדהים עם ביצועים גבוהים העולה על הציפיות.'
  },
  {
    icon: Heart,
    title: 'תמיכת לקוחות יוצאת דופן',
    description: 'החזון שלך מניע את העבודה שלנו. אנו מקשיבים בתשומת לב, מגיבים מיד ומתאימים את עצמנו בצורה גמישה לצרכים שלכם, ומבטיחים שיתוף פעולה חלק ומספק מתחילתו ועד סופו.'
  },
  {
    icon: Award,
    title: 'הצטיינות מהימנה',
    description: 'אנו משרתים את החברות המובילות בישראל באמינות ושקיפות מוכחות, ומספקים עיצובים המניעים הצלחה עסקית.'
  }
];

const WhyElevateSection: React.FC = () => {
  return (
    <section id="why" className="min-h-screen w-full bg-secondary py-24 px-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <h2 className="text-8xl font-light text-foreground">Why</h2>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 4L20 20H4L12 4Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-8xl font-light text-foreground">elevate</h2>
        </div>

        {/* Description */}
        <p className="text-center text-foreground text-lg leading-8 max-w-4xl mx-auto mb-20">
          אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים המשקפים את מהות המותג שלך ומגבירים מעורבות. המומחיות שלנו ב-UX/UI, בשילוב מחקר מעמיק ועיצוב ממוקד משתמש, מבטיחה שהמוצר הדיגיטלי שלך יבלוט ויספק ערך אמיתי בסביבה המקוונת התחרותית.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-x-16 gap-y-16">
          {services.map((service, index) => (
            <div key={index} className="text-right">
              <service.icon className="w-10 h-10 text-primary/60 mb-4 mr-0 ml-auto" strokeWidth={1.5} />
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
