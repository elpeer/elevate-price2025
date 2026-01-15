import React from 'react';

const ProjectDetailsSection: React.FC = () => {
  return (
    <section className="z-10 mb-[-161px] w-full max-w-[1513px] max-md:max-w-full max-md:mb-2.5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[55%] max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/14c057e6aef68b588f18d00970643f6f3561fa31?placeholderIfAbsent=true"
            alt="Project Details Illustration"
            className="aspect-[0.87] object-contain w-full grow max-md:max-w-full max-md:mt-10"
          />
        </div>
        <div className="w-[45%] ml-5 max-md:w-full max-md:ml-0">
          <article className="relative w-full self-stretch text-foreground font-medium text-right my-auto max-md:max-w-full max-md:mt-10">
            <div className="flex w-full flex-col items-stretch font-normal pl-[21px] max-md:max-w-full max-md:pl-5">
              <h2 className="text-5xl leading-none max-md:max-w-full max-md:text-[40px]">
                פרטים נוספים על הפרויקט
              </h2>
              
              <div className="flex items-stretch gap-5 text-[28px] font-medium whitespace-nowrap leading-[1.4] flex-wrap justify-between mt-[97px] max-md:max-w-full max-md:mt-10">
                <div className="bg-foreground flex w-[18px] shrink-0 h-0.5 my-auto" />
                <h3>אחריות</h3>
              </div>
              
              <p className="text-foreground text-lg leading-[31px] mt-5 max-md:max-w-full">
                מועד תקופת האחריות יחל מיום העלייה לאוויר למשך 3 חודשים. במסגרת האחריות, חברת elevate תטפל בכל תקלה בהתאם לSLA בסעיף לעיל, ללא כל תמורה נוספת.
                <br />
                *מובהר שבמסגרת אחריות ישנם רק באגים של אלמנטים שעבדו בעת מעבר האתר לשרת הפרודקשן**
                <br />
                **במידה והבאג נוצר משימוש לקוי של הלקוח או מי מטעמו חברת elevate מסירה באופן מיידי את האחריות לאתרו
              </p>
            </div>
            
            <div className="border shrink-0 h-px mt-[53px] border-border max-md:max-w-full max-md:mt-10" />
            
            <div className="flex items-stretch gap-5 text-[28px] whitespace-nowrap leading-[1.4] flex-wrap justify-between ml-[21px] mt-5 max-md:max-w-full">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7b0198e78e64a110a8bfcf41bb99a3a88be20f75?placeholderIfAbsent=true"
                alt="Expand Icon"
                className="aspect-[1] object-contain w-8 shrink-0 my-auto"
              />
              <h3>תקלות</h3>
            </div>
            
            <div className="border shrink-0 h-px mt-[27px] border-border max-md:max-w-full" />
            
            <div className="flex items-stretch gap-5 text-[28px] leading-[1.4] flex-wrap justify-between ml-[21px] mt-7 max-md:max-w-full">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/7b0198e78e64a110a8bfcf41bb99a3a88be20f75?placeholderIfAbsent=true"
                alt="Expand Icon"
                className="aspect-[1] object-contain w-8 shrink-0 my-auto"
              />
              <h3>הדרכה של אתר CMS</h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsSection;
