
-- Projects library (CPT-style)
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  desktop_image TEXT NOT NULL DEFAULT '',
  mobile_image TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
USING (true);

CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL
USING (private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing project items from templates + proposals into the library (dedupe by title)
INSERT INTO public.projects (title, description, desktop_image, mobile_image, sort_order)
SELECT title, MAX(description), MAX(desktop_image), MAX(mobile_image),
       ROW_NUMBER() OVER (ORDER BY MIN(first_seen)) * 10
FROM (
  SELECT
    COALESCE(item->>'title','') AS title,
    COALESCE(item->>'description','') AS description,
    COALESCE(NULLIF(item->>'desktopImage',''), item->>'image', '') AS desktop_image,
    COALESCE(item->>'mobileImage','') AS mobile_image,
    now() AS first_seen
  FROM public.proposal_templates t,
       LATERAL jsonb_array_elements(t.content) section,
       LATERAL jsonb_array_elements(COALESCE(section->'data'->'projects','[]'::jsonb)) item
  WHERE section->>'type' = 'projects'
  UNION ALL
  SELECT
    COALESCE(item->>'title',''),
    COALESCE(item->>'description',''),
    COALESCE(NULLIF(item->>'desktopImage',''), item->>'image', ''),
    COALESCE(item->>'mobileImage',''),
    p.created_at
  FROM public.proposals p,
       LATERAL jsonb_array_elements(p.content) section,
       LATERAL jsonb_array_elements(COALESCE(section->'data'->'projects','[]'::jsonb)) item
  WHERE section->>'type' = 'projects'
) src
WHERE title <> ''
GROUP BY title;

-- Seed defaults if library still empty
INSERT INTO public.projects (title, description, sort_order)
SELECT 'Israel Canada', 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות', 10
WHERE NOT EXISTS (SELECT 1 FROM public.projects);
INSERT INTO public.projects (title, description, sort_order)
SELECT 'Polestar', 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות', 20
WHERE (SELECT COUNT(*) FROM public.projects) = 1;
INSERT INTO public.projects (title, description, sort_order)
SELECT 'Afcon', 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות', 30
WHERE (SELECT COUNT(*) FROM public.projects) = 2;

-- Convert all 'projects' sections to selector mode: drop inline projects array, add hiddenIds=[]
UPDATE public.proposal_templates SET content = (
  SELECT jsonb_agg(
    CASE WHEN section->>'type' = 'projects'
      THEN jsonb_set(
             (section #- '{data,projects}'),
             '{data,hiddenIds}',
             COALESCE(section->'data'->'hiddenIds', '[]'::jsonb)
           )
      ELSE section
    END
    ORDER BY ord
  )
  FROM jsonb_array_elements(content) WITH ORDINALITY AS s(section, ord)
);

UPDATE public.proposals SET content = (
  SELECT jsonb_agg(
    CASE WHEN section->>'type' = 'projects'
      THEN jsonb_set(
             (section #- '{data,projects}'),
             '{data,hiddenIds}',
             COALESCE(section->'data'->'hiddenIds', '[]'::jsonb)
           )
      ELSE section
    END
    ORDER BY ord
  )
  FROM jsonb_array_elements(content) WITH ORDINALITY AS s(section, ord)
);
