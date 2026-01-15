import React from 'react';
import { Lightbulb, Users, Target, Palette, Code, Headphones } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'UX חדשני ומתקדם',
    description: 'אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים'
  },
  {
    icon: Users,
    title: 'מחקר משתמשים',
    description: 'מחקר מעמיק והבנת הצרכים של קהל היעד שלך'
  },
  {
    icon: Target,
    title: 'אסטרטגיה דיגיטלית',
    description: 'תכנון אסטרטגי מקיף להשגת יעדים עסקיים'
  },
  {
    icon: Palette,
    title: 'עיצוב UI מרהיב',
    description: 'עיצוב ויזואלי מרהיב המשקף את מהות המותג'
  },
  {
    icon: Code,
    title: 'פיתוח Frontend',
    description: 'פיתוח קוד נקי ומותאם לכל הפלטפורמות'
  },
  {
    icon: Headphones,
    title: 'תמיכה ושירות',
    description: 'ליווי מקצועי לאורך כל הדרך ואחריה'
  }
];

const WhyElevateSection: React.FC = () => {
  return (
    <section className="bg-secondary py-24 px-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <h2 className="text-7xl font-light text-foreground">Why</h2>
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 4L20 20H4L12 4Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-7xl font-light text-foreground">elevate</h2>
        </div>

        {/* Description */}
        <p className="text-center text-foreground text-lg leading-8 max-w-3xl mx-auto mb-16">
          אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים המשקפים את מהות המותג שלך ומגבירים מעורבות. המומחיות שלנו ב-UX/UI, בשילוב מחקר מעמיק ועיצוב ממוקד משתמש, מבטיחה שהמוצר הדיגיטלי שלך יבלוט ויספק ערך אמיתי בסביבה המקוונת התחרותית.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-background rounded-2xl p-8 text-right">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4 mr-auto ml-0">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground leading-7">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyElevateSection;
