import React, { useState } from 'react';
import { Plus, Minus, X, Check } from 'lucide-react';
import pricingBlockIcon from '@/assets/icons/pricing-block-icon.svg';

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

const categories = [
  {
    id: 'accessibility',
    title: 'נגישות',
    options: [
      {
        id: 'addon',
        title: 'תוסף/רכיב נגישות',
        price: '₪48,000',
        description: 'נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של...',
        details: 'פירוט מלא על תוסף הנגישות כולל התאמות WCAG 2.1, תמיכה בקוראי מסך, ניווט מקלדת ועוד.'
      },
      {
        id: 'report',
        title: 'דו"ח נגישות',
        price: '₪48,000',
        description: 'נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של...',
        details: 'דוח נגישות מקיף הכולל בדיקות אוטומטיות וידניות, המלצות לתיקון והתאמה לתקנות.'
      }
    ]
  },
  {
    id: 'branding',
    title: 'חבילות מיתוג',
    options: [
      { id: 'basic', title: 'חבילה בסיסית', price: '₪15,000', description: 'לוגו ופלטת צבעים', details: '' },
      { id: 'premium', title: 'חבילה מורחבת', price: '₪35,000', description: 'מיתוג מלא', details: '' }
    ]
  },
  {
    id: 'hosting',
    title: 'שרת אחסון',
    options: [
      { id: 'shared', title: 'אחסון משותף', price: '₪500/חודש', description: 'לאתרים קטנים', details: '' },
      { id: 'dedicated', title: 'שרת ייעודי', price: '₪2,000/חודש', description: 'לאתרים גדולים', details: '' }
    ]
  },
  {
    id: 'maintenance',
    title: 'חבילות תחזוקה',
    options: [
      { id: 'monthly', title: 'תחזוקה חודשית', price: '₪1,500/חודש', description: 'תמיכה וגיבויים', details: '' },
      { id: 'yearly', title: 'תחזוקה שנתית', price: '₪15,000/שנה', description: 'חבילה מלאה', details: '' }
    ]
  }
];

const PricingSection: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string>('accessibility');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({ accessibility: 'report' });
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? '' : categoryId);
  };

  const selectOption = (categoryId: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [categoryId]: optionId }));
  };

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <section id="pricing" className="w-full py-24 px-16 flex flex-col justify-center" style={{ backgroundColor: '#F3F3F3' }}>
      <div className="max-w-6xl mx-auto w-full" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* RIGHT column - העדפות ותוספות */}
          <div className="md:order-1">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground text-right mb-2">
              העדפות ותוספות
            </h2>
            <p className="text-muted-foreground text-right mb-8">
              נא לבחור העדפות בנוגע לנגישות ושרתים ועוד..
            </p>

            {/* Categories */}
            <div className="space-y-0">
              {categories.map((category, index) => (
                <div key={category.id} className={index > 0 ? 'border-t border-border' : ''}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full py-5 flex items-center gap-4 text-right"
                  >
                    <span className="text-xl text-foreground flex-shrink-0">
                      {openCategory === category.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                    <span className="text-xl font-medium text-foreground">{category.title}</span>
                  </button>

                  {/* Category Options */}
                  {openCategory === category.id && (
                    <div className="pb-6">
                      <div className="grid grid-cols-2 gap-4">
                        {category.options.map((option) => {
                          const isSelected = selectedOptions[category.id] === option.id;
                          return (
                            <button
                              key={option.id}
                              onClick={() => selectOption(category.id, option.id)}
                              className={`relative p-5 text-right transition-all ${
                                isSelected
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'bg-white border-2 border-transparent'
                              }`}
                            >
                              {/* Checkbox */}
                              <div className={`absolute left-4 top-4 w-5 h-5 rounded border-2 ${
                                isSelected ? 'bg-primary border-primary' : 'border-muted-foreground bg-white'
                              } flex items-center justify-center`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>

                              <h4 className={`font-medium mb-2 text-right ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                {option.title}
                              </h4>
                              <p className="text-foreground text-lg mb-2 text-right">{option.price}</p>
                              <p className="text-muted-foreground text-sm text-right">{option.description}</p>
                              
                              {option.details && (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openModal(option.title, option.details);
                                  }}
                                  className="text-primary text-sm font-medium mt-3 block text-right"
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
            <h2 className="text-3xl md:text-4xl font-normal text-foreground text-right mb-8">
              סיכום לוחות זמנים ועלויות
            </h2>
            
            {/* Unified summary card */}
            <div className="rounded-[32px] overflow-hidden" style={{ backgroundColor: '#EDEDED' }}>
              <div className="p-8">
                {pricingItems.map((item, index) => (
                  <div key={index}>
                    {/* Row header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <span className="font-medium text-foreground">{item.price}</span>
                        <span>|</span>
                        <span>{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                        <img src={pricingBlockIcon} alt="" className="w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Row items - bullet list */}
                    <ul className="list-disc pr-5 space-y-1.5 text-right text-muted-foreground text-sm mb-4">
                      {item.items.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                    
                    {/* Divider */}
                    {index < pricingItems.length - 1 && (
                      <div className="border-t border-border/50 my-5" />
                    )}
                  </div>
                ))}
              </div>

              {/* Total bar */}
              <div className="bg-white px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span className="font-bold text-foreground text-lg">₪48,000</span>
                  <span>|</span>
                  <span>420 שעות</span>
                </div>
                <span className="text-xl font-medium text-foreground">סה"כ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
          <div 
            className="bg-white rounded-2xl p-8 max-w-lg mx-4 text-right" 
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-medium text-foreground">{modalContent.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{modalContent.content}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PricingSection;
