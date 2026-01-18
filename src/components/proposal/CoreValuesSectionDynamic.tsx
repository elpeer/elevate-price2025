import React, { useRef, useState, useEffect } from 'react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '../ScrollAnimation';
import blueAbstractBg from '@/assets/blue-abstract-bg.png';
import logo1 from '@/assets/clients/logo-1.svg';
import logo2 from '@/assets/clients/logo-2.svg';
import logo3 from '@/assets/clients/logo-3.svg';
import logo4 from '@/assets/clients/logo-4.svg';
import logo5 from '@/assets/clients/logo-5.svg';
import logo6 from '@/assets/clients/logo-6.svg';
import logo7 from '@/assets/clients/logo-7.svg';
import logo8 from '@/assets/clients/logo-8.svg';
import innovationIcon from '@/assets/icons/innovation-icon.svg';
import customerFocusIcon from '@/assets/icons/customer-focus-icon.svg';
import reliabilityIcon from '@/assets/icons/reliability-icon.svg';
import serviceIcon from '@/assets/icons/service-icon.svg';

interface ValueItem { title: string; description: string; }
interface CoreValuesData {
  title?: string;
  missionText?: string[];
  values?: ValueItem[];
  backgroundImage?: string;
}
interface Props { data: CoreValuesData; }

const defaultValues: ValueItem[] = [
  { title: 'חדשנות', description: 'דחיפת גבולות בעיצוב ופיתוח אתרים עם פתרונות חדשניים.' },
  { title: 'מיקוד לקוח', description: 'מתן עדיפות לתקשורת ברורה ופתרונות מותאמים בהתאמה למטרות הלקוח.' },
  { title: 'מהימנות', description: 'אספקת תוצאות אמינות ואיכותיות באופן עקבי העולה על הציפיות.' },
  { title: 'שירות מקיף', description: 'נציע פתרונות משולבים ברמה גבוהה לכל ההיבטים של נוכחות באינטרנט.' }
];
const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];
const valueIcons = [innovationIcon, customerFocusIcon, reliabilityIcon, serviceIcon];

const LogoSwiper: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  useEffect(() => {
    if (!scrollRef.current || !isAutoScrolling) return;
    const container = scrollRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= container.scrollWidth / 2) scrollPosition = 0;
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isAutoScrolling]);
  return (
    <div ref={scrollRef} className="flex gap-8 overflow-x-auto py-4 md:hidden" style={{ scrollbarWidth: 'none' }} onTouchStart={() => setIsAutoScrolling(false)} onTouchEnd={() => setTimeout(() => setIsAutoScrolling(true), 3000)}>
      {[...clientLogos, ...clientLogos].map((logo, i) => <div key={i} className="flex-shrink-0 flex items-center justify-center"><img src={logo} alt="" className="h-8 w-auto object-contain" /></div>)}
    </div>
  );
};

const CoreValuesSectionDynamic: React.FC<Props> = ({ data }) => {
  const values = data.values || defaultValues;
  const missionText = data.missionText || ['המשימה שלנו היא להעצים עסקים עם פתרונות אינטרנט מתקדמים המניעים צמיחה ומעורבות.', 'עם מחויבות למצוינות ולשביעות רצון לקוחות, אנו שואפים להיות השותף מנצח.'];
  const bgImage = data.backgroundImage || blueAbstractBg;

  return (
    <section id="values" className="w-full" dir="ltr">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col order-2 md:order-1" style={{ backgroundColor: '#EFEFFF' }}>
          <div className="relative h-[250px] md:h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 text-center">
              {missionText.map((text, i) => <ScrollAnimation key={i} delay={i * 0.1}><p className="text-white/90 text-sm md:text-lg leading-6 md:leading-8 mb-4 md:mb-8">{text}</p></ScrollAnimation>)}
            </div>
          </div>
          <div className="py-6 md:py-12 px-4 md:px-8">
            <ScrollAnimation><p className="text-center text-foreground font-medium mb-4 md:mb-8 text-sm md:text-base">נבחרנו על ידי הטובים ביותר</p></ScrollAnimation>
            <LogoSwiper />
            <StaggerContainer className="hidden md:grid grid-cols-4 items-center justify-items-center gap-4" staggerDelay={0.05}>
              {clientLogos.map((logo, i) => <StaggerItem key={i}><div className="flex items-center justify-center"><img src={logo} alt="" className="h-16 w-auto object-contain" /></div></StaggerItem>)}
            </StaggerContainer>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white py-10 md:py-24 px-6 md:px-16 order-1 md:order-2">
          <ScrollAnimation direction="left"><h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 md:mb-12 text-right">{data.title || 'ערכי הליבה שלנו'}</h2></ScrollAnimation>
          <StaggerContainer className="space-y-5 md:space-y-8" staggerDelay={0.1}>
            {values.map((value, index) => (
              <StaggerItem key={index} direction="left">
                <div className="flex items-start gap-4 md:gap-6" dir="rtl">
                  <div className="flex-shrink-0"><img src={valueIcons[index % valueIcons.length]} alt="" className="w-10 h-10 md:w-14 md:h-14" /></div>
                  <div className="text-right flex-1">
                    <h3 className="text-base md:text-xl font-semibold text-foreground mb-1">{value.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSectionDynamic;
