-- 1) Prevent flooding/duplicate signatures: enforce one signature per proposal
-- (Frontend already blocks re-signing; this enforces it at DB level.)
DELETE FROM public.signatures s
USING public.signatures s2
WHERE s.proposal_id = s2.proposal_id
  AND s.ctid < s2.ctid;

ALTER TABLE public.signatures
  ADD CONSTRAINT signatures_proposal_id_unique UNIQUE (proposal_id);

-- 2) Add explicit restrictive policy on user_roles to make privilege escalation
-- impossible even if a future permissive policy is added by mistake.
-- Only admins may INSERT/UPDATE/DELETE roles.
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));