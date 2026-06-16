-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for profile images
CREATE POLICY "Anyone can upload to profiles"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profiles');

CREATE POLICY "Anyone can view profiles"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profiles');

CREATE POLICY "Users can update own profile images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'profiles' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own profile images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'profiles' AND (storage.foldername(name))[1] = auth.uid()::text);
