import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" dir="ltr" className="flex h-screen w-full">
      {/* Left side - Profile with lavender background */}
      <div className="w-1/2 flex items-center justify-center px-12" style={{ backgroundColor: '#EFEFFF' }}>
        <div className="text-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/9dbbf53e39bc0a6708b47a333686f73f0dc70ad5?placeholderIfAbsent=true"
            alt="Gadi Meirson"
            className="w-44 h-44 rounded-lg object-cover mx-auto mb-6"
          />
          <h3 className="text-2xl font-semibold text-foreground mb-1">גדי מאירסון</h3>
          <p className="text-primary text-base">CEO elevate</p>
          <a href="mailto:gadi@elevate.co.il" className="text-primary text-base hover:underline">gadi@elevate.co.il</a>
        </div>
      </div>

      {/* Right side - Content with white background */}
      <div className="w-1/2 bg-background flex flex-col justify-center px-16 py-20" dir="rtl">
        <div className="max-w-xl text-right">
          <h2 className="text-5xl font-medium leading-tight text-foreground mb-10">
            אנו נרגשים להתחיל את
            <br />
            הפרויקט שלך!
          </h2>

          <div className="space-y-6 text-foreground text-base leading-8">
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
