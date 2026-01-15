import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const contentItems = [
  { title: 'עמות הבית', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד קטגוריה', description: 'הסבר קצר על המוצרים שלנו ופאנל פילטרים של הקטגוריות יחד עם המוצרים' },
  { title: 'עמוד מוצר', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'אודות', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד יתרונות', description: '' },
  { title: 'יצירת קשר', description: '' },
];

const SiteContentSection: React.FC = () => {
  return (
    <section id="content" className="w-full bg-background py-24 px-16 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-normal text-foreground text-center mb-4">
          תכולת האתר
        </h2>
        <p className="text-muted-foreground text-center text-lg mb-16 max-w-2xl mx-auto">
          מבנה האתר מאורגן כהיררכיה ברורה הכוללת דף בית מרכזי, עמודי תוכן ראשיים
        </p>

        <div className="grid grid-cols-4 gap-4" dir="rtl">
          {/* Row 1 - 4 cards */}
          {contentItems.slice(0, 4).map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl p-6 text-right"
              style={{ backgroundColor: '#F3F3F3' }}
            >
              <div className="flex items-center gap-2 mb-3 justify-end">
                <span className="text-lg font-medium text-foreground">{item.title}</span>
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary stroke-white" />
              </div>
              {item.description && (
                <p className="text-muted-foreground text-sm leading-6">{item.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Row 2 - 2 cards aligned to the left (in RTL, they appear on the left) */}
        <div className="grid grid-cols-4 gap-4 mt-4" dir="rtl">
          <div className="col-span-2"></div>
          {contentItems.slice(4, 6).map((item, index) => (
            <div 
              key={index + 4} 
              className="rounded-2xl p-6 text-right"
              style={{ backgroundColor: '#F3F3F3' }}
            >
              <div className="flex items-center gap-2 justify-end">
                <span className="text-lg font-medium text-foreground">{item.title}</span>
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary stroke-white" />
              </div>
              {item.description && (
                <p className="text-muted-foreground text-sm leading-6 mt-3">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteContentSection;
