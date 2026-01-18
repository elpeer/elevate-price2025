import React from 'react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '../ScrollAnimation';

interface TestimonialItem {
  name: string;
  title: string;
  text: string;
  logo?: string;
  avatar?: string;
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
}

interface Props {
  data: TestimonialsData;
}

const defaultTestimonials: TestimonialItem[] = [
  { logo: 'https://api.builder.io/api/v1/image/assets/TEMP/06395a516979c278f2eccebe7d5ff71794845919', avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/9dbbf53e39bc0a6708b47a333686f73f0dc70ad5', text: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם לא רק עלתה על הציפיות שלנו."', name: 'יוסי כהן', title: 'מנכ"ל' },
  { logo: 'https://api.builder.io/api/v1/image/assets/TEMP/007e55697bfb495081352f2cd5144f56d07ec3d9', avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/e70979e9cbec3cb67452933606c1001bf3c49dc4', text: '"אני יכול לומר בביטחון כי Elevate סיפקה חלק מעבודות העיצוב והפיתוח הטובות ביותר עבור Playtika."', name: 'דני לוי', title: 'VP Product' },
  { logo: 'https://api.builder.io/api/v1/image/assets/TEMP/e8d9d11465d14cdee4ff2a87d6addaa494e312ea', avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/5cd0c9786aa76fdc6d3c30a36f2c0c6091d1f586', text: '"המומחיות והחדשנות של Elevate בתכנון ויישום שיפורים משמעותיים עלו על כל הציפיות שלנו."', name: 'מיכל אברהם', title: 'Product Manager' },
  { logo: 'https://api.builder.io/api/v1/image/assets/TEMP/930605fdd1caa51b70ea4489336287408de9d43e', avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/e22b85885aa238673848e642f0723e370c109520', text: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם עלתה על הציפיות."', name: 'רון שמש', title: 'CTO' }
];

const TestimonialsSectionDynamic: React.FC<Props> = ({ data }) => {
  const title = data.title || 'מה אומרים עלינו';
  const subtitle = data.subtitle || 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.';
  const testimonials = data.testimonials || defaultTestimonials;

  return (
    <section id="testimonials" className="w-full bg-background py-10 md:py-16 px-6 md:px-16 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation><h2 className="text-3xl md:text-4xl font-medium text-foreground text-center mb-2 md:mb-4">{title}</h2></ScrollAnimation>
        <ScrollAnimation delay={0.1}><p className="text-muted-foreground text-center text-sm md:text-lg mb-8 md:mb-16 max-w-2xl mx-auto">{subtitle}</p></ScrollAnimation>
        <div className="md:hidden flex flex-col gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4" dir="rtl">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
                <div className="text-right"><p className="font-bold text-foreground text-base">{t.name}</p><p className="text-muted-foreground text-xs">{t.title}</p></div>
              </div>
              <p className="text-foreground text-right leading-6 opacity-80 text-sm mb-4">{t.text}</p>
              {t.logo && <img src={t.logo} alt="Company" className="h-6 object-contain" />}
            </div>
          ))}
        </div>
        <StaggerContainer className="hidden md:grid grid-cols-2 gap-6" staggerDelay={0.1}>
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="bg-background border border-border rounded-3xl p-8 h-full">
                <div className="flex items-center justify-between mb-6" dir="rtl">
                  <div className="flex items-center gap-3">
                    {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
                    <div className="text-right"><p className="font-bold text-foreground text-base">{t.name}</p><p className="text-muted-foreground text-xs">{t.title}</p></div>
                  </div>
                  {t.logo && <img src={t.logo} alt="Company" className="h-8 object-contain" />}
                </div>
                <p className="text-foreground text-right leading-7 opacity-80">{t.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TestimonialsSectionDynamic;
