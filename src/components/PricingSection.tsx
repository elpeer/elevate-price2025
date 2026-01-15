import React from 'react';

interface PricingItemProps {
  title: string;
  price: string;
  hours: string;
  description: string[];
}

const PricingItem: React.FC<PricingItemProps> = ({ title, price, hours, description }) => {
  return (
    <div className="w-full max-md:max-w-full">
      <div className="w-full max-md:max-w-full">
        <div className="flex w-full items-center gap-[29px] justify-between flex-wrap max-md:max-w-full">
          <div className="self-stretch flex items-center gap-3 text-lg text-foreground font-normal leading-[31px] my-auto">
            <div className="text-foreground font-medium self-stretch my-auto">
              {price}
            </div>
            <div className="self-stretch my-auto">|</div>
            <div className="self-stretch my-auto">
              {hours}
            </div>
          </div>
          <div className="self-stretch flex min-w-60 items-center gap-4 text-2xl text-foreground font-medium leading-[1.1] flex-1 shrink basis-[0%] my-auto">
            <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
              {title}
            </div>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ba4719db56873ae16530fa3b58fd7e23154bdd27?placeholderIfAbsent=true"
              alt="Pricing Icon"
              className="aspect-[0.87] object-contain w-7 bg-blend-normal self-stretch shrink-0 my-auto"
            />
          </div>
        </div>
      </div>
      <div className="w-full text-base text-foreground font-normal leading-[1.6] mt-4 max-md:max-w-full">
        <div className="flex w-full flex-col justify-center max-md:max-w-full">
          {description.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 mt-3 max-md:max-w-full">
              <div className="self-stretch w-[457px] my-auto max-md:max-w-full">
                {item}
              </div>
              <div className="self-stretch flex w-[5px] shrink-0 h-[21px] my-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface AccessibilityOptionProps {
  title: string;
  price: string;
  description: string;
  isSelected?: boolean;
}

const AccessibilityOption: React.FC<AccessibilityOptionProps> = ({ title, price, description, isSelected = false }) => {
  const bgColor = isSelected ? "bg-primary/10" : "bg-muted";
  const borderColor = isSelected ? "border-primary" : "border-transparent";
  const titleColor = isSelected ? "text-primary" : "text-foreground";
  
  return (
    <div className={`${bgColor} relative flex min-w-60 flex-col flex-1 shrink basis-[0%] p-6 rounded-2xl ${borderColor} border-2 max-md:px-5`}>
      <div className={`${titleColor} text-xl font-medium leading-[1.7] text-right z-0`}>
        {title}
      </div>
      <div className="text-foreground text-[22px] font-normal leading-[1.7] text-right z-0 mt-5">
        {price}
      </div>
      <div className="text-foreground text-lg font-normal leading-[31px] text-right self-stretch z-0 mt-5">
        {description}
      </div>
      <div className="z-0 flex items-center text-lg text-primary font-medium text-right leading-[1.7] mt-5">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/b81a8ac031ad4428df20ea3953ff0475220ccf10?placeholderIfAbsent=true"
          alt="Info Icon"
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
        />
        <div className="self-stretch my-auto">למידע נוסף</div>
      </div>
      <div className={`absolute z-0 flex w-6 items-center gap-2 h-6 rounded-md left-4 top-4 ${isSelected ? 'bg-primary' : 'border-border border-2'}`}>
        {isSelected && (
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/14a8ffc4449e52d793d1a5dfba8dd29536b33b97?placeholderIfAbsent=true"
            alt="Selected"
            className="aspect-[1] object-contain w-6 self-stretch my-auto"
          />
        )}
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const pricingItems = [
    {
      title: "אבחון ומחקר",
      price: "₪5,000",
      hours: "30 שעות",
      description: [
        "ראיונות עומק לצורך למידה ואפיון צרכים, ויכולות המוצר והגדרת מטרות ברורות",
        "ניתוח הממשק הקיים",
        "ניתוח מתחרים"
      ]
    },
    {
      title: "תכנון UX עדכני",
      price: "₪2,000",
      hours: "30 שעות",
      description: [
        "ראיונות עומק לצורך למידה ואפיון צרכים, ויכולות המוצר והגדרת מטרות ברורות",
        "ניתוח הממשק הקיים",
        "ניתוח מתחרים"
      ]
    },
    {
      title: "עיצוב UI",
      price: "₪1,000",
      hours: "30 שעות",
      description: [
        "ראיונות עומק לצורך למידה ואפיון צרכים, ויכולות המוצר והגדרת מטרות ברורות",
        "ניתוח הממשק הקיים",
        "ניתוח מתחרים"
      ]
    },
    {
      title: "העברה לפיתוח וליווי",
      price: "₪2,000",
      hours: "30 שעות",
      description: [
        "ראיונות עומק לצורך למידה ואפיון צרכים, ויכולות המוצר והגדרת מטרות ברורות",
        "ניתוח הממשק הקיים",
        "ניתוח מתחרים"
      ]
    }
  ];

  return (
    <section className="flex w-[1344px] max-w-full flex-col ml-[169px] mt-[278px] max-md:max-w-full max-md:mt-10">
      <header className="flex w-[1288px] max-w-full items-stretch gap-5 font-normal flex-wrap justify-between">
        <h2 className="text-foreground text-5xl leading-none text-center max-md:max-w-full max-md:text-[40px]">
          סיכום לוחות זמנים ועלויות
        </h2>
        <div className="flex flex-col items-stretch">
          <h3 className="text-foreground text-5xl leading-none text-center max-md:text-[40px]">
            העדפות ותוספות
          </h3>
          <p className="text-foreground text-xl leading-[34px] text-right">
            נא לבחור העדפות בנוגע לנגישות ושרתים ועוד..
          </p>
        </div>
      </header>

      <div className="self-stretch max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <div className="bg-muted grow text-right w-full p-8 rounded-[32px] max-md:max-w-full max-md:mt-10 max-md:px-5">
              {pricingItems.map((item, index) => (
                <div key={index}>
                  <PricingItem {...item} />
                  {index < pricingItems.length - 1 && (
                    <div className="border min-h-px w-full mt-6 border-border max-md:max-w-full" />
                  )}
                </div>
              ))}
              
              <div className="bg-background flex w-full flex-col items-stretch justify-center mt-6 px-6 py-4 rounded-[68px] max-md:max-w-full max-md:px-5">
                <div className="flex w-full items-center justify-between flex-wrap max-md:max-w-full">
                  <div className="self-stretch flex items-center gap-3 text-lg text-foreground font-normal leading-[31px] my-auto">
                    <div className="text-foreground font-medium self-stretch my-auto">
                      ₪48,000
                    </div>
                    <div className="self-stretch my-auto">|</div>
                    <div className="self-stretch my-auto">
                      420 שעות
                    </div>
                  </div>
                  <div className="text-foreground text-2xl font-medium leading-[1.1] self-stretch flex-1 shrink basis-[0%] my-auto">
                    סה"כ
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="w-full mt-[47px] max-md:max-w-full max-md:mt-10">
              <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
                <div className="self-stretch flex flex-col overflow-hidden items-stretch justify-center w-8 my-auto px-1.5 py-[15px]">
                  <div className="bg-foreground flex w-[18px] shrink-0 h-0.5" />
                </div>
                <h3 className="text-foreground text-2xl font-medium self-stretch my-auto">
                  נגישות
                </h3>
              </div>
              
              <div className="w-full mt-6 max-md:max-w-full">
                <div className="flex w-full items-stretch gap-4 flex-wrap max-md:max-w-full">
                  <AccessibilityOption
                    title="תוסף/רכיב נגישות"
                    price="₪48,000"
                    description="נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של..."
                  />
                  <AccessibilityOption
                    title={"דו\"ח נגישות"}
                    price="₪48,000"
                    description="נגישות תיושם ברמת הקוד בהתאם לדוח המפורט של..."
                    isSelected={true}
                  />
                </div>
              </div>
              
              {/* Additional sections */}
              <div className="border min-h-px w-full mt-6 border-border max-md:max-w-full" />
              <div className="flex w-full items-center gap-[40px_100px] text-2xl text-foreground font-medium justify-between flex-wrap mt-6 max-md:max-w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7b0198e78e64a110a8bfcf41bb99a3a88be20f75?placeholderIfAbsent=true"
                  alt="Expand Icon"
                  className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto"
                />
                <div className="self-stretch my-auto">חבילות מיתוג</div>
              </div>
              
              <div className="border min-h-px w-full mt-6 border-border max-md:max-w-full" />
              <div className="flex w-full items-center gap-[40px_100px] text-2xl text-foreground font-medium justify-between flex-wrap mt-6 max-md:max-w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7b0198e78e64a110a8bfcf41bb99a3a88be20f75?placeholderIfAbsent=true"
                  alt="Expand Icon"
                  className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto"
                />
                <div className="self-stretch my-auto">שרת אחסון</div>
              </div>
              
              <div className="border min-h-px w-full mt-6 border-border max-md:max-w-full" />
              <div className="flex w-full items-center gap-[40px_100px] text-2xl text-foreground font-medium justify-between flex-wrap mt-6 max-md:max-w-full">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7b0198e78e64a110a8bfcf41bb99a3a88be20f75?placeholderIfAbsent=true"
                  alt="Expand Icon"
                  className="aspect-[1] object-contain w-8 self-stretch shrink-0 my-auto"
                />
                <div className="self-stretch my-auto">חבילות תחזוקה</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
