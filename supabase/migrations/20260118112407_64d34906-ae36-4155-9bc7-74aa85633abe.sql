-- Create site_settings table for storing global site configuration
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write site settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Public can read site settings (for meta tags etc)
CREATE POLICY "Public can read site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
('site_title', 'Elevate Digital Studio'),
('site_description', 'אפיון ועיצוב UX/UI'),
('og_image', ''),
('favicon', '/favicon.ico');

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();