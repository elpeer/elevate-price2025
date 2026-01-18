-- Create enum for proposal status
CREATE TYPE public.proposal_status AS ENUM ('draft', 'published', 'signed');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create profiles table for user info
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    display_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create proposals table
CREATE TABLE public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    status proposal_status NOT NULL DEFAULT 'draft',
    content JSONB NOT NULL DEFAULT '[]'::jsonb,
    client_info JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on proposals
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Proposals RLS policies
CREATE POLICY "Admins can do all on proposals" ON public.proposals
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Published proposals are publicly viewable" ON public.proposals
    FOR SELECT USING (status IN ('published', 'signed'));

-- Create signatures table
CREATE TABLE public.signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id UUID REFERENCES public.proposals(id) ON DELETE CASCADE NOT NULL,
    client_name TEXT NOT NULL,
    signature_data TEXT NOT NULL,
    signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on signatures
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Signatures RLS policies
CREATE POLICY "Admins can view all signatures" ON public.signatures
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert signature for published proposal" ON public.signatures
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.proposals
            WHERE id = proposal_id AND status = 'published'
        )
    );

-- Create storage bucket for proposal assets
INSERT INTO storage.buckets (id, name, public) VALUES ('proposal-assets', 'proposal-assets', true);

-- Storage policies for proposal-assets bucket
CREATE POLICY "Proposal assets are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'proposal-assets');

CREATE POLICY "Admins can upload proposal assets" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'proposal-assets' 
        AND public.has_role(auth.uid(), 'admin')
    );

CREATE POLICY "Admins can update proposal assets" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'proposal-assets' 
        AND public.has_role(auth.uid(), 'admin')
    );

CREATE POLICY "Admins can delete proposal assets" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'proposal-assets' 
        AND public.has_role(auth.uid(), 'admin')
    );

-- User_roles RLS policies
CREATE POLICY "Admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_proposals_updated_at
    BEFORE UPDATE ON public.proposals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, display_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION public.generate_proposal_slug(proposal_title TEXT)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Generate base slug from title
    base_slug := lower(regexp_replace(proposal_title, '[^a-zA-Z0-9\u0590-\u05FF]+', '-', 'g'));
    base_slug := regexp_replace(base_slug, '^-|-$', '', 'g');
    
    -- If empty, use random
    IF base_slug = '' THEN
        base_slug := 'proposal';
    END IF;
    
    final_slug := base_slug;
    
    -- Check for uniqueness and add counter if needed
    WHILE EXISTS (SELECT 1 FROM public.proposals WHERE slug = final_slug) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql SET search_path = public;