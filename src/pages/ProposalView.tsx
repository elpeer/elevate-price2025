import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProposals } from '@/hooks/useProposals';
import { Proposal, ProposalSection } from '@/types/proposal';
import SectionRenderer from '@/components/proposal/SectionRenderer';
import Sidebar from '@/components/Sidebar';

const sectionTypeToNavId: Record<ProposalSection['type'], string> = {
  hero: 'intro',
  about: 'about',
  whyElevate: 'why',
  coreValues: 'values',
  testimonials: 'testimonials',
  projects: 'projects',
  siteContent: 'content',
  deliverables: 'deliverables',
  projectDetails: 'project-details',
  pricing: 'pricing',
  signature: 'signature',
};

class SectionErrorBoundary extends React.Component<
  { label: string; children: React.ReactNode },
  { hasError: boolean; error?: unknown }
> {
  state = { hasError: false as boolean, error: undefined as unknown };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    console.error(`[ProposalView] Section crashed: ${this.props.label}`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full py-10 px-6 md:px-16">
          <div className="max-w-3xl mx-auto border border-border rounded-xl p-6 bg-background text-right" dir="rtl">
            <h2 className="text-xl font-semibold text-foreground mb-2">משהו נשבר בסקשן: {this.props.label}</h2>
            <p className="text-muted-foreground text-sm">
              בדוק בקונסול (Console) לשגיאה המלאה, או שלח לי צילום/טקסט של השגיאה ואני אתקן.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProposalView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProposalBySlug } = useProposals();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      getProposalBySlug(slug).then((data) => {
        if (data && (data.status === 'published' || data.status === 'signed')) {
          setProposal(data);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl">⏳</div>;
  if (notFound || !proposal) return <div className="min-h-screen flex items-center justify-center text-xl text-muted-foreground">הצעה לא נמצאה</div>;

  const visibleSections = proposal.content.filter(s => s.visible).sort((a, b) => a.order - b.order);
  const visibleNavIds = visibleSections.map(s => sectionTypeToNavId[s.type]).filter(Boolean);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Sidebar navigation */}
      <Sidebar visibleIds={visibleNavIds} />
      
      {/* Main content with margin for sidebar */}
      <div className="md:mr-[220px]">
        {visibleSections.map(section => (
          <SectionRenderer key={section.id} section={section} proposal={proposal} />
        ))}
      </div>
    </div>
  );
};

export default ProposalView;
