import React from 'react';

const HeroSection: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="intro" dir="ltr" className="flex h-screen w-full">
      {/* Left - Blue wave image */}
      <div className="w-1/2 relative">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/78b9d39700d607107fb83c8be8f4161bf83eae8b?placeholderIfAbsent=true"
          alt="Blue wave background"
          className="w-full h-full object-cover"
        />
        {/* Scroll indicator */}
        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-8 flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="text-sm">גלול למטה</span>
        </button>
      </div>

      {/* Right - Content */}
      <div className="w-1/2 bg-background flex flex-col justify-center px-20 py-12" dir="rtl">
        <div className="max-w-2xl text-right">
          {/* Title */}
          <h1 className="text-6xl font-normal leading-tight text-foreground mb-12">
            אפיון ועיצוב UX/UI
            <br />
            עבור Stagent CRM
          </h1>

          {/* Client info */}
          <div className="space-y-6 mb-10">
            <div className="text-right">
              <span className="text-muted-foreground text-base block mb-1">הצעה לכבוד</span>
              <span className="text-3xl font-medium text-foreground">Stagent</span>
            </div>

            <div className="flex gap-24">
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  <span className="text-muted-foreground text-base">איש קשר</span>
                </div>
                <span className="text-foreground text-lg font-medium">מתן ראובנס</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  <span className="text-muted-foreground text-base">טלפון</span>
                </div>
                <a href="tel:0528135510" className="text-foreground text-lg font-medium hover:text-primary transition-colors">0528135510</a>
              </div>
            </div>

            <div className="flex gap-24">
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  <span className="text-muted-foreground text-base">מייל</span>
                </div>
                <a href="mailto:yemp@gmail.com" className="text-foreground text-lg font-medium hover:text-primary transition-colors">yemp@gmail.com</a>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  <span className="text-muted-foreground text-base">טלפון משני</span>
                </div>
                <a href="tel:0528135510" className="text-foreground text-lg font-medium hover:text-primary transition-colors">0528135510</a>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={scrollToAbout}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-full flex items-center gap-3 hover:bg-primary/90 transition-colors text-lg"
          >
            <div className="w-2.5 h-2.5 bg-white rounded-full" />
            <span className="font-medium">גלול להצעה</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
