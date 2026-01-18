import React, { useState } from 'react';
import projectDetailsImage from '@/assets/project-details-image.png';

interface FaqItem { title: string; content: string; }
interface ProjectDetailsData { title?: string; faqItems?: FaqItem[]; image?: string; }
interface Props { data: ProjectDetailsData; }

const defaultFaqItems: FaqItem[] = [
  { title: 'אחריות', content: 'מועד תקופת האחריות יחל מיום העלייה לאוויר למשך 3 חודשים. במסגרת האחריות, חברת elevate תטפל בכל תקלה בהתאם לSLA.' },
  { title: 'תקלות', content: 'במקרה של תקלות טכניות, צוות התמיכה שלנו יהיה זמין לסייע בפתרון הבעיה בהקדם האפשרי.' },
  { title: 'הדרכה של אתר CMS', content: 'אנו מספקים הדרכה מקיפה לשימוש במערכת ניהול התוכן (CMS) של האתר.' }
];

const ProjectDetailsSectionDynamic: React.FC<Props> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const title = data.title || 'פרטים נוספים על הפרויקט';
  const faqItems = data.faqItems || defaultFaqItems;
  const image = data.image || projectDetailsImage;

  return (
    <section id="project-details" className="w-full bg-background">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 py-10 md:py-16 px-4 md:px-12" dir="rtl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground text-right mb-6 md:mb-12">{title}</h2>
          <div>
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-border">
                <button onClick={() => setActiveIndex(activeIndex === i ? null : i)} className="w-full py-6 flex items-center gap-4 text-right">
                  <span className="text-2xl text-foreground flex-shrink-0">{activeIndex === i ? '−' : '+'}</span>
                  <span className="text-xl font-medium text-foreground flex-1 text-right">{item.title}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pb-6 text-right"><p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{item.content}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block w-full md:w-1/2"><img src={image} alt="" className="w-full h-full object-cover min-h-[500px]" /></div>
      </div>
    </section>
  );
};

export default ProjectDetailsSectionDynamic;
