import React from 'react';
import { ProposalSection, Proposal } from '@/types/proposal';
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

interface Props {
  section: ProposalSection;
  proposal: Proposal;
}

const SectionRenderer: React.FC<Props> = ({ section, proposal }) => {
  // For now, render the existing static components
  // In future iterations, these will accept data props
  switch (section.type) {
    case 'hero': return <HeroSection />;
    case 'about': return <AboutSection />;
    case 'whyElevate': return <WhyElevateSection />;
    case 'coreValues': return <CoreValuesSection />;
    case 'testimonials': return <TestimonialsSection />;
    case 'projects': return <ProjectsSection />;
    case 'siteContent': return <SiteContentSection />;
    case 'deliverables': return <DeliverablesSection />;
    case 'projectDetails': return <ProjectDetailsSection />;
    case 'pricing': return <PricingSection />;
    case 'signature': return <SignatureSection />;
    default: return null;
  }
};

export default SectionRenderer;
