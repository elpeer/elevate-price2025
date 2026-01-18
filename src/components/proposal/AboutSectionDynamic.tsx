import React from 'react';
import { ScrollAnimation, FadeScale } from '../ScrollAnimation';
import gadiPhoto from '@/assets/gadi-photo.png';

interface AboutData {
  title?: string;
  paragraphs?: string[];
  ownerName?: string;
  ownerTitle?: string;
  ownerEmail?: string;
  ownerImage?: string;
}

interface Props {
  data: AboutData;
}

const AboutSectionDynamic: React.FC<Props> = ({ data }) => {
  const title = data.title || 'אנו נרגשים להתחיל את\nהפרויקט שלך!';
  const paragraphs = data.paragraphs || [
    'אנחנו Elevate Digital Studio, המתמחה בעיצוב חווית משתמש (UX) וממשק משתמש (UI) למוצרים דיגיטליים ומערכות מורכבות.',
    'אנו נרגשים לשתף פעולה בפרויקט שלכם!',
    'אל תהססו לפנות בכל שאלה. ביחד, בואו ניצור משהו מדהים!'
  ];
  const ownerImage = data.ownerImage || gadiPhoto;
  const ownerName = data.ownerName || 'גדי מאירסון';
  const ownerTitle = data.ownerTitle || 'CEO elevate';
  const ownerEmail = data.ownerEmail || 'gadi@elevate.co.il';

  return (
    <section id="about" dir="rtl" className="w-full">
      <div className="flex flex-col md:flex-row-reverse">
        <div className="hidden md:flex md:w-1/2 items-center justify-center py-16 px-8" style={{ backgroundColor: '#EFEFFF' }}>
          <FadeScale className="flex flex-row items-center gap-6">
            <img src={ownerImage} alt={ownerName} className="w-48 h-48 object-cover grayscale" />
            <div className="text-right">
              <h3 className="text-xl font-semibold text-foreground mb-1">{ownerName}</h3>
              <p className="text-primary text-sm">{ownerTitle}</p>
              <a href={`mailto:${ownerEmail}`} className="text-primary text-sm hover:underline">{ownerEmail}</a>
            </div>
          </FadeScale>
        </div>

        <div className="w-full md:w-1/2 py-16 md:py-24 px-6 md:px-16 bg-background">
          <div className="max-w-3xl text-right">
            <ScrollAnimation direction="right">
              <h2 className="text-2xl md:text-5xl font-medium leading-tight text-foreground mb-5 md:mb-10 whitespace-pre-line">{title}</h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="space-y-3 md:space-y-6 text-foreground text-sm md:text-base leading-6 md:leading-8">
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </ScrollAnimation>
            <FadeScale className="flex md:hidden items-center gap-6 mt-8">
              <img src={ownerImage} alt={ownerName} className="w-24 h-24 object-cover grayscale" />
              <div className="text-right">
                <h3 className="text-lg font-semibold text-foreground mb-1">{ownerName}</h3>
                <p className="text-primary text-sm">{ownerTitle}</p>
                <a href={`mailto:${ownerEmail}`} className="text-primary text-sm hover:underline">{ownerEmail}</a>
              </div>
            </FadeScale>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionDynamic;
