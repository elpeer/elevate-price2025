import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="flex">
      {/* Left - Blue wave image with profile */}
      <div className="w-1/2 relative">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/78b9d39700d607107fb83c8be8f4161bf83eae8b?placeholderIfAbsent=true"
          alt="Blue wave background"
          className="w-full h-full object-cover min-h-[600px]"
        />
        {/* Profile card */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-8">
          <div className="flex items-center gap-6 justify-end">
            <div className="text-right">
              <h3 className="text-xl font-semibold text-foreground">גדי מאירסון</h3>
              <p className="text-primary text-sm">CEO elevate</p>
              <p className="text-primary text-sm">gadi@elevate.co.il</p>
            </div>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9dbbf53e39bc0a6708b47a333686f73f0dc70ad5?placeholderIfAbsent=true"
              alt="Gadi Meirson"
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right - Content */}
      <div className="w-1/2 bg-background flex flex-col justify-center px-16 py-20">
        <div className="max-w-lg mr-auto text-right">
          <h2 className="text-4xl font-medium leading-tight text-foreground mb-8">
            אנו נרגשים להתחיל את
            <br />
            הפרויקט שלך!
          </h2>

          <div className="space-y-6 text-foreground text-base leading-7">
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
