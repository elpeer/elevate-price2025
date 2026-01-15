import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="flex h-screen w-full bg-gradient-to-b from-[#f5f3ff] via-[#ede9fe] to-[#f5f3ff]">
      {/* Left side - Profile (in RTL this appears on left) */}
      <div className="w-2/5 flex items-center justify-center px-12">
        <div className="text-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/9dbbf53e39bc0a6708b47a333686f73f0dc70ad5?placeholderIfAbsent=true"
            alt="Gadi Meirson"
            className="w-40 h-40 rounded-lg object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-foreground">גדי מאירסון</h3>
          <p className="text-primary text-sm">CEO elevate</p>
          <p className="text-primary text-sm">gadi@elevate.co.il</p>
        </div>
      </div>

      {/* Right side - Content (in RTL this appears on right) */}
      <div className="w-3/5 flex flex-col justify-center px-16 py-20">
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
