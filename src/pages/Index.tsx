import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyElevateSection from '@/components/WhyElevateSection';
import MissionSection from '@/components/MissionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProjectsSection from '@/components/ProjectsSection';
import SiteContentSection from '@/components/SiteContentSection';
import DeliverablesSection from '@/components/DeliverablesSection';
import ProjectDetailsSection from '@/components/ProjectDetailsSection';
import PricingSection from '@/components/PricingSection';
import SignatureSection from '@/components/SignatureSection';
import Sidebar from '@/components/Sidebar';

const Index: React.FC = () => {
  return (
    <main className="bg-background flex flex-col overflow-hidden pb-[296px] max-md:pb-[100px]" dir="rtl">
      <div className="self-stretch w-full max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[83%] max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-center max-md:max-w-full">
              <HeroSection />
              <AboutSection />
              <WhyElevateSection />
              <MissionSection />
              <TestimonialsSection />
              <ProjectsSection />
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
      
      <SiteContentSection />
      <DeliverablesSection />
      <ProjectDetailsSection />
      <PricingSection />
      <SignatureSection />
    </main>
  );
};

export default Index;
