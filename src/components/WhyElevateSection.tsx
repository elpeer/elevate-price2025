import React from 'react';

const WhyElevateSection: React.FC = () => {
  return (
    <section className="bg-secondary self-stretch flex w-full flex-col items-stretch pr-20 pb-[135px] max-md:max-w-full max-md:pr-5 max-md:pb-[100px]">
      <div className="z-10 mt-[-420px] max-md:max-w-full max-md:mt-[-200px]">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[30%] max-md:w-full max-md:ml-0">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/42598c6bc078b0501a62ee259fc4aeb3006492db?placeholderIfAbsent=true"
              alt="Design Process Illustration"
              className="aspect-[0.45] object-contain w-full grow max-md:max-w-full"
            />
          </div>
          <div className="w-[70%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-stretch font-normal mt-[491px] max-md:max-w-full max-md:mt-10">
              <div className="flex w-[1103px] max-w-full items-stretch gap-[40px_59px] text-[153px] text-foreground whitespace-nowrap leading-none flex-wrap max-md:text-[40px]">
                <h2 className="grow max-md:text-[40px]">Why</h2>
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/6d14ddf3313b646f05be384f477d54170213db69?placeholderIfAbsent=true"
                  alt="Decorative Element"
                  className="aspect-[1.01] object-contain w-[118px] shrink-0 max-w-full my-auto"
                />
                <h2 className="grow shrink w-[498px] max-md:max-w-full max-md:text-[40px]">elevate</h2>
              </div>
              <p className="text-foreground text-xl leading-[34px] text-right mt-[46px] max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
                אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים המשקפים את מהות המותג שלך ומגבירים מעורבות. המומחיות שלנו ב-UX/UI, בשילוב מחקר מעמיק ועיצוב ממוקד משתמש, מבטיחה שהמוצר הדיגיטלי שלך יבלוט ויספק ערך אמיתי בסביבה המקוונת התחרותית.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[-27px] w-full max-w-[1429px] max-md:max-w-full max-md:mr-2.5 max-md:mb-2.5">
        <div className="flex w-full gap-[40px_88px] flex-wrap max-md:max-w-full">
          <div className="flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/2dc829a6b7bd5283d083df62c5641c7539df710a?placeholderIfAbsent=true"
              alt="Service Icon 1"
              className="aspect-[1] object-contain w-[54px]"
            />
            <div className="flex min-h-[202px] w-full mt-6" />
          </div>
          <div className="flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9a33472c716b4d4720a7146a77dbddd1ff3af033?placeholderIfAbsent=true"
              alt="Service Icon 2"
              className="aspect-[1] object-contain w-[54px]"
            />
            <div className="flex min-h-[170px] w-full mt-6" />
          </div>
          <div className="flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/fc443509cab809a497c363e2ddf3eaa99b6fec96?placeholderIfAbsent=true"
              alt="Service Icon 3"
              className="aspect-[1] object-contain w-[54px]"
            />
            <div className="flex min-h-[172px] w-full mt-6" />
          </div>
        </div>
        <div className="flex w-full gap-[40px_88px] flex-wrap mt-[54px] max-md:max-w-full max-md:mt-10">
          <div className="flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/f5ea5dfeefe1c35a933779b013e6e95596787c9d?placeholderIfAbsent=true"
              alt="Service Icon 4"
              className="aspect-[1] object-contain w-[54px]"
            />
            <div className="flex min-h-[170px] w-full mt-6" />
          </div>
          <div className="flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ab601ca8e8c51881fa649bbb1b62e885b8b474ad?placeholderIfAbsent=true"
              alt="Service Icon 5"
              className="aspect-[1] object-contain w-[54px]"
            />
            <div className="flex min-h-[170px] w-full mt-6" />
          </div>
          <div className="flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/00b705f7e0ef307ccb62a22368ee0edd74fd7e12?placeholderIfAbsent=true"
              alt="Service Icon 6"
              className="aspect-[1] object-contain w-[54px]"
            />
            <div className="flex min-h-[138px] w-full mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyElevateSection;
