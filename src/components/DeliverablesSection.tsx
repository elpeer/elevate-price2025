import React from 'react';
import deliverablesBg from '@/assets/deliverables-bg.png';
import checkIcon from '@/assets/icons/check-icon.svg';

// Comparison rows - each row has included (right) and notIncluded (left) items
const comparisonRows = [
  {
    included: 'אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים שיוגדרו ויכנסו במסגרת השעות הראשונית',
    notIncluded: 'פיתוח Frontend'
  },
  {
    included: 'בניית Design System',
    notIncluded: 'מיתוג (אופציונלי)'
  },
  {
    included: 'ליווי צוות הפיתוח עד לשלבים מתקדמים על מנת לוודא הטמעה תקינה או התאמות במידת הצורך',
    notIncluded: 'יצירת תוכן'
  },
  {
    included: 'ליווי צוות הפיתוח עד לשלבים מתקדמים על מנת לוודא הטמעה תקינה או התאמות במידת הצורך',
    notIncluded: 'הכנסת תוכן ועריכה (עבור שאר הדפים הנוספים)'
  },
  {
    included: 'מיקרו אנימציה ואלמנטים אינטרקאטיביים',
    notIncluded: null
  },
  {
    included: 'נגישות האתר',
    notIncluded: null
  },
];

const CheckIcon = () => (
  <img src={checkIcon} alt="included" className="w-5 h-5 flex-shrink-0" />
);

const MinusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.75 10.625H6.25C5.90438 10.625 5.625 10.3438 5.625 10C5.625 9.65625 5.90438 9.375 6.25 9.375H13.75C14.0956 9.375 14.375 9.65625 14.375 10C14.375 10.3438 14.0956 10.625 13.75 10.625ZM10 0C4.47688 0 0 4.475 0 10C0 15.525 4.47688 20 10 20C15.5231 20 20 15.525 20 10C20 4.475 15.5231 0 10 0Z" fill="#E3205D"/>
  </svg>
);

const DeliverablesSection: React.FC = () => {
  return (
    <section 
      id="deliverables" 
      className="w-full py-24 px-16 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${deliverablesBg})` }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-4xl font-normal text-foreground text-center mb-16">
          כל מה שנספק לך
        </h2>

        {/* Single comparison table using CSS Grid */}
        <div className="rounded-xl overflow-hidden" dir="rtl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Right header - Included */}
            <div className="bg-foreground text-white p-5 text-center font-medium">
              כלול בהצעה
            </div>
            {/* Left header - Not Included */}
            <div 
              className="p-5 text-center font-medium text-foreground"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.50)' }}
            >
              לא כלול בהצעה
            </div>
          </div>

          {/* Data Rows - each row is a single grid row with 2 cells */}
          {comparisonRows.map((row, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2">
              {/* Right cell - Included item */}
              <div className="bg-white p-5 border-b border-border/30 flex items-center min-h-[72px]">
                {row.included && (
                  <div className="flex items-center gap-3 w-full">
                    <CheckIcon />
                    <span className="text-foreground text-sm leading-relaxed">{row.included}</span>
                  </div>
                )}
              </div>
              
              {/* Left cell - Not Included item */}
              <div 
                className="p-5 border-b border-border/20 flex items-center min-h-[72px]"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.50)' }}
              >
                {row.notIncluded && (
                  <div className="flex items-center gap-3 w-full">
                    <MinusIcon />
                    <span className="text-foreground text-sm">{row.notIncluded}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
