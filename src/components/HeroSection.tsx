import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1513px] max-md:max-w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/78b9d39700d607107fb83c8be8f4161bf83eae8b?placeholderIfAbsent=true"
            alt="Stagent CRM Design Preview"
            className="aspect-[0.87] object-contain w-full grow max-md:max-w-full"
          />
        </div>
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="flex w-full flex-col mt-28 max-md:max-w-full max-md:mt-10">
            <div className="flex w-[592px] max-w-full flex-col items-stretch">
              <h1 className="text-foreground text-7xl font-normal leading-[76px] text-right max-md:max-w-full max-md:text-[40px] max-md:leading-[47px]">
                אפיון ועיצוב UX/UI עבור Stagent CRM
              </h1>
              <div className="flex flex-col mt-[46px] max-md:mt-10">
                <div className="flex min-h-[26px] gap-3" />
              </div>
            </div>
            <div className="self-stretch min-h-[232px] w-full mt-[27px] max-md:max-w-full">
              <div className="flex min-h-[101px] w-full items-stretch gap-[-1px] flex-wrap max-md:max-w-full">
                <div className="flex min-w-60 flex-col justify-center flex-1 shrink basis-[0%] border-border/0 border-t border-b">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary self-stretch flex min-h-3.5 w-1 my-auto" />
                  </div>
                </div>
                <div className="flex min-w-60 flex-col justify-center flex-1 shrink basis-[0%] border-border/0 border-t border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary self-stretch flex min-h-3.5 w-1 my-auto" />
                  </div>
                </div>
              </div>
              <div className="flex min-h-[101px] w-full items-stretch gap-[-1px] flex-wrap max-md:max-w-full">
                <div className="flex min-w-60 flex-col justify-center flex-1 shrink basis-[0%] border-border/0 border-t border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary self-stretch flex min-h-3.5 w-1 my-auto" />
                  </div>
                </div>
                <div className="flex min-w-60 flex-col justify-center flex-1 shrink basis-[0%] border-border/0 border-t border-b">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary self-stretch flex min-h-3.5 w-1 my-auto" />
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-primary flex min-h-[60px] items-center gap-3 mt-[13px] px-[34px] py-[26px] rounded-[100px] max-md:px-5 hover:bg-primary/90 transition-colors">
              <div className="bg-background self-stretch flex min-h-2 w-2 h-2 my-auto rounded-[50px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
