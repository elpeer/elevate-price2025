import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

const pricingItems = [
  {
    title: 'אבחון ומחקר',
    price: '₪5,000',
    hours: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  },
  {
    title: 'תכנון UX עדכני',
    price: '₪2,000',
    hours: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  },
  {
    title: 'עיצוב UI',
    price: '₪1,000',
    hours: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  },
  {
    title: 'העברה לפיתוח וליווי',
    price: '₪2,000',
    hours: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  }
];

const PricingSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = React.useState<'addon' | 'report'>('report');

  return (
    <section className="bg-background py-24 px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-12">
          {/* Left - Pricing */}
          <div>
            <h2 className="text-4xl font-normal text-foreground text-right mb-8">
              סיכום לוחות זמנים ועלויות
            </h2>
            
            <div className="bg-muted rounded-3xl p-8">
              {pricingItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="font-medium text-foreground">{item.price}</span>
                      <span>|</span>
                      <span>{item.hours}</span>
                    </div>
                    <h3 className="text-xl font-medium text-foreground">{item.title}</h3>
                  </div>
                  <ul className="space-y-2 text-right mb-6">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-center justify-end gap-2">
                        <span>{listItem}</span>
                        <Check className="w-4 h-4 text-primary" />
                      </li>
                    ))}
                  </ul>
                  {index < pricingItems.length - 1 && (
                    <div className="border-t border-border my-6" />
                  )}
                </div>
              ))}

              <div className="bg-background rounded-full px-6 py-4 flex items-center justify-between mt-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="font-medium text-foreground">₪48,000</span>
                  <span>|</span>
                  <span>420 שעות</span>
                </div>
                <span className="text-xl font-medium text-foreground">סה"כ</span>
              </div>
            </div>
          </div>

          {/* Right - Options */}
          <div>
            <h2 className="text-4xl font-normal text-foreground text-right mb-2">
              העדפות ותוספות
            </h2>
            <p className="text-muted-foreground text-right mb-8">
              נא לבחור העדפות בנוגע לנגישות ושרתים ועוד..
            </p>

            {/* Accessibility section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-4 h-0.5 bg-foreground" />
                </div>
                <h3 className="text-xl font-medium text-foreground">נגישות</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedOption('addon')}
                  className={`relative p-6 rounded-2xl text-right border-2 transition-all ${
                    selectedOption === 'addon'
                      ? 'bg-primary/10 border-primary'
                      : 'bg-muted border-transparent'
                  }`}
                >
                  <div className={`absolute left-4 top-4 w-6 h-6 rounded-md border-2 ${
                    selectedOption === 'addon' ? 'bg-primary border-primary' : 'border-border'
                  } flex items-center justify-center`}>
                    {selectedOption === 'addon' && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <h4 className={`font-medium mb-2 ${selectedOption === 'addon' ? 'text-primary' : 'text-foreground'}`}>
                    תוסף/רכיב נגישות
                  </h4>
                  <p className="text-foreground text-xl mb-2">₪48,000</p>
                  <p className="text-muted-foreground text-sm">נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של...</p>
                  <button className="text-primary text-sm font-medium mt-3 flex items-center gap-1 justify-end w-full">
                    למידע נוסף
                  </button>
                </button>

                <button
                  onClick={() => setSelectedOption('report')}
                  className={`relative p-6 rounded-2xl text-right border-2 transition-all ${
                    selectedOption === 'report'
                      ? 'bg-primary/10 border-primary'
                      : 'bg-muted border-transparent'
                  }`}
                >
                  <div className={`absolute left-4 top-4 w-6 h-6 rounded-md border-2 ${
                    selectedOption === 'report' ? 'bg-primary border-primary' : 'border-border'
                  } flex items-center justify-center`}>
                    {selectedOption === 'report' && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <h4 className={`font-medium mb-2 ${selectedOption === 'report' ? 'text-primary' : 'text-foreground'}`}>
                    דו"ח נגישות
                  </h4>
                  <p className="text-foreground text-xl mb-2">₪48,000</p>
                  <p className="text-muted-foreground text-sm">נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של...</p>
                  <button className="text-primary text-sm font-medium mt-3 flex items-center gap-1 justify-end w-full">
                    למידע נוסף
                  </button>
                </button>
              </div>
            </div>

            {/* Collapsible sections */}
            {['חבילות מיתוג', 'שרת אחסון', 'חבילות תחזוקה'].map((title, index) => (
              <div key={index} className="border-t border-border py-4">
                <button className="flex items-center justify-between w-full">
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                  <span className="text-xl font-medium text-foreground">{title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
