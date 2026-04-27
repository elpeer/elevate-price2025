-- Replace the broad public SELECT on proposal-assets so visitors cannot list every file in the bucket.
-- Direct public URLs (/storage/v1/object/public/...) keep working because they bypass this RLS check.
DROP POLICY IF EXISTS "Proposal assets are publicly accessible" ON storage.objects;

CREATE POLICY "Admins can list proposal assets"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'proposal-assets' AND public.has_role(auth.uid(), 'admin'));