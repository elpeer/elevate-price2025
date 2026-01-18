import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '../ScrollAnimation';
import deliverablesBg from '@/assets/deliverables-bg.png';
import checkIcon from '@/assets/icons/check-icon.svg';

interface DeliverablesData { title?: string; included?: string[]; excluded?: string[]; backgroundImage?: string; }
interface Props { data: DeliverablesData; }

const defaultIncluded = ['אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים', 'בניית Design System', 'ליווי צוות הפיתוח עד לשלבים מתקדמים', 'מיקרו אנימציה ואלמנטים אינטרקאטיביים', 'נגישות האתר'];
const defaultExcluded = ['פיתוח Frontend', 'מיתוג (אופציונלי)', 'יצירת תוכן', 'הכנסת תוכן ועריכה'];

const DeliverablesSectionDynamic: React.FC<Props> = ({ data }) => {
  const title = data.title || 'כל מה שנספק לך';
  const included = data.included || defaultIncluded;
  const excluded = data.excluded || defaultExcluded;
  const bgImage = data.backgroundImage || deliverablesBg;
  const maxRows = Math.max(included.length, excluded.length);
  const rows = Array.from({ length: maxRows }, (_, i) => ({ included: included[i] || null, excluded: excluded[i] || null }));

  return (
    <section id="deliverables" className="w-full py-10 md:py-24 px-4 md:px-16 flex flex-col justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="max-w-5xl mx-auto w-full">
        <ScrollAnimation><h2 className="text-2xl md:text-4xl font-normal text-foreground text-center mb-6 md:mb-16">{title}</h2></ScrollAnimation>
        <div dir="rtl">
          <ScrollAnimation delay={0.1}>
            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4">
              <div className="bg-white p-3 md:p-5 text-right rounded-lg md:rounded-none"><span className="text-base md:text-3xl font-medium text-foreground">כלול בהצעה</span></div>
              <div className="bg-white/50 p-3 md:p-5 text-right rounded-lg md:rounded-none"><span className="text-base md:text-3xl font-medium text-foreground">לא כלול</span></div>
            </div>
          </ScrollAnimation>
          <StaggerContainer className="grid gap-2 md:gap-4" staggerDelay={0.06}>
            {rows.map((r, i) => (
              <StaggerItem key={i}>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <motion.div whileHover={{ scale: 1.01 }} className="bg-white min-h-[50px] md:min-h-[72px] p-3 md:p-5 flex items-center rounded-lg md:rounded-none">
                    {r.included && <div className="flex items-center gap-2 md:gap-3 w-full"><img src={checkIcon} alt="" className="w-3.5 h-3.5 md:w-5 md:h-5 flex-shrink-0" /><span className="text-foreground text-[11px] md:text-sm leading-4 md:leading-relaxed text-right">{r.included}</span></div>}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} className="bg-white/50 min-h-[50px] md:min-h-[72px] p-3 md:p-5 flex items-center rounded-lg md:rounded-none">
                    {r.excluded && <div className="flex items-center gap-2 md:gap-3 w-full"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-3.5 h-3.5 md:w-5 md:h-5"><path fillRule="evenodd" clipRule="evenodd" d="M13.75 10.625H6.25C5.90438 10.625 5.625 10.3438 5.625 10C5.625 9.65625 5.90438 9.375 6.25 9.375H13.75C14.0956 9.375 14.375 9.65625 14.375 10C14.375 10.3438 14.0956 10.625 13.75 10.625ZM10 0C4.47688 0 0 4.475 0 10C0 15.525 4.47688 20 10 20C15.5231 20 20 15.525 20 10C20 4.475 15.5231 0 10 0Z" fill="#E3205D"/></svg><span className="text-foreground text-[11px] md:text-sm text-right">{r.excluded}</span></div>}
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

export default DeliverablesSectionDynamic;
