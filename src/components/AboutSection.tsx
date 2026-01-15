import React from 'react';
import gadiProfile from '@/assets/gadi-profile.png';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="flex h-screen w-full" style={{ backgroundColor: '#EFEFFF' }}>
      {/* Left side - Text content */}
      <div className="w-1/2 flex flex-col justify-center px-16 py-20" dir="rtl">
        <div className="max-w-md mr-auto text-right">
          <h3 className="text-4xl font-bold text-foreground mb-4">גדי מאירסון</h3>
          <p className="text-muted-foreground text-lg mb-2">CEO elevate</p>
          <a href="mailto:gadi@elevate.co.il" className="text-primary text-lg hover:underline">gadi@elevate.co.il</a>
        </div>
      </div>

      {/* Right side - Profile photo */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <img
          src={gadiProfile}
          alt="Gadi Meirson"
          className="w-72 h-auto object-cover grayscale"
        />
      </div>
    </section>
  );
};

export default AboutSection;
