CREATE TABLE public.proposal_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'תבנית ברירת מחדל',
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_default boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.proposal_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read templates"
ON public.proposal_templates
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage templates"
ON public.proposal_templates
FOR ALL
USING (private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_proposal_templates_updated_at
BEFORE UPDATE ON public.proposal_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Ensure only one default row
CREATE UNIQUE INDEX proposal_templates_single_default
ON public.proposal_templates (is_default) WHERE is_default = true;