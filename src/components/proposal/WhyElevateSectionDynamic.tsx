import React, { useState } from 'react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '../ScrollAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Plus, Minus } from 'lucide-react';
import whyElevateLogo from '@/assets/why-elevate-header.svg';

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

interface WhyElevateData {
  description?: string;
  services?: ServiceItem[];
}

interface Props {
  data: WhyElevateData;
}

const defaultServices: ServiceItem[] = [
  { title: 'שירות מקיף', description: 'מעיצוב UI/UX ועד פיתוח, מיתוג, אירוח, אבטחה ואסטרטגיה דיגיטלית - אנו מציעים שירותי אינטרנט מקיפים תחת קורת גג אחת.' },
  { title: 'פתרונות מותאמים אישית', description: 'הפורטפוליו המגוון שלנו מציג את יכולתנו להסתגל לתעשיות שונות.' },
  { title: 'עיצוב אתר אסטרטגי להצלחה עסקית', description: 'שדרג את הנוכחות שלך באינטרנט עם אתר אינטרנט שנבנה בקפידה.' },
  { title: 'מצוינות ללא טרחה', description: 'תירגע בזמן שאנו מטפלים בכל פרט.' },
  { title: 'תמיכת לקוחות יוצאת דופן', description: 'החזון שלך מניע את העבודה שלנו.' },
  { title: 'הצטיינות מהימנה', description: 'אנו משרתים את החברות המובילות בישראל.' }
];

const WhyElevateSectionDynamic: React.FC<Props> = ({ data }) => {
  const [openItem, setOpenItem] = useState<string>('item-0');
  const description = data.description || 'אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים המשקפים את מהות המותג שלך ומגבירים מעורבות.';
  const services = data.services || defaultServices;

  return (
    <section id="why" className="min-h-screen w-full py-16 md:py-24 px-6 md:px-16" style={{ backgroundColor: '#EFEFFF' }}>
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="flex items-center justify-center gap-6 mb-6 md:mb-8">
            <img src={whyElevateLogo} alt="Why Elevate" className="h-16 md:h-20" />
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="text-center text-foreground text-base md:text-lg leading-7 md:leading-8 max-w-4xl mx-auto mb-12 md:mb-20">{description}</p>
        </ScrollAnimation>

        <div className="block md:hidden">
          <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="w-full">
            {services.map((service, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="flex items-center justify-between py-4 hover:no-underline [&>svg]:hidden">
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-base font-medium text-foreground flex-1 text-right">{service.title}</span>
                  </div>
                  <div className="mr-2">{openItem === `item-${index}` ? <Minus className="h-5 w-5 text-muted-foreground" /> : <Plus className="h-5 w-5 text-muted-foreground" />}</div>
                </AccordionTrigger>
                <AccordionContent className="text-right text-muted-foreground leading-7 pb-4">{service.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <StaggerContainer className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-16 md:gap-y-16">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <div className="text-right">
                <h3 className="text-lg md:text-xl font-medium text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-6 md:leading-7 text-sm">{service.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyElevateSectionDynamic;
