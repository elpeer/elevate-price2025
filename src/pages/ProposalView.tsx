import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProposals } from '@/hooks/useProposals';
import { Proposal } from '@/types/proposal';
import SectionRenderer from '@/components/proposal/SectionRenderer';

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
      {visibleSections.map(section => (
        <SectionRenderer key={section.id} section={section} proposal={proposal} />
      ))}
    </div>
  );
};

export default ProposalView;
