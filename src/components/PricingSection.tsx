import React, { useState } from 'react';
import { Plus, Minus, X, Check } from 'lucide-react';
import pricingBlockIcon from '@/assets/icons/pricing-block-icon.svg';

const basePricingItems = [
  {
    title: 'אבחון ומחקר',
    priceValue: 5000,
    price: '₪5,000',
    hours: 30,
    hoursText: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  },
  {
    title: 'תכנון UX עדכני',
    priceValue: 2000,
    price: '₪2,000',
    hours: 30,
    hoursText: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  },
  {
    title: 'עיצוב UI',
    priceValue: 1000,
    price: '₪1,000',
    hours: 30,
    hoursText: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  },
  {
    title: 'העברה לפיתוח וליווי',
    priceValue: 2000,
    price: '₪2,000',
    hours: 30,
    hoursText: '30 שעות',
    items: ['ראיונות עומק לצורך למידה ואפיון צרכים', 'ניתוח הממשק הקיים', 'ניתוח מתחרים']
  }
];

const categories = [
  {
    id: 'accessibility',
    title: 'נגישות',
    options: [
      {
        id: 'addon',
        title: 'תוסף/רכיב נגישות',
        price: '₪48,000',
        priceValue: 48000,
        hours: 40,
        hoursText: '40 שעות',
        description: 'נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של...',
        details: 'פירוט מלא על תוסף הנגישות כולל התאמות WCAG 2.1, תמיכה בקוראי מסך, ניווט מקלדת ועוד.'
      },
      {
        id: 'report',
        title: 'דו"ח נגישות',
        price: '₪48,000',
        priceValue: 48000,
        hours: 40,
        hoursText: '40 שעות',
        description: 'נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של...',
        details: 'דוח נגישות מקיף הכולל בדיקות אוטומטיות וידניות, המלצות לתיקון והתאמה לתקנות.'
      }
    ]
  },
  {
    id: 'branding',
    title: 'חבילות מיתוג',
    options: [
      { id: 'basic', title: 'חבילה בסיסית', price: '₪15,000', priceValue: 15000, hours: 20, hoursText: '20 שעות', description: 'לוגו ופלטת צבעים', details: '' },
      { id: 'premium', title: 'חבילה מורחבת', price: '₪35,000', priceValue: 35000, hours: 50, hoursText: '50 שעות', description: 'מיתוג מלא', details: '' }
    ]
  },
  {
    id: 'hosting',
    title: 'שרת אחסון',
    options: [
      { id: 'shared', title: 'אחסון משותף', price: '₪500/חודש', priceValue: 500, hours: 0, hoursText: '', description: 'לאתרים קטנים', details: '' },
      { id: 'dedicated', title: 'שרת ייעודי', price: '₪2,000/חודש', priceValue: 2000, hours: 0, hoursText: '', description: 'לאתרים גדולים', details: '' }
    ]
  },
  {
    id: 'maintenance',
    title: 'חבילות תחזוקה',
    options: [
      { id: 'monthly', title: 'תחזוקה חודשית', price: '₪1,500/חודש', priceValue: 1500, hours: 0, hoursText: '', description: 'תמיכה וגיבויים', details: '' },
      { id: 'yearly', title: 'תחזוקה שנתית', price: '₪15,000/שנה', priceValue: 15000, hours: 0, hoursText: '', description: 'חבילה מלאה', details: '' }
    ]
  }
];

const PricingSection: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string>('accessibility');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? '' : categoryId);
  };

  const toggleOption = (categoryId: string, optionId: string) => {
    setSelectedOptions(prev => {
      if (prev[categoryId] === optionId) {
        const newState = { ...prev };
        delete newState[categoryId];
        return newState;
      }
      return { ...prev, [categoryId]: optionId };
    });
  };

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  // Get selected addons to display in summary
  const getSelectedAddons = () => {
    const addons: Array<{ title: string; price: string; hoursText: string; priceValue: number; hours: number }> = [];
    Object.entries(selectedOptions).forEach(([categoryId, optionId]) => {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        const option = category.options.find(o => o.id === optionId);
        if (option) {
          addons.push({
            title: option.title,
            price: option.price,
            hoursText: option.hoursText,
            priceValue: option.priceValue,
            hours: option.hours
          });
        }
      }
    });
    return addons;
  };

  // Calculate totals
  const selectedAddons = getSelectedAddons();
  const baseTotal = basePricingItems.reduce((sum, item) => sum + item.priceValue, 0);
  const baseHours = basePricingItems.reduce((sum, item) => sum + item.hours, 0);
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.priceValue, 0);
  const addonsHours = selectedAddons.reduce((sum, addon) => sum + addon.hours, 0);
  const totalPrice = baseTotal + addonsTotal;
  const totalHours = baseHours + addonsHours;

  // Combine base items with selected addons for display
  const allItems = [...basePricingItems, ...selectedAddons.map(addon => ({
    title: addon.title,
    price: addon.price,
    hoursText: addon.hoursText,
    items: [] as string[]
  }))];

  return (
    <section id="pricing" className="w-full py-16 md:py-24 px-6 md:px-16 flex flex-col justify-center bg-background">
      <div className="max-w-6xl mx-auto w-full" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* RIGHT column - העדפות ותוספות */}
          <div className="md:order-1">
            <h2 className="text-2xl md:text-4xl font-normal text-foreground text-right mb-2">
              העדפות ותוספות
            </h2>
            <p className="text-muted-foreground text-right text-sm md:text-base mb-6 md:mb-8">
              נא לבחור העדפות בנוגע לנגישות ושרתים ועוד..
            </p>

            {/* Categories */}
            <div className="space-y-0">
              {categories.map((category, index) => (
                <div key={category.id} className={index > 0 ? 'border-t border-border' : ''}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full py-4 md:py-5 flex items-center gap-3 md:gap-4 text-right"
                  >
                    <span className="text-lg md:text-xl text-foreground flex-shrink-0">
                      {openCategory === category.id ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                    </span>
                    <span className="text-lg md:text-xl font-medium text-foreground">{category.title}</span>
                  </button>

                  {/* Category Options */}
                  {openCategory === category.id && (
                    <div className="pb-4 md:pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        {category.options.map((option) => {
                          const isSelected = selectedOptions[category.id] === option.id;
                          return (
                            <button
                              key={option.id}
                              onClick={() => toggleOption(category.id, option.id)}
                              className={`relative p-4 md:p-5 text-right transition-all rounded-[12px] md:rounded-[16px] ${
                                isSelected
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'bg-[#F3F3F3] border-2 border-transparent'
                              }`}
                            >
                              {/* Checkbox */}
                              <div className={`absolute left-3 md:left-4 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 rounded border-2 ${
                                isSelected ? 'bg-primary border-primary' : 'border-muted-foreground bg-white'
                              } flex items-center justify-center`}>
                                {isSelected && <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />}
                              </div>

                              <h4 className={`font-medium mb-1 md:mb-2 text-right text-sm md:text-base ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                {option.title}
                              </h4>
                              <p className="text-foreground text-base md:text-lg mb-1 md:mb-2 text-right">{option.price}</p>
                              <p className="text-muted-foreground text-xs md:text-sm text-right">{option.description}</p>
                              
                              {option.details && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(option.title, option.details);
                                  }}
                                  className="text-primary text-xs md:text-sm font-medium mt-2 md:mt-3 block text-right"
                                >
                                  למידע נוסף
                                </button>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* LEFT column - סיכום לוחות זמנים ועלויות */}
          <div className="md:order-2">
            <h2 className="text-2xl md:text-4xl font-normal text-foreground text-right mb-6 md:mb-8">
              סיכום לוחות זמנים ועלויות
            </h2>
            
            {/* Unified summary card */}
            <div className="rounded-[24px] md:rounded-[32px] px-3 md:px-4 pb-3 md:pb-4" style={{ backgroundColor: '#EDEDED' }}>
              <div className="p-4 md:p-8">
                {allItems.map((item, index) => (
                  <div key={index}>
                    {/* Row header */}
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <img src={pricingBlockIcon} alt="" className="w-5 h-5 md:w-6 md:h-6" />
                        <h3 className="text-base md:text-lg font-medium text-foreground">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 text-muted-foreground text-xs md:text-sm">
                        {item.hoursText && <span className="hidden sm:inline">{item.hoursText}</span>}
                        {item.hoursText && <span className="hidden sm:inline">|</span>}
                        <span className="font-medium text-foreground">{item.price}</span>
                      </div>
                    </div>
                    
                    {/* Row items - bullet list (only for base items) */}
                    {item.items && item.items.length > 0 && (
                      <ul className="list-disc pr-5 space-y-1 md:space-y-1.5 text-right text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                        {item.items.map((listItem, i) => (
                          <li key={i}>{listItem}</li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Divider */}
                    {index < allItems.length - 1 && (
                      <div className="border-t border-border/50 my-4 md:my-5" />
                    )}
                  </div>
                ))}
              </div>

              {/* Total bar - inside the card */}
              <div className="bg-white rounded-[48px] md:rounded-[68px] px-4 md:px-6 py-2 md:py-3 flex items-center justify-between">
                <span className="text-lg md:text-xl font-medium text-foreground">סה"כ</span>
                <div className="flex items-center gap-2 md:gap-3 text-muted-foreground text-xs md:text-sm">
                  <span className="hidden sm:inline">{totalHours} שעות</span>
                  <span className="hidden sm:inline">|</span>
                  <span className="font-bold text-foreground text-base md:text-lg">₪{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-10 md:mt-16 text-right">
          <div className="text-muted-foreground text-xs md:text-sm leading-5 md:leading-6 space-y-1">
            <p>*הזמנים המוגדרים הם זמנים לכל חלק בנפרד ובחלקים ינוהלו במקביל</p>
            <p>**זמני העבודה בחלקם יכולים להתקצר/להתארך בהתאם לזמני התגובה של הלקוח ותהליכי אישור</p>
            <p>** בכל אישור עיצוב של עמוד נתחיל לקדם את פיתוח העמוד הספציפי כדי לקצר זמנים</p>
            <p>תוספת שלא הוגדרה בהצעה ובאפיון הראשוני יתומחר בנפרד במידה והיא מהווה תוספת משמעותית</p>
          </div>

          <div className="mt-8 md:mt-10">
            <h3 className="text-lg md:text-xl font-medium text-foreground mb-3 md:mb-4">תנאי תשלום</h3>
            <div className="text-foreground text-sm md:text-base leading-6 md:leading-7">
              <p>שבועיים אחרי פגישת התנעה – 15%</p>
              <p>סיום עיצוב – 30%</p>
              <p>השלמת פיתוח – 35%</p>
              <p>שבועיים אחרי התקנה ווידוא תקינות – 20%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div 
            className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 max-w-lg w-full text-right" 
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <h3 className="text-xl md:text-2xl font-medium text-foreground">{modalContent.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{modalContent.content}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PricingSection;
