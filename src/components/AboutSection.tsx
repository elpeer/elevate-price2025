import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1513px] max-md:max-w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[56%] max-md:w-full max-md:ml-0">
          <div className="bg-secondary flex w-full flex-col mx-auto pt-[213px] pb-[391px] px-[70px] max-md:max-w-full max-md:mt-10 max-md:px-5 max-md:py-[100px]">
            <div className="flex items-center gap-[25px]">
              <div className="self-stretch my-auto">
                <div className="flex min-h-[59px]" />
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/833f81910f4ee7c4c909bb4892608ea8ef2cec69?placeholderIfAbsent=true"
                alt="Elevate Digital Studio Logo"
                className="aspect-[1] object-contain w-[200px] self-stretch shrink-0 my-auto"
              />
            </div>
          </div>
        </div>
        <div className="w-[44%] ml-5 max-md:w-full max-md:ml-0">
          <article className="flex flex-col items-stretch text-right mt-14 max-md:max-w-full max-md:mt-10">
            <h2 className="text-foreground text-5xl font-medium leading-[57px] max-md:max-w-full max-md:text-[40px] max-md:leading-[53px]">
              אנו נרגשים להתחיל את הפרויקט שלך!
            </h2>
            <p className="text-foreground text-base font-normal leading-7 mt-[27px] max-md:max-w-full max-md:mr-0.5">
              אנחנו Elevate Digital Studio, המתמחה בעיצוב חווית משתמש (UX) וממשק משתמש (UI) למוצרים דיגיטליים ומערכות מורכבות. אנו מתמחים בעיצוב ופיתוח אתרי דגל בסטנדרטים מתקדמים, אפליקציות WEB, פלטפורמות מסחר אלקטרוני, דפי נחיתה ומערכות אינטרנט מורכבות. הצוות המוכשר שלנו בעל ניסיון רב בעבודה על פרויקטים מתעשיות שונות ועם מותגים מובילים בארץ ובעולם.
              <br />
              <br />
              אנו נרגשים לשתף פעולה בפרויקט שלכם! הצעה זו כוללת את את התוכנית שלנו להביא את החזון שלכם לעולם הדיגיטלי בצורה הטובה ביותר.
              <br />
              <br />
              אל תהססו לפנות בכל שאלה. ביחד, בואו ניצור משהו מדהים!
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
