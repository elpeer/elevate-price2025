import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation, StaggerContainer, StaggerItem } from './ScrollAnimation';
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

const values = [
  {
    icon: innovationIcon,
    title: 'חדשנות',
    description: 'דחיפת גבולות בעיצוב ופיתוח אתרים עם פתרונות חדשניים.'
  },
  {
    icon: customerFocusIcon,
    title: 'מיקוד לקוח',
    description: 'מתן עדיפות לתקשורת ברורה ופתרונות מותאמים בהתאמה למטרות הלקוח.'
  },
  {
    icon: reliabilityIcon,
    title: 'מהימנות',
    description: 'אספקת תוצאות אמינות ואיכותיות באופן עקבי העולה על הציפיות.'
  },
  {
    icon: serviceIcon,
    title: 'שירות מקיף',
    description: 'נציע פתרונות משולבים ברמה גבוהה לכל ההיבטים של נוכחות באינטרנט.'
  }
];

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

// Auto-scrolling logo swiper for mobile
const LogoSwiper: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  useEffect(() => {
    if (!scrollRef.current || !isAutoScrolling) return;
    
    const container = scrollRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    
    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, [isAutoScrolling]);

  return (
    <div 
      ref={scrollRef}
      className="flex gap-8 overflow-x-auto py-4 md:hidden"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onTouchStart={() => setIsAutoScrolling(false)}
      onTouchEnd={() => setTimeout(() => setIsAutoScrolling(true), 3000)}
    >
      {/* Duplicate logos for infinite scroll effect */}
      {[...clientLogos, ...clientLogos].map((logo, index) => (
        <div key={index} className="flex-shrink-0 flex items-center justify-center">
          <img src={logo} alt={`Client ${(index % clientLogos.length) + 1}`} className="h-8 w-auto object-contain" />
        </div>
      ))}
    </div>
  );
};

const CoreValuesSection: React.FC = () => {
  return (
    <section id="values" className="w-full">
      {/* Main content area */}
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image and logos (lavender background) - bottom on mobile */}
        <div className="w-full md:w-1/2 flex flex-col order-2 md:order-1" style={{ backgroundColor: '#EFEFFF' }}>
          {/* Blue abstract image with text overlay */}
          <div 
            className="relative h-[250px] md:h-[500px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${blueAbstractBg})`
            }}
          >
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 text-center">
              <ScrollAnimation>
                <p className="text-white/90 text-sm md:text-lg leading-6 md:leading-8 mb-4 md:mb-8">
                  המשימה שלנו היא להעצים עסקים עם פתרונות אינטרנט מתקדמים המניעים צמיחה ומעורבות. אנו משלבים תובנה אסטרטגית, עיצוב חדשני ומומחיות טכנית כדי ליצור אתרים מותאמים הבולטים בנוף הדיגיטלי.
                </p>
              </ScrollAnimation>
              <ScrollAnimation delay={0.1}>
                <p className="text-white/90 text-sm md:text-lg leading-6 md:leading-8">
                  עם מחויבות למצוינות ולשביעות רצון לקוחות, אנו שואפים להיות השותף מנצח עבור חברות המעוניינות להוביל את הנוכחות הדיגיטלית שלהם להשגת מטרותיהם.
                </p>
              </ScrollAnimation>
            </div>
          </div>

          {/* Client logos section */}
          <div className="py-6 md:py-12 px-4 md:px-8">
            <ScrollAnimation>
              <p className="text-center text-foreground font-medium mb-4 md:mb-8 text-sm md:text-base">נבחרנו על ידי הטובים ביותר</p>
            </ScrollAnimation>
            
            {/* Mobile: Swiper */}
            <LogoSwiper />
            
            {/* Desktop: Grid */}
            <StaggerContainer className="hidden md:grid grid-cols-4 items-center justify-items-center gap-4" staggerDelay={0.05}>
              {clientLogos.map((logo, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center justify-center">
                    <img src={logo} alt={`Client ${index + 1}`} className="h-16 w-auto object-contain" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Right side - Values list (white background) - top on mobile */}
        <div className="w-full md:w-1/2 bg-white py-10 md:py-24 px-6 md:px-16 order-1 md:order-2">
          <ScrollAnimation direction="left">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 md:mb-12 text-right">ערכי הליבה שלנו</h2>
          </ScrollAnimation>
          
          <StaggerContainer className="space-y-5 md:space-y-8" staggerDelay={0.1}>
            {values.map((value, index) => (
              <StaggerItem key={index} direction="left">
                <div className="flex items-start gap-4 md:gap-6" dir="rtl">
                  <div className="flex-shrink-0">
                    <img src={value.icon} alt={value.title} className="w-10 h-10 md:w-14 md:h-14" />
                  </div>
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

export default CoreValuesSection;
