import React from 'react';

interface DeliverableItemProps {
  title: string;
  description: string;
  iconSrc: string;
  isHighlighted?: boolean;
}

const DeliverableItem: React.FC<DeliverableItemProps> = ({ title, description, iconSrc, isHighlighted = false }) => {
  const bgColor = isHighlighted ? "bg-background" : "bg-background/50";
  
  return (
    <div className={`${bgColor} flex min-w-60 flex-col overflow-hidden items-stretch text-right justify-center flex-1 shrink basis-[0%] px-8 py-6 max-md:max-w-full max-md:px-5`}>
      <div className="flex w-full gap-3 flex-wrap max-md:max-w-full">
        <div className="flex-1 shrink basis-[0%] max-md:max-w-full text-foreground">
          {description}
        </div>
        <img
          src={iconSrc}
          alt={`${title} Icon`}
          className="object-contain shrink-0 w-5"
        />
      </div>
    </div>
  );
};

const DeliverablesSection: React.FC = () => {
  const deliverables = [
    {
      title: "אפיון ועיצוב",
      description: "אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים שיוגדרו ויכנסו במסגרת השעות הראשונית",
      iconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/dd18ed2051aedb9f95bfa4070549339ee196009e?placeholderIfAbsent=true",
      isHighlighted: true
    },
    {
      title: "פיתוח Frontend",
      description: "פיתוח Frontend",
      iconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/1ef9d751c91c3eed2dbb13f085591377a146af96?placeholderIfAbsent=true"
    },
    {
      title: "בניית Design System",
      description: "בניית Design System",
      iconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/996db79d6f5b57ca8fc3a4d4fa3862aa2cff6726?placeholderIfAbsent=true",
      isHighlighted: true
    },
    {
      title: "מיתוג (אופציונלי)",
      description: "מיתוג (אופציונלי)",
      iconSrc: "https://api.builder.io/api/v1/image/assets/TEMP/b189b213a4b75ce285c247090d0c751196eded3a?placeholderIfAbsent=true"
    }
  ];

  return (
    <section className="relative bg-secondary flex w-full max-w-[1597px] flex-col items-center justify-center mt-[131px] px-20 py-[97px] max-md:max-w-full max-md:mt-10 max-md:pt-[100px] max-md:px-5">
      <div className="flex w-[1154px] max-w-full flex-col items-stretch">
        <h2 className="text-foreground text-5xl font-normal leading-none text-right self-center max-md:text-[40px]">
          כל מה שנספק לך
        </h2>
        
        <div className="w-full mt-[46px] max-md:max-w-full max-md:mt-10">
          <div className="flex min-h-24 w-full items-stretch gap-3 overflow-hidden flex-wrap max-md:max-w-full">
            <div className="bg-background flex min-w-60 flex-col overflow-hidden justify-center flex-1 shrink basis-[0%] pl-8 pr-6 max-md:max-w-full max-md:px-5">
              <div className="flex min-h-[38px] gap-[9px]" />
            </div>
            <div className="bg-background/50 flex min-w-60 w-[571px] shrink h-24 flex-1 basis-14" />
          </div>
          
          {deliverables.map((item, index) => (
            <div key={index} className="flex min-h-24 w-full items-stretch gap-3 overflow-hidden text-lg text-foreground font-normal leading-[31px] flex-wrap mt-3 max-md:max-w-full">
              <DeliverableItem {...item} />
              {index < deliverables.length - 1 && (
                <div className="bg-background/50 flex min-w-60 flex-col justify-center flex-1 shrink basis-8 pl-8 max-md:max-w-full">
                  <div className="flex items-center gap-3">
                    <div className="self-stretch my-auto text-foreground">
                      {deliverables[index + 1]?.title}
                    </div>
                    <img
                      src={deliverables[index + 1]?.iconSrc}
                      alt={`${deliverables[index + 1]?.title} Icon`}
                      className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
