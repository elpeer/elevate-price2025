import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation, StaggerContainer, StaggerItem } from './ScrollAnimation';
import deliverablesBg from '@/assets/deliverables-bg.png';
import checkIcon from '@/assets/icons/check-icon.svg';

// Comparison rows - each row has included (right) and excluded (left) items
const rows = [
  {
    included: 'אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים שיוגדרו ויכנסו במסגרת השעות הראשונית',
    excluded: 'פיתוח Frontend',
  },
  { 
    included: 'בניית Design System', 
    excluded: 'מיתוג (אופציונלי)' 
  },
  {
    included: 'ליווי צוות הפיתוח עד לשלבים מתקדמים על מנת לוודא הטמעה תקינה או התאמות במידת הצורך',
    excluded: 'יצירת תוכן',
  },
  {
    included: 'מיקרו אנימציה ואלמנטים אינטרקאטיביים',
    excluded: 'הכנסת תוכן ועריכה (עבור שאר הדפים הנוספים)',
  },
  { 
    included: 'נגישות האתר', 
    excluded: null 
  },
];

const DeliverablesSection: React.FC = () => {
  return (
    <section 
      id="deliverables" 
      className="w-full py-16 md:py-24 px-6 md:px-16 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${deliverablesBg})` }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <ScrollAnimation>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground text-center mb-10 md:mb-16">
            כל מה שנספק לך
          </h2>
        </ScrollAnimation>

        <div dir="rtl">
          {/* Header row */}
          <ScrollAnimation delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4">
              {/* RIGHT = included (first in DOM for RTL) */}
              <div className="bg-white p-4 md:p-5 text-right">
                <span className="text-xl md:text-3xl font-medium text-foreground">כלול בהצעה</span>
              </div>

              {/* LEFT = not included (second in DOM for RTL) */}
              <div className="bg-white/50 p-4 md:p-5 text-right">
                <span className="text-xl md:text-3xl font-medium text-foreground">לא כלול בהצעה</span>
              </div>
            </div>
          </ScrollAnimation>

          {/* Data rows */}
          <StaggerContainer className="grid gap-2 md:gap-4" staggerDelay={0.08}>
            {rows.map((r, i) => (
              <StaggerItem key={i}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  {/* RIGHT cell: included (first in DOM for RTL) */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="bg-white min-h-[60px] md:min-h-[72px] p-4 md:p-5 flex items-center"
                  >
                    {r.included ? (
                      <div className="flex items-center gap-3 w-full">
                        <img
                          src={checkIcon}
                          alt="included"
                          className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                        />
                        <span className="text-foreground text-xs md:text-sm leading-relaxed text-right">
                          {r.included}
                        </span>
                      </div>
                    ) : null}
                  </motion.div>

                  {/* LEFT cell: excluded (second in DOM for RTL) */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/50 min-h-[60px] md:min-h-[72px] p-4 md:p-5 flex items-center"
                  >
                    {r.excluded ? (
                      <div className="flex items-center gap-3 w-full">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.75 10.625H6.25C5.90438 10.625 5.625 10.3438 5.625 10C5.625 9.65625 5.90438 9.375 6.25 9.375H13.75C14.0956 9.375 14.375 9.65625 14.375 10C14.375 10.3438 14.0956 10.625 13.75 10.625ZM10 0C4.47688 0 0 4.475 0 10C0 15.525 4.47688 20 10 20C15.5231 20 20 15.525 20 10C20 4.475 15.5231 0 10 0Z" fill="#E3205D"/>
                        </svg>
                        <span className="text-foreground text-xs md:text-sm text-right">{r.excluded}</span>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
