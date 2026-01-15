import React from 'react';

interface TestimonialCardProps {
  logoSrc: string;
  logoAlt: string;
  avatarSrc: string;
  testimonialText: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ logoSrc, logoAlt, avatarSrc, testimonialText }) => {
  return (
    <article className="bg-background border self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto p-8 rounded-[32px] border-border max-md:max-w-full max-md:px-5">
      <header className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <div className="self-stretch flex items-center gap-5 my-auto">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="object-contain self-stretch my-auto"
          />
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-6 my-auto">
          <img
            src={avatarSrc}
            alt="Client Avatar"
            className="aspect-[1] object-contain w-14 self-stretch my-auto rounded-[50%]"
          />
        </div>
      </header>
      <blockquote className="text-foreground text-right text-lg font-normal leading-[26px] opacity-80 mt-[29px] max-md:max-w-full">
        {testimonialText}
      </blockquote>
    </article>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      logoSrc: "https://api.builder.io/api/v1/image/assets/TEMP/06395a516979c278f2eccebe7d5ff71794845919?placeholderIfAbsent=true",
      logoAlt: "Client Company Logo",
      avatarSrc: "https://api.builder.io/api/v1/image/assets/TEMP/9dbbf53e39bc0a6708b47a333686f73f0dc70ad5?placeholderIfAbsent=true",
      testimonialText: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם לא רק עלתה על הציפיות שלנו אלא גם קבעה סטנדרט תעשייתי חדש לעיצוב ופיתוח אתרים במגזר הפינטק."'
    },
    {
      logoSrc: "https://api.builder.io/api/v1/image/assets/TEMP/007e55697bfb495081352f2cd5144f56d07ec3d9?placeholderIfAbsent=true",
      logoAlt: "Playtika Logo",
      avatarSrc: "https://api.builder.io/api/v1/image/assets/TEMP/e70979e9cbec3cb67452933606c1001bf3c49dc4?placeholderIfAbsent=true",
      testimonialText: '"אני יכול לומר בביטחון כי Elevate סיפקה חלק מעבודות העיצוב והפיתוח הטובות ביותר עבור Playtika. הם הוכיחו את כישוריהם ומומחיותם במתן עבודה באיכות גבוהה העונה על הצרכים והציפיות שלנו. הם גם זכו באמון ובכבוד שלנו כשותף יקר. "'
    },
    {
      logoSrc: "https://api.builder.io/api/v1/image/assets/TEMP/e8d9d11465d14cdee4ff2a87d6addaa494e312ea?placeholderIfAbsent=true",
      logoAlt: "Client Company Logo",
      avatarSrc: "https://api.builder.io/api/v1/image/assets/TEMP/5cd0c9786aa76fdc6d3c30a36f2c0c6091d1f586?placeholderIfAbsent=true",
      testimonialText: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם לא רק עלתה על הציפיות שלנו אלא גם קבעה סטנדרט תעשייתי חדש לעיצוב ופיתוח אתרים במגזר הפינטק."'
    },
    {
      logoSrc: "https://api.builder.io/api/v1/image/assets/TEMP/930605fdd1caa51b70ea4489336287408de9d43e?placeholderIfAbsent=true",
      logoAlt: "Client Company Logo",
      avatarSrc: "https://api.builder.io/api/v1/image/assets/TEMP/e22b85885aa238673848e642f0723e370c109520?placeholderIfAbsent=true",
      testimonialText: '"המומחיות והחדשנות של Elevate בתכנון ויישום שיפורים משמעותיים עלו על כל הציפיות שלנו. פתרונות מותאמים ורעיונות חדשניים הובילו לשיפור יוצא דופן של פונקציונליות האתר".'
    }
  ];

  return (
    <section className="w-full max-w-[1429px] mt-[74px] max-md:max-w-full max-md:mt-10">
      <header className="text-center mb-8">
        <h2 className="text-foreground text-5xl font-normal leading-none text-right mt-[126px] max-md:text-[40px] max-md:mt-10">
          השותפים שלנו
        </h2>
        <p className="text-foreground text-xl font-normal leading-[34px] text-right mt-4 max-md:max-w-full">
          בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.
        </p>
      </header>
      
      <div className="flex w-full items-center gap-6 justify-center flex-wrap max-md:max-w-full">
        <TestimonialCard {...testimonials[0]} />
        <TestimonialCard {...testimonials[1]} />
      </div>
      
      <div className="flex w-full items-center gap-6 justify-center flex-wrap mt-6 max-md:max-w-full">
        <TestimonialCard {...testimonials[2]} />
        <TestimonialCard {...testimonials[3]} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
