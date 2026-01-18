import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X, Check } from 'lucide-react';
import { ScrollAnimation } from '../ScrollAnimation';
import pricingBlockIcon from '@/assets/icons/pricing-block-icon.svg';



type TextLike = string | { id?: number | string; text?: string };

interface PricingItem {
  title: string;
  priceValue: number;
  hours: number;
  items?: string[];
}

interface PricingOption {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  hours: number;
  hoursText?: string;
  description: string;
  details?: string;
}

interface PricingCategory {
  id: string;
  title: string;
  options: PricingOption[];
}

interface PricingData {
  // Legacy shape (kept for backwards compatibility)
  basePricingItems?: PricingItem[];
  categories?: PricingCategory[];
  paymentTerms?: TextLike[];
  notes?: TextLike[];

  // Current DB/editor shape
  basePackages?: Array<{
    id?: number | string;
    title: string;
    price?: number | string;
    priceValue?: number;
    hours?: number;
    items?: Array<TextLike>;
  }>;
  addonCategories?: Array<{
    id: string;
    title: string;
    options: Array<{
      id: string;
      title: string;
      price?: string;
      priceValue?: number;
      hours?: number;
      description?: string;
      details?: string;
    }>;
  }>;

  // Labels (DB/editor)
  title?: string;
  addonsTitle?: string;
  addonsSubtitle?: string;
  summaryTitle?: string;
  paymentTermsTitle?: string;
  totalLabel?: string;
  hoursLabel?: string;
}

interface Props { data: PricingData; }

const textFrom = (v: any): string => (typeof v === 'string' ? v : (v?.text ?? ''));

const normalizeTextArray = (arr: any, fallback: string[]): string[] => {
  if (!Array.isArray(arr)) return fallback;
  return arr.map(textFrom).filter(Boolean);
};

const parsePriceValue = (v: any): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = Number(v.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

const normalizeBasePricingItems = (data: PricingData): PricingItem[] => {
  if (Array.isArray(data.basePricingItems) && data.basePricingItems.length) return data.basePricingItems;
  if (Array.isArray(data.basePackages) && data.basePackages.length) {
    return data.basePackages.map((p) => ({
      title: p.title,
      priceValue: parsePriceValue(p.priceValue ?? p.price),
      hours: typeof p.hours === 'number' ? p.hours : 0,
      items: Array.isArray(p.items) ? p.items.map(textFrom).filter(Boolean) : [],
    }));
  }
  return defaultBasePricingItems;
};

const normalizeCategories = (data: PricingData): PricingCategory[] => {
  if (Array.isArray(data.categories) && data.categories.length) return data.categories;
  if (Array.isArray(data.addonCategories) && data.addonCategories.length) {
    return data.addonCategories.map((c) => ({
      id: c.id,
      title: c.title,
      options: (c.options || []).map((o) => ({
        id: o.id,
        title: o.title,
        price: o.price ?? (o.priceValue ? `₪${Number(o.priceValue).toLocaleString()}` : '₪0'),
        priceValue: typeof o.priceValue === 'number' ? o.priceValue : parsePriceValue(o.price),
        hours: typeof o.hours === 'number' ? o.hours : 0,
        hoursText: typeof o.hours === 'number' ? `${o.hours} שעות` : '',
        description: o.description ?? '',
        details: o.details ?? '',
      })),
    }));
  }
  return defaultCategories;
};

const PricingSectionDynamic: React.FC<Props> = ({ data }) => {
  const [openCategory, setOpenCategory] = useState<string>('accessibility');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const basePricingItems = normalizeBasePricingItems(data);
  const categories = normalizeCategories(data);
  const paymentTerms = normalizeTextArray(data.paymentTerms, ['שבועיים אחרי פגישת התנעה – 15%', 'סיום עיצוב – 30%', 'השלמת פיתוח – 35%', 'שבועיים אחרי התקנה ווידוא תקינות – 20%']);
  const notes = normalizeTextArray(data.notes, []);

  const title = data.title || 'תמחור';
  const addonsTitle = data.addonsTitle || 'העדפות ותוספות';
  const addonsSubtitle = data.addonsSubtitle || 'נא לבחור העדפות בנוגע לנגישות ושרתים ועוד..';
  const summaryTitle = data.summaryTitle || 'סיכום לוחות זמנים ועלויות';
  const paymentTermsTitle = data.paymentTermsTitle || 'תנאי תשלום';
  const totalLabel = data.totalLabel || 'סה"כ';

  const toggleOption = (categoryId: string, optionId: string) => {
    setSelectedOptions((prev) =>
      prev[categoryId] === optionId ? (delete prev[categoryId], { ...prev }) : { ...prev, [categoryId]: optionId },
    );
  };

  const getSelectedAddons = () => {
    return Object.entries(selectedOptions)
      .map(([categoryId, optionId]) => {
        const category = categories.find((c) => c.id === categoryId);
        const option = category?.options.find((o) => o.id === optionId);
        return option
          ? {
              title: option.title,
              price: option.price,
              hoursText: option.hoursText || '',
              priceValue: option.priceValue,
              hours: option.hours,
            }
          : null;
      })
      .filter(Boolean) as any[];
  };

  const selectedAddons = getSelectedAddons();
  const baseTotal = basePricingItems.reduce((s, i) => s + i.priceValue, 0);
  const baseHours = basePricingItems.reduce((s, i) => s + i.hours, 0);
  const addonsTotal = selectedAddons.reduce((s: number, a: any) => s + a.priceValue, 0);
  const addonsHours = selectedAddons.reduce((s: number, a: any) => s + a.hours, 0);
  const totalPrice = baseTotal + addonsTotal;
  const totalHours = baseHours + addonsHours;
  const allItems = [
    ...basePricingItems.map((i) => ({
      ...i,
      price: `₪${i.priceValue.toLocaleString()}`,
      hoursText: `${i.hours} שעות`,
    })),
    ...selectedAddons.map((a: any) => ({ title: a.title, price: a.price, hoursText: a.hoursText, items: [] })),
  ];

  return (
    <section id="pricing" className="w-full py-16 md:py-24 px-6 md:px-16 flex flex-col justify-center bg-background">
      <div className="max-w-6xl mx-auto w-full" dir="rtl">
        <ScrollAnimation>
          <h2 className="text-2xl md:text-4xl font-normal text-foreground text-center mb-8">{title}</h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="md:order-1">
            <ScrollAnimation direction="right">
              <h3 className="text-2xl md:text-4xl font-normal text-foreground text-right mb-2">{addonsTitle}</h3>
              <p className="text-muted-foreground text-right text-sm md:text-base mb-6 md:mb-8">{addonsSubtitle}</p>
            </ScrollAnimation>
            <div className="space-y-0">
              {categories.map((category, index) => (
                <div key={category.id} className={index > 0 ? 'border-t border-border' : ''}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOpenCategory(openCategory === category.id ? '' : category.id)}
                    className="w-full py-4 md:py-5 flex items-center gap-3 md:gap-4 text-right"
                  >
                    <motion.span
                      animate={{ rotate: openCategory === category.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg md:text-xl text-foreground flex-shrink-0"
                    >
                      {openCategory === category.id ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                    </motion.span>
                    <span className="text-lg md:text-xl font-medium text-foreground">{category.title}</span>
                  </motion.button>
                  <AnimatePresence>
                    {openCategory === category.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 md:pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          {category.options.map((option) => (
                            <motion.button
                              key={option.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleOption(category.id, option.id)}
                              className={`relative p-4 md:p-5 text-right transition-all rounded-[12px] md:rounded-[16px] ${
                                selectedOptions[category.id] === option.id
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'bg-secondary border-2 border-transparent'
                              }`}
                            >
                              <motion.div
                                className={`absolute left-3 md:left-4 top-3 md:top-4 w-4 h-4 md:w-5 md:h-5 rounded border-2 ${
                                  selectedOptions[category.id] === option.id
                                    ? 'bg-primary border-primary'
                                    : 'border-muted-foreground bg-background'
                                } flex items-center justify-center`}
                              >
                                {selectedOptions[category.id] === option.id && <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary-foreground" />}
                              </motion.div>
                              <h4
                                className={`font-medium mb-1 md:mb-2 text-right text-sm md:text-base ${
                                  selectedOptions[category.id] === option.id ? 'text-primary' : 'text-foreground'
                                }`}
                              >
                                {option.title}
                              </h4>
                              <p className="text-foreground text-base md:text-lg mb-1 md:mb-2 text-right">{option.price}</p>
                              <p className="text-muted-foreground text-xs md:text-sm text-right">{option.description}</p>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="md:order-2">
            <ScrollAnimation direction="left">
              <h3 className="text-2xl md:text-4xl font-normal text-foreground text-right mb-6 md:mb-8">{summaryTitle}</h3>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <motion.div layout className="rounded-[24px] md:rounded-[32px] px-3 md:px-4 pb-3 md:pb-4 bg-secondary">
                <div className="p-4 md:p-8">
                  <AnimatePresence mode="popLayout">
                    {allItems.map((item, i) => (
                      <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} layout>
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <div className="flex items-center gap-2 md:gap-3">
                            <img src={pricingBlockIcon} alt="" className="w-5 h-5 md:w-6 md:h-6" />
                            <h4 className="text-base md:text-lg font-medium text-foreground">{item.title}</h4>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3 text-muted-foreground text-xs md:text-sm">
                            {item.hoursText && <span className="hidden sm:inline">{item.hoursText}</span>}
                            {item.hoursText && <span className="hidden sm:inline">|</span>}
                            <span className="font-medium text-foreground">{item.price}</span>
                          </div>
                        </div>
                        {item.items && item.items.length > 0 && (
                          <ul className="list-disc pr-5 space-y-1 md:space-y-1.5 text-right text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                            {item.items.map((li: any, j: number) => (
                              <li key={j}>{typeof li === 'string' ? li : textFrom(li)}</li>
                            ))}
                          </ul>
                        )}
                        {i < allItems.length - 1 && <div className="border-t border-border/50 my-4 md:my-5" />}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.div layout className="bg-background rounded-[48px] md:rounded-[68px] px-4 md:px-6 py-2 md:py-3 flex items-center justify-between">
                  <span className="text-lg md:text-xl font-medium text-foreground">{totalLabel}</span>
                  <div className="flex items-center gap-2 md:gap-3 text-muted-foreground text-xs md:text-sm">
                    <span className="hidden sm:inline">{totalHours} שעות</span>
                    <span className="hidden sm:inline">|</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-bold text-foreground text-base md:text-lg"
                    >
                      ₪{totalPrice.toLocaleString()}
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>

        <ScrollAnimation delay={0.3}>
          <div className="mt-10 md:mt-16 text-right">
            <div className="mt-8 md:mt-10">
              <h3 className="text-lg md:text-xl font-medium text-foreground mb-3 md:mb-4">{paymentTermsTitle}</h3>
              <div className="text-foreground text-sm md:text-base leading-6 md:leading-7">
                {paymentTerms.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>

            {notes.length > 0 && (
              <div className="mt-6">
                {notes.map((n, i) => (
                  <p key={i} className="text-muted-foreground text-xs md:text-sm">{n}</p>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>

      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setModalContent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-foreground">{modalContent.title}</h3>
                <button onClick={() => setModalContent(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-muted-foreground">{modalContent.content}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PricingSectionDynamic;
