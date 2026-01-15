import React from 'react';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyElevateSection from '@/components/WhyElevateSection';
import CoreValuesSection from '@/components/CoreValuesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProjectsSection from '@/components/ProjectsSection';
import SiteContentSection from '@/components/SiteContentSection';
import DeliverablesSection from '@/components/DeliverablesSection';
import ProjectDetailsSection from '@/components/ProjectDetailsSection';
import PricingSection from '@/components/PricingSection';
import SignatureSection from '@/components/SignatureSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Sticky Sidebar on the right */}
      <Sidebar />
      
      {/* Main content with padding for sidebar */}
      <main className="mr-[220px]">
        <HeroSection />
        <AboutSection />
        <WhyElevateSection />
        <CoreValuesSection />
        <TestimonialsSection />
        <ProjectsSection />
        <SiteContentSection />
        <DeliverablesSection />
        <ProjectDetailsSection />
        <PricingSection />
        <SignatureSection />
      </main>
    </div>
  );
};

export default Index;
