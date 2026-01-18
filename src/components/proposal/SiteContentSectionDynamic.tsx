import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '../ScrollAnimation';

interface ContentItem { title: string; description?: string; }
interface SiteContentData { title?: string; description?: string; items?: ContentItem[]; }
interface Props { data: SiteContentData; }

const defaultItems: ContentItem[] = [
  { title: 'עמוד הבית', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד קטגוריה', description: 'הסבר קצר על המוצרים שלנו ופאנל פילטרים של הקטגוריות יחד עם המוצרים' },
  { title: 'עמוד מוצר', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'אודות', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
  { title: 'עמוד יתרונות', description: '' },
  { title: 'יצירת קשר', description: '' }
];

const SiteContentSectionDynamic: React.FC<Props> = ({ data }) => {
  const title = data.title || 'תכולת האתר';
  const description = data.description || 'מבנה האתר מאורגן כהיררכיה ברורה הכוללת דף בית מרכזי, עמודי תוכן ראשיים';
  const items = data.items || defaultItems;

  return (
    <section id="content" className="w-full bg-background py-6 md:py-24 px-4 md:px-16 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation><h2 className="text-2xl md:text-4xl font-normal text-foreground text-center mb-2 md:mb-4">{title}</h2></ScrollAnimation>
        <ScrollAnimation delay={0.1}><p className="text-muted-foreground text-center text-sm md:text-lg mb-6 md:mb-16 max-w-2xl mx-auto">{description}</p></ScrollAnimation>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" staggerDelay={0.08}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl p-4 md:p-6 text-right w-full" style={{ backgroundColor: '#F3F3F3' }}>
                <div className="flex items-center gap-2 mb-1 md:mb-3">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary fill-primary stroke-white flex-shrink-0" />
                  <span className="text-base md:text-lg font-medium text-foreground">{item.title}</span>
                </div>
                {item.description && <p className="text-muted-foreground text-xs md:text-sm leading-5 md:leading-6">{item.description}</p>}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default SiteContentSectionDynamic;
