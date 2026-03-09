
-- Create storage bucket for worker documents
INSERT INTO storage.buckets (id, name, public) VALUES ('worker-documents', 'worker-documents', true);

-- Add columns to applications table for file paths
ALTER TABLE public.applications ADD COLUMN cv_path text DEFAULT NULL;
ALTER TABLE public.applications ADD COLUMN photo_path text DEFAULT NULL;

-- Allow anyone to upload files to worker-documents bucket
CREATE POLICY "Anyone can upload worker documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'worker-documents');

-- Allow anyone to read worker documents (public bucket)
CREATE POLICY "Anyone can read worker documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'worker-documents');

-- Allow admins to delete worker documents
CREATE POLICY "Admins can delete worker documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'worker-documents' AND public.has_role(auth.uid(), 'admin'));
