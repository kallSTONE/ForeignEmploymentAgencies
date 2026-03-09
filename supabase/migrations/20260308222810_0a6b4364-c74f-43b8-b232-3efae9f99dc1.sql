
ALTER TABLE public.applications
  ADD COLUMN submission_type text NOT NULL DEFAULT 'self_submission',
  ADD COLUMN representative_name text,
  ADD COLUMN representative_relationship text,
  ADD COLUMN representative_phone text,
  ADD COLUMN representative_email text,
  ADD COLUMN consent_confirmed boolean NOT NULL DEFAULT false;
