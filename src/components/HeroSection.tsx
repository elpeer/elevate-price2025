import React from 'react';

const HeroSection: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="intro" className="flex h-screen w-full">
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
      <div className="w-1/2 bg-background flex flex-col justify-center px-16 py-12">
        <div className="max-w-lg mr-auto text-right">
          {/* Title */}
          <h1 className="text-5xl font-normal leading-tight text-foreground mb-12">
            אפיון ועיצוב UX/UI
            <br />
            עבור Stagent CRM
          </h1>

          {/* Client info */}
          <div className="space-y-6 mb-10">
            <div className="flex items-center justify-end gap-3">
              <span className="text-2xl font-medium text-foreground">Stagent</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">הצעה לכבוד</span>
                <div className="w-1 h-4 bg-primary rounded-full" />
              </div>
            </div>

            <div className="flex gap-16 justify-end">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-muted-foreground text-sm">טלפון</span>
                  <div className="w-1 h-3 bg-primary rounded-full" />
                </div>
                <span className="text-foreground font-medium">0528135510</span>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-muted-foreground text-sm">איש קשר</span>
                  <div className="w-1 h-3 bg-primary rounded-full" />
                </div>
                <span className="text-foreground font-medium">מתן ראובנס</span>
              </div>
            </div>

            <div className="flex gap-16 justify-end">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-muted-foreground text-sm">טלפון משני</span>
                  <div className="w-1 h-3 bg-primary rounded-full" />
                </div>
                <span className="text-foreground font-medium">0528135510</span>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-muted-foreground text-sm">מייל</span>
                  <div className="w-1 h-3 bg-primary rounded-full" />
                </div>
                <span className="text-foreground font-medium">yemp@gmail.com</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={scrollToAbout}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full flex items-center gap-3 hover:bg-primary/90 transition-colors"
          >
            <span className="font-medium">גלול להצעה</span>
            <div className="w-2 h-2 bg-white rounded-full" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
