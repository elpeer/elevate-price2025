import React from 'react';
import { ProposalSection, Proposal } from '@/types/proposal';
import HeroSectionDynamic from './HeroSectionDynamic';
import AboutSectionDynamic from './AboutSectionDynamic';
import WhyElevateSectionDynamic from './WhyElevateSectionDynamic';
import CoreValuesSectionDynamic from './CoreValuesSectionDynamic';
import TestimonialsSectionDynamic from './TestimonialsSectionDynamic';
import ProjectsSectionDynamic from './ProjectsSectionDynamic';
import SiteContentSectionDynamic from './SiteContentSectionDynamic';
import DeliverablesSectionDynamic from './DeliverablesSectionDynamic';
import ProjectDetailsSectionDynamic from './ProjectDetailsSectionDynamic';
import PricingSectionDynamic from './PricingSectionDynamic';
import SignatureSectionDynamic from './SignatureSectionDynamic';

interface Props {
  section: ProposalSection;
  proposal: Proposal;
}

const SectionRenderer: React.FC<Props> = ({ section, proposal }) => {
  switch (section.type) {
    case 'hero':
      return <HeroSectionDynamic data={section.data} clientInfo={proposal.client_info} />;
    case 'about':
      return <AboutSectionDynamic data={section.data} />;
    case 'whyElevate':
      return <WhyElevateSectionDynamic data={section.data} />;
    case 'coreValues':
      return <CoreValuesSectionDynamic data={section.data} />;
    case 'testimonials':
      return <TestimonialsSectionDynamic data={section.data} />;
    case 'projects':
      return <ProjectsSectionDynamic data={section.data} />;
    case 'siteContent':
      return <SiteContentSectionDynamic data={section.data} />;
    case 'deliverables':
      return <DeliverablesSectionDynamic data={section.data} />;
    case 'projectDetails':
      return <ProjectDetailsSectionDynamic data={section.data} />;
    case 'pricing':
      return <PricingSectionDynamic data={section.data} />;
    case 'signature':
      return <SignatureSectionDynamic data={section.data} proposalId={proposal.id} proposalStatus={proposal.status} />;
    default:
      return null;
  }
};

export default SectionRenderer;
