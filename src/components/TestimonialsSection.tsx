import React from 'react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from './ScrollAnimation';

const testimonials = [
  {
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/06395a516979c278f2eccebe7d5ff71794845919?placeholderIfAbsent=true',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/9dbbf53e39bc0a6708b47a333686f73f0dc70ad5?placeholderIfAbsent=true',
    text: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם לא רק עלתה על הציפיות שלנו אלא גם קבעה סטנדרט תעשייתי חדש לעיצוב ופיתוח אתרים במגזר הפינטק."',
    name: 'יוסי כהן',
    title: 'מנכ"ל'
  },
  {
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/007e55697bfb495081352f2cd5144f56d07ec3d9?placeholderIfAbsent=true',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/e70979e9cbec3cb67452933606c1001bf3c49dc4?placeholderIfAbsent=true',
    text: '"אני יכול לומר בביטחון כי Elevate סיפקה חלק מעבודות העיצוב והפיתוח הטובות ביותר עבור Playtika. הם הוכיחו את כישוריהם ומומחיותם במתן עבודה באיכות גבוהה."',
    name: 'דני לוי',
    title: 'VP Product'
  },
  {
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/e8d9d11465d14cdee4ff2a87d6addaa494e312ea?placeholderIfAbsent=true',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/5cd0c9786aa76fdc6d3c30a36f2c0c6091d1f586?placeholderIfAbsent=true',
    text: '"המומחיות והחדשנות של Elevate בתכנון ויישום שיפורים משמעותיים עלו על כל הציפיות שלנו. פתרונות מותאמים ורעיונות חדשניים הובילו לשיפור יוצא דופן."',
    name: 'מיכל אברהם',
    title: 'Product Manager'
  },
  {
    logo: 'https://api.builder.io/api/v1/image/assets/TEMP/930605fdd1caa51b70ea4489336287408de9d43e?placeholderIfAbsent=true',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/e22b85885aa238673848e642f0723e370c109520?placeholderIfAbsent=true',
    text: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם לא רק עלתה על הציפיות שלנו אלא גם קבעה סטנדרט חדש."',
    name: 'רון שמש',
    title: 'CTO'
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="w-full bg-background py-10 md:py-16 px-6 md:px-16 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <h2 className="text-2xl md:text-4xl font-normal text-foreground text-center mb-2 md:mb-4">
            השותפים שלנו
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="text-muted-foreground text-center text-sm md:text-lg mb-8 md:mb-16 max-w-2xl mx-auto">
            בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.
          </p>
        </ScrollAnimation>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden flex flex-col gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4" dir="rtl">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="text-right">
                  <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-foreground text-right leading-6 opacity-80 text-sm mb-4">
                {testimonial.text}
              </p>
              <img src={testimonial.logo} alt="Company logo" className="h-6 object-contain" />
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <StaggerContainer className="hidden md:grid grid-cols-2 gap-6" staggerDelay={0.1}>
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="bg-background border border-border rounded-3xl p-8 h-full">
                <div className="flex items-center justify-between mb-6" dir="rtl">
                  <div className="flex items-center gap-3">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="text-right">
                      <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-muted-foreground text-xs">{testimonial.title}</p>
                    </div>
                  </div>
                  <img src={testimonial.logo} alt="Company logo" className="h-8 object-contain" />
                </div>
                <p className="text-foreground text-right leading-7 opacity-80">
                  {testimonial.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TestimonialsSection;
