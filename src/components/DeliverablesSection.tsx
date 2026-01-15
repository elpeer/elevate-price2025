import React from 'react';
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
      className="w-full py-24 px-16 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${deliverablesBg})` }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-4xl font-normal text-foreground text-center mb-16">
          כל מה שנספק לך
        </h2>

        <div className="rounded-2xl overflow-hidden" dir="rtl">
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* LEFT = not included (first in DOM for RTL) */}
            <div className="bg-white/50 text-foreground p-5 text-center font-medium rounded-xl">
              לא כלול בהצעה
            </div>

            {/* RIGHT = included (second in DOM for RTL) */}
            <div className="bg-foreground text-white p-5 text-center font-medium rounded-xl">
              כלול בהצעה
            </div>
          </div>

          {/* Data rows */}
          <div className="grid gap-4">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LEFT cell: excluded (first in DOM for RTL) */}
                <div className="bg-white/50 rounded-xl min-h-[72px] p-5 flex items-center">
                  {r.excluded ? (
                    <div className="flex items-center gap-3 w-full">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.75 10.625H6.25C5.90438 10.625 5.625 10.3438 5.625 10C5.625 9.65625 5.90438 9.375 6.25 9.375H13.75C14.0956 9.375 14.375 9.65625 14.375 10C14.375 10.3438 14.0956 10.625 13.75 10.625ZM10 0C4.47688 0 0 4.475 0 10C0 15.525 4.47688 20 10 20C15.5231 20 20 15.525 20 10C20 4.475 15.5231 0 10 0Z" fill="#E3205D"/>
                      </svg>
                      <span className="text-foreground text-sm">{r.excluded}</span>
                    </div>
                  ) : null}
                </div>

                {/* RIGHT cell: included (second in DOM for RTL) */}
                <div className="bg-white rounded-xl min-h-[72px] p-5 flex items-center">
                  {r.included ? (
                    <div className="flex items-center gap-3 w-full">
                      <img
                        src={checkIcon}
                        alt="included"
                        className="w-5 h-5 flex-shrink-0"
                      />
                      <span className="text-foreground text-sm leading-relaxed">
                        {r.included}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
