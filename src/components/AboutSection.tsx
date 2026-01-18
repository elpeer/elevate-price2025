import React from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation, FadeScale } from './ScrollAnimation';
import gadiPhoto from '@/assets/gadi-photo.png';

const AboutSection: React.FC = () => {
  return (
    <section id="about" dir="rtl" className="w-full">
      <div className="flex flex-col md:flex-row-reverse">
        {/* Left side - Gadi photo (desktop only) with lavender background - same width as hero image (1/2) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center py-16 px-8" style={{ backgroundColor: '#EFEFFF' }}>
          <FadeScale className="flex flex-row items-center gap-6">
            {/* Image */}
            <img
              src={gadiPhoto}
              alt="Gadi Meirson"
              className="w-48 h-48 object-cover grayscale"
            />
            {/* Text */}
            <div className="text-right">
              <h3 className="text-xl font-semibold text-foreground mb-1">גדי מאירסון</h3>
              <p className="text-primary text-sm">CEO elevate</p>
              <a href="mailto:gadi@elevate.co.il" className="text-primary text-sm hover:underline">gadi@elevate.co.il</a>
            </div>
          </FadeScale>
        </div>

        {/* Right side - Content with white background */}
        <div className="w-full md:w-1/2 py-16 md:py-24 px-6 md:px-16 bg-background">
          <div className="max-w-3xl text-right">
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
                  אנחנו Elevate Digital Studio, המתמחה בעיצוב חווית משתמש (UX) וממשק משתמש (UI) למוצרים דיגיטליים ומערכות מורכבות. אנו מתמחים בעיצוב ופיתוח אתרי דגל בסטנדרטים מתקדמים, אפליקציות WEB, פלטפורמות מסחר אלקטרוני, דפי נחיתה ומערכות אינטרנט מורכבות. הצוות המוכשר שלנו בעל ניסיון רב בעבודה על פרויקטים מתעשיות שונות ועם מותגים מובילים בארץ ובעולם.
                </p>
                <p>
                  אנו נרגשים לשתף פעולה בפרויקט שלכם! הצעה זו כוללת את את התוכנית שלנו להביא את החזון שלכם לעולם הדיגיטלי בצורה הטובה ביותר.
                </p>
                <p>
                  אל תהססו לפנות בכל שאלה. ביחד, בואו ניצור משהו מדהים!
                </p>
              </div>
            </ScrollAnimation>

            {/* Signature Section - Mobile only */}
            <FadeScale className="flex md:hidden items-center gap-6 mt-8">
              <img
                src={gadiPhoto}
                alt="Gadi Meirson"
                className="w-24 h-24 object-cover grayscale"
              />
              <div className="text-right">
                <h3 className="text-lg font-semibold text-foreground mb-1">גדי מאירסון</h3>
                <p className="text-primary text-sm">CEO elevate</p>
                <a href="mailto:gadi@elevate.co.il" className="text-primary text-sm hover:underline">gadi@elevate.co.il</a>
              </div>
            </FadeScale>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
