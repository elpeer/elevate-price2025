import React from 'react';
import { FileText } from 'lucide-react';

const contentItems = [
  { title: 'עמוד הבית', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד מוצר', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד קטגוריה', description: 'הסבר קצר על המוצרים שלנו ופאנל פילטרים של הקטגוריות' },
  { title: 'אודות', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד יתרונות', description: 'הצגת יתרונות המוצר בצורה ויזואלית' },
  { title: 'יצירת קשר', description: 'טופס יצירת קשר ופרטי התקשרות' },
];

const SiteContentSection: React.FC = () => {
  return (
    <section className="bg-secondary py-24 px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-normal text-foreground text-center mb-4">
          תכולת האתר
        </h2>
        <p className="text-muted-foreground text-center text-lg mb-16 max-w-2xl mx-auto">
          מבנה האתר מאורגן כהיררכיה ברורה הכוללת דף בית מרכזי, עמודי תוכן ראשיים
        </p>

        <div className="grid grid-cols-3 gap-4">
          {contentItems.map((item, index) => (
            <div key={index} className="bg-muted rounded-2xl p-6 text-right">
              <div className="flex items-center gap-2 mb-2 justify-end">
                <span className="text-lg font-medium text-foreground">{item.title}</span>
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm leading-6">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteContentSection;
