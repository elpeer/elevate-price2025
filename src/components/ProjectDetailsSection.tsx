import React, { useState } from 'react';
import projectDetailsImage from '@/assets/project-details-image.png';

const faqItems = [
  {
    title: 'אחריות',
    content: `מועד תקופת האחריות יחל מיום העלייה לאוויר למשך 3 חודשים. במסגרת האחריות, חברת elevate תטפל בכל תקלה בהתאם לSLA בסעיף לעיל, ללא כל תמורה נוספת.

*מובהר שבמסגרת אחריות ישנם רק באגים של אלמנטים שעבדו בעת מעבר האתר לשרת הפרודקשן**

**במידה והבאג נוצר משימוש לקוי של הלקוח או מי מטעמו חברת elevate מסירה באופן מיידי את האחריות לאתרו`
  },
  {
    title: 'תקלות',
    content: 'במקרה של תקלות טכניות, צוות התמיכה שלנו יהיה זמין לסייע בפתרון הבעיה בהקדם האפשרי. זמני התגובה משתנים בהתאם לחומרת התקלה ולתנאי הSLA שנקבעו.'
  },
  {
    title: 'הדרכה של אתר CMS',
    content: 'אנו מספקים הדרכה מקיפה לשימוש במערכת ניהול התוכן (CMS) של האתר. ההדרכה כוללת הסבר על כל הפונקציות הזמינות, כולל עריכת תוכן, ניהול מדיה והגדרות האתר.'
  },
];

const ProjectDetailsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="project-details" className="w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2" dir="rtl">
        {/* Left side - Image (first in DOM for RTL, appears on left) */}
        <div className="order-2 md:order-1">
          <img 
            src={projectDetailsImage} 
            alt="Project details" 
            className="w-full h-full object-cover min-h-[500px]"
          />
        </div>

        {/* Right side - FAQ Accordion (second in DOM for RTL, appears on right) */}
        <div className="order-1 md:order-2 py-16 px-12">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground text-right mb-12">
            פרטים נוספים על הפרויקט
          </h2>

          {/* Accordion */}
          <div className="space-y-0">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="border-b border-border"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full py-6 flex items-center justify-between text-right"
                >
                  <span className="text-xl font-medium text-foreground">{item.title}</span>
                  <span className="text-2xl text-foreground">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                {/* Accordion Content */}
                {activeIndex === index && (
                  <div className="pb-6 text-right">
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsSection;
