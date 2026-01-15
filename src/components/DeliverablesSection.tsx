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
  <img src={checkIcon} alt="included" className="w-5 h-5 flex-shrink-0" />
);

const MinusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
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

        {/* Two column layout with gap */}
        <div className="flex gap-4" dir="rtl">
          {/* Right column - Included */}
          <div className="flex-1 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-foreground text-white p-5 text-center font-medium rounded-t-xl">
              כלול בהצעה
            </div>
            {/* Rows */}
            {includedItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-5 border-b border-border/30"
              >
                <div className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-foreground text-sm leading-relaxed">{item}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Left column - Not included */}
          <div className="flex-1 rounded-xl overflow-hidden">
            {/* Header */}
            <div 
              className="p-5 text-center font-medium text-foreground rounded-t-xl"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.50)' }}
            >
              לא כלול בהצעה
            </div>
            {/* Rows */}
            {Array.from({ length: maxRows }).map((_, index) => (
              <div 
                key={index} 
                className="p-5 border-b border-border/20"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.50)' }}
              >
                {notIncludedItems[index] && (
                  <div className="flex items-center gap-3">
                    <MinusIcon />
                    <span className="text-foreground text-sm">{notIncludedItems[index]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
