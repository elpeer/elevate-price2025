import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation, FadeScale } from './ScrollAnimation';
import gadiPhoto from '@/assets/gadi-photo.png';

const AboutSection: React.FC = () => {
  return (
    <section id="about" dir="ltr" className="flex flex-col-reverse md:flex-row min-h-[auto] md:min-h-screen w-full">
      {/* Left side - Profile with lavender background (bottom on mobile) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 py-10 md:py-0" style={{ backgroundColor: '#EFEFFF' }}>
        <FadeScale className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          {/* Image */}
          <img
            src={gadiPhoto}
            alt="Gadi Meirson"
            className="w-28 h-28 md:w-44 md:h-44 object-cover grayscale order-first md:order-last"
          />
          {/* Text */}
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-1">גדי מאירסון</h3>
            <p className="text-primary text-sm md:text-base">CEO elevate</p>
            <a href="mailto:gadi@elevate.co.il" className="text-primary text-sm md:text-base hover:underline">gadi@elevate.co.il</a>
          </div>
        </FadeScale>
      </div>

      {/* Right side - Content with white background (top on mobile) */}
      <div className="w-full md:w-1/2 bg-background flex flex-col justify-center px-6 md:px-16 py-10 md:py-20" dir="rtl">
        <div className="max-w-xl text-right mx-auto md:mx-0">
          <ScrollAnimation direction="right">
            <h2 className="text-2xl md:text-5xl font-medium leading-tight text-foreground mb-5 md:mb-10">
              אנו נרגשים להתחיל את
              <br />
              הפרויקט שלך!
            </h2>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2}>
            <div className="space-y-3 md:space-y-6 text-foreground text-sm md:text-base leading-6 md:leading-8">
              <p>
                אנחנו Elevate Digital Studio, המתמחה בעיצוב חווית משתמש (UX) וממשק משתמש (UI) למוצרים דיגיטליים ומערכות מורכבות. אנו מתמחים בעיצוב ופיתוח אתרי דגל בסטנדרטים מתקדמים, אפליקציות WEB, פלטפורמות מסחר אלקטרוני, דפי נחיתה ומערכות אינטרנט מורכבות.
              </p>
              <p>
                אנו נרגשים לשתף פעולה בפרויקט שלכם! הצעה זו כוללת את את התוכנית שלנו להביא את החזון שלכם לעולם הדיגיטלי בצורה הטובה ביותר.
              </p>
              <p>
                אל תהססו לפנות בכל שאלה. ביחד, בואו ניצור משהו מדהים!
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
