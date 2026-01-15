import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const contentItems = [
  { title: 'עמות הבית', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד קטגוריה', description: 'הסבר קצר על המוצרים שלנו ופאנל פילטרים של הקטגוריות יחד עם המוצרים' },
  { title: 'עמוד מוצר', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'אודות', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
];

const secondRowItems = [
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
          {contentItems.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl p-6 text-right"
              style={{ backgroundColor: '#F3F3F3' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary stroke-white" />
                <span className="text-lg font-medium text-foreground">{item.title}</span>
              </div>
              {item.description && (
                <p className="text-muted-foreground text-sm leading-6">{item.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Row 2 - 2 cards on the left side */}
        <div className="grid grid-cols-4 gap-4 mt-4" dir="rtl">
          {secondRowItems.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl p-6 text-right"
              style={{ backgroundColor: '#F3F3F3' }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary stroke-white" />
                <span className="text-lg font-medium text-foreground">{item.title}</span>
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
