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
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    // Toggle: if clicking the active item, close it; otherwise open the clicked item
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="project-details" className="w-full bg-background">
      <div className="flex flex-col md:flex-row">
        {/* RIGHT column: FAQ Accordion */}
        <div className="w-full md:w-1/2 py-10 md:py-16 px-4 md:px-12" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground text-right mb-6 md:mb-12">
            פרטים נוספים על הפרויקט
          </h2>

          {/* Accordion */}
          <div>
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="border-b border-border"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full py-6 flex items-center gap-4 text-right"
                >
                  <span className="text-2xl text-foreground flex-shrink-0">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                  <span className="text-xl font-medium text-foreground flex-1 text-right">{item.title}</span>
                </button>

                {/* Accordion Content with smooth animation */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-6 text-right">
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LEFT column: Image */}
        <div className="hidden md:block w-full md:w-1/2">
          <img 
            src={projectDetailsImage} 
            alt="Project details" 
            className="w-full h-full object-cover min-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsSection;
