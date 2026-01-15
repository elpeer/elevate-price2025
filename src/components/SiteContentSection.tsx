import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from './ScrollAnimation';

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
    <section id="content" className="w-full bg-background py-10 md:py-24 px-6 md:px-16 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-2xl md:text-4xl font-normal text-foreground text-center mb-2 md:mb-4">
            תכולת האתר
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="text-muted-foreground text-center text-sm md:text-lg mb-6 md:mb-16 max-w-2xl mx-auto">
            מבנה האתר מאורגן כהיררכיה ברורה הכוללת דף בית מרכזי, עמודי תוכן ראשיים
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4" staggerDelay={0.08}>
          {contentItems.map((item, index) => (
            <StaggerItem key={index}>
              <div 
                className="rounded-xl md:rounded-2xl p-3 md:p-6 text-right h-full"
                style={{ backgroundColor: '#F3F3F3' }}
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-3">
                  <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-primary fill-primary stroke-white flex-shrink-0" />
                  <span className="text-sm md:text-lg font-medium text-foreground">{item.title}</span>
                </div>
                {item.description && (
                  <p className="text-muted-foreground text-[10px] md:text-sm leading-4 md:leading-6 hidden md:block">{item.description}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Row 2 - 2 cards */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-4" staggerDelay={0.08}>
          {secondRowItems.map((item, index) => (
            <StaggerItem key={index}>
              <div 
                className="rounded-xl md:rounded-2xl p-3 md:p-6 text-right"
                style={{ backgroundColor: '#F3F3F3' }}
              >
                <div className="flex items-center gap-1.5 md:gap-2">
                  <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-primary fill-primary stroke-white flex-shrink-0" />
                  <span className="text-sm md:text-lg font-medium text-foreground">{item.title}</span>
                </div>
                {item.description && (
                  <p className="text-muted-foreground text-[10px] md:text-sm leading-4 md:leading-6 mt-1 md:mt-3 hidden md:block">{item.description}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default SiteContentSection;
