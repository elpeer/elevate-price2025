import React from 'react';

interface ContentCardProps {
  title: string;
  description: string;
  hasIcon?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, hasIcon = true }) => {
  return (
    <div className="bg-muted flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%] pt-5 pb-6 px-6 rounded-[20px] max-md:px-5">
      <div className="flex items-center gap-2 text-xl text-foreground font-medium text-center leading-[1.7]">
        <div className="self-stretch my-auto">{title}</div>
        {hasIcon && (
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d03cca184425236b87a2534c25d471302d4dbc53?placeholderIfAbsent=true"
            alt="Content Icon"
            className="aspect-[1] object-contain w-[35px] self-stretch shrink-0 my-auto"
          />
        )}
      </div>
      <p className="text-foreground text-lg font-normal leading-[31px] text-right mt-1">
        {description}
      </p>
    </div>
  );
};

const SiteContentSection: React.FC = () => {
  const contentItems = [
    {
      title: "אודות",
      description: "הירו, קומת יתרונות, קומת קטגרויות, קומת מוצרים, צור קשר, פוטר"
    },
    {
      title: "עמוד מוצר",
      description: "הירו, קומת יתרונות, קומת קטגרויות, קומת מוצרים, צור קשר, פוטר"
    },
    {
      title: "עמוד קטגוריה",
      description: "הסבר קצר על המוצרים שלנו ופאנל פילטרים של הקטגוריות יחד עם המוצרים"
    },
    {
      title: "עמות הבית",
      description: "הירו, קומת יתרונות, קומת קטגרויות, קומת מוצרים, צור קשר, פוטר"
    },
    {
      title: "עמות הבית",
      description: "הירו, קומת יתרונות, קומת קטגרויות, קומת מוצרים, צור קשר, פוטר",
      hasIcon: false
    },
    {
      title: "עמות הבית",
      description: "הירו, קומת יתרונות, קומת קטגרויות, קומת מוצרים, צור קשר, פוטר",
      hasIcon: false
    },
    {
      title: "עמוד יתרונות",
      description: "",
      hasIcon: true
    },
    {
      title: "יצירת קשר",
      description: "",
      hasIcon: true
    }
  ];

  return (
    <section className="flex flex-col self-stretch relative min-h-[2243px] w-full mt-10 pr-20 pt-3 max-md:max-w-full max-md:pr-5">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/882aae063fa779b9f7d52ba94c4e216a0e07f06f?placeholderIfAbsent=true"
        alt="Background"
        className="absolute h-full w-full object-cover inset-0"
      />
      
      <header className="font-normal text-center ml-[229px] mt-36 max-md:max-w-full max-md:mt-10 relative z-10">
        <h2 className="text-foreground text-5xl leading-none max-md:max-w-full max-md:text-[40px]">
          תכולת האתר
        </h2>
        <p className="text-foreground text-xl leading-[34px] mt-4 max-md:max-w-full">
          מבנה האתר מאורגן כהיררכיה ברורה הכוללת דף בית מרכזי, עמודי תוכן ראשיים
        </p>
      </header>

      <div className="relative flex w-full max-w-[1461px] flex-col items-stretch justify-center ml-[68px] max-md:max-w-full">
        <div className="flex w-full items-stretch gap-3 flex-wrap max-md:max-w-full">
          {contentItems.slice(0, 4).map((item, index) => (
            <ContentCard key={index} {...item} />
          ))}
        </div>
        
        <div className="flex w-full gap-3 justify-center flex-wrap mt-3 max-md:max-w-full">
          {contentItems.slice(4).map((item, index) => (
            <ContentCard key={index + 4} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteContentSection;
