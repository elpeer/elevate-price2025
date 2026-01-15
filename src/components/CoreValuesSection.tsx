import React from 'react';
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

const CoreValuesSection: React.FC = () => {
  return (
    <section id="values" className="w-full" dir="ltr">
      {/* Main content area */}
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image and logos (lavender background) - bottom on mobile */}
        <div className="w-full md:w-1/2 flex flex-col order-2 md:order-1" style={{ backgroundColor: '#EFEFFF' }}>
          {/* Blue abstract image with text overlay */}
          <div 
            className="relative h-[300px] md:h-[500px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${blueAbstractBg})`
            }}
          >
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-12 text-center">
              <p className="text-white/90 text-sm md:text-lg leading-6 md:leading-8 mb-4 md:mb-8">
                המשימה שלנו היא להעצים עסקים עם פתרונות אינטרנט מתקדמים המניעים צמיחה ומעורבות. אנו משלבים תובנה אסטרטגית, עיצוב חדשני ומומחיות טכנית כדי ליצור אתרים מותאמים הבולטים בנוף הדיגיטלי.
              </p>
              <p className="text-white/90 text-sm md:text-lg leading-6 md:leading-8">
                עם מחויבות למצוינות ולשביעות רצון לקוחות, אנו שואפים להיות השותף מנצח עבור חברות המעוניינות להוביל את הנוכחות הדיגיטלית שלהם להשגת מטרותיהם.
              </p>
            </div>
          </div>

          {/* Client logos section */}
          <div className="py-8 md:py-12 px-6 md:px-8">
            <p className="text-center text-foreground font-medium mb-6 md:mb-8">נבחרנו על ידי הטובים ביותר</p>
            
            {/* Logos grid - 2 rows */}
            <div className="grid grid-cols-4 items-center justify-items-center gap-4" dir="rtl">
              {clientLogos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img src={logo} alt={`Client ${index + 1}`} className="h-10 md:h-16 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Values list (white background) - top on mobile */}
        <div className="w-full md:w-1/2 bg-white py-12 md:py-24 px-6 md:px-16 order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 text-right">ערכי הליבה שלנו</h2>
          
          <div className="space-y-6 md:space-y-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-center gap-4 md:gap-6" dir="rtl">
                <div className="flex-shrink-0">
                  <img src={value.icon} alt={value.title} className="w-12 h-12 md:w-14 md:h-14" />
                </div>
                <div className="text-right flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 md:mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
