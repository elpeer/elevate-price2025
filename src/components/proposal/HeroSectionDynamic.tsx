import React from 'react';
import { motion } from 'framer-motion';
import sidebarLogo from '@/assets/why-elevate-logo.svg';
import { ClientInfo } from '@/types/proposal';

interface HeroData {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  scrollText?: string;
  desktopImage?: string;
  mobileImage?: string;
}

interface Props {
  data: HeroData;
  clientInfo?: ClientInfo;
}

const HeroSectionDynamic: React.FC<Props> = ({ data, clientInfo }) => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="intro" className="flex flex-col-reverse md:flex-row min-h-screen w-full">
      {/* Text/Form side - comes first in DOM */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 md:px-20 py-8 md:py-12">
        <div className="max-w-2xl text-right mx-auto md:mx-0">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex mb-6 md:hidden">
            <img src={sidebarLogo} alt="Elevate Logo" className="h-10 w-auto" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-3xl md:text-6xl font-normal leading-tight text-foreground mb-8 md:mb-12 text-right">
            {data.title || 'אפיון ועיצוב UX/UI'}
            <br />
            {data.subtitle || 'עבור Stagent CRM'}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="space-y-6 mb-10">
            <div className="text-right">
              <span className="text-muted-foreground text-base block mb-1">הצעה לכבוד</span>
              <span className="text-2xl md:text-3xl font-medium text-foreground">{clientInfo?.companyName || 'Stagent'}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:gap-24">
              <div className="text-right min-w-[140px]">
                <div className="flex items-center gap-2 mb-2"><div className="w-1 h-4 bg-primary rounded-full" /><span className="text-muted-foreground text-sm md:text-base">איש קשר</span></div>
                <span className="text-foreground text-base md:text-lg font-medium">{clientInfo?.contactPerson || 'מתן ראובנס'}</span>
              </div>
              <div className="text-right min-w-[140px]">
                <div className="flex items-center gap-2 mb-2"><div className="w-1 h-4 bg-primary rounded-full" /><span className="text-muted-foreground text-sm md:text-base">טלפון</span></div>
                <a href={`tel:${clientInfo?.phone || ''}`} className="text-foreground text-base md:text-lg font-medium hover:text-primary transition-colors">{clientInfo?.phone || '0528135510'}</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:flex md:gap-24">
              <div className="text-right min-w-[140px]">
                <div className="flex items-center gap-2 mb-2"><div className="w-1 h-4 bg-primary rounded-full" /><span className="text-muted-foreground text-sm md:text-base">מייל</span></div>
                <a href={`mailto:${clientInfo?.email || ''}`} className="text-foreground text-base md:text-lg font-medium hover:text-primary transition-colors break-all">{clientInfo?.email || 'yemp@gmail.com'}</a>
              </div>
              {clientInfo?.secondaryPhone && (
                <div className="text-right min-w-[140px]">
                  <div className="flex items-center gap-2 mb-2"><div className="w-1 h-4 bg-primary rounded-full" /><span className="text-muted-foreground text-sm md:text-base">טלפון משני</span></div>
                  <a href={`tel:${clientInfo.secondaryPhone}`} className="text-foreground text-base md:text-lg font-medium hover:text-primary transition-colors">{clientInfo.secondaryPhone}</a>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="flex justify-center md:justify-start">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={scrollToAbout} className="bg-primary text-primary-foreground px-8 md:px-10 py-4 rounded-full flex items-center gap-3 hover:bg-primary/90 transition-colors text-base md:text-lg">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
              <span className="font-medium">{data.ctaText || 'גלול להצעה'}</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Image side - comes second in DOM */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden">
        {/* Desktop Image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          src={data.desktopImage || "https://api.builder.io/api/v1/image/assets/TEMP/78b9d39700d607107fb83c8be8f4161bf83eae8b"}
          alt="Background"
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Mobile Image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          src={data.mobileImage || data.desktopImage || "https://api.builder.io/api/v1/image/assets/TEMP/78b9d39700d607107fb83c8be8f4161bf83eae8b"}
          alt="Background"
          className="md:hidden w-full h-full object-cover"
        />
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          onClick={scrollToAbout}
          className="absolute bottom-8 inset-x-0 mx-auto w-fit md:inset-x-auto md:mx-0 md:left-8 flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
        >
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>
          <span className="text-sm">{data.scrollText || 'גלול למטה'}</span>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSectionDynamic;
