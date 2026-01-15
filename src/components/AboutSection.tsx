import React from 'react';
import gadiPhoto from '@/assets/gadi-photo.png';

const AboutSection: React.FC = () => {
  return (
    <section id="about" dir="ltr" className="flex flex-col-reverse md:flex-row min-h-screen w-full">
      {/* Left side - Profile with lavender background (bottom on mobile) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 py-12 md:py-0" style={{ backgroundColor: '#EFEFFF' }}>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Image */}
          <img
            src={gadiPhoto}
            alt="Gadi Meirson"
            className="w-32 h-32 md:w-44 md:h-44 object-cover grayscale order-first md:order-last"
          />
          {/* Text */}
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">גדי מאירסון</h3>
            <p className="text-primary text-sm md:text-base">CEO elevate</p>
            <a href="mailto:gadi@elevate.co.il" className="text-primary text-sm md:text-base hover:underline">gadi@elevate.co.il</a>
          </div>
        </div>
      </div>

      {/* Right side - Content with white background (top on mobile) */}
      <div className="w-full md:w-1/2 bg-background flex flex-col justify-center px-6 md:px-16 py-12 md:py-20" dir="rtl">
        <div className="max-w-xl text-right mx-auto md:mx-0">
          <h2 className="text-3xl md:text-5xl font-medium leading-tight text-foreground mb-6 md:mb-10">
            אנו נרגשים להתחיל את
            <br />
            הפרויקט שלך!
          </h2>

          <div className="space-y-4 md:space-y-6 text-foreground text-sm md:text-base leading-7 md:leading-8">
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
