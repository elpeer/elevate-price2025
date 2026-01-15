import React from 'react';
import deliverablesBg from '@/assets/deliverables-bg.png';
import checkIcon from '@/assets/icons/check-icon.svg';

const includedItems = [
  'אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים שיוגדרו ויכנסו במסגרת השעות הראשונית',
  'בניית Design System',
  'ליווי צוות הפיתוח עד לשלבים מתקדמים על מנת לוודא הטמעה תקינה או התאמות במידת הצורך',
  'ליווי צוות הפיתוח עד לשלבים מתקדמים על מנת לוודא הטמעה תקינה או התאמות במידת הצורך',
  'מיקרו אנימציה ואלמנטים אינטרקאטיביים',
  'נגישות האתר',
];

const notIncludedItems = [
  'פיתוח Frontend',
  'מיתוג (אופציונלי)',
  'יצירת תוכן',
  'הכנסת תוכן ועריכה (עבור שאר הדפים הנוספים)',
];

const CheckIcon = () => (
  <img src={checkIcon} alt="included" className="w-5 h-5" />
);

const MinusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.75 10.625H6.25C5.90438 10.625 5.625 10.3438 5.625 10C5.625 9.65625 5.90438 9.375 6.25 9.375H13.75C14.0956 9.375 14.375 9.65625 14.375 10C14.375 10.3438 14.0956 10.625 13.75 10.625ZM10 0C4.47688 0 0 4.475 0 10C0 15.525 4.47688 20 10 20C15.5231 20 20 15.525 20 10C20 4.475 15.5231 0 10 0Z" fill="#E3205D"/>
  </svg>
);

const DeliverablesSection: React.FC = () => {
  const maxRows = Math.max(includedItems.length, notIncludedItems.length);

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

        {/* Two column table */}
        <div className="grid grid-cols-2 rounded-xl overflow-hidden" dir="rtl">
          {/* Header Row */}
          <div className="bg-foreground text-white p-4 text-center font-medium">
            כלול בהצעה
          </div>
          <div className="bg-white p-4 text-center font-medium text-foreground border-b border-border">
            לא כלול בהצעה
          </div>

          {/* Content Rows */}
          {Array.from({ length: maxRows }).map((_, index) => (
            <React.Fragment key={index}>
              {/* Included column */}
              <div className="bg-white p-4 border-b border-border">
                {includedItems[index] && (
                  <div className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-foreground text-sm">{includedItems[index]}</span>
                  </div>
                )}
              </div>
              
              {/* Not included column */}
              <div className="bg-white p-4 border-b border-border">
                {notIncludedItems[index] && (
                  <div className="flex items-center gap-3">
                    <MinusIcon />
                    <span className="text-foreground text-sm">{notIncludedItems[index]}</span>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
