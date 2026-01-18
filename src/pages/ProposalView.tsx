import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProposals } from '@/hooks/useProposals';
import { Proposal } from '@/types/proposal';
import SectionRenderer from '@/components/proposal/SectionRenderer';
import elevateLogo from '@/assets/elevate-logo.svg';

class SectionErrorBoundary extends React.Component<
  { label: string; children: React.ReactNode },
  { hasError: boolean; error?: unknown }
> {
  state = { hasError: false as boolean, error: undefined as unknown };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    // Helps us see the root cause in the browser console
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

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header with logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={elevateLogo} alt="Elevate" className="h-8" />
          </Link>
        </div>
      </header>
      
      {/* Add top padding for fixed header */}
      <div className="pt-16">
        {visibleSections.map(section => (
          <SectionRenderer key={section.id} section={section} proposal={proposal} />
        ))}
      </div>
    </div>
  );
};

export default ProposalView;
