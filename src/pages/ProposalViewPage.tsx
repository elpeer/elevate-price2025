import React from "react";
import { Link } from "react-router-dom";
import ProposalView from "./ProposalView";

class ProposalPageErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: unknown }
> {
  state = { hasError: false as boolean, error: undefined as unknown };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    console.error("[ProposalViewPage] crashed", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <main className="max-w-3xl mx-auto px-6 py-16">
          <div className="border border-border rounded-2xl p-6 text-right">
            <h1 className="text-2xl font-semibold text-foreground mb-2">הצעה לא נטענה</h1>
            <p className="text-muted-foreground mb-4">
              אירעה שגיאה בלתי צפויה בעת טעינת ההצעה. נסה לרענן את הדף, ואם הבעיה נמשכת פנה אלינו.
            </p>
            <div className="flex flex-wrap gap-3 justify-end mt-6">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
              >
                רענן
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-foreground"
              >
                חזרה לדף הבית
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-foreground"
              >
                חזרה לאדמין
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const ProposalViewPage: React.FC = () => {
  return (
    <ProposalPageErrorBoundary>
      <ProposalView />
    </ProposalPageErrorBoundary>
  );
};

export default ProposalViewPage;
